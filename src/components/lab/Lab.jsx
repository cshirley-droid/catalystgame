// src/components/lab/Lab.jsx
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import './Lab.css';

// --- IMPORT THE NEW ZUSTAND STORE ---
import { useGameStore } from '../../store/useGameStore';

// --- CONFIG & HOOKS ---
import { REPAIR_REQ, getStationDefinition, STATION_BASE_INFO } from './labConfig';
import { useLabNavigation } from './hooks/useLabNavigation';

// --- 3D SCENE ---
import { LabScene } from './3d/LabScene';

// --- 2D UI COMPONENTS ---
import CraftingStation from './CraftingStation';

// --- POPUP IMPORTS ---
import { Map } from '../office/Map';
import { Journal } from '../office/journal/Journal';
import { Mail } from '../office/Mail';
import { Wallet } from '../Wallet';
import { EraTracker } from '../EraTracker';

export function Lab({ 
  labState, updateLabState,
  onSelectStation, onSlotClick, onProcess, 
  canProcess, outputPreview, 
  onRepair, onChangeView,
  onHarvest, onComplete, 
  onToggleSystemMenu
}) {
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  
  const isZoomed = labState.view === 'station';
  const isPopup = labState.view === 'popup';
  const activeStationId = labState.activeStation || 'KILN';

  const focusedObject = isPopup ? activeStationId : null;

  // --- ZUSTAND ATOMIC SELECTORS ---
  const inventory = useGameStore(state => state.inventory);
  const florins = useGameStore(state => state.florins);
  const currentEra = useGameStore(state => state.currentEra);
  const gameState = useGameStore(state => state.gameState);
  const labUpgrades = useGameStore(state => state.labUpgrades);
  const unlockedRecipes = useGameStore(state => state.unlockedRecipes);
  const labCameraCommand = useGameStore(state => state.labCameraCommand);
  
  const updateRoomState = useGameStore(state => state.updateRoomState);

  const getPopupStyle = (isVisible) => ({
    position: 'absolute', top: '50%', left: '50%',
    transform: isVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.9)',
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden', 
    pointerEvents: isVisible ? 'auto' : 'none',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'
  });

  // --- SET NARRATIVE DEFAULT ON LOAD ---
  useEffect(() => {
    // When the Lab component mounts (player enters the room), 
    // forcefully reset the selected item to a central station.
    updateLabState({ 
      activeStation: 'SYSTEM',
      view: 'main', 
      selectedSlot: 'A' 
    });
    // We intentionally leave the dependency array empty so this ONLY fires on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeStationId) {
      setIsMoving(true);
      const timer = setTimeout(() => setIsMoving(false), 600);
      return () => clearTimeout(timer);
    }
  }, [activeStationId]);

  const handleProcessClick = useCallback(() => {
    setIsProcessing(true);
    setTimeout(() => {
      onProcess(); 
      setIsProcessing(false);
    }, 500); 
  }, [onProcess]);

  const handleStationClick = useCallback((id) => {
    const stationInfo = STATION_BASE_INFO[id] || {};

    // We MUST set the active station even for clicks, so our 'S' key knows what is open!
    if (stationInfo.uiType === 'NAV') {
      updateLabState({ activeStation: id }); 
      if (id === 'SYSTEM') {
        if (onToggleSystemMenu) onToggleSystemMenu();
      } else {
        if (onChangeView) onChangeView('WUNDERKAMMER'); 
      }
      return;
    }

    if (stationInfo.uiType === 'POPUP') {
      updateLabState({ activeStation: id, view: 'popup' });
      return;
    }

    updateLabState({ activeStation: id, view: 'station', selectedSlot: 'A' });
    if (onSelectStation) onSelectStation(id);
  }, [updateLabState, onSelectStation, onChangeView, onToggleSystemMenu]);

  const { touchHandlers = {} } = useLabNavigation({
    labState,
    updateLabState,
    onChangeView,
    onProcessTrigger: handleProcessClick,
    onToggleSystemMenu: onToggleSystemMenu
  }) || {};

  const activeStationDef = getStationDefinition(activeStationId, currentEra);

  const renderStation = () => {
    // Safety check: If for some reason we don't have an active station definition, render nothing
    if (!activeStationDef) return null;

    const stationProps = {
      slots: labState.slots, 
      selectedSlot: labState.selectedSlot, 
      onSlotClick, 
      onProcess: handleProcessClick,
      canProcess, 
      outputPreview, 
      isProcessing, 
      isBroken: labUpgrades && labUpgrades[activeStationId] === false,
      needsFuel: ['RETORT', 'POT', 'KILN'].includes(activeStationId),
      onRepair, 
      repairReq: REPAIR_REQ[activeStationId],
      stationDef: activeStationDef,
      processBtnText: ['VAT', 'PLANTER'].includes(activeStationId) ? "Wait" : (activeStationId === 'MILL' ? activeStationDef.processName : "Ignite")
    };

    // Every station uses the exact same unified component now!
    return <CraftingStation {...stationProps} />;
  };

  return (
    <div 
      className="lab-viewport" 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      {...(focusedObject ? {} : touchHandlers)}
    >
      <Canvas 
        dpr={[1, 2]}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
        camera={{ position: [0, 0, 0.1], fov: 70 }}
      >
        <Suspense fallback={null}>
          <LabScene 
            activeStationId={activeStationId} 
            isZoomed={isZoomed} 
            onSelectStation={handleStationClick} 
            currentEra={currentEra}
            cameraTarget={labCameraCommand}
          />
        </Suspense>
      </Canvas>

      <Loader 
        containerStyles={{ backgroundColor: '#f4ebd0' }} 
        innerStyles={{ backgroundColor: '#d3c4a1', width: '300px', border: '2px solid #5c4033' }} 
        barStyles={{ backgroundColor: '#5c4033', height: '10px' }} 
        dataStyles={{ color: '#5c4033', fontFamily: '"Georgia", "Garamond", serif', fontSize: '1.2rem', fontWeight: 'bold' }} 
      />

      <div className="lab-ui-layer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        
        {isZoomed && (
          <div 
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              pointerEvents: 'auto',
              cursor: 'zoom-out'
            }}
            // Using onPointerDown instantly catches click+drags to prevent stuck camera rotations!
            onClick={() => updateLabState({ view: 'main' })}
          />
        )}

        {isZoomed && (
          <div 
            className={`active-station-ui ${activeStationDef.theme} ${isMoving ? 'fade-out' : 'fade-in'}`}
            style={{ pointerEvents: 'auto' }} // Ensure station UI remains clickable
          >
            {renderStation()}
          </div>
        )}
      </div>

      {/* --- ZELDA POPUP STAGE --- */}
      <div 
        className="zelda-popup-stage" 
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          pointerEvents: focusedObject ? 'auto' : 'none',
          zIndex: 50 
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div 
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            opacity: focusedObject ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: focusedObject ? 'auto' : 'none'
          }}
          // Also using onPointerDown here for consistency and snappiness
          onClick={() => updateLabState({ view: 'main' })}
        />

        {focusedObject && (
          <>
            <Wallet florins={florins} style={{ position: 'absolute', bottom: '40px', left: '30px', transform: 'rotate(-4deg)', zIndex: 60, pointerEvents: 'auto' }} />
            <EraTracker currentEra={currentEra} style={{ position: 'absolute', bottom: '40px', right: '30px', transform: 'rotate(3deg)', zIndex: 60, pointerEvents: 'auto' }} />
          </>
        )}

        <div style={{ ...getPopupStyle(focusedObject === 'MAP'), width: 'min(1400px, 80%)', aspectRatio: '1.4 / 1' }}>
          <Map currentEra={currentEra} onHarvest={onHarvest} isFocused={focusedObject === 'MAP'} />
        </div>

        <div style={{ ...getPopupStyle(focusedObject === 'JOURNAL'), width: 'min(1100px, 92vw)', height: 'min(650px, 75vh)' }}>
          <Journal 
            gameState={gameState} updateGameState={updateRoomState}
            isFocused={focusedObject === 'JOURNAL'} 
            unlockedRecipes={unlockedRecipes}
          />
        </div>

        <div style={{ ...getPopupStyle(focusedObject === 'MAIL'), width: 'min(850px, 45%)', height: 'min(950px, 80%)' }}>
          <Mail gameState={gameState} updateGameState={updateRoomState} onComplete={onComplete} isFocused={focusedObject === 'MAIL'} currentEra={currentEra} />
        </div>
      </div>
    </div>
  );
}