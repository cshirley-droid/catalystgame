// src/components/SplashScreen.jsx
import React, { useState, useEffect } from 'react';
import { AudioSystem } from '../systems/AudioSystem'; 

// ✨ NEW: Accept loadingProgress as a prop
export const SplashScreen = ({ onGameStart, loadingProgress = 0 }) => {
  const [isSplashFading, setIsSplashFading] = useState(false);

  // ✨ NEW: Auto-start logic now depends on loadingProgress hitting 100
  useEffect(() => {
    if (!isSplashFading && loadingProgress === 100) {
      // Small 500ms buffer after hitting 100% so the user sees the full bar
      const timer = setTimeout(() => handleStartGame(), 500);
      return () => clearTimeout(timer);
    }
  }, [isSplashFading, loadingProgress]); 

  // Fade-out timer
  useEffect(() => {
    if (isSplashFading) {
      const timer = setTimeout(() => onGameStart(), 1000); 
      return () => clearTimeout(timer);
    }
  }, [isSplashFading, onGameStart]);

  const handleStartGame = () => {
    // Prevent clicking to start if it's still loading!
    if (!isSplashFading && loadingProgress === 100) {
       setIsSplashFading(true);
       AudioSystem.playSFX('click');
    }
  };

  return (
    <div 
      className={`splash-screen stone-texture ${isSplashFading ? 'fade-out' : ''}`} 
      onClick={handleStartGame} 
      style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      <div className="splash-content">
        <h1 className="splash-title">CATALYST</h1>
      </div>

      {/* ✨ NEW: The Meta Loading Bar */}
      <div style={{ width: '300px', height: '10px', backgroundColor: '#333', marginTop: '20px', borderRadius: '5px', overflow: 'hidden' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${loadingProgress}%`, 
            backgroundColor: '#f0e6d2', // Use a color that fits your game's aesthetic
            transition: 'width 0.3s ease-out' 
          }} 
        />
      </div>
      
      {/* Optional textual feedback */}
      <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '10px' }}>
        {loadingProgress < 100 ? 'Synthesizing elements...' : 'Ready'}
      </p>

    </div>
  );
};