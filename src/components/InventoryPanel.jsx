// src/components/InventoryPanel.jsx
import React, { useState, useEffect } from 'react'; 
import './InventoryPanel.css';
import { ITEMS } from '../data/items';
import { ItemIcon } from './ItemIcon'; 

const TAB_ICONS = {
  raw: "", 
  mechanikos: "", 
  pyrotechny: "", 
  biomancy: "" 
};

// Define the order of tabs so we can cycle through them
const TAB_ORDER = ['raw', 'mechanikos', 'pyrotechny', 'biomancy'];

export function InventoryPanel({ inventory, onSelectItem, florins }) {
  const [activeTab, setActiveTab] = useState('raw');

  // --- ⌨️ INVENTORY KEYBOARD SHORTCUTS ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if the user is typing in a text field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Tab') {
        e.preventDefault(); // Stop the browser from highlighting HTML elements

        setActiveTab((prevTab) => {
          const currentIndex = TAB_ORDER.indexOf(prevTab);
          
          if (e.shiftKey) {
            // Shift + Tab: Go backwards (with wrap-around)
            const prevIndex = (currentIndex - 1 + TAB_ORDER.length) % TAB_ORDER.length;
            return TAB_ORDER[prevIndex];
          } else {
            // Tab: Go forwards (with wrap-around)
            const nextIndex = (currentIndex + 1) % TAB_ORDER.length;
            return TAB_ORDER[nextIndex];
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); 

  // Filter Items for Display
  const getVisibleItems = (activeTab) => {
    if (!inventory) return [];
    return Object.keys(inventory)
      .filter(itemId => {
        const itemDef = ITEMS[itemId];
        if (!itemDef) return false;
        if ((inventory[itemId] || 0) <= 0) return false;
        
        // Direct match: Does the item type match the active tab key?
        return itemDef.type === activeTab;
      })
      .map(itemId => ({ ...ITEMS[itemId], count: inventory[itemId] }))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const visibleItems = getVisibleItems(activeTab);

  return (
    <div className="inventory-panel">

      {/* Tabs */}
      <div className="inventory-tabs">
        <button className={`tab-btn ${activeTab === 'raw' ? 'active' : ''}`} onClick={() => setActiveTab('raw')}>
          <ItemIcon icon={TAB_ICONS.raw} size="24px" />
          <span className="tab-label">Map</span>
        </button>
        <button className={`tab-btn ${activeTab === 'mechanikos' ? 'active' : ''}`} onClick={() => setActiveTab('mechanikos')}>
          <ItemIcon icon={TAB_ICONS.mechanikos} size="24px" />
          <span className="tab-label">Mech.</span>
        </button>
        <button className={`tab-btn ${activeTab === 'pyrotechny' ? 'active' : ''}`} onClick={() => setActiveTab('pyrotechny')}>
          <ItemIcon icon={TAB_ICONS.pyrotechny} size="24px" />
          <span className="tab-label">Pyro.</span>
        </button>
        <button className={`tab-btn ${activeTab === 'biomancy' ? 'active' : ''}`} onClick={() => setActiveTab('biomancy')}>
          <ItemIcon icon={TAB_ICONS.biomancy} size="24px" />
          <span className="tab-label">Bio.</span>
        </button>
      </div>

      {/* Grid */}
      <div className="inventory-grid">
        {visibleItems.length > 0 ? (
          visibleItems.map(item => (
            <div key={item.id} className="item-card" onClick={() => onSelectItem(item.id)} title={item.desc}>
              <div className="item-icon-wrapper">
                <ItemIcon icon={item.icon} size="100%" />
              </div>
              <span className="item-name">{item.name}</span>
              <span className="item-badge">{item.count}</span>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.5, padding: '20px', color: '#555' }}>
            No items in {activeTab}
          </div>
        )}
      </div>
      
    </div>
  );
}