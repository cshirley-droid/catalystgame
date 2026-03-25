// src/components/wk/desk/WorldMap.jsx
import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// --- CONFIGURATION ---
const MAP_IMAGE_URL = "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/wk/ancient_map.webp?raw=true"; 

const LOCATIONS = [
  { 
    id: 'rome', 
    name: 'Terni Lapilli', 
    region: 'Ancient Rome', 
    family: 'Alignment',
    top: 38.5,  
    left: 24,
    isActive: true 
  },
  { 
    id: 'china', 
    name: 'Pong Hau K\'i', 
    region: 'Imperial China', 
    family: 'Blocking',
    top: 39, 
    left: 82,
    isActive: true 
  },
  {
    id: 'egypt',
    name: 'Seega',
    region: 'Ancient Egypt',
    family: 'Hunt',
    top: 53,       // Your custom coordinates preserved
    left: 34,      // Your custom coordinates preserved
    isActive: true // <--- UNLOCKED!
  }
];

export function WorldMap({ onSelectGame }) {
  const [activePin, setActivePin] = useState(null);

  const handlePlayClick = (e, loc) => {
    e.stopPropagation(); 
    if (loc.isActive) {
      onSelectGame(loc.id);
    }
  };

  return (
    <div style={{ 
      width: '100%', height: '100%', 
      backgroundColor: '#1a1a1a', 
      overflow: 'hidden', position: 'relative' 
    }}>
      
      {/* VIGNETTE OVERLAY */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)',
        pointerEvents: 'none', zIndex: 50
      }} />

      {/* ZOOM WRAPPER */}
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={4}
        wheel={{ step: 0.1 }}
      >
        <TransformComponent 
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{ width: "100%", height: "auto" }} 
        >
          <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
            
            {/* THE MAP IMAGE */}
            <img 
              src={MAP_IMAGE_URL} 
              alt="Ancient World Map" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'block',
                filter: 'sepia(0.2) contrast(0.95)', 
              }} 
            />

            {/* PINS */}
            {LOCATIONS.map(loc => {
              const isSelected = activePin === loc.id;

              return (
                <div
                  key={loc.id}
                  style={{
                    position: 'absolute',
                    top: `${loc.top}%`,
                    left: `${loc.left}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    cursor: 'pointer',
                    padding: '20px', 
                    margin: '-20px'
                  }}
                  // HOVER LOGIC: Show popup instantly
                  onMouseEnter={() => setActivePin(loc.id)}
                  onMouseLeave={() => setActivePin(null)}
                  // CLICK LOGIC: Backup for mobile
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePin(loc.id);
                  }}
                >
                  
                  {/* --- POPUP CARD --- */}
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      bottom: '40px', 
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 100,
                      cursor: 'default',
                      minWidth: '220px'
                    }}>
                      
                      {/* INVISIBLE BRIDGE */}
                      <div style={{
                        position: 'absolute',
                        top: '100%', left: 0, right: 0, height: '20px'
                      }} />

                      {/* CARD BACKGROUND */}
                      <div style={{
                        backgroundColor: '#f4e4bc',
                        border: '2px solid #3e2723',
                        borderRadius: '4px',
                        padding: '12px 16px',
                        textAlign: 'center',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.8)',
                        position: 'relative'
                      }}>
                        
                        {/* ARROW */}
                        <div style={{
                          position: 'absolute', bottom: '-8px', left: '50%', marginLeft: '-8px',
                          width: '0', height: '0',
                          borderLeft: '8px solid transparent',
                          borderRight: '8px solid transparent',
                          borderTop: '8px solid #3e2723'
                        }}/>

                        {/* TEXT CONTENT */}
                        <div style={{ marginBottom: '10px' }}>
                          <div style={{ fontFamily: '"Cinzel", serif', color: '#3e2723', fontSize: '1.1rem', fontWeight: 'bold', lineHeight: '1.2' }}>
                            {loc.name}
                          </div>
                          <div style={{ fontFamily: 'Georgia, serif', color: '#5d4037', fontSize: '0.95rem', marginTop: '4px' }}>
                            {loc.region}
                          </div>
                          <div style={{ fontFamily: '"Cinzel", serif', color: '#8c7b58', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
                            {loc.family}
                          </div>
                        </div>

                        {/* BUTTON */}
                        <button 
                          onClick={(e) => handlePlayClick(e, loc)}
                          style={{
                            backgroundColor: loc.isActive ? '#5c1e1e' : '#8c8c8c',
                            color: '#f4e4bc',
                            border: '1px solid #3e2723',
                            padding: '6px 20px',
                            fontFamily: '"Cinzel", serif',
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            cursor: loc.isActive ? 'pointer' : 'not-allowed',
                            width: '100%'
                          }}
                        >
                          {loc.isActive ? 'Play' : 'Locked'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* --- PIN ICON --- */}
                  <div style={{
                    width: '24px', height: '24px', 
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#ff4d4d' : '#5c1e1e',
                    border: isSelected ? '2px solid #fff' : '2px solid #d4af37',
                    boxShadow: isSelected ? '0 0 15px #ff4d4d' : '0 4px 6px rgba(0,0,0,0.6)',
                    transition: 'all 0.3s ease',
                    transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <div style={{ 
                      width: '6px', height: '6px', 
                      background: isSelected ? '#fff' : '#d4af37', 
                      borderRadius: '50%' 
                    }} />
                  </div>

                </div>
              );
            })}

          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}