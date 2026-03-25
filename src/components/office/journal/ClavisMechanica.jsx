// src/components/office/journal/ClavisMechanica.jsx
import React from 'react';

export const ClavisMechanica = () => {
  return (
    <div className="spiral-container" style={{ marginTop: '20px' }}>
      {/* Reduced marginBottom from 30px to 15px to decrease padding under the title */}
      <h3 className="category-header" style={{ fontSize: '1.2rem', marginBottom: '15px' }}>
        Clavis Mechanica
      </h3>
      
      {/* Adjusted viewBox height to 420 for the new layout and dividers */}
      <svg viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg" className="spiral-svg">
        <g fill="none" stroke="#8b7355" strokeWidth="1.5">

          {/* ================= SECTION 1: CHAMBERS & MOVEMENT ================= */}
          {/* THE ROOM KEYS (1, 2) */}
          <rect x="20" y="10" width="30" height="30" rx="4" />
          <text x="35" y="31" fontSize="16" fill="#3d2b22" textAnchor="middle" stroke="none">1</text>
          
          <rect x="55" y="10" width="30" height="30" rx="4" />
          <text x="70" y="31" fontSize="16" fill="#3d2b22" textAnchor="middle" stroke="none">2</text>

          <path d="M 95 25 L 115 25" strokeDasharray="3" />
          <text x="125" y="31" fontSize="20" fill="#3d2b22" stroke="none" fontFamily="serif" fontStyle="italic">
            Traverse Chambers
          </text>

          {/* THE SPATIAL NAVIGATION KEYS (W, A, S, D) - Inverted T */}
          <rect x="55" y="50" width="30" height="30" rx="4" />
          <text x="70" y="71" fontSize="16" fill="#3d2b22" textAnchor="middle" stroke="none">W</text>
          
          <rect x="20" y="85" width="30" height="30" rx="4" />
          <text x="35" y="106" fontSize="16" fill="#3d2b22" textAnchor="middle" stroke="none">A</text>
          
          <rect x="55" y="85" width="30" height="30" rx="4" />
          <text x="70" y="106" fontSize="16" fill="#3d2b22" textAnchor="middle" stroke="none">S</text>

          <rect x="90" y="85" width="30" height="30" rx="4" />
          <text x="105" y="106" fontSize="16" fill="#3d2b22" textAnchor="middle" stroke="none">D</text>
          
          <path d="M 130 82 L 150 82" strokeDasharray="3" />
          <text x="160" y="88" fontSize="20" fill="#3d2b22" stroke="none" fontFamily="serif" fontStyle="italic">
            Navigate & Examine
          </text>

          {/* HORIZONTAL DIVIDER 1 */}
          <line x1="20" y1="125" x2="380" y2="125" stroke="#8b7355" strokeWidth="1" strokeOpacity="0.4" />

          {/* ================= SECTION 2: DESK INTERACTION ================= */}
          {/* THE DESK ITEMS (H, J, L) */}
          <rect x="20" y="140" width="30" height="30" rx="4" />
          <text x="35" y="161" fontSize="16" fill="#3d2b22" textAnchor="middle" stroke="none">H</text>
          
          <rect x="55" y="140" width="30" height="30" rx="4" />
          <text x="70" y="161" fontSize="16" fill="#3d2b22" textAnchor="middle" stroke="none">J</text>
          
          <rect x="90" y="140" width="30" height="30" rx="4" />
          <text x="105" y="161" fontSize="16" fill="#3d2b22" textAnchor="middle" stroke="none">L</text>

          <path d="M 130 155 L 150 155" strokeDasharray="3" />
          <text x="160" y="161" fontSize="20" fill="#3d2b22" stroke="none" fontFamily="serif" fontStyle="italic">
            Harvest, Journal, Letters
          </text>

          {/* THE ARROW KEYS - Inverted T */}
          <rect x="55" y="180" width="30" height="30" rx="4" />
          <path d="M 65 200 L 70 190 L 75 200" stroke="#3d2b22" strokeWidth="2" />
          
          <rect x="20" y="215" width="30" height="30" rx="4" />
          <path d="M 40 225 L 30 230 L 40 235" stroke="#3d2b22" strokeWidth="2" />
          
          <rect x="55" y="215" width="30" height="30" rx="4" />
          <path d="M 65 225 L 70 235 L 75 225" stroke="#3d2b22" strokeWidth="2" />
          
          <rect x="90" y="215" width="30" height="30" rx="4" />
          <path d="M 100 225 L 110 230 L 100 235" stroke="#3d2b22" strokeWidth="2" />

          <path d="M 130 212 L 150 212" strokeDasharray="3" />
          <text x="160" y="218" fontSize="20" fill="#3d2b22" stroke="none" fontFamily="serif" fontStyle="italic">
            Navigate Papers
          </text>

          {/* THE SPACE KEY */}
          <rect x="20" y="260" width="160" height="30" rx="4" />
          <text x="100" y="280" fontSize="14" fill="#3d2b22" textAnchor="middle" stroke="none">SPACE</text>
          
          <path d="M 190 275 L 210 275" strokeDasharray="3" />
          <text x="220" y="281" fontSize="20" fill="#3d2b22" stroke="none" fontFamily="serif" fontStyle="italic">
            Cycle Desktop
          </text>

          {/* HORIZONTAL DIVIDER 2 */}
          <line x1="20" y1="305" x2="380" y2="305" stroke="#8b7355" strokeWidth="1" strokeOpacity="0.4" />

          {/* ================= SECTION 3: INVENTORY ================= */}
          {/* THE INVENTORY KEY (TAB) */}
          <rect x="20" y="320" width="45" height="30" rx="4" />
          <text x="42.5" y="340" fontSize="14" fill="#3d2b22" textAnchor="middle" stroke="none">TAB</text>
          
          <path d="M 75 335 L 95 335" strokeDasharray="3" />
          <text x="105" y="341" fontSize="20" fill="#3d2b22" stroke="none" fontFamily="serif" fontStyle="italic">
            Peruse Inventory
          </text>

          {/* HORIZONTAL DIVIDER 3 */}
          <line x1="20" y1="365" x2="380" y2="365" stroke="#8b7355" strokeWidth="1" strokeOpacity="0.4" />

          {/* ================= SECTION 4: META FUNCTIONS (K, M, ESC) ================= */}
          {/* THE KEEP KEY (K) */}
          <rect x="10" y="380" width="30" height="30" rx="4" />
          <text x="25" y="401" fontSize="16" fill="#3d2b22" textAnchor="middle" stroke="none">K</text>
          <path d="M 45 395 L 55 395" strokeDasharray="3" />
          <text x="60" y="401" fontSize="18" fill="#3d2b22" stroke="none" fontFamily="serif" fontStyle="italic">Keep</text>

          {/* THE MUTE KEY (M) */}
          <rect x="120" y="380" width="30" height="30" rx="4" />
          <text x="135" y="401" fontSize="16" fill="#3d2b22" textAnchor="middle" stroke="none">M</text>
          <path d="M 155 395 L 165 395" strokeDasharray="3" />
          <text x="170" y="401" fontSize="18" fill="#3d2b22" stroke="none" fontFamily="serif" fontStyle="italic">Mutus</text>

          {/* THE SYSTEMA KEY (ESC) */}
          <rect x="240" y="380" width="45" height="30" rx="4" />
          <text x="262.5" y="400" fontSize="14" fill="#3d2b22" textAnchor="middle" stroke="none">ESC</text>
          <path d="M 290 395 L 300 395" strokeDasharray="3" />
          <text x="305" y="401" fontSize="18" fill="#3d2b22" stroke="none" fontFamily="serif" fontStyle="italic">Systema</text>

        </g>
      </svg>

      <p className="quill-text" style={{fontSize: '.9rem', marginTop: '5px', textAlign: 'justify', lineHeight: '1.6'}}>
        A manual for the efficient arrangement of the laboratory.<br/><br/>
      </p>
    </div>
  );
};