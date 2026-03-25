// src/components/wk/Wunderkammer.jsx
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, useProgress } from '@react-three/drei';
import './Wunderkammer.css';
import { CATALOG_ITEMS } from '../../data/catalog'; 
import { useGameStore } from '../../store/useGameStore'; 
import { WunderkammerScene } from './3d/WunderkammerScene';
import { WkDesk } from './desk/WkDesk';

const CRATE_IMAGE = 'assets/wk/crate.png'; 
const CRATE_POSITION_PERCENT = { x: 20, y: 80 }; 

const useStudyToast = () => {
    return (message) => console.log(`[STUDY] ${message}`);
};

const OneTimeLoader = () => {
  const { progress } = useProgress();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Once the initial load hits 100%, wait 1 second (so the built-in fade-out animation can finish)
    // then permanently unmount the global loader so it never hijacks our screen again.
    if (progress === 100) {
      const timer = setTimeout(() => setIsDone(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // If the initial load is complete, render absolutely nothing!
  if (isDone) return null;

  return (
    <Loader 
      containerStyles={{ backgroundColor: '#f4ebd0' }} 
      innerStyles={{ backgroundColor: '#d3c4a1', width: '300px', border: '2px solid #5c4033' }} 
      barStyles={{ backgroundColor: '#5c4033', height: '10px' }} 
      dataStyles={{ color: '#5c4033', fontFamily: '"Georgia", "Garamond", serif', fontSize: '1.2rem', fontWeight: 'bold' }} 
    />
  );
};

// 1. REMOVED onPlaceItem from props! (We kept onClose just in case App.jsx needs it)
export function Wunderkammer({ onClose }) {
  
  const purchasedItems = useGameStore(state => state.purchasedItems || []);
  const studyPlacement = useGameStore(state => state.studyPlacement || {});
  const itemInCrate = useGameStore(state => state.itemInCrate);
  const setItemInCrate = useGameStore(state => state.setItemInCrate);
  
  // 2. NEW: Grab the setStudyPlacement function from our Zustand store
  const setStudyPlacement = useGameStore(state => state.setStudyPlacement); 

  const showToast = useStudyToast();
  const [isUnpacking, setIsUnpacking] = useState(false);
  const activeView = useGameStore(state => state.gameState?.wunderkammer?.view || 'main');
  const updateRoomState = useGameStore(state => state.updateRoomState);
  
  const isDeskOpen = activeView === 'desk';

  // 3. NEW: A local handler that safely saves 3D positions to the store
  const handlePlaceItem = (itemId, coords, surface) => {
    setStudyPlacement(prev => ({
      ...prev,
      [itemId]: coords
    }));
  };

  // --- UNPACK HANDLER ---
  const handleUnpackCrate = () => {
    if (!itemInCrate) return;
    setIsUnpacking(true);

    setTimeout(() => {
      const item = CATALOG_ITEMS.find(i => i.id === itemInCrate);
      
      // We assign it a default 3D coordinate right in front of the camera to start
      const default3DPos = { x: 0, y: 0, z: -8 }; 

      // 4. UPDATED: Use our new local handler instead of the old prop!
      handlePlaceItem(itemInCrate, default3DPos, item?.type || 'desk');
      
      setItemInCrate(null);
      setIsUnpacking(false);
      
      showToast(`'${item?.name}' revealed in the Wunderkammer!`);
    }, 500); 
  };

  return (
    <div className="study-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      
      {/* --- THE 3D WORLD --- */}
      <Canvas 
        dpr={[1, 2]}
        camera={{ position: [0, 0, 0.1], fov: 70 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
      >
        <Suspense fallback={null}>
          <WunderkammerScene 
            purchasedItems={purchasedItems} 
            studyPlacement={studyPlacement}
            onPlaceItem={handlePlaceItem} // <-- 5. UPDATED: Pass the local handler down to your 3D scene
            onReturnToLab={onClose}
            onOpenDesk={() => updateRoomState('wunderkammer', { view: 'desk', activeStation: 'DESK' })}
          />
        </Suspense>
      </Canvas>

      {/* Swap the raw Drei Loader for our custom One-Time version */}
      <OneTimeLoader />

      {/* --- 2D UI OVERLAYS (The Crate) --- */}
      {itemInCrate && !isDeskOpen && (
        <div 
          className={`delivery-crate ${isUnpacking ? 'unpacking' : ''}`}
          style={{ 
            left: `${CRATE_POSITION_PERCENT.x}%`, 
            top: `${CRATE_POSITION_PERCENT.y}%`, 
            position: 'absolute',
            zIndex: 10,
            cursor: 'pointer'
          }}
          onClick={handleUnpackCrate}
          title={`Click to unpack: ${CATALOG_ITEMS.find(i => i.id === itemInCrate)?.name}`}
        >
          <img src={CRATE_IMAGE} alt="Delivery Crate" />
          <div className="crate-label">📦 New Arrival</div>
        </div>
      )}

      {isDeskOpen && (
        <WkDesk onClose={() => updateRoomState('wunderkammer', { view: 'main' })} /> 
      )}

    </div>
  );
}