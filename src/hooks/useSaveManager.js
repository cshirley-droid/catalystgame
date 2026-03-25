import { encryptSaveData, decryptSaveData } from '../utils/saveCrypto';

export const useSaveManager = ({
  // The state we need to read (to SAVE)
  inventory, unlockedRecipes, labUpgrades, currentEra, florins, 
  completedCommissions, purchasedItems, studyPlacement, gameState,
  
  // The functions we need to update state (to LOAD and RESET)
  setInventory, setUnlockedRecipes, setLabUpgrades, setCurrentEra, 
  setFlorins, setCompletedCommissions, setPurchasedItems, setStudyPlacement, 
  setGameState, setItemInCrate, setShowSystemMenu, setGodMode, showToast,
  
  // The blueprint to reset to
  defaultGameState
}) => {

  const handleExportSave = () => {
    const saveData = { 
      version: "1.4", 
      timestamp: Date.now(), 
      inventory, unlockedRecipes, 
      labUpgrades, currentEra, florins, completedCommissions, purchasedItems, 
      studyPlacement, gameState 
    };

    // 🔒 1. ENCRYPT the data before turning it into a file
    const encryptedData = encryptSaveData(saveData);
    
    if (!encryptedData) {
      showToast("Error creating save file.", "error");
      return;
    }

    // We save it as a text file now, so if they open it in Notepad, it's just a wall of gibberish!
    const blob = new Blob([encryptedData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // Changing the extension to .txt (or .sav) is common for encrypted saves
    link.download = `catalyst_save_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowSystemMenu(false);
  };

  const handleImportSave = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // 🔓 2. DECRYPT the uploaded file data
        const data = decryptSaveData(e.target.result);

        // If data is null, the decryption failed (they tried to tamper with it!)
        if (!data) {
          showToast("Error: Save file is corrupted or tampered with.");
          return;
        }

        if (data.inventory && data.unlockedRecipes) {
          setInventory(data.inventory);
          setUnlockedRecipes(data.unlockedRecipes);
          setLabUpgrades(data.labUpgrades || { RETORT: false, PLANTER: false }); 
          setCurrentEra(data.currentEra || 0);
          setFlorins(data.florins || 0); 
          setCompletedCommissions(data.completedCommissions || []);
          setPurchasedItems(data.purchasedItems || []);
          setStudyPlacement(data.studyPlacement || {});
          
          if (data.gameState) {
            setGameState({
              ...defaultGameState,
              ...data.gameState,
              office: { ...defaultGameState.office, ...(data.gameState.office || {}) },
              lab: { ...defaultGameState.lab, ...(data.gameState.lab || {}) },
              wunderkammer: { ...defaultGameState.wunderkammer, ...(data.gameState.wunderkammer || {}) }
            });
          } else {
            // Fallback for older save files
            setGameState({
              ...defaultGameState,
              currentRoom: data.catalystView || 'DESK',
              wunderkammer: {
                ...defaultGameState.wunderkammer,
                deskCenteredItem: data.WkDeskScreen || 'map' 
              }
            });
          }
          showToast("Archive retrieved successfully.");
          setShowSystemMenu(false);
        } else { 
          showToast("Error: Invalid archive format."); 
        }
      } catch (err) { 
        showToast("Error reading file."); 
      }
    };
    reader.readAsText(file);
  };

  const handleHardReset = () => {
    setInventory({ "wood": 5 });
    setUnlockedRecipes([]);
    setLabUpgrades({ RETORT: false, PLANTER: false });
    setFlorins(0); 
    setCompletedCommissions([]);
    setPurchasedItems([]); 
    setStudyPlacement({});
    setCurrentEra(0);
    setItemInCrate(null);
    setGameState(defaultGameState);
    setShowSystemMenu(false);
    setGodMode(false);
    showToast("Tabula Rasa.");
  };

  return { handleExportSave, handleImportSave, handleHardReset };
};