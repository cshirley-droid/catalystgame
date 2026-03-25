// src/components/wk/desk/PongHauKi.jsx
import React, { useState, useEffect, useCallback } from 'react';

// --- ASSETS ---
const ASSETS = {
  blackStones: [
    "https://github.com/cshirley-droid/terni-lapilli/blob/main/stone_black_1.png?raw=true",
    "https://github.com/cshirley-droid/terni-lapilli/blob/main/stone_black_2.png?raw=true"
  ],
  whiteStones: [
    "https://github.com/cshirley-droid/terni-lapilli/blob/main/stone_white_1.png?raw=true",
    "https://github.com/cshirley-droid/terni-lapilli/blob/main/stone_white_2.png?raw=true"
  ],
  moveSound: "https://github.com/cshirley-droid/catalyst/blob/main/stone_slide.mp3?raw=true",
  errorSound: "https://github.com/cshirley-droid/catalyst/blob/main/stone_clack.mp3?raw=true"
};

// --- TOPOLOGY ---
const ADJACENCY = {
  0: [2, 3],       
  1: [2, 4],       
  2: [0, 1, 3, 4], 
  3: [0, 2, 4],    
  4: [1, 2, 3]     
};

const INITIAL_PIECES = [
  { id: 'w1', player: 1, position: 3, variant: 0 }, 
  { id: 'w2', player: 1, position: 4, variant: 1 }, 
  { id: 'b1', player: 2, position: 0, variant: 0 }, 
  { id: 'b2', player: 2, position: 1, variant: 1 }, 
];

const PongHauKi = ({ 
  isMuted, 
  externalResetTrigger, 
  isActive = false, 
  gameMode = 'AI',
  onGameOver // NEW: Prop to notify the Sidebar
}) => {
  const [pieces, setPieces] = useState(INITIAL_PIECES);
  const [turn, setTurn] = useState(1); 
  const [selectedPieceId, setSelectedPieceId] = useState(null); 
  const [winner, setWinner] = useState(null);
  const [shakePieceId, setShakePieceId] = useState(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { if (externalResetTrigger > 0) resetGame(); }, [externalResetTrigger]);

  const resetGame = () => {
    setPieces(INITIAL_PIECES);
    setTurn(1);
    setWinner(null);
    setSelectedPieceId(null);
    setShakePieceId(null);
    playSound('move'); 
  };

  const playSound = (type) => {
    if (isMuted) return;
    const src = type === 'error' ? ASSETS.errorSound : ASSETS.moveSound;
    try { new Audio(src).play().catch(() => {}); } catch (e) {}
  };

  const triggerShake = (id) => {
    setShakePieceId(id);
    playSound('error');
    setTimeout(() => setShakePieceId(null), 400);
  };

  const canPieceMove = useCallback((piece, currentPieces) => {
    const neighbors = ADJACENCY[piece.position];
    const occupied = currentPieces.map(p => p.position);
    return neighbors.some(n => !occupied.includes(n));
  }, []);

  const checkLockout = useCallback((currentPieces, playerTurn) => {
    const playerPieces = currentPieces.filter(p => p.player === playerTurn);
    const hasMove = playerPieces.some(p => canPieceMove(p, currentPieces));
    return !hasMove; 
  }, [canPieceMove]);

  const performMove = (pieceId, targetIndex) => {
     const newPieces = pieces.map(p => p.id === pieceId ? { ...p, position: targetIndex } : p);
     setPieces(newPieces);
     playSound('move');
     setSelectedPieceId(null);
     setShakePieceId(null);
     
     const nextPlayer = turn === 1 ? 2 : 1;
     
     if (checkLockout(newPieces, nextPlayer)) {
       setWinner(turn);
       // Notify the parent (Sidebar) instead of showing local UI
       if (onGameOver) onGameOver(turn); 
     } else {
       setTurn(nextPlayer);
     }
  };

  // AI Logic
  useEffect(() => {
    if (isActive && gameMode === 'AI' && turn === 2 && !winner) {
        const timer = setTimeout(() => { makeAiMove(); }, 1000);
        return () => clearTimeout(timer);
    }
  }, [turn, winner, pieces, isActive, gameMode]);

  const makeAiMove = () => {
    const aiPlayer = 2;
    const humanPlayer = 1;
    const aiPieces = pieces.filter(p => p.player === aiPlayer);
    const occupied = pieces.map(p => p.position);

    let possibleMoves = [];
    aiPieces.forEach(piece => {
        const neighbors = ADJACENCY[piece.position];
        neighbors.forEach(target => {
            if (!occupied.includes(target)) {
                possibleMoves.push({ pieceId: piece.id, target });
            }
        });
    });

    if (possibleMoves.length === 0) return;

    const scoredMoves = possibleMoves.map(move => {
        let score = 0;
        const simPieces = pieces.map(p => p.id === move.pieceId ? { ...p, position: move.target } : p);

        if (checkLockout(simPieces, humanPlayer)) {
            score = 100;
        } else {
            const humanPieces = simPieces.filter(p => p.player === humanPlayer);
            const simOccupied = simPieces.map(p => p.position);
            let humanCanKill = false;
            
            for (let hp of humanPieces) {
                const hNeighbors = ADJACENCY[hp.position];
                for (let hTarget of hNeighbors) {
                    if (!simOccupied.includes(hTarget)) {
                        const futurePieces = simPieces.map(p => p.id === hp.id ? { ...p, position: hTarget } : p);
                        if (checkLockout(futurePieces, aiPlayer)) {
                            humanCanKill = true;
                            break;
                        }
                    }
                }
                if (humanCanKill) break;
            }
            score = humanCanKill ? -100 : 10;
        }
        return { ...move, score };
    });

    scoredMoves.sort((a, b) => b.score - a.score);
    const selectedMove = scoredMoves[0];
    performMove(selectedMove.pieceId, selectedMove.target);
  };

  const handleCellClick = (index) => {
    if (winner || !isActive) return; 
    if (gameMode === 'AI' && turn === 2) return;

    const occupant = pieces.find(p => p.position === index);

    if (occupant) {
      if (occupant.player === turn) {
        if (selectedPieceId === occupant.id) setSelectedPieceId(null); 
        else {
          if (canPieceMove(occupant, pieces)) setSelectedPieceId(occupant.id);
          else triggerShake(occupant.id); 
        }
      } else { triggerShake(occupant.id); }
    } 
    else if (selectedPieceId) {
      const currentPiece = pieces.find(p => p.id === selectedPieceId);
      if (ADJACENCY[currentPiece.position].includes(index)) {
        performMove(selectedPieceId, index);
      } else {
        triggerShake(selectedPieceId);
      }
    }
  };

  const availableMin = Math.min(windowWidth, windowHeight);
  const UNIT = Math.min(availableMin / 4, 150); 
  const BOARD_W = UNIT * 3;
  const BOARD_H = UNIT * 3;

  const COORDS = {
    0: { x: 0, y: 0 },           
    1: { x: BOARD_W, y: 0 },     
    2: { x: BOARD_W/2, y: BOARD_H/2 }, 
    3: { x: 0, y: BOARD_H },     
    4: { x: BOARD_W, y: BOARD_H } 
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'transparent', pointerEvents: 'none'
    }}>
      <style>{`
        .stone-anim { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
        @keyframes shake { 0%, 100% { transform: translate(-50%, -50%); } 25% { transform: translate(-55%, -50%); } 75% { transform: translate(-45%, -50%); } }
      `}</style>
      
      <div style={{
        position: 'relative', width: BOARD_W + (UNIT * 0.5), height: BOARD_H + (UNIT * 0.5),
        backgroundColor: '#7b241c', borderRadius: '8px', border: '8px solid #501616',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'auto'
      }}>
        <div style={{ position: 'relative', width: BOARD_W, height: BOARD_H }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 0 }}>
              <g stroke="#f1c40f" strokeWidth="6" strokeLinecap="round" opacity="0.9">
                 <line x1={COORDS[0].x} y1={COORDS[0].y} x2={COORDS[4].x} y2={COORDS[4].y} />
                 <line x1={COORDS[1].x} y1={COORDS[1].y} x2={COORDS[3].x} y2={COORDS[3].y} />
                 <line x1={COORDS[0].x} y1={COORDS[0].y} x2={COORDS[3].x} y2={COORDS[3].y} />
                 <line x1={COORDS[1].x} y1={COORDS[1].y} x2={COORDS[4].x} y2={COORDS[4].y} />
                 <line x1={COORDS[3].x} y1={COORDS[3].y} x2={COORDS[4].x} y2={COORDS[4].y} />
              </g>
              <circle cx={COORDS[2].x} cy={COORDS[2].y} r={UNIT * 0.1} fill="#f1c40f" opacity="0.3" />
            </svg>

            {[0, 1, 2, 3, 4].map(idx => (
              <div key={idx} onClick={() => handleCellClick(idx)}
                style={{
                  position: 'absolute', left: COORDS[idx].x, top: COORDS[idx].y,
                  width: UNIT * 0.6, height: UNIT * 0.6, transform: 'translate(-50%, -50%)',
                  borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(241, 196, 15, 0.3)',
                  cursor: (winner || !isActive || (gameMode === 'AI' && turn === 2)) ? 'default' : 'pointer', 
                  zIndex: 10
                }}
              />
            ))}

            {pieces.map(p => {
              const isSelected = selectedPieceId === p.id;
              const isShaking = shakePieceId === p.id;
              return (
                <div key={p.id} className="stone-anim" style={{
                    position: 'absolute', left: COORDS[p.position].x, top: COORDS[p.position].y,
                    width: UNIT * 0.8, height: UNIT * 0.8, transform: 'translate(-50%, -50%)',
                    zIndex: 20, pointerEvents: 'none',
                    filter: isShaking ? 'drop-shadow(0 0 15px #c0392b)' : isSelected ? 'drop-shadow(0 0 15px #f1c40f)' : 'drop-shadow(3px 5px 5px rgba(0,0,0,0.5))',
                    animation: isShaking ? 'shake 0.4s' : 'none',
                  }}>
                   <img src={p.player === 1 ? ASSETS.whiteStones[p.variant] : ASSETS.blackStones[p.variant]} alt="stone"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                   />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PongHauKi;