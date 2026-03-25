// src/components/Map.jsx
import React, { useRef, useEffect, useState } from 'react';
import './Map.css';
import { BIOME_RESOURCES } from '../../data/biomes';
import { ITEMS } from '../../data/items';
import { ItemIcon } from '../ItemIcon';

// Simplified signature: Only takes what it actually needs
export function Map({ onHarvest, currentEra, isFocused }) {

  const mapRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0); // LOCAL STATE!
  
  const visibleResources = BIOME_RESOURCES.filter(res => res.era <= currentEra);

  // --- AUTO-FOCUS ---
  useEffect(() => {
    if (isFocused && mapRef.current) {
      const pins = Array.from(mapRef.current.querySelectorAll('.resource-pin'));
      if (pins.length > 0) {
        let targetIndex = focusedIndex;
        if (targetIndex >= pins.length) targetIndex = 0; 
        
        if (document.activeElement !== pins[targetIndex]) {
            pins[targetIndex].focus();
        }
      }
    }
  }, [isFocused, currentEra, focusedIndex]);

  // --- THE FOCUS TRAP & NAVIGATION ---
  useEffect(() => {
    if (!isFocused) return;

    const handleKeyDown = (e) => {
      const isNextKey = (e.key === 'Tab' && !e.shiftKey) || e.key === 'ArrowRight' || e.key === 'ArrowDown';
      const isPrevKey = (e.key === 'Tab' && e.shiftKey) || e.key === 'ArrowLeft' || e.key === 'ArrowUp';

      if (!isNextKey && !isPrevKey) return;

      const focusablePins = mapRef.current.querySelectorAll('.resource-pin');
      if (focusablePins.length === 0) return;

      e.preventDefault();

      const pinsArray = Array.from(focusablePins);
      const currentIndex = pinsArray.indexOf(document.activeElement);

      let newIndex = 0;

      if (currentIndex === -1) {
        newIndex = 0;
      } else if (isNextKey) {
        newIndex = (currentIndex + 1) % pinsArray.length;
      } else if (isPrevKey) {
        newIndex = (currentIndex - 1 + pinsArray.length) % pinsArray.length;
      }

      pinsArray[newIndex].focus();
      setFocusedIndex(newIndex); // Update local state!
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused]); // Removed global updater from dependency array
  
  let fogClass = `era-${currentEra}-fog`;
  if (currentEra >= 3) {
      fogClass = 'era-3-plus-fog';
  }

  return (
    <div className="map-viewport" ref={mapRef}>
      
      <div className="map-background">
        
        {/* Biome Labels */}
        <div className="biome-label mines">MINES</div>
        <div className="biome-label coast">COAST</div>
        <div className="biome-label forest">FOREST</div>
        <div className="biome-label farm">FARM</div>

        <div className={`fog-of-war ${fogClass}`}></div>

        {visibleResources.map((res, index) => {
          const itemDef = ITEMS[res.id];
          if (!itemDef) return null;

          return (
            <button
              key={index}
              className="resource-pin"
              style={{ left: `${res.x}%`, top: `${res.y}%` }}
              tabIndex={isFocused ? 0 : -1} 
              
              onClick={(e) => {
                const btn = e.currentTarget;
                btn.classList.add('pop');
                setTimeout(() => btn.classList.remove('pop'), 200);
                
                onHarvest(res.id);
              }}

              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault(); 
                }
              }}

              onFocus={() => {
                if (focusedIndex !== index) {
                  setFocusedIndex(index);
                }
              }}

              title={`Harvest ${itemDef.name}`}
            >
              <ItemIcon icon={itemDef.icon} size="100%" />
            </button>
          );
        })}
      </div>
    </div>
  );
}