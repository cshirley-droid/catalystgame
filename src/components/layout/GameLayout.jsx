// src/components/layout/GameLayout.jsx
import React from 'react';

// --- IMPORT THE NEW ZUSTAND STORE ---
import { useGameStore } from '../../store/useGameStore';

import { InventoryPanel } from '../InventoryPanel';
import { SystemMenu } from '../SystemMenu';
import { ColophonModal } from '../ColophonModal';
import { SplashScreen } from '../SplashScreen';

export const GameLayout = ({
  children, 
  loadingProgress,
  handleInventoryClick, 
  handleNavigation,    
  isMuted, setIsMuted, showSystemMenu, setShowSystemMenu,
  showColophonModal, setShowColophonModal, handleExportSave,
  handleImportSave, handleHardReset, toast, gameStarted, setGameStarted
}) => {

  // --- ZUSTAND ATOMIC SELECTORS ---
  const inventory = useGameStore(state => state.inventory);
  const florins = useGameStore(state => state.florins);
  
// 2. NEW: Grab the current room directly from the global store!
const currentRoom = useGameStore(state => state.gameState?.currentRoom);

// --- LAYOUT LOGIC ---
// Determine if we are in the lab to show the inventory
// CRITICAL: Make sure 'LAB' is in all uppercase to match App.jsx!
const isLab = currentRoom === 'LAB';
  const stageWidth = isLab ? 'calc(100vw - 340px)' : '100vw';

  return (
    <div style={{ width: '100vw', height: '100dvh', overflow: 'hidden', backgroundColor: '#121212', position: 'relative' }}>
      
      <div className="rotate-warning">
        <h2>Rotate your portal to continue.</h2>
        <div className="warning-icon">↱</div>
      </div>

      <div className="app-container" style={{ 
        position: 'relative',
        width: '100vw', 
        height: '100dvh', 
        overflow: 'hidden', 
        backgroundColor: '#121212' 
      }}>
        
        {/* --- DYNAMIC MAIN CONTENT (3D Canvas / Views) --- */}
        <div 
          className="main-stage" 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: stageWidth, // Dynamically set based on activeView
            height: '100%', 
            overflow: 'hidden',
            zIndex: 1,
            transition: 'width 0.3s ease-in-out' // Optional: smooth transition between views
          }}
        >
          {children}
        </div>

        {/* --- INVENTORY PANEL (Conditional Render) --- */}
        {isLab && (
          <div className="paper-texture" style={{ 
            position: 'absolute',
            top: 0,
            right: 0,
            width: '340px', 
            height: '100%', 
            borderLeft: '2px solid #3e2723',
            overflow: 'hidden',
            zIndex: 10
          }}>
            <div style={{ width: '100%', height: '100%' }}>
              <InventoryPanel inventory={inventory} onSelectItem={handleInventoryClick} florins={florins} />
            </div>
          </div>
        )}

      </div>

      {/* --- TOP LEVEL MODALS & TOASTS --- */}
      {showSystemMenu && (
        <SystemMenu onClose={() => setShowSystemMenu(false)} onExport={handleExportSave} onImport={handleImportSave} onReset={handleHardReset} onShowColophon={() => { setShowSystemMenu(false); setShowColophonModal(true); }} />
      )}

      {showColophonModal && <ColophonModal onClose={() => setShowColophonModal(false)} />}
      
      {toast && <div className="toast-notification">{toast}</div>}

      {!gameStarted && (
        <SplashScreen 
          onGameStart={() => setGameStarted(true)}
          loadingProgress={loadingProgress} />
      )}

    </div>
  );
};