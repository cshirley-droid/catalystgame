import { useEffect } from 'react';
import { encryptSaveData } from '../utils/saveCrypto'; // <-- Import our new tool

export const useAutoSave = ({
  gameState, florins, purchasedItems, itemInCrate, 
  currentEra, completedCommissions, studyPlacement, 
  inventory, unlockedRecipes, labUpgrades
}) => {
  
  // 1. Save the core game data
  useEffect(() => {
    const autoSaveData = {
      florins, purchasedItems, itemInCrate, currentEra,
      completedCommissions, studyPlacement, inventory,
      unlockedRecipes, labUpgrades
    };
    
    // Encrypt the data before saving
    const encryptedData = encryptSaveData(autoSaveData);
    if (encryptedData) {
      localStorage.setItem('catalyst_autoSave', encryptedData);
    }
  }, [florins, purchasedItems, itemInCrate, currentEra, completedCommissions, studyPlacement, inventory, unlockedRecipes, labUpgrades]);

  // 2. Save the UI/Immersion state
  useEffect(() => {
    // Encrypt the game state before saving
    const encryptedGameState = encryptSaveData(gameState);
    if (encryptedGameState) {
      localStorage.setItem('catalyst_gameState', encryptedGameState);
    }
  }, [gameState]);

};