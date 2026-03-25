// src/components/wk/desk/Seega.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- ASSETS ---
const ASSETS = {
  blackStones: [
    "assets/wk/desk/gamepieces/stone_black_1.png",
    "assets/wk/desk/gamepieces/stone_black_2.png"
  ],
  whiteStones: [
    "assets/wk/desk/gamepieces/stone_white_1.png",
    "assets/wk/desk/gamepieces/stone_white_2.png"
  ],
  moveSound: "assets/audio/stone_slide.mp3",
  errorSound: "assets/audio/stone_clack.mp3"
};

// --- CONSTANTS ---
const BOARD_DIM = 5; 
const CENTER_INDEX = 12;
const TOTAL_PIECES_PER_PLAYER = 12;
const HUMAN_PLAYER = 1; // Now matches Hub's "Player 1 is Human"
const AI_PLAYER = 2;

// --- INITIAL STATE ---
const INITIAL_PIECES = [];
for (let i = 0; i < TOTAL_PIECES_PER_PLAYER; i++) {
  INITIAL_PIECES.push({ id: `b${i}`, player: 1, variant: i % 3, position: null, benchIndex: i }); 
  INITIAL_PIECES.push({ id: `w${i}`, player: 2, variant: i % 3, position: null, benchIndex: i }); 
}

const Seega = ({ 
  isMuted = false, 
  externalResetTrigger = 0, 
  difficulty = 'medium',
  onGameOver = () => {},     
  onStatusChange = () => {},
  isActive = false,        // NEW: Controls if game is playable
  gameMode = 'AI'          // NEW: 'AI' or 'HUMAN'
}) => {
  const [pieces, setPieces] = useState(INITIAL_PIECES);
  const [phase, setPhase] = useState('placement'); // 'placement' | 'movement'
  const [turn, setTurn] = useState(HUMAN_PLAYER); 
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const [winner, setWinner] = useState(null);
  const [shakingPieceId, setShakingPieceId] = useState(null);
  const [passCount, setPassCount] = useState(0); 
  
  const piecesRef = useRef(pieces);
  useEffect(() => { piecesRef.current = pieces; }, [pieces]);

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

  // --- REPORT STATUS TO PARENT ---
  useEffect(() => {
    if (winner) {
        onStatusChange(winner === 2 ? "Victory!" : winner === 1 ? "Defeat" : "Draw");
    } else {
        const phaseName = phase === 'placement' ? "Placement Phase" : "Battle Phase";
        let turnName = "";
        
        if (!isActive) {
          turnName = "Ready?"; // Frozen state status
        } else if (gameMode === 'AI') {
          turnName = turn === AI_PLAYER ? "AI Thinking..." : "Your Turn";
        } else {
          turnName = turn === AI_PLAYER ? "Black's Turn" : "White's Turn";
        }
        onStatusChange(`${phaseName} - ${turnName}`);
    }
  }, [phase, turn, winner, onStatusChange, isActive, gameMode]);

  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => {
        // We check for 'onGameOver' because that is what WkDesk passes in
        if (onGameOver) {
            // Send 1 for Human win, 2 for AI win, or 0 for Draw
            onGameOver(winner === 'DRAW' ? 0 : winner);
        }
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [winner, onGameOver]);

  // --- RESPONSIVE LAYOUT ENGINE ---
  const SAFE_PADDING = 40;
  const availableHeight = windowHeight - SAFE_PADDING;
  const availableWidth = windowWidth - 20;
  const maxUnitHeight = availableHeight / 7.5; 
  const maxUnitWidth = availableWidth / 5.5;   
  const UNIT = Math.min(maxUnitHeight, maxUnitWidth, 110);
  const BOARD_SIZE = UNIT * 5;

  const playSound = () => {
    if (isMuted) return;
    try { new Audio(ASSETS.moveSound).play().catch(()=>{}); } catch (e) {}
  };

  const triggerShake = (id) => {
    setShakingPieceId(id);
    setTimeout(() => setShakingPieceId(null), 500);
  };

  const resetGame = () => {
    setPieces(INITIAL_PIECES.map(p => ({ ...p, position: null }))); 
    setPhase('placement');
    setTurn(HUMAN_PLAYER);
    setWinner(null);
    setPassCount(0);
    setSelectedPieceId(null);
    if (!isMuted) playSound(); 
  };

  // --- GAME LOGIC ---
  const getValidMoves = useCallback((playerToCheck, currentPieces) => {
    const myPieces = currentPieces.filter(p => p.player === playerToCheck && p.position !== null && p.position !== -1);
    const occupied = currentPieces.map(p => p.position);
    let moves = [];
    myPieces.forEach(p => {
       const r = Math.floor(p.position/5), c = p.position%5;
       [[r-1,c], [r+1,c], [r,c-1], [r,c+1]].forEach(([nr, nc]) => {
         if (nr>=0 && nr<5 && nc>=0 && nc<5) {
           const to = nr*5+nc;
           if (!occupied.includes(to)) moves.push({ pieceId: p.id, to });
         }
       });
    });
    return moves;
  }, []);

  const simulateMove = (currentPieces, move, player) => {
      let simPieces = currentPieces.map(p => p.id === move.pieceId ? { ...p, position: move.to } : p);
      const r = Math.floor(move.to/5), c = move.to%5;
      const oppId = player === 1 ? 2 : 1;
      let capturedCount = 0;

      [[-1,0], [1,0], [0,-1], [0,1]].forEach(([dr, dc]) => {
          const rm=r+dr, cm=c+dc, rf=r+dr*2, cf=c+dc*2;
          if (rf>=0 && rf<5 && cf>=0 && cf<5) {
            const im = rm*5+cm;
            const ifar = rf*5+cf;
            if (im !== CENTER_INDEX) {
                const pm = simPieces.find(p=>p.position===im);
                const pf = simPieces.find(p=>p.position===ifar);
                if (pm?.player===oppId && pf?.player===player) {
                    capturedCount++;
                    simPieces = simPieces.map(p => p.id === pm.id ? { ...p, position: -1 } : p);
                }
            }
          }
      });
      return { capturedCount, simPieces };
  };

  const performPlace = (pieceId, index) => {
    const nextPieces = piecesRef.current.map(p => p.id === pieceId ? { ...p, position: index } : p);
    setPieces(nextPieces);
    playSound();
    const placedCount = nextPieces.filter(p => p.position !== null).length;
    
    if (placedCount >= 24) { 
        setTimeout(() => { 
            setPhase('movement'); 
            setTurn(1); 
        }, 500); 
    } else {
        setTurn(prev => prev === 1 ? 2 : 1);
    }
  };

  const performMove = (pieceId, toIndex) => {
    let newPieces = piecesRef.current.map(p => p.id === pieceId ? { ...p, position: toIndex } : p);
    const mover = piecesRef.current.find(p => p.id === pieceId);
    const r = Math.floor(toIndex/5), c = toIndex%5;
    const oppId = mover.player === 1 ? 2 : 1;
    
    [[-1,0], [1,0], [0,-1], [0,1]].forEach(([dr, dc]) => {
      const rm=r+dr, cm=c+dc, rf=r+dr*2, cf=c+dc*2;
      if (rf>=0 && rf<5 && cf>=0 && cf<5) {
        const im = rm*5+cm;
        const ifar = rf*5+cf;
        if (im !== CENTER_INDEX) {
            const pm = newPieces.find(p=>p.position===im);
            const pf = newPieces.find(p=>p.position===ifar);
            if (pm?.player===oppId && pf?.player===mover.player) {
                newPieces = newPieces.map(p => p.id === pm.id ? { ...p, position: -1 } : p);
            }
        }
      }
    });

    setPieces(newPieces);
    setSelectedPieceId(null);
    playSound();

    const p1 = newPieces.filter(p=>p.player===1 && p.position!==-1).length;
    const p2 = newPieces.filter(p=>p.player===2 && p.position!==-1).length;

    if (p1 === 0) setWinner(2);
    else if (p2 === 0) setWinner(1);
    else setTurn(mover.player === 1 ? 2 : 1);
  };

  // --- AI ENGINE (NOW PROPERLY GUARDED) ---
  useEffect(() => {
    // Guards: Prevent AI from acting if not active or in Human mode
    if (!isActive || gameMode !== 'AI' || turn !== AI_PLAYER || winner) return;

    const aiTimer = setTimeout(() => {
        const currentPieces = piecesRef.current; 

        if (phase === 'placement') {
            const occupied = currentPieces.map(p => p.position);
            const candidates = [];
            for (let i = 0; i < 25; i++) {
                if (i !== CENTER_INDEX && !occupied.includes(i)) candidates.push(i);
            }
            if (candidates.length > 0) {
                const randomSpot = candidates[Math.floor(Math.random() * candidates.length)];
                const myPiece = currentPieces.find(p => p.player === AI_PLAYER && p.position === null);
                if (myPiece) performPlace(myPiece.id, randomSpot);
            }
        } 
        else if (phase === 'movement') {
            const validMoves = getValidMoves(AI_PLAYER, currentPieces);
            if (validMoves.length > 0) {
                let chosenMove = null;
                if (difficulty === 'easy') {
                    chosenMove = validMoves[Math.floor(Math.random() * validMoves.length)];
                } else {
                    const scoredMoves = validMoves.map(move => {
                        const { capturedCount } = simulateMove(currentPieces, move, AI_PLAYER);
                        let score = capturedCount * 10; 
                        if (difficulty === 'hard') {
                           const distToCenter = Math.abs((move.to % 5) - 2) + Math.abs(Math.floor(move.to / 5) - 2);
                           score -= distToCenter;
                           score += Math.random() * 2;
                        } else {
                           score += Math.random() * 5;
                        }
                        return { ...move, score };
                    });
                    scoredMoves.sort((a, b) => b.score - a.score);
                    if (difficulty === 'medium') {
                        if (scoredMoves[0].score > 5) chosenMove = scoredMoves[0];
                        else chosenMove = scoredMoves[Math.floor(Math.random() * scoredMoves.length)];
                    } else {
                        chosenMove = scoredMoves[0];
                    }
                }
                if (chosenMove) performMove(chosenMove.pieceId, chosenMove.to);
            } 
        }
    }, 800);

    return () => clearTimeout(aiTimer);
  }, [turn, phase, winner, difficulty, getValidMoves, isActive, gameMode]);

  // --- PASS/BLOCK LOGIC ---
  useEffect(() => {
    if (winner || !isActive) return;
    let moves = [];
    if (phase === 'movement') moves = getValidMoves(turn, pieces);

    if (phase === 'movement' && moves.length === 0) {
        if (passCount >= 1) {
            const p1 = pieces.filter(p=>p.player===1 && p.position!==-1).length;
            const p2 = pieces.filter(p=>p.player===2 && p.position!==-1).length;
            if (p1>p2) setWinner(1);
            else if (p2>p1) setWinner(2);
            else setWinner('DRAW');
        } else {
            const timer = setTimeout(() => {
                setPassCount(prev => prev + 1);
                setTurn(turn === 1 ? 2 : 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
        return;
    }
    if (passCount > 0 && moves.length > 0) setPassCount(0);
  }, [turn, phase, pieces, winner, passCount, getValidMoves, isActive]);

  // --- INTERACTION ---
  const handleCellClick = (index) => {
    // Guards from TerniLapilli
    if (winner || !isActive) return; 
    if (gameMode === 'AI' && turn === AI_PLAYER) return; 
    
    const occupant = pieces.find(p => p.position === index);

    if (phase === 'placement') {
      if (index === CENTER_INDEX) return; 
      if (occupant) { triggerShake(occupant.id); return; }
      
      const p = pieces.find(p => p.player === turn && p.position === null);
      if (p) performPlace(p.id, index);
    } 
    else if (phase === 'movement') {
      if (occupant?.player === turn) { 
        setSelectedPieceId(occupant.id); 
      }
      else if (occupant && occupant.player !== turn) { 
        triggerShake(occupant.id); 
      }
      else if (!occupant && selectedPieceId) {
        const p = pieces.find(p => p.id === selectedPieceId);
        const dist = Math.abs(Math.floor(p.position/5) - Math.floor(index/5)) + Math.abs((p.position%5) - (index%5));
        if (dist === 1) performMove(p.id, index);
        else triggerShake(selectedPieceId);
      }
    }
  };

  // --- STYLES ---
  const wrapperStyle = {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    pointerEvents: 'none'
  };

  const boardStyle = {
    width: BOARD_SIZE, height: BOARD_SIZE, position: 'relative',
    backgroundColor: '#f4d03f', 
    backgroundImage: "url('https://www.transparenttextures.com/patterns/felt.png')", 
    borderRadius: '4px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(62, 39, 35, 0.2)',
    border: '8px solid #3e2723', transition: 'all 0.3s ease',
    pointerEvents: 'auto',
    opacity: isActive ? 1 : 0.8
  };

  return (
    <div style={wrapperStyle}>
      <style>{`
        .stone-anim { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-5deg); }
          75% { transform: translateX(5px) rotate(5deg); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div style={boardStyle}>
          <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              <defs><filter id="etch"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" /><feDisplacementMap in="SourceGraphic" scale="1" /></filter></defs>
              <g stroke="#3e2723" strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round">
                  {[1,2,3,4].map(i => <line key={`v${i}`} x1={`${i*20}%`} y1="2%" x2={`${i*20}%`} y2="98%" />)}
                  {[1,2,3,4].map(i => <line key={`h${i}`} x1="2%" y1={`${i*20}%`} x2="98%" y2={`${i*20}%`} />)}
              </g>
              <circle cx="50%" cy="50%" r={UNIT * 0.15} fill="none" stroke="#3e2723" strokeWidth="2" opacity="0.4" />
          </svg>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', width: '100%', height: '100%', position: 'absolute', zIndex: 10 }}>
              {Array(25).fill(null).map((_, i) => (
                  <div key={i} onClick={() => handleCellClick(i)} style={{ cursor: (isActive && (gameMode === 'HUMAN' || turn === HUMAN_PLAYER)) ? 'pointer' : 'default' }} />
              ))}
          </div>

          {pieces.map((p) => {
              const STONE_SIZE = UNIT * 0.75; 
              let left, top;
              
              if (p.position !== null && p.position !== -1) {
                  left = ((p.position % BOARD_DIM) * UNIT) + (UNIT - STONE_SIZE) / 2;
                  top = (Math.floor(p.position / BOARD_DIM) * UNIT) + (UNIT - STONE_SIZE) / 2;
              } else {
                  const isCaptured = p.position === -1;
                  const visualSide = isCaptured ? (p.player === 1 ? 2 : 1) : p.player;
                  const gap = UNIT * 0.3;
                  const isTop = visualSide === 1; 
                  const rowOffset = Math.floor(p.benchIndex / 6);
                  const yBase = isTop ? -(gap + STONE_SIZE) : BOARD_SIZE + gap;
                  const yDir = isTop ? -1 : 1; 
                  top = yBase + (rowOffset * (STONE_SIZE * 0.9) * yDir);
                  const rowWidth = 6 * (STONE_SIZE * 0.9);
                  const xStart = (BOARD_SIZE - rowWidth) / 2;
                  left = xStart + (p.benchIndex % 6) * (STONE_SIZE * 0.9);
              }

              return (
                <div key={p.id} className="stone-anim" style={{
                    position: 'absolute', left, top,
                    width: STONE_SIZE, height: STONE_SIZE,
                    zIndex: 20, pointerEvents: 'none',
                    filter: p.position === -1 ? 'brightness(0.5) sepia(1)' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))',
                    animation: shakingPieceId === p.id ? 'shake 0.4s' : 'none',
                    opacity: (p.position === -1) ? 0.6 : 1
                }}>
                    {/* PASTE THE IMAGE CODE HERE: */}
                    <img 
                        src={p.player === 2 ? ASSETS.blackStones[p.variant] : ASSETS.whiteStones[p.variant]}
                        alt="stone"
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain', 
                            filter: selectedPieceId === p.id ? 'drop-shadow(0 0 8px #d4af37) brightness(1.2)' : 'none' 
                        }}
                    />
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default Seega;