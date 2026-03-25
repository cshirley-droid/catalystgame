// src/components/ColophonModal.jsx
import React from 'react';
import { CATALOG_ITEMS } from '../data/catalog'; // Assuming catalog.js is in data/
import './SystemMenu.css'; // Reuse the modal and overlay styles

// You can pass other attributed data arrays via props if needed, but for now, 
// we only need the catalog items which contain the image sources.
export function ColophonModal({ onClose }) {
  // Filter for only items that have required attribution metadata
  const attributedItems = CATALOG_ITEMS.filter(item => item.attribution);

  return (
    <div className="system-overlay">
      <div className="system-modal stone-texture colophon-modal">
        <div className="system-header">
          <h2>COLOPHON</h2>
          <button className="system-close" onClick={onClose}>×</button>
        </div>

        <div className="system-content colophon-content">
          <p className="colophon-intro">
            This ledger contains notes on the provenance and licensing of third-party assets used within the game, 
            primarily for the Curio collection in the Wunderkammer.
          </p>
          
          <hr className="colophon-divider" />
          
          {attributedItems.length === 0 ? (
            <div className="no-attribution">
              No third-party content requiring explicit attribution is currently in use.
            </div>
          ) : (
            <div className="attribution-list">
              {attributedItems.map((item, index) => (
                <div key={item.id} className="attribution-entry">
                  <h3>{item.name}</h3>
                  <p>
                    <strong>Source:</strong> {item.attribution.source}
                  </p>
                  <p>
                    <strong>License:</strong> 
                    <a 
                      href={item.attribution.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="license-link"
                    >
                      {item.attribution.license}
                    </a>
                  </p>
                  {item.attribution.changes && (
                    <p>
                      <strong>Modifications:</strong> {item.attribution.changes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}