// src/App.jsx
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameLayout } from './components/layout/GameLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useGameStore, defaultGameState } from './store/useGameStore';

// Lazy load the heavy views
const Lab = lazy(() => import('./components/lab/Lab').then(m => ({ default: m.Lab })));
const Wunderkammer = lazy(() => import('./components/wk/Wunderkammer').then(m => ({ default: m.Wunderkammer })));
const WkDesk = lazy(() => import('./components/wk/desk/WkDesk').then(m => ({ default: m.WkDesk })));
const Debug = lazy(() => import('./components/Debug').then(m => ({ default: m.Debug })));

// --- NAVIGATION & SYSTEMS ---
import { AudioSystem } from './systems/AudioSystem';
import { useGlobalInput } from './hooks/useGlobalInput';
import { useSaveManager } from './hooks/useSaveManager';
import { useAutoSave } from './hooks/useAutoSave';
import { useGameMechanics } from './hooks/useGameMechanics';

// --- DATA ---
import { ITEMS } from './data/items';
import { RECIPES } from './data/recipes';
import './App.css';
import './styles/global.css';
import './styles/textures.css';

const AppLayout = () => {
  // --- SPLASH SCREEN STATE ---
  const [gameStarted, setGameStarted] = useState(false);

  // ✨ NEW: Track our preloading progress (0 to 100)
  const [loadingProgress, setLoadingProgress] = useState(0);

  // --- SYSTEM & NAVIGATION STATE ---
  const [showColophonModal, setShowColophonModal] = useState(false); 
  const [toast, setToast] = useState(null);

  // --- CORE GAME STATE (PULLED FROM ZUSTAND) ---
  const {
    gameState, setGameState, updateRoomState,
    florins, setFlorins,
    purchasedItems, setPurchasedItems,
    itemInCrate, setItemInCrate,
    currentEra, setCurrentEra,
    completedCommissions, setCompletedCommissions,
    studyPlacement, setStudyPlacement,
    inventory, setInventory,
    unlockedRecipes, setUnlockedRecipes,
    labUpgrades, setLabUpgrades,
    godMode, setGodMode,
    isMuted, toggleMute,              
    showSystemMenu, toggleSystemMenu, 
    saveTrigger                       
  } = useGameStore();

  const setIsMuted = (val) => {
    if (typeof val === 'function') toggleMute();
    else useGameStore.setState({ isMuted: val });
  };

  const setShowSystemMenu = (val) => {
    if (typeof val === 'function') toggleSystemMenu();
    else useGameStore.setState({ showSystemMenu: val });
  };

  // --- EFFECTS ---
  useAutoSave({
    gameState, florins, purchasedItems, itemInCrate, 
    currentEra, completedCommissions, studyPlacement, 
    inventory, unlockedRecipes, labUpgrades
  });

  useEffect(() => { AudioSystem.setMuted(isMuted); }, [isMuted]);

  // --- HELPER FUNCTIONS ---
  const showToast = (message, type = 'info') => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const updateRoom = (roomId) => {
    const validRoom = ['MAP', 'DESK', 'catalyst', 'library'].includes(roomId) ? 'LAB' : roomId;
    setGameState(prevState => ({ ...prevState, currentRoom: validRoom }));
  };

  // Simplified! Now it purely relies on game state
  const getActiveRoom = () => {
    return gameState.currentRoom;
  };

  // Simplified! Only updates the Zustand state, no more URL manipulation
  const handleNavigation = (roomId) => {
    updateRoom(roomId);
  };

  const handleGodMode = () => {
    const godInventory = {};
    Object.keys(ITEMS).forEach(itemId => godInventory[itemId] = 99);
    const allRecipes = RECIPES.map(r => r.id);

    setFlorins(100000);
    setCurrentEra(7);
    setInventory(godInventory);
    setUnlockedRecipes(allRecipes);
    setCompletedCommissions([]);
    setGodMode(true);

    showToast("God Mode Activated: 100,000 ƒ, full inventory, and all unlocks granted!", 'warning');
    AudioSystem.playSFX('success'); 
  };

  // --- GAMEPLAY MECHANICS ---
  const {
    handlePurchaseItem, handleHarvest, handleStationClick,
    handleSlotClick, handleInventoryClick, handleProcess,
    handleCompleteCommission, handleRepairStation
  } = useGameMechanics(showToast, updateRoomState);

  // --- CUSTOM HOOKS ---
  const { handleExportSave, handleImportSave, handleHardReset } = useSaveManager({
    inventory, unlockedRecipes, labUpgrades, currentEra, florins, 
    completedCommissions, purchasedItems, studyPlacement, gameState,
    setInventory, setUnlockedRecipes, setLabUpgrades, setCurrentEra, 
    setFlorins, setCompletedCommissions, setPurchasedItems, setStudyPlacement, 
    setGameState, setItemInCrate, setShowSystemMenu, setGodMode, showToast,
    defaultGameState
  });

  useEffect(() => {
    if (saveTrigger > 0) {
      handleExportSave();
    }
  }, [saveTrigger]); 

  // --- THE GLOBAL INPUT DIRECTOR ---
  useGlobalInput({ onGodMode: handleGodMode });

// --- THE UPDATED WATERFALL PRELOADER ---
useEffect(() => {
  const preloadSequence = async () => {
    try {
      // PHASE 1: The Critical Path (Block the splash screen for this)
      // We only wait for the Lab to be ready. 
      await import('./components/lab/Lab');
      
      // BOOM. The player can now click "Start". 
      // We set progress to 100 to remove the lock on the Splash Screen.
      setLoadingProgress(100); 

      // PHASE 2: The Background Path (Silent preloading)
      // The user is probably clicking "Start" and reading the intro now.
      // We fetch the child tools so they are ready when clicked.
      await Promise.all([
        import('./components/office/Map'),
        import('./components/office/Mail'),
        import('./components/office/journal/Journal')
      ]);

      // PHASE 3: The "Later" Path 
      // Grab the secondary rooms while the player is busy in the Lab.
      await import('./components/wk/Wunderkammer');
      await import('./components/wk/desk/WkDesk');
      await import('./components/Debug');

    } catch (error) {
      console.warn("Preloading interrupted or failed:", error);
      setLoadingProgress(100); // Failsafe unlock
    }
  };

  preloadSequence();
}, []);

  return (
    <GameLayout
      loadingProgress={loadingProgress}
      handleInventoryClick={handleInventoryClick}
      activeView={getActiveRoom()}
      handleNavigation={handleNavigation}
      isMuted={isMuted}
      setIsMuted={setIsMuted}
      showSystemMenu={showSystemMenu}
      setShowSystemMenu={setShowSystemMenu}
      showColophonModal={showColophonModal}
      setShowColophonModal={setShowColophonModal}
      handleExportSave={handleExportSave}
      handleImportSave={handleImportSave}
      handleHardReset={handleHardReset}
      toast={toast}
      gameStarted={gameStarted}
      setGameStarted={setGameStarted}
    >
      <Routes>
        <Route path="/" element={
          <Suspense fallback={null}>
            {godMode && (
              <Debug currentEra={currentEra} setCurrentEra={setCurrentEra} showToast={showToast} />
            )}
            <div 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000' }}
            >
              {gameState.currentRoom === 'LAB' && (
                <Lab 
                  labState={gameState.lab || {}}
                  updateLabState={(updates) => updateRoomState('lab', updates)} 
                  onSelectStation={handleStationClick} 
                  onSlotClick={handleSlotClick} 
                  onProcess={handleProcess} 
                  canProcess={!!(gameState.lab?.slots?.A || gameState.lab?.slots?.B)} 
                  outputPreview={gameState.lab?.slots?.result} 
                  onRepair={handleRepairStation} 
                  onChangeView={updateRoom} 
                  officeState={gameState.office}
                  updateOfficeState={(updates) => updateRoomState('office', updates)}
                  onHarvest={handleHarvest}
                  onComplete={handleCompleteCommission}
                  onToggleSystemMenu={toggleSystemMenu}
                />
              )}
              {gameState.currentRoom === 'WUNDERKAMMER' && (
                <Wunderkammer 
                  wkState={gameState.wunderkammer}
                  updateWkState={(updates) => updateRoomState('wunderkammer', updates)}
                  onPlaceItem={(itemId, pos, surf) => { 
                    setStudyPlacement(prev => ({ 
                      ...prev, 
                      [itemId]: { 
                        x: pos.x, 
                        y: pos.y, 
                        z: pos.z, // <-- We just need to add this!
                        surface: surf 
                      } 
                    })); 
                  }}
                  onRemoveItem={(itemId) => { setStudyPlacement(prev => { const n = { ...prev }; delete n[itemId]; return n; }); }} 
                  itemInCrate={itemInCrate} setItemInCrate={setItemInCrate} 
                  onClose={() => updateRoom('LAB')}
                />
              )}
              {/* ✨ NEW: WkDesk is now fully integrated into the state manager ✨ */}
              {gameState.currentRoom === 'WkDesk' && (
                <WkDesk />
              )}
            </div>
          </Suspense>
        } />
      </Routes>
    </GameLayout>
  );
};

function App() { 
  return (
    <ErrorBoundary>
      <Router>
        <AppLayout />
      </Router>
    </ErrorBoundary>
  ); 
}

export default App;