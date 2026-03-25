// src/components/wk/desk/TerniLapilli.jsx
import React, { useState, useEffect } from 'react';

// --- ASSETS ---
const ASSETS = {
  blackStones: [
    "https://github.com/cshirley-droid/terni-lapilli/blob/main/stone_black_1.png?raw=true",
    "https://github.com/cshirley-droid/terni-lapilli/blob/main/stone_black_2.png?raw=true",
    "https://github.com/cshirley-droid/terni-lapilli/blob/main/stone_black_3.png?raw=true"
  ],
  whiteStones: [
    "https://github.com/cshirley-droid/terni-lapilli/blob/main/stone_white_1.png?raw=true",
    "https://github.com/cshirley-droid/terni-lapilli/blob/main/stone_white_2.png?raw=true",
    "https://github.com/cshirley-droid/terni-lapilli/blob/main/stone_white_3.png?raw=true"
  ],
  moveSound: "https://github.com/cshirley-droid/catalyst/blob/main/stone_slide.mp3?raw=true"
};

// --- CONSTANTS ---
const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];
const ADJACENCY = {
  0: [1, 3],       1: [0, 2, 4],    2: [1, 5],
  3: [0, 4, 6],    4: [1, 3, 5, 7], 5: [2, 4, 8],
  6: [3, 7],       7: [4, 6, 8],    8: [5, 7]
};

// RULE CHANGE: Player 1 is now WHITE (Starts), Player 2 is BLACK (AI/Second)
const INITIAL_PIECES = [
  { id: 'w1', player: 1, variant: 0, position: null, benchIndex: 0 },
  { id: 'w2', player: 1, variant: 1, position: null, benchIndex: 1 },
  { id: 'w3', player: 1, variant: 2, position: null, benchIndex: 2 },
  { id: 'b1', player: 2, variant: 0, position: null, benchIndex: 0 },
  { id: 'b2', player: 2, variant: 1, position: null, benchIndex: 1 },
  { id: 'b3', player: 2, variant: 2, position: null, benchIndex: 2 },
];

const TerniLapilli = ({ 
    isMuted, 
    externalResetTrigger, 
    onGameOver, 
    difficulty = 'medium', 
    gameMode = 'AI', // 'AI' or 'HUMAN'
    isActive = false // Controls if the game is playable (Frozen until Wager committed)
}) => {
  const [pieces, setPieces] = useState(INITIAL_PIECES);
  const [phase, setPhase] = useState('placement'); 
  const [turn, setTurn] = useState(1); 
  const [selectedPieceId, setSelectedPieceId] = useState(null); 
  const [winner, setWinner] = useState(null);
  const [shakingPieceId, setShakingPieceId] = useState(null);
  
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

  // RESET LOGIC
  useEffect(() => { 
      if (externalResetTrigger > 0) resetGame(); 
  }, [externalResetTrigger]);

  const resetGame = () => {
    setPieces(INITIAL_PIECES);
    setPhase('placement');
    setTurn(1); // Player 1 (White) always starts
    setWinner(null);
    setSelectedPieceId(null);
    if (!isMuted) playSound(); 
  };

  const playSound = () => {
    if (isMuted) return; 
    try { new Audio(ASSETS.moveSound).play().catch(() => {}); } catch (e) {}
  };

  const triggerShake = (id) => {
    setShakingPieceId(id);
    setTimeout(() => setShakingPieceId(null), 500);
  };

  // --- AI ENGINE ---
  // Logic: AI is always Player 2 (Black) in this configuration
  useEffect(() => {
    if (isActive && gameMode === 'AI' && turn === 2 && !winner) {
      const timer = setTimeout(() => {
        performAiTurn();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [turn, winner, phase, pieces, isActive, gameMode]);

  const performAiTurn = () => {
    const board = Array(9).fill(null);
    pieces.forEach(p => { if (p.position !== null) board[p.position] = p.player; });

    const bestMove = getBestAiMove(board, phase, pieces);
    
    if (bestMove) {
      executeMove(bestMove.pieceId, bestMove.to);
    }
  };

  const getBestAiMove = (board, currentPhase, currentPieces) => {
    const aiPlayer = 2; // Black
    const opponent = 1; // White
    const availableBench = currentPieces.find(p => p.player === aiPlayer && p.position === null);
    const checkWinCondition = (b, p) => WIN_PATTERNS.some(pat => pat.every(i => b[i] === p));
    
    // Check if opponent threatens to win on next move
    const canOpponentWinNext = (bState) => {
      const oppPiecesIndices = bState.map((val, idx) => val === opponent ? idx : null).filter(v => v !== null);
      const emptySpots = bState.map((val, idx) => val === null ? idx : null).filter(v => v !== null);

      if (currentPhase === 'placement' || oppPiecesIndices.length < 3) {
         for (let spot of emptySpots) {
            const temp = [...bState];
            temp[spot] = opponent;
            if (checkWinCondition(temp, opponent)) return true;
         }
      } 
      if (currentPhase === 'movement' || oppPiecesIndices.length === 3) {
         for (let fromIdx of oppPiecesIndices) {
            const validMoves = ADJACENCY[fromIdx].filter(adj => bState[adj] === null);
            for (let toIdx of validMoves) {
               const temp = [...bState];
               temp[fromIdx] = null;
               temp[toIdx] = opponent;
               if (checkWinCondition(temp, opponent)) return true;
            }
         }
      }
      return false;
    };

    if (currentPhase === 'placement') {
       const validSpots = board.map((val, idx) => val === null ? idx : null).filter(v => v !== null);
       
       // 1. Win if possible
       for (let spot of validSpots) {
         const temp = [...board]; temp[spot] = aiPlayer;
         if (checkWinCondition(temp, aiPlayer)) return { pieceId: availableBench.id, to: spot };
       }

       // 2. Block opponent win
       for (let spot of validSpots) {
         const temp = [...board]; temp[spot] = opponent;
         if (checkWinCondition(temp, opponent)) return { pieceId: availableBench.id, to: spot };
       }

       // 3. Strategic placement (Center preference for Medium+)
       if (difficulty !== 'easy') {
          if (validSpots.includes(4)) return { pieceId: availableBench.id, to: 4 };
       }
       
       // 4. Corner preference (Hard)
       if (difficulty === 'hard') {
          const corners = [0, 2, 6, 8].filter(c => validSpots.includes(c));
          if (corners.length > 0) return { pieceId: availableBench.id, to: corners[Math.floor(Math.random() * corners.length)] };
       }

       return { pieceId: availableBench.id, to: validSpots[Math.floor(Math.random() * validSpots.length)] };
    }

    if (currentPhase === 'movement') {
      const myPiecesOnBoard = currentPieces.filter(p => p.player === aiPlayer && p.position !== null);
      let allMoves = [];

      myPiecesOnBoard.forEach(p => {
        const neighbors = ADJACENCY[p.position];
        neighbors.forEach(n => {
          if (board[n] === null) {
            allMoves.push({ pieceId: p.id, from: p.position, to: n });
          }
        });
      });

      if (allMoves.length === 0) return null; 

      // 1. Win immediately
      for (let move of allMoves) {
        const temp = [...board];
        temp[move.from] = null;
        temp[move.to] = aiPlayer;
        if (checkWinCondition(temp, aiPlayer)) return move;
      }

      // Filter moves that don't leave us open to defeat
      const safeMoves = [];
      const unsafeMoves = [];

      for (let move of allMoves) {
         const temp = [...board];
         temp[move.from] = null;
         temp[move.to] = aiPlayer;
         
         if (canOpponentWinNext(temp)) {
            unsafeMoves.push(move);
         } else {
            safeMoves.push(move);
         }
      }

      if (difficulty === 'easy') {
         return allMoves[Math.floor(Math.random() * allMoves.length)];
      }

      const candidateMoves = safeMoves.length > 0 ? safeMoves : unsafeMoves; 

      if (difficulty === 'hard') {
         const centerMove = candidateMoves.find(m => m.to === 4);
         if (centerMove) return centerMove;
      }

      return candidateMoves[Math.floor(Math.random() * candidateMoves.length)];
    }
  };

  // --- EXECUTE MOVE ---
  const checkWin = (currentPieces, player) => {
    const board = Array(9).fill(null);
    currentPieces.forEach(p => { if (p.position !== null) board[p.position] = p.player; });
    return WIN_PATTERNS.some(pattern => pattern.every(idx => board[idx] === player));
  };

  const executeMove = (pieceId, index) => {
    let newPieces = pieces.map(p => p.id === pieceId ? { ...p, position: index } : p);
    setPieces(newPieces);
    playSound();

    if (checkWin(newPieces, turn)) {
      setWinner(turn);
      if (onGameOver) onGameOver(turn);
    } else {
      const p1Count = newPieces.filter(p => p.player === 1 && p.position !== null).length;
      const p2Count = newPieces.filter(p => p.player === 2 && p.position !== null).length;
      
      if (phase === 'placement' && p1Count === 3 && p2Count === 3) {
        setPhase('movement');
        setTurn(turn === 1 ? 2 : 1);
      } else {
        setTurn(turn === 1 ? 2 : 1);
      }
    }
  };

  // --- CLICK HANDLER ---
  const handleCellClick = (index) => {
    // 1. Start Trigger Guard: Board is frozen if !isActive
    if (winner || !isActive) return;
    
    // 2. AI Turn Guard: Human cannot move during Player 2's turn in AI mode
    if (gameMode === 'AI' && turn === 2) return; 

    const occupant = pieces.find(p => p.position === index);

    if (phase === 'placement') {
      if (occupant) return; 
      const availablePieces = pieces.filter(p => p.player === turn && p.position === null);
      availablePieces.sort((a, b) => a.benchIndex - b.benchIndex);
      if (availablePieces.length === 0) return;
      executeMove(availablePieces[0].id, index);
    } 
    else if (phase === 'movement') {
      if (occupant) {
        if (occupant.player === turn) {
           setSelectedPieceId(occupant.id); 
        } else {
           triggerShake(occupant.id); 
        }
      }
      else if (!occupant && selectedPieceId) {
        const currentPiece = pieces.find(p => p.id === selectedPieceId);
        if (ADJACENCY[currentPiece.position].includes(index)) {
          executeMove(selectedPieceId, index);
          setSelectedPieceId(null);
        } else {
          triggerShake(selectedPieceId);
        }
      }
    }
  };

  // --- LAYOUT ---
  const getPieceCoordinates = (piece) => {
    const STONE_OFFSET = (UNIT - (UNIT * 0.75)) / 2; 
    
    if (piece.position !== null) {
      // ON BOARD
      const col = piece.position % 3;
      const row = Math.floor(piece.position / 3);
      const startX = isMobile ? 0 : UNIT; 
      const startY = isMobile ? BENCH_BUFFER : 0; 
      return { left: startX + (col * UNIT) + STONE_OFFSET, top: startY + (row * UNIT) + STONE_OFFSET };
    }

    // ON BENCH
    if (isMobile) {
      // Mobile: Player 1 (White/Human) at BOTTOM, Player 2 (Black/AI) at TOP
      const benchY = piece.player === 1 ? (BENCH_BUFFER + BOARD_SIZE + 0) : 0;
      const benchX = (piece.benchIndex * UNIT) + STONE_OFFSET;
      return { left: benchX, top: benchY };
    } else {
      // Desktop: Player 1 Left, Player 2 Right
      const benchX = piece.player === 1 ? 20 : (UNIT * 4) + 20; 
      const benchY = 50 + (piece.benchIndex * (UNIT * 0.8)); 
      return { left: benchX, top: benchY };
    }
  };

  const isMobile = windowWidth < 800 || windowHeight < 600;
  const UNIT = isMobile ? Math.min((windowWidth - 40)/3, 100) : 150; 
  const BOARD_SIZE = UNIT * 3;
  const BENCH_BUFFER = isMobile ? UNIT + 10 : 0; 

  return (
    // 1. WRAPPER
    <div style={{ 
        position: 'absolute', 
        inset: 0, 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: isMobile ? 'flex-start' : 'center', 
        paddingTop: isMobile ? '10px' : '0', 
        overflow: 'hidden', 
        backgroundColor: 'transparent', 
        pointerEvents: 'none', 
        color: '#3e2723', 
        fontFamily: 'Cinzel, serif' 
    }}>
      
      <style>{`.stone-anim { transition: all 0.5s ease; } @keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } 100% { transform: translateX(0); } }`}</style>
      
      {/* 2. GAME CONTAINER */}
      <div style={{ 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: isMobile ? `${BOARD_SIZE}px` : `${UNIT * 5}px`, 
          height: isMobile ? `${BOARD_SIZE + (UNIT * 2.5)}px` : `${BOARD_SIZE}px`, 
          transition: 'all 0.3s ease-in-out',
          pointerEvents: 'auto' 
      }}>
        
        {/* STONE SLAB BACKGROUND */}
        <div style={{
            position: 'absolute',
            width: BOARD_SIZE,
            height: BOARD_SIZE,
            left: isMobile ? 0 : UNIT,
            top: isMobile ? BENCH_BUFFER : 0,
            backgroundColor: 'rgba(235, 230, 225, 0.95)',
            clipPath: 'polygon(3% 0%, 95% 2%, 100% 5%, 98% 95%, 95% 100%, 5% 98%, 0% 95%, 2% 5%)',
            filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.6))', 
            zIndex: 0
        }} />

        {/* GRID LINES */}
        <svg style={{ 
            position: 'absolute', 
            left: isMobile ? 0 : UNIT, 
            top: isMobile ? BENCH_BUFFER : 0, 
            width: BOARD_SIZE, 
            height: BOARD_SIZE, 
            pointerEvents: 'none', 
            zIndex: 1, 
            opacity: 0.9 
        }}>
          <defs><filter id="rough"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" /><feDisplacementMap in="SourceGraphic" scale="4" /></filter></defs>
{/* GRID LINES */}
<svg style={{ 
            position: 'absolute', 
            left: isMobile ? 0 : UNIT, 
            top: isMobile ? BENCH_BUFFER : 0, 
            width: BOARD_SIZE, 
            height: BOARD_SIZE, 
            pointerEvents: 'none', 
            zIndex: 1, 
            opacity: 0.9 
        }}>
          <defs>
            <filter id="rough">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" />
              <feDisplacementMap in="SourceGraphic" scale="4" />
            </filter>
          </defs>
          <g stroke="#3e2723" strokeWidth={isMobile ? "4" : "8"} filter="url(#rough)">
            {/* Vertical lines */}
            <line x1="33.3%" y1="5%" x2="33.3%" y2="95%" /> 
            <line x1="66.6%" y1="5%" x2="66.6%" y2="95%" />
            
            {/* Horizontal lines (Corrected) */}
            <line x1="5%" y1="33.3%" x2="95%" y2="33.3%" /> 
            <line x1="5%" y1="66.6%" x2="95%" y2="66.6%" />
          </g>
        </svg>
        </svg>

        {/* CLICK ZONES */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(3, ${UNIT}px)`, gridTemplateRows: `repeat(3, ${UNIT}px)`, width: BOARD_SIZE, height: BOARD_SIZE, position: 'absolute', left: isMobile ? 0 : UNIT, top: isMobile ? BENCH_BUFFER : 0, zIndex: 10 }}>
          {Array(9).fill(null).map((_, i) => (
            <div key={i} onClick={() => handleCellClick(i)} style={{ width: UNIT, height: UNIT, cursor: isActive ? 'pointer' : 'default' }} />
          ))}
        </div>

        {/* PIECES */}
        {pieces.map((p) => {
          const coords = getPieceCoordinates(p);
          // RULE UPDATE: Player 1 = White, Player 2 = Black
          const stoneImage = p.player === 1 ? ASSETS.whiteStones[p.variant] : ASSETS.blackStones[p.variant];
          
          return (
            <div key={p.id} className="stone-anim" style={{
                position: 'absolute', left: coords.left, top: coords.top, width: UNIT * 0.75, height: UNIT * 0.75,
                zIndex: 20, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: shakingPieceId === p.id ? 'shake 0.4s' : 'none',
                filter: selectedPieceId === p.id ? 'drop-shadow(0 0 10px #d4af37)' : 'drop-shadow(3px 3px 4px rgba(0,0,0,0.6))'
              }}>
              <img src={stoneImage} alt="stone" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TerniLapilli;