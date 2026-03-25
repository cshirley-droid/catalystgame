// src/components/lab/CraftingStation.jsx
import React from 'react';
import StationSlot from './StationSlot'; 

export default function CraftingStation({
  slots,
  selectedSlot,
  onSlotClick,
  onProcess,
  canProcess,
  outputPreview,
  isProcessing,
  isBroken,
  needsFuel,
  onRepair,
  repairReq,
  stationDef,
  processBtnText
}) {
  return (
    <div className="station-asset-container">
      
      <div className="station-overlay">
        {isBroken ? (
          <div className="broken-overlay-container">
            <div className="broken-text" style={{ background: 'rgba(0,0,0,0.7)', color: 'white', padding: '5px', borderRadius: '5px' }}>
              Damaged! Req: {repairReq?.count} {repairReq?.text}
            </div>
            <button className="process-btn active" onClick={() => onRepair(stationDef.id)}>
              Repair
            </button>
          </div>
        ) : (
          <div className="active-overlay-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', width: '100%' }}>
            
            {/* LEFT: Inputs */}
            <div className={`station-floating-inputs ${outputPreview ? 'fade-out' : 'fade-in'}`} style={{ display: 'flex', gap: '0.5rem' }}>
              <StationSlot 
                slotKey="A" 
                index={0} 
                defaultLabel="Input A" 
                itemDef={slots['A']} 
                isSelected={selectedSlot === 0} 
                onSlotClick={onSlotClick} 
              />
              <StationSlot 
                slotKey="B" 
                index={1} 
                defaultLabel="Input B" 
                itemDef={slots['B']} 
                isSelected={selectedSlot === 1} 
                onSlotClick={onSlotClick} 
              />
              {needsFuel && (
                <StationSlot 
                  slotKey="fuel" 
                  index={2} 
                  defaultLabel="Fuel" 
                  itemDef={slots['fuel']} 
                  isSelected={selectedSlot === 2} 
                  onSlotClick={onSlotClick} 
               />
              )}
            </div>

            {/* CENTER: Process Action */}
            <div className="station-floating-action">
              <button 
                className={`process-arrow-btn ${canProcess && !isProcessing ? 'active' : ''}`} 
                onClick={onProcess} 
                disabled={!canProcess || isProcessing}
                title={processBtnText}
                style={{ 
                  fontSize: '2rem', 
                  cursor: canProcess ? 'pointer' : 'not-allowed', 
                  background: 'none', 
                  border: 'none', 
                  color: canProcess ? '#fff' : '#888' 
                }}
              >
                {/* Replaced the emoji with a cleaner text prompt for the Da Vinci style */}
                {isProcessing ? "Wait..." : "➔"}
              </button>
            </div>

            {/* RIGHT: Output */}
            <div className={`station-floating-result ${outputPreview ? 'fade-in' : 'fade-out'}`}>
              <div 
                className="overlay-slot result-slot" 
                onClick={() => outputPreview && onSlotClick('result')}
              >
                {outputPreview && <img src={outputPreview.icon} alt="Result" className="float-item center" />}
              </div>
            </div>

          </div>
        )}
      </div>
        
      <h2>{stationDef.title}</h2>
    </div>
  );
}