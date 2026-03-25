// src/components/office/Mail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './Mail.css';
import { COMMISSIONS } from '../../data/commissions';
import { ITEMS } from '../../data/items';
import { ItemIcon } from '../ItemIcon';
import { AudioSystem } from '../../systems/AudioSystem';

// --- IMPORT THE NEW ZUSTAND STORE ---
import { useGameStore } from '../../store/useGameStore';

const formatHistoricalDate = (year) => {
  const absYear = Math.abs(year);
  const suffix = year < 0 ? "B.C." : "A.D.";
  return `${absYear} ${suffix}`;
};

export function Mail({ onComplete }) {
  
  // --- ZUSTAND ATOMIC SELECTORS ---
  const gameState = useGameStore(state => state.gameState);
  const currentEra = useGameStore(state => state.currentEra);
  const inventory = useGameStore(state => state.inventory);
  const completedCommissions = useGameStore(state => state.completedCommissions);
  const updateRoomState = useGameStore(state => state.updateRoomState);
  
  const { office = {}, lab = {} } = gameState;
  const isFocused = lab.view === 'popup' && lab.activeStation === 'MAIL';
  const rawMailPage = office.mailPage || 0; 

  const availableCommissions = COMMISSIONS.filter(c => c.era <= currentEra);
  const safeIndex = availableCommissions.length > 0 
      ? rawMailPage % availableCommissions.length 
      : 0;

  const [isShuffling, setIsShuffling] = useState(null);

  // --- SHUFFLE LEFT/RIGHT ---
  const triggerShuffle = useCallback((direction) => {
    if (isShuffling || availableCommissions.length <= 1) return;
    setIsShuffling(direction); 
    
    setTimeout(() => {
      const len = availableCommissions.length;
      
      const newPage = direction === 'next' 
        ? (rawMailPage + 1) % len 
        : (rawMailPage - 1 + len) % len;

      // CLEANUP: Using our new Zustand action!
      updateRoomState('office', { mailPage: newPage });
      setIsShuffling(null);
    }, 600);
  }, [isShuffling, availableCommissions.length, rawMailPage, updateRoomState]);

  // --- JUMP TO NEXT ERA (Instant) ---
  const jumpToNextEra = useCallback(() => {
    if (!availableCommissions.length) return;
    const currentLetterEra = availableCommissions[safeIndex].era;
    const nextEraIndex = availableCommissions.findIndex(c => c.era > currentLetterEra);
    
    const targetIndex = nextEraIndex !== -1 ? nextEraIndex : availableCommissions.length - 1;
    
    // CLEANUP: Using our new Zustand action!
    updateRoomState('office', { mailPage: targetIndex });
  }, [availableCommissions, safeIndex, updateRoomState]); 

  // --- JUMP TO PREVIOUS ERA (Instant) ---
  const jumpToPrevEra = useCallback(() => {
    if (!availableCommissions.length) return;
    const currentLetterEra = availableCommissions[safeIndex].era;
    const firstOfCurrentEraIndex = availableCommissions.findIndex(c => c.era === currentLetterEra);
    
    let targetIndex = 0;
    if (firstOfCurrentEraIndex > 0) {
      const targetEra = availableCommissions[firstOfCurrentEraIndex - 1].era;
      targetIndex = availableCommissions.findIndex(c => c.era === targetEra);
    }
    
    // CLEANUP: Using our new Zustand action!
    updateRoomState('office', { mailPage: targetIndex });
  }, [availableCommissions, safeIndex, updateRoomState]);

  // --- THE LOCAL KEYBOARD LISTENER ---
  useEffect(() => {
    if (!isFocused) return;

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch(e.key) {
        case 'ArrowLeft':
          triggerShuffle('prev');
          break;
        case 'ArrowRight':
          triggerShuffle('next');
          break;
        case 'ArrowUp':
          jumpToNextEra();
          break;
        case 'ArrowDown':
          jumpToPrevEra();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, triggerShuffle, jumpToNextEra, jumpToPrevEra]);

  if (availableCommissions.length === 0) return null;

  return (
    <div className="mail-object-wrapper">
      <div className="mail-carousel-area">
        <button className="shuffle-btn" onClick={() => triggerShuffle('prev')}>‹</button>

        <div className="letter-stack-container">
          {availableCommissions.map((comm, index) => {
            let displayIndex = safeIndex;
            if (isShuffling === 'prev') {
              displayIndex = (safeIndex - 1 + availableCommissions.length) % availableCommissions.length;
            }

            const stackPos = (index - displayIndex + availableCommissions.length) % availableCommissions.length;
            
            if (stackPos > 3) return null;

            const isTop = stackPos === 0;
            const isMovingOut = isShuffling === 'next' && ((index - safeIndex + availableCommissions.length) % availableCommissions.length === 0);
            const isMovingIn = isShuffling === 'prev' && isTop;

            let cardClass = `letter-card paper-texture era-paper-${comm.era}`;
            if (isMovingOut) cardClass += " shuffling-out-right";
            if (isMovingIn) cardClass += " shuffling-in-left";

            let z = 100 - stackPos;
            if (isMovingIn) z = 200;

            const isCompleted = completedCommissions.includes(comm.id);
            const canAfford = comm.req.every(r => (inventory[r.id] || 0) >= r.count);

            return (
              <div 
                key={comm.id} 
                className={cardClass}
                style={{ 
                  '--stack-idx': stackPos, 
                  zIndex: z
                }}
              >
                {/* --- LEFT COLUMN: The Message --- */}
                <div className="letter-left-column">
                  <div className="letter-header">
                    <div className="sender-row">
                      <span className="sender-label">From:</span>
                      <span className="sender-name">{comm.sender}</span>
                    </div>
                    <div className="letter-date">
                      {formatHistoricalDate(comm.year)}
                    </div>
                  </div>

                  <div className="letter-body">
                    <p>{comm.text}</p>
                  </div>
                </div>

                {/* --- RIGHT COLUMN: The Action --- */}
                <div className="letter-right-column">
                  
                  {/* TOP SECTION: Requirements Loop */}
                  <div className="req-area">
                    {comm.req.map((r, i) => {
                      const itemData = ITEMS[r.id] || {}; 
                      
                      return (
                        /* The new container we defined in CSS */
                        <div key={r.id} className="delivery-req-area">
                          
                          {/* Icon and Fraction grouped together so they stack vertically */}
                          <div className="req-icon-block">
                            {/* 2a: Icon */}
                            <ItemIcon icon={itemData.icon || 'default_icon_path'} size="44px" />
                            
                            {/* 2c: Fraction */}
                            <div className="req-fraction">
                              <span className={isCompleted ? 'text-met' : ((inventory[r.id] || 0) >= r.count ? 'text-met' : 'text-unmet')}>
                                {isCompleted ? r.count : (inventory[r.id] || 0)}
                              </span>
                              <span className="fraction-slash">/</span>
                              <span className="required-number">{r.count}</span>
                            </div>
                          </div>

                          {/* 2b: Text Description (Item Name) */}
                          <span className="req-text">{itemData.name || `Missing: ${r.id}`}</span>
                          
                        </div>
                      );
                    })}
                  </div>

                  {/* BOTTOM SECTION: Payout and Seal grouped together */}
                  <div className="delivery-action-area">
                    
                    {/* 2d: Payout (Moved OUTSIDE the map loop!) */}
                    <div className="req-payout">
                      <span className="currency">ƒ</span> {comm.reward.florins}
                    </div>
                    
                    {/* 2e: Wax Seal Button */}
                    <div className="letter-footer-new">
                      {isCompleted ? (
                        <div className="wax-seal seal-paid">Paid</div>
                      ) : (
                        <button 
                          className={`wax-seal ${canAfford ? 'seal-deliver' : 'seal-crafting'}`}
                          disabled={!canAfford}
                          onClick={() => {
                            AudioSystem.playSFX('deliver'); 
                            onComplete(comm.id); 
                          }}
                        >
                          {canAfford ? "Deliver" : "Keep crafting..."}
                        </button>
                      )}
                    </div>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="shuffle-btn" onClick={() => triggerShuffle('next')}>›</button>
      </div>
    </div>
  );
}