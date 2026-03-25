// src/components/wk/desk/WkDesk.jsx
import React, { useState, useEffect } from 'react'; 
import TerniLapilli from './TerniLapilli'; 
import PongHauKi from './PongHauKi';
import Seega from './Seega';
import { WorldMap } from './WorldMap';
import { Catalog } from './Catalog';
import { WkDeskPanel } from './WkDeskPanel';
import { SystemMenu } from '../../SystemMenu';
import { Wallet } from '../../Wallet'; 
import '../Wunderkammer.css';
import './WkDesk.css';

// --- IMPORT THE NEW ZUSTAND STORE ---
import { useGameStore } from '../../../store/useGameStore';

const BOARD_ORIGINS = {
  'terni-lapilli': 'translate(-40vw, 110vh) rotate(-10deg)', 
  'pong-hau-ki':   'translate(40vw, 110vh) rotate(10deg)',   
  'seega':         'translate(0, 120vh)',                    
};

export function WkDesk({ onClose }) { 
  
  // --- ZUSTAND ATOMIC SELECTORS ---
  const florins = useGameStore(state => state.florins); 
  const setFlorins = useGameStore(state => state.setFlorins); 

  // 👇 FIX 1: Pulled 'wunderkammer' instead of 'wk', and moved `|| {}` outside!
  const wkState = useGameStore(state => state.gameState?.wunderkammer) || {}; 

  const updateRoomState = useGameStore(state => state.updateRoomState);
  const isMuted = useGameStore(state => state.isMuted);
  const showSystemMenu = useGameStore(state => state.showSystemMenu);

  // 👇 FIX 2: Changed to toggleSystemMenu (setShowSystemMenu isn't in Zustand)
  const toggleSystemMenu = useGameStore(state => state.toggleSystemMenu); 
  
  const currentScreen = wkState.deskCenteredItem || 'map';

  const handleScreenChange = (action) => {
    const nextScreen = typeof action === 'function' ? action(currentScreen) : action;
    // 👇 FIX 3: Passed 'wunderkammer' instead of 'wk' to update the right room data!
    updateRoomState('wunderkammer', { deskCenteredItem: nextScreen });
  };

  // --- LOCAL STATE ---
  const [matchState, setMatchState] = useState('IDLE'); 
  const [gameResult, setGameResult] = useState(null);   
  const [gameMode, setGameMode] = useState('AI');   
  
  const [hovered, setHovered] = useState(null);
  
  const [difficulty, setDifficulty] = useState('easy');
  const [currentReward, setCurrentReward] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);

  const isGameActive = currentScreen !== 'map' && currentScreen !== 'catalog';

  // --- DESK KEYBOARD SHORTCUTS ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault(); 
        if (matchState === 'PLAYING') return;

        handleScreenChange((prev) => {
          return prev === 'map' ? 'catalog' : 'map';
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [wkState, matchState, updateRoomState]); 

  // --- HANDLERS ---
  const handleStartMatch = (cost, reward, selectedDifficulty, mode) => {
    if (florins < cost) return; 
    
    setFlorins(prev => prev - cost);
    setCurrentReward(reward);
    setDifficulty(selectedDifficulty);
    setGameMode(mode); 
    
    setMatchState('PLAYING');
    setGameResult(null);
    setResetTrigger(prev => prev + 1); 
  };

  const handleGameOver = (winnerPlayerIndex) => {
    const isWin = winnerPlayerIndex === 1; 
    
    if (gameMode === 'AI') {
        if (isWin) {
            setFlorins(prev => prev + currentReward); 
            setGameResult('WIN');
        } else {
            setGameResult('LOSS');
        }
    } else {
        setGameResult(winnerPlayerIndex === 1 ? 'WHITE WINS' : 'BLACK WINS');
    }
    setMatchState('FINISHED');
  };

  const handleSurrender = () => {
      handleGameOver(2);
  };

  const handleResetMatch = () => {
    setMatchState('IDLE');
    setGameResult(null);
    setResetTrigger(prev => prev + 1); 
  };

  const handleBackToMap = () => {
      handleResetMatch();
      handleScreenChange('map'); 
  };

  // --- RENDER HELPERS ---
  const commonProps = {
      isMuted,
      externalResetTrigger: resetTrigger, 
      onGameOver: handleGameOver,         
      difficulty: difficulty,             
      gameMode: gameMode,                 
      isActive: matchState === 'PLAYING'  
  };

  const smoothTransition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';

  const getPhysicalStyle = (id) => {
    const isFocused = currentScreen === id;
    const isHovered = hovered === id;
    const needsDimming = !isFocused && !isHovered;

    return {
      position: 'absolute',
      inset: 0,
      margin: 'auto',
      transition: smoothTransition,
      zIndex: isFocused ? 20 : 5,
      pointerEvents: 'none', 
      filter: needsDimming 
        ? 'brightness(0.4) grayscale(0.3)' 
        : 'brightness(1) grayscale(0)',
      ...(isHovered && !isFocused && {
        filter: 'brightness(1.1) drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))'
      }),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible',
    };
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', backgroundColor: '#1B3022', overflow: 'hidden' }}>
      
      {/* LEFT: MAIN ANIMATION STAGE */}
      <div style={{ flex: 1, position: 'relative' }}>
          
          <div 
            className="lithos-perspective-stage"
            onClick={() => {
              if (currentScreen !== 'map' && matchState !== 'PLAYING') {
                handleScreenChange('map'); 
              }
            }}
          >
            {/* ✨ NEW: The Brass Exit Plaque ✨ */}
          {onClose && (
            <div className="desk-exit-plaque" onClick={onClose} title="Step away from the desk">
              <span className="plaque-screw top-left" />
              <span className="plaque-screw top-right" />
              ↶ Step Away
              <span className="plaque-screw bottom-left" />
              <span className="plaque-screw bottom-right" />
            </div>
          )}
            {/* LAYER 0: STATIC FELT BACKGROUND */}
            <div className="lithos-felt-background"/>

            <Wallet 
            florins={florins} 
            style={{ 
              bottom: '60px', 
              left: '45px', 
              transform: 'rotate(2deg)', 
              zIndex: 2
            }} 
          />

            {/* 1. THE MAP */}
            <div 
              onMouseEnter={() => setHovered('map')}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...getPhysicalStyle('map'),
                width: 'min(1200px, 60%)',
                aspectRatio: '3 / 2',
                transform: currentScreen === 'map' 
                  ? 'translate(0, 0) rotate(-0.5deg)' 
                  : 'translate(-50vw, -50vh) rotate(-15deg)',
              }}
              onClick={(e) => {
                if (currentScreen !== 'map') {
                  e.stopPropagation();
                  handleScreenChange('map'); 
                }
              }}
            >
              <div style={{ pointerEvents: 'auto', cursor: currentScreen === 'map' ? 'default' : 'pointer', width: '100%', height: '100%' }}>
                 
                 {currentScreen !== 'map' && <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 999 }} />}
                 
                 {currentScreen !== 'map' && (
                     <div className="map-return-label">⤺ Return to Map</div>
                 )}

                 <WorldMap onSelectGame={(id) => {
                    if(currentScreen !== 'map') return; 
                    if(id === 'rome') handleScreenChange('terni-lapilli');
                    if(id === 'china') handleScreenChange('pong-hau-ki');
                    if(id === 'egypt') handleScreenChange('seega');
                 }} />
              </div>
            </div>

            {/* 2. THE CATALOG */}
            <div 
              onMouseEnter={() => setHovered('catalog')}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...getPhysicalStyle('catalog'),
                height: 'min(800px, 90vh)', 
                aspectRatio: '1 / 1.59', 
                transform: currentScreen === 'catalog' 
                  ? 'translate(0, 0) rotate(0deg)' 
                  : 'translate(50vw, 50vh) rotate(15deg)',
              }}
              onClick={(e) => {
                if (currentScreen !== 'catalog') {
                  e.stopPropagation();
                  handleScreenChange('catalog'); 
                }
              }}
            >
              <div style={{ 
                  pointerEvents: 'auto', 
                  cursor: currentScreen === 'catalog' ? 'default' : 'pointer', 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
              }}>
                <Catalog isFocused={currentScreen === 'catalog'} />
              </div>
            </div>

            {/* LAYER 2: GAME BOARDS */}
            
            {/* ROME */}
            <div 
                className={`lithos-game-layer`}
                style={{
                    transform: currentScreen === 'terni-lapilli' 
                        ? 'translate(0, 0) rotate(0deg)' 
                        : BOARD_ORIGINS['terni-lapilli'],
                    zIndex: currentScreen === 'terni-lapilli' ? 10 : 1,
                    opacity: currentScreen === 'terni-lapilli' ? 1 : (currentScreen === 'map' ? 1 : 0),
                    transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s',
                    pointerEvents: currentScreen === 'terni-lapilli' ? 'auto' : 'none'
                }}
            >
                <TerniLapilli 
                  {...commonProps} 
                  isActive={matchState === 'PLAYING' && currentScreen === 'terni-lapilli'} 
                />
            </div>

            {/* CHINA */}
            <div 
                className={`lithos-game-layer`}
                style={{
                    transform: currentScreen === 'pong-hau-ki' 
                        ? 'translate(0, 0) rotate(0deg)' 
                        : BOARD_ORIGINS['pong-hau-ki'],
                    zIndex: currentScreen === 'pong-hau-ki' ? 10 : 1,
                    opacity: currentScreen === 'pong-hau-ki' ? 1 : (currentScreen === 'map' ? 1 : 0),
                    transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s',
                    pointerEvents: currentScreen === 'pong-hau-ki' ? 'auto' : 'none'
                }}
            >
                <PongHauKi 
                  {...commonProps} 
                  isActive={matchState === 'PLAYING' && currentScreen === 'pong-hau-ki'} 
                />
            </div>

            {/* EGYPT */}
            <div 
                className={`lithos-game-layer`}
                style={{
                    transform: currentScreen === 'seega' 
                        ? 'translate(0, 0) rotate(0deg)' 
                        : BOARD_ORIGINS['seega'],
                    zIndex: currentScreen === 'seega' ? 10 : 1,
                    opacity: currentScreen === 'seega' ? 1 : (currentScreen === 'map' ? 1 : 0),
                    transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s',
                    pointerEvents: currentScreen === 'seega' ? 'auto' : 'none'
                }}
            >
                <Seega 
                  {...commonProps} 
                  isActive={matchState === 'PLAYING' && currentScreen === 'seega'} 
                />
            </div>

          </div>
      </div>

      {/* RIGHT: SIDEBAR */}
      <div style={{ 
        width: isGameActive ? '350px' : '0px', 
        height: '100%', 
        flexShrink: 0, 
        borderLeft: isGameActive ? '2px solid #3e2723' : '0px solid transparent', 
        zIndex: 50,
        transition: 'width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), border-width 0.6s ease',
        overflow: 'hidden',
        backgroundColor: '#1B3022' 
      }}>
          <div style={{ 
              width: '350px', 
              height: '100%', 
              overflowX: 'hidden', 
              display: 'flex', 
              flexDirection: 'column' 
          }}>
            <WkDeskPanel
                florins={florins}
                currentScreen={currentScreen}
                matchState={matchState}
                gameResult={gameResult}
                gameMode={gameMode} 
                onStartMatch={handleStartMatch} 
                onResetMatch={handleResetMatch}
                onLeave={handleBackToMap}
                onSurrender={handleSurrender} 
            />
          </div>
      </div>

      {/* SYSTEM MENU */}
      {showSystemMenu && (
        <SystemMenu 
          onClose={toggleSystemMenu}
        />
      )}
    </div>
  );
}