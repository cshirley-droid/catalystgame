//  src/components/Debug.jsx
import React from 'react';

export const Debug = ({ currentEra, setCurrentEra, showToast }) => {
  return (
    <div 
      className="debug-era-controls" 
      style={{
        position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', 
        zIndex: 999, display: 'flex', gap: '8px',            
        backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '10px', 
        borderRadius: '8px', border: '1px solid #00ff00'
      }}
    >
      <span style={{ color: '#00ff00', alignSelf: 'center', fontSize: '12px', marginRight: '5px' }}>
        DEBUG ERA:
      </span>
      
      {[0, 1, 2, 3, 4, 5, 6, 7].map((era) => (
        <button 
          key={era} 
          className={`debug-era-btn ${currentEra === era ? 'active' : ''}`} 
          onClick={() => { 
            setCurrentEra(era); 
            showToast(`Debug: Warped to Era ${era}`); 
          }} 
          style={{ cursor: 'pointer' }}
        >
          {era}
        </button>
      ))}
    </div>
  );
};