import { create } from 'zustand';
import { decryptSaveData } from '../utils/saveCrypto'; // 🔓 Import our decryption tool

// 1. Default UI state
export const defaultGameState = {
  currentRoom: 'LAB',
  office: { centeredItem: 'map', topLetterId: null, journalPage: 1, selectedMapPin: null, mailIndex: 0 },
  lab: { view: 'main', activeStation: null, selectedSlot: 'A', slots: { A: null, B: null, fuel: null, result: null } },
  wunderkammer: { view: 'room', deskCenteredItem: 'map', catalogTopSheet: 0 }
};

// 2. Load initial save data from Local Storage safely
const rawMasterSave = localStorage.getItem('catalyst_autoSave');
const rawGameState = localStorage.getItem('catalyst_gameState');

// 🔓 Decrypt the data (if it exists). If it fails or is empty, fallback to an empty object.
const masterSave = rawMasterSave ? (decryptSaveData(rawMasterSave) || {}) : {};

let initialGameState = defaultGameState;

if (rawGameState) {
  const parsedSave = decryptSaveData(rawGameState);
  
  if (parsedSave) {
    initialGameState = {
      ...defaultGameState,
      ...parsedSave,
      office: { ...defaultGameState.office, ...(parsedSave.office || {}) },
      lab: { ...defaultGameState.lab, ...(parsedSave.lab || {}) },
      wunderkammer: { ...defaultGameState.wunderkammer, ...(parsedSave.wunderkammer || {}) }
    };
  }
}

// 3. Create the Zustand Store
export const useGameStore = create((set) => ({
  // --- STATE ---
  gameState: initialGameState,
  florins: masterSave.florins ?? 0,
  purchasedItems: masterSave.purchasedItems ?? [],
  itemInCrate: masterSave.itemInCrate ?? null,
  currentEra: masterSave.currentEra ?? 0,
  completedCommissions: masterSave.completedCommissions ?? [],
  studyPlacement: masterSave.studyPlacement ?? {},
  inventory: masterSave.inventory ?? { "wood": 5, "ash": 0 },
  unlockedRecipes: masterSave.unlockedRecipes ?? ["hydrogen"],
  labUpgrades: masterSave.labUpgrades ?? { RETORT: false, PLANTER: false },
  godMode: false,

  // UI & SYSTEM STATE
  isMuted: true,
  showSystemMenu: false,
  saveTrigger: 0, 

  // --- ACTIONS (Setters) ---
  setGameState: (updater) => set((state) => ({ gameState: typeof updater === 'function' ? updater(state.gameState) : updater })),
  setFlorins: (updater) => set((state) => ({ florins: typeof updater === 'function' ? updater(state.florins) : updater })),
  setPurchasedItems: (updater) => set((state) => ({ purchasedItems: typeof updater === 'function' ? updater(state.purchasedItems) : updater })),
  setItemInCrate: (updater) => set((state) => ({ itemInCrate: typeof updater === 'function' ? updater(state.itemInCrate) : updater })),
  setCurrentEra: (updater) => set((state) => ({ currentEra: typeof updater === 'function' ? updater(state.currentEra) : updater })),
  setCompletedCommissions: (updater) => set((state) => ({ completedCommissions: typeof updater === 'function' ? updater(state.completedCommissions) : updater })),
  setStudyPlacement: (updater) => set((state) => ({ studyPlacement: typeof updater === 'function' ? updater(state.studyPlacement) : updater })),
  setInventory: (updater) => set((state) => ({ inventory: typeof updater === 'function' ? updater(state.inventory) : updater })),
  setUnlockedRecipes: (updater) => set((state) => ({ unlockedRecipes: typeof updater === 'function' ? updater(state.unlockedRecipes) : updater })),
  setLabUpgrades: (updater) => set((state) => ({ labUpgrades: typeof updater === 'function' ? updater(state.labUpgrades) : updater })),
  setGodMode: (updater) => set((state) => ({ godMode: typeof updater === 'function' ? updater(state.godMode) : updater })),

  // --- CUSTOM ACTIONS ---
  updateRoomState: (roomName, updates) => set((state) => ({
    gameState: {
      ...state.gameState,
      [roomName]: {
        ...state.gameState[roomName],
        ...updates
      }
    }
  })),

  onPurchaseItem: (itemId, price) => set((state) => {
    if (state.florins < price) return state; 
    if (state.purchasedItems.includes(itemId)) return state;

    return {
      florins: state.florins - price,
      purchasedItems: [...state.purchasedItems, itemId],
      itemInCrate: itemId 
    };
  }),

  // UI SYSTEM ACTIONS
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleSystemMenu: () => set((state) => ({ showSystemMenu: !state.showSystemMenu })),
  triggerSave: () => set((state) => ({ saveTrigger: state.saveTrigger + 1 })),
}));