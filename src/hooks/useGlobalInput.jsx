// src/hooks/useGlobalInput.jsx
import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { SPATIAL_ORDER, STATION_BASE_INFO } from '../components/lab/labConfig'; 
import { WK_SPATIAL_ORDER } from '../components/wk/wkConfig';

// ✨ FIX: Added curly braces for proper object destructuring
export const useGlobalInput = ({ onGodMode }) => {
  
  // ✨ FIX: Use a ref to prevent stale closures on the God Mode function
  const onGodModeRef = useRef(onGodMode);
  useEffect(() => {
    onGodModeRef.current = onGodMode;
  }, [onGodMode]);

  useEffect(() => {
    let keyBuffer = ''; 
    const CHEAT_CODE = 'curie';

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.repeat) return;

      const key = e.key.toLowerCase();

      // ------------------------------------------
      // CHEAT CODE LOGIC
      // ------------------------------------------
      keyBuffer += key;
      
      if (keyBuffer.length > CHEAT_CODE.length) {
        keyBuffer = keyBuffer.slice(-CHEAT_CODE.length);
      }
      
      if (keyBuffer === CHEAT_CODE) {
        // ✨ FIX: Call the ref's current value
        if (onGodModeRef.current) onGodModeRef.current();
        keyBuffer = ''; 
        return;         
      }
      // ------------------------------------------

      const state = useGameStore.getState();
      const {
        gameState,
        setGameState,
        updateRoomState,
        toggleSystemMenu, 
        toggleMute,
        triggerSave, 
      } = state;

      const currentRoom = gameState.currentRoom;
      const labState = gameState.lab || {};
      const activeView = labState.view || 'main'; 
      const activeStationId = labState.activeStation || 'KILN';
      const selectedSlot = labState.selectedSlot || 'A';

      // ==========================================
      // GLOBAL HOTKEYS
      // ==========================================
      if (key === 'k') { if (triggerSave) triggerSave(); return; }
      if (key === 'm') { if (toggleMute) toggleMute(); return; }
      
      if (key === 'tab') {
        e.preventDefault();
        setGameState(prev => ({ ...prev, inventoryCommand: e.shiftKey ? 'prev' : 'next' }));
        return;
      }

      if (key === '1') {
        e.preventDefault();
        setGameState(prev => ({ 
          ...prev, 
          currentRoom: 'LAB', 
          labCameraCommand: null,
          lab: { ...(prev.lab || {}), view: 'main' }
        }));
        return;
      }
      if (key === '2') {
        e.preventDefault();
        setGameState(prev => ({ ...prev, currentRoom: 'WUNDERKAMMER', labCameraCommand: null }));
        return;
      }


      // ==========================================
      // WUNDERKAMMER STATE
      // ==========================================
      if (currentRoom === 'WUNDERKAMMER') {
        const wkState = gameState.wunderkammer || {};
        const wkActiveView = wkState.view || 'main';
        const wkActiveStation = wkState.activeStation || WK_SPATIAL_ORDER[0] || 'DESK';

        // --- DESK (Zoomed View) ---
        if (wkActiveView === 'desk') {
          if (key === 'escape' || key === 's') {
            e.preventDefault();
            updateRoomState('wunderkammer', { view: 'main' });
          }
          return; 
        }

        // --- MAIN VIEW ---
        if (key === 'escape' || key === 's') {
          e.preventDefault();
          setGameState(prev => ({ ...prev, currentRoom: 'LAB' }));
          return; 
        }

        // --- WASD Navigation ---
        if (['w', 'a', 'd'].includes(key)) {
          e.preventDefault();
        }

        if (key === 'a' || key === 'd') {
            const len = WK_SPATIAL_ORDER.length;
            
            const safeCurrentStation = String(wkActiveStation).toUpperCase().trim();
            let currentIndex = Math.max(0, WK_SPATIAL_ORDER.findIndex(
                station => String(station).toUpperCase().trim() === safeCurrentStation
            ));
            
            currentIndex = key === 'a' ? (currentIndex - 1 + len) % len : (currentIndex + 1) % len;
            updateRoomState('wunderkammer', { activeStation: WK_SPATIAL_ORDER[currentIndex] });
            
        } else if (key === 'w') {
          const safeStation = String(wkActiveStation).toUpperCase().trim(); 
          
          if (safeStation === 'DESK') {
            updateRoomState('wunderkammer', { view: 'desk', activeStation: 'DESK' });
          } else if (safeStation === 'DOOR') {
            setGameState(prev => ({ ...prev, currentRoom: 'LAB' }));
          }
        }
        return;
      }

      // ==========================================
      // LAB STATE
      // ==========================================
      if (currentRoom === 'LAB') {

        if (key === 'escape' || key === 's') {
          e.preventDefault();

          if (activeView === 'popup' || activeView === 'station') {
            updateRoomState('office', { activeItem: null });
            updateRoomState('lab', { view: 'main' });
          } else if (activeView === 'main') {
            if (key === 'escape') {
              if (toggleSystemMenu) toggleSystemMenu();
            } else if (key === 's') {
              const stationInfo = STATION_BASE_INFO[activeStationId] || {};
              if (stationInfo.uiType === 'NAV' && activeStationId === 'SYSTEM') {
                if (toggleSystemMenu) toggleSystemMenu();
              }
            }
          }
          return;
        }

        // --- POPUP VIEW ---
        if (activeView === 'popup') {
          if (key === ' ') {
            e.preventDefault(); 
            const deskItems = ['MAP', 'JOURNAL', 'MAIL'];
            if (deskItems.includes(activeStationId)) {
              const currentIndex = deskItems.indexOf(activeStationId);
              const nextIndex = (currentIndex + 1) % deskItems.length;
              updateRoomState('lab', { activeStation: deskItems[nextIndex], view: 'popup' });
            }
            return;
          }
          
          const shortcutMap = { h: 'MAP', j: 'JOURNAL', l: 'MAIL' };
          if (['h', 'j', 'l'].includes(key)) {
            const targetStation = shortcutMap[key];
            if (activeStationId === targetStation) {
               updateRoomState('lab', { view: 'main' }); 
            } else {
               updateRoomState('lab', { activeStation: targetStation, view: 'popup' });
            }
          }
          return; 
        }

        // --- ZOOMED STATION VIEW ---
        if (activeView === 'station') {
          const needsFuel = ['RETORT', 'POT', 'KILN'].includes(activeStationId);
          const availableSlots = needsFuel ? ['A', 'B', 'fuel', 'process'] : ['A', 'B', 'process'];
          const currentSlotIdx = Math.max(0, availableSlots.indexOf(selectedSlot));

          if (key === 'a') {
            updateRoomState('lab', { selectedSlot: availableSlots[Math.max(0, currentSlotIdx - 1)] });
          } else if (key === 'd') {
            updateRoomState('lab', { selectedSlot: availableSlots[Math.min(availableSlots.length - 1, currentSlotIdx + 1)] });
          } else if (key === 'w') {
            setGameState(prev => ({ ...prev, labStationCommand: 'process' })); 
          }
          return; 
        }

        // --- MAIN VIEW ---
        if (activeView === 'main') {
          if (['w', 'a', 'd', ' '].includes(key) || !isNaN(key)) {
            e.preventDefault(); 
          }

          const shortcutMap = { h: 'MAP', j: 'JOURNAL', l: 'MAIL' };
          if (['h', 'j', 'l'].includes(key)) {
            updateRoomState('office', { activeItem: shortcutMap[key] });
            updateRoomState('lab', { activeStation: shortcutMap[key], view: 'popup' });
            return;
          }

          if (key === ' ') {
             setGameState(prev => ({ ...prev, labCameraCommand: 'CENTER' }));
             return;
          }

          const len = SPATIAL_ORDER.length;
          let currentIndex = Math.max(0, SPATIAL_ORDER.indexOf(activeStationId));
          const stationInfo = STATION_BASE_INFO[activeStationId] || {};

          if (key === 'a' || key === 'd') {
            setGameState(prev => ({ ...prev, labCameraCommand: null })); 
            currentIndex = key === 'a' ? (currentIndex - 1 + len) % len : (currentIndex + 1) % len;
            updateRoomState('lab', { activeStation: SPATIAL_ORDER[currentIndex] }); 
          } 
          else if (key === 'w') {
            setGameState(prev => ({ ...prev, labCameraCommand: null }));
            
            if (stationInfo.uiType === 'NAV') {
              if (activeStationId === 'SYSTEM') {
                if (toggleSystemMenu) toggleSystemMenu();
              } else if (stationInfo.targetRoom) {
                setGameState(prev => ({ ...prev, currentRoom: stationInfo.targetRoom }));
              }
            } else if (stationInfo.uiType === 'POPUP') {
              updateRoomState('lab', { view: 'popup' });
            } else if (stationInfo.uiType === 'STATION') {
              updateRoomState('lab', { view: 'station', selectedSlot: 'A' });   
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); 
};