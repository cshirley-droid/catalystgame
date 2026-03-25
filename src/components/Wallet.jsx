// src/components/Wallet.jsx
import React, { useState, useEffect } from 'react';
import './Wallet.css';
import { AudioSystem } from '../systems/AudioSystem';

export function Wallet({ florins, style }) {
  // 1. Create a local state to hold the "rolling" number currently on screen
  const [displayFlorins, setDisplayFlorins] = useState(florins);

// 2. Animate the difference whenever the true 'florins' prop changes
useEffect(() => {
  if (florins === displayFlorins) return;

  let startValue = displayFlorins;
  let endValue = florins;
  let duration = 800; 
  let startTime = null;
  
  // NEW: Keep track of the last number we played a sound for
  let lastPlayedValue = startValue; 

  const animateOdometer = (timestamp) => {
    if (!startTime) startTime = timestamp;
    
    const progress = timestamp - startTime;
    const percent = Math.min(progress / duration, 1);
    const easeOut = 1 - Math.pow(1 - percent, 4);
    const current = Math.floor(startValue + (endValue - startValue) * easeOut);
    
    // NEW: Only play the tick sound if the whole number has actually changed!
    if (current !== lastPlayedValue) {
      AudioSystem.playSFX('tick');
      lastPlayedValue = current; 
    }

    setDisplayFlorins(current);

    if (percent < 1) {
      window.requestAnimationFrame(animateOdometer);
    } else {
      setDisplayFlorins(endValue);
      // Play a final solid click when the rolling stops
      AudioSystem.playSFX('click'); 
    }
  };

  const animationId = window.requestAnimationFrame(animateOdometer);
  return () => window.cancelAnimationFrame(animationId);
}, [florins]);

  return (
    <div className="desk-wallet-container leather-texture" style={style}>
      <div className="wallet-stitching"></div>
      <span className="wallet-label">FLORINS</span>
      <div className="wallet-amount">
        <span className="currency">ƒ</span>
        {/* Render our animated state instead of the raw prop */}
        {displayFlorins}
      </div>
    </div>
  );
}