// src/components/lab/StationSlot.jsx
import React from 'react';

export default function StationSlot({
  slotKey,
  index,
  defaultLabel,
  itemDef,
  isSelected,
  onSlotClick
}) {
  const isFuel = slotKey === 'fuel';

  return (
    <div 
      className={`overlay-slot ${isSelected ? 'selected' : ''} ${isFuel ? 'fuel-slot' : ''}`} 
      onClick={() => onSlotClick(slotKey)}
      title={defaultLabel}
    >
      {itemDef ? (
        <img src={itemDef.icon} alt={itemDef.name} className="float-item" />
      ) : (
        isFuel && <span className="fuel-slot-label">FUEL</span>
      )}
    </div>
  );
}