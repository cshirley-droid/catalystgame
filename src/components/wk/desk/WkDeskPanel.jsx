// src/components/wk/desk/WkDeskPanel.jsx
import React, { useState, useEffect } from 'react';
import { AI_LADDERS, FRIEND_PERSONA, RULES_TEXT } from '../../../data/gamedata';
import { MysteryBoard, MysteryStone, MysteryArtifact } from './DeskIcons';
import './WkDeskPanel.css';

// --- HELPER FUNCTION: Cleanly handles dialog text logic outside the render cycle ---
const getDialogContent = (matchState, gameResult, selectedPersona, gameMode) => {
    if (matchState === 'PLAYING') {
        return gameMode === 'HUMAN' 
            ? "Pass the device. Fight with honor."
            : "The opponent is studying the board...";
    }
    
    if (matchState === 'FINISHED') {
        if (gameResult === 'WIN') return `VICTORY! You earned ${selectedPersona.reward} Florins.`;
        if (gameResult === 'LOSS') return "DEFEAT. Your wager is lost.";
        if (gameResult === 'WHITE WINS') return "VICTORY for White!";
        if (gameResult === 'BLACK WINS') return "VICTORY for Black!";
    }
    
    // Default IDLE state
    return `"${selectedPersona.desc}"`;
};

export function WkDeskPanel({ 
  florins, currentScreen, onStartMatch, matchState, 
  gameResult, onResetMatch, onLeave, onSurrender, gameMode 
}) {
  const [activeTab, setActiveTab] = useState('match');
  const [carouselIndex, setCarouselIndex] = useState(1); 
  const [isConfirmingForfeit, setIsConfirmingForfeit] = useState(false); 

  // Data processing
  const currentAiLadder = AI_LADDERS[currentScreen] || [];
  const combinedRoster = [FRIEND_PERSONA, ...currentAiLadder];
  const selectedPersona = combinedRoster[carouselIndex] || FRIEND_PERSONA;
  const isFriend = selectedPersona.id === 'friend';

  // Reset confirmation state if match ends or mode changes
  useEffect(() => {
    if (matchState !== 'PLAYING') setIsConfirmingForfeit(false);
  }, [matchState]);

  // --- HANDLERS ---
  const handleNextOpponent = () => {
      if (matchState === 'IDLE') {
        setCarouselIndex(prev => (prev + 1) % combinedRoster.length);
      }
  };

  const handlePrevOpponent = () => {
      if (matchState === 'IDLE') {
        setCarouselIndex(prev => (prev - 1 + combinedRoster.length) % combinedRoster.length);
      }
  };

  const handleChallenge = () => {
    if (!isFriend && florins < selectedPersona.cost) return;
    onStartMatch(
        selectedPersona.cost, selectedPersona.reward, 
        selectedPersona.difficulty, isFriend ? 'HUMAN' : 'AI'
    );
  };

  const handleForfeitClick = () => {
    if (gameMode === 'HUMAN') {
        onLeave();
        return;
    }
    if (!isConfirmingForfeit) {
        setIsConfirmingForfeit(true);
    } else {
        if (onSurrender) onSurrender();
        else {
            console.warn("onSurrender prop missing in WkDeskPanel");
            onLeave();
        }
    }
  };

  // --- RENDERERS ---
  const renderMatchTab = () => {
    if (currentScreen === 'map') return (
      <div className="wkdesk-content-column">
        <h3>World Map</h3>
        <p>Select a region to view opponents.</p>
      </div>
    );

    const isIdle = matchState === 'IDLE';
    const isPlaying = matchState === 'PLAYING';
    const isFinished = matchState === 'FINISHED';
    const canAfford = florins >= selectedPersona.cost;

    // Utilize our clean helper function for dialog text and styling
    const dialogContent = getDialogContent(matchState, gameResult, selectedPersona, gameMode);
    const dialogColor = isPlaying ? '#e0c097' : (isFinished ? '#fff' : '#ccc');
    const dialogStyle = (isPlaying || isFinished) ? 'normal' : 'italic';

    return (
      <div className="wkdesk-content-column" style={{ justifyContent: 'flex-start', gap: '0px' }}>
        <div style={{ height: '20px' }}></div>

        {/* 1. OPPONENT CAROUSEL */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', width: '100%' }}>
            <button 
                onClick={handlePrevOpponent}
                style={{ background: 'transparent', border: 'none', color: '#e0c097', fontSize: '2rem', cursor: isIdle ? 'pointer' : 'default', padding: '0', width: '40px', textAlign: 'center', opacity: isIdle ? 1 : 0.2 }}
            >‹</button>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
                <div className="opponent-portrait-frame" style={{ width: '200px', height: '200px', marginBottom: '10px', borderColor: isFriend ? '#e0c097' : (canAfford ? '#444' : '#522') }}>
                    <img src={selectedPersona.avatar} alt={selectedPersona.name} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                </div>
                <h2 style={{ color: '#e0c097', margin: '0 0 5px 0', fontSize: '1.4rem' }}>{selectedPersona.name}</h2>
                <span style={{ color: '#888', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{selectedPersona.title}</span>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.9rem', color: isIdle ? '#aaa' : '#e0c097', border: '1px solid #333' }}>
                    Wager: <span style={{ fontFamily:'Cinzel, serif', color: isFriend ? '#e0c097' : '#ffd700' }}>
                        {isFriend ? "Honor" : `ƒ${selectedPersona.cost}`}
                    </span>
                </div>
            </div>

            <button 
                onClick={handleNextOpponent}
                style={{ background: 'transparent', border: 'none', color: '#e0c097', fontSize: '2rem', cursor: isIdle ? 'pointer' : 'default', padding: '0', width: '40px', textAlign: 'center', opacity: isIdle ? 1 : 0.2 }}
            >›</button>
        </div>

        {/* 2. DIALOG BOX */}
        <div className="wkdesk-dialog-box" style={{ background: 'rgba(0,0,0,0.2)', borderTop: '1px solid #444', borderBottom: '1px solid #444', padding: '20px', margin: '0 -20px 20px -20px', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <p style={{ margin: 0, fontStyle: dialogStyle, color: dialogColor, lineHeight: '1.4', fontSize: isFinished ? '1.1rem' : '1rem' }}>
                {dialogContent}
            </p>
        </div>

        {/* 3. ACTION BUTTON AREA */}
        <div className="wkdesk-controls" style={{ marginTop: 'auto' }}>
            {isIdle && (
                <button className="wkdesk-btn primary" onClick={handleChallenge} disabled={!isFriend && !canAfford} style={{ width: '100%', padding: '18px', fontSize: '1.2rem', letterSpacing: '1px', opacity: (!isFriend && !canAfford) ? 0.5 : 1 }}>
                    PLAY
                </button>
            )}

            {isPlaying && (
                <button className="wkdesk-btn danger" onClick={handleForfeitClick} style={{ width: '100%', padding: '18px', fontSize: '1.2rem', letterSpacing: '1px', ...(isConfirmingForfeit ? { background: 'rgba(200, 0, 0, 0.2)', borderColor: '#ff3333', color: '#ff3333', boxShadow: '0 0 15px rgba(255, 0, 0, 0.5)', transition: 'all 0.2s ease' } : {}) }}>
                    {gameMode === 'HUMAN' ? "QUIT" : (isConfirmingForfeit ? "SURE?" : "SURRENDER")}
                </button>
            )}

            {isFinished && (
                <button className="wkdesk-btn primary" onClick={onResetMatch} style={{ width: '100%', padding: '18px', fontSize: '1.2rem', letterSpacing: '1px' }}>
                    PLAY AGAIN
                </button>
            )}
        </div>
      </div>
    );
  };

  const renderCodexTab = () => {
    if (currentScreen === 'map') {
        return (
          <div className="wkdesk-content-column text-left">
            <h2 className="codex-header">Game Families</h2>
            <div style={{ textAlign: 'left', marginTop: '15px' }}>
              <h4 className="codex-subheader first">Alignment</h4>
              <p className="codex-body"><strong>Goal:</strong> Position your pieces in a straight line (3-in-a-row).</p>
              <h4 className="codex-subheader">Blocking</h4>
              <p className="codex-body"><strong>Goal:</strong> Trap your opponent so they have no legal moves left.</p>
              <h4 className="codex-subheader">Hunt</h4>
              <p className="codex-body"><strong>Goal:</strong> One side has few pieces and tries to capture the many one at a time.</p>
            </div>
          </div>
        );
    }
    
    const ruleLines = (RULES_TEXT[currentScreen] || RULES_TEXT['map']).split('\n');
    return (
      <div className="wkdesk-content-column text-left">
        <h3 className="codex-title">Rules of Engagement</h3>
        <div className="codex-text-container" style={{ marginTop: '15px' }}>
            {ruleLines.map((line, index) => (
                <p key={index} style={{ marginBottom: '12px', lineHeight: '1.5' }}>{line}</p>
            ))}
        </div>
      </div>
    );
  };

  const renderCuriosTab = () => (
    <div className="wkdesk-content-column">
       <div className="inventory-grid">
          <div className="item-card disabled" style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100px' }}><MysteryBoard /></div>
          <div className="item-card disabled" style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100px' }}><MysteryStone /></div>
          <div className="item-card disabled" style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100px' }}><MysteryArtifact /></div>
       </div>
    </div>
  );

  return (
    <div className="wkdesk-panel-container">
      <div className="inventory-tabs">
        <button className={`tab-btn ${activeTab === 'match' ? 'active' : ''}`} onClick={() => setActiveTab('match')}>
          <span className="tab-label">Match</span>
        </button>
        <button className={`tab-btn ${activeTab === 'codex' ? 'active' : ''}`} onClick={() => setActiveTab('codex')}>
          <span className="tab-label">Rules</span>
        </button>
        <button className={`tab-btn ${activeTab === 'curios' ? 'active' : ''}`} onClick={() => setActiveTab('curios')}>
          <span className="tab-label">Pieces</span>
        </button>
      </div>

      <div className="wkdesk-panel-body">
        {activeTab === 'match' && renderMatchTab()}
        {activeTab === 'codex' && renderCodexTab()}
        {activeTab === 'curios' && renderCuriosTab()}
      </div>
    </div>
  );
}