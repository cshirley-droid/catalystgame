// src/components/EraTracker.jsx
import React from 'react';
import './EraTracker.css'; 

export function EraTracker({ currentEra, style }) {
  let displayEra = "0";
  if (currentEra > 0) {
    const romans = ["I", "II", "III", "IV", "V", "VI", "VII"];
    displayEra = romans[currentEra - 1] || currentEra;
  }

  return (
    <div className="brass-plaque-container brass-texture" style={style}>
      <span className="engraved-text engraved-label">ERA</span>
      <div className="engraved-text engraved-numeral">
        {displayEra}
      </div>
    </div>
  );
}