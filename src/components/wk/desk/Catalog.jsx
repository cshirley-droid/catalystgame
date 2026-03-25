// src/components/wk/desk/Catalog.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './Catalog.css';
import { CATALOG_ITEMS } from '../../../data/catalog';
import { useGameStore } from '../../../store/useGameStore'; // <-- 1. IMPORT ZUSTAND

// 2. ONLY KEEP `isFocused`. Everything else comes directly from the store!
export function Catalog({ isFocused }) {
  
  // 3. ZUSTAND SELECTORS
  const florins = useGameStore(state => state.florins);
  const purchasedItems = useGameStore(state => state.purchasedItems);
  const onPurchaseItem = useGameStore(state => state.onPurchaseItem);
  const currentEra = useGameStore(state => state.currentEra);
  
  // We can select the exact property we need from the wk room state
  const rawTopSheet = useGameStore(state => state.gameState?.wk?.catalogTopSheet || 0);
  const updateRoomState = useGameStore(state => state.updateRoomState);
  
  const [isShuffling, setIsShuffling] = useState(null);

  // FILTER & PAGINATION LOGIC
  const visibleItems = CATALOG_ITEMS.filter(item => 
    (item.era === undefined || item.era <= currentEra) || purchasedItems.includes(item.id)
  );

  const itemsPerPage = 3; 
  const broadsheets = [];
  for (let i = 0; i < visibleItems.length; i += itemsPerPage) {
    broadsheets.push(visibleItems.slice(i, i + itemsPerPage));
  }
  if (broadsheets.length === 0) broadsheets.push([]); 

  const topSheetIndex = rawTopSheet >= broadsheets.length ? 0 : rawTopSheet;

  // --- SHUFFLE LOGIC ---
  const triggerShuffle = useCallback((direction) => {
    if (isShuffling || broadsheets.length <= 1) return;
    setIsShuffling(direction);
    
    setTimeout(() => {
      let nextIndex = topSheetIndex;
      if (direction === 'next') {
        nextIndex = (topSheetIndex + 1) % broadsheets.length;
      } else {
        nextIndex = (topSheetIndex - 1 + broadsheets.length) % broadsheets.length;
      }
      
      // 4. USE THE NEW ROOM UPDATER
      updateRoomState('wk', { catalogTopSheet: nextIndex });
      setIsShuffling(null);
    }, 600); 
  }, [isShuffling, broadsheets.length, topSheetIndex, updateRoomState]);

  // --- KEYBOARD LISTENER ---
  useEffect(() => {
    if (!isFocused) return; 

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        triggerShuffle('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        triggerShuffle('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, triggerShuffle]);

  return (
    <div className="catalog-carousel-area" style={{ pointerEvents: isFocused ? 'auto' : 'none' }}>
      
      {/* LEFT SHUFFLE BUTTON */}
      {broadsheets.length > 1 && (
        <button className="shuffle-btn" onClick={(e) => { e.stopPropagation(); triggerShuffle('prev'); }}>‹</button>
      )}

      <div className="catalog-stack-container">
        {broadsheets.map((sheet, index) => {
          let displayIndex = topSheetIndex;
          if (isShuffling === 'prev') {
            displayIndex = (topSheetIndex - 1 + broadsheets.length) % broadsheets.length;
          }

          const stackPos = (index - displayIndex + broadsheets.length) % broadsheets.length;
          
          if (stackPos > 3) return null;

          const isTop = stackPos === 0;
          const isMovingOut = isShuffling === 'next' && ((index - topSheetIndex + broadsheets.length) % broadsheets.length === 0);
          const isMovingIn = isShuffling === 'prev' && isTop;

          let cardClass = `catalog-broadsheet ${isTop ? 'top-sheet' : 'under-sheet'}`;
          if (isMovingOut) cardClass += " shuffling-out-right";
          if (isMovingIn) cardClass += " shuffling-in-left";

          let zIndex = broadsheets.length - stackPos;
          if (isMovingIn) zIndex = broadsheets.length + 1; 

          const translateY = stackPos * 4; 
          const translateX = stackPos * 2; 
          const rotation = (index % 2 === 0 ? -1 : 1) * (stackPos * 0.5); 

          return (
            <div 
              key={`broadsheet-${index}`} 
              className={cardClass}
              style={{
                zIndex,
                transform: `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`,
                opacity: stackPos > 2 ? 0 : 1 - (stackPos * 0.1), 
              }}
              onClick={() => {
                if (isTop) triggerShuffle('next');
              }}
            >
              <div className="catalog-page-header">
                 <span className="ledger-title">Curiosities Today</span>
              </div>

              {sheet.length === 0 ? (
                 <div className="empty-catalog">The merchants have nothing to offer at this time.</div>
              ) : (
                <div className="catalog-page-items">
                  {sheet.map(item => {
                    const isPurchased = purchasedItems.includes(item.id);
                    const canAfford = florins >= item.price;
                    return (
                      <div key={item.id} className={`catalog-entry ${isPurchased ? 'purchased' : ''}`}>
                        <div className="catalog-details">
                          <div className="catalog-item-name">{item.name}</div>
                          <div className="catalog-item-desc">{item.desc_catalog}</div>
                        </div>
                        <div className="catalog-action">
                          {isPurchased ? (
                            <div className="purchased-stamp">ACQUIRED</div>
                          ) : (
                            <div className="purchase-controls">
                              <span className={`price-tag ${canAfford ? 'affordable' : 'expensive'}`}>
                                {item.price} ƒ
                              </span>
                              <button
                                className={`catalog-ink-stamp ${canAfford ? 'stamp-ready' : 'stamp-locked'}`}
                                disabled={!canAfford || !isTop || isShuffling} 
                                onClick={(e) => {
                                  e.stopPropagation(); 
                                  if (typeof onPurchaseItem === 'function') {
                                      onPurchaseItem(item.id, item.price);
                                  } else {
                                      console.error("Uh oh, onPurchaseItem is not a function! It got lost in transit.");
                                  }
                                }}
                              >
                                {canAfford ? "ORDER" : "LOCKED"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div className="catalog-page-number">Sheet {index + 1} of {broadsheets.length}</div>
            </div>
          );
        })}
      </div>

      {/* RIGHT SHUFFLE BUTTON */}
      {broadsheets.length > 1 && (
        <button className="shuffle-btn" onClick={(e) => { e.stopPropagation(); triggerShuffle('next'); }}>›</button>
      )}
    </div>
  );
}