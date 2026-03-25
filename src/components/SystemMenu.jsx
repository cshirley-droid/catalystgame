// src/components/SystemMenu.jsx
import React, { useRef, useState } from 'react';
import './SystemMenu.css';

// Added onShowColophon to the destructured props
export function SystemMenu({ onClose, onExport, onImport, onReset, onShowColophon }) {
  const fileInputRef = useRef(null);
  const [resetConfirm, setResetConfirm] = useState(false); // Track confirmation state
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImport(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleResetClick = () => {
    if (resetConfirm) {
      onReset(); // Actual reset logic passed from App
    } else {
      setResetConfirm(true); // First click changes text
      // Auto-revert after 3 seconds if they don't confirm
      setTimeout(() => setResetConfirm(false), 3000);
    }
  };

  return (
    <div className="system-overlay">
      <div className="system-modal stone-texture">
        <div className="system-header">
          <h2>SYSTEMA</h2>
          <button className="system-close" onClick={onClose}>×</button>
        </div>

        <div className="system-content">
          
          <div className="system-section">
            <div className="button-group">
              <button className="sys-btn" onClick={onExport}>
                SAVE
              </button>
              
              <label className="sys-btn upload-btn">
                LOAD
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleFileChange} 
                  ref={fileInputRef}
                  hidden 
                />
              </label>
            </div>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: '10px 0' }} />

          <div className="system-section danger-zone">
            <button 
              className={`sys-btn danger ${resetConfirm ? 'confirm-state' : ''}`} 
              onClick={handleResetClick}
            >
              {resetConfirm ? "Are you sure?" : "RESET"}
            </button>
          </div>

        </div>
        
        <div className="system-footer">
          Catalyst v0.5.0
          {/* THE NEW COLOPHON LINK */}
          <span 
            className="colophon-link" 
            onClick={onShowColophon}
            title="View Credits and Attributions"
          >
            &nbsp;• Colophon
          </span>
        </div>
      </div>
    </div>
  );
}