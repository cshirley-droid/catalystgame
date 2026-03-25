// src/hooks/useGameMechanics.js
import { useGameStore } from '../store/useGameStore';
import { AudioSystem } from '../systems/AudioSystem';
import { ITEMS } from '../data/items';
import { RECIPES } from '../data/recipes';
import { COMMISSIONS } from '../data/commissions';

// --- CONSTANTS ---
const FUEL_POWER = { "wood": 1, "charcoal": 2, "coal": 3, "coke": 3 };
const FUEL_HINTS = { 1: "Wood", 2: "Charcoal", 3: "Coal or Coke" };

export const useGameMechanics = (showToast, updateRoomState) => {
  // --- ZUSTAND STORE SELECTORS ---
  const gameState = useGameStore(state => state.gameState);
  const florins = useGameStore(state => state.florins);
  const setFlorins = useGameStore(state => state.setFlorins);
  const purchasedItems = useGameStore(state => state.purchasedItems);
  const setPurchasedItems = useGameStore(state => state.setPurchasedItems);
  const itemInCrate = useGameStore(state => state.itemInCrate);
  const setItemInCrate = useGameStore(state => state.setItemInCrate);
  const currentEra = useGameStore(state => state.currentEra);
  const setCurrentEra = useGameStore(state => state.setCurrentEra);
  const completedCommissions = useGameStore(state => state.completedCommissions);
  const setCompletedCommissions = useGameStore(state => state.setCompletedCommissions);
  const inventory = useGameStore(state => state.inventory);
  const setInventory = useGameStore(state => state.setInventory);
  const unlockedRecipes = useGameStore(state => state.unlockedRecipes);
  const setUnlockedRecipes = useGameStore(state => state.setUnlockedRecipes);
  const labUpgrades = useGameStore(state => state.labUpgrades);
  const setLabUpgrades = useGameStore(state => state.setLabUpgrades);

  // --- GAMEPLAY LOGIC ---
  const handlePurchaseItem = (itemId, price) => {
    if (itemInCrate) {
      showToast("The delivery crate is full! Unpack your last purchase in the Wunderkammer first.");
      return;
    }
    if (florins >= price && !purchasedItems.includes(itemId)) {
      setFlorins(prev => prev - price);
      setPurchasedItems(prev => [...prev, itemId]);
      setItemInCrate(itemId);
      AudioSystem.playSFX('coin_jingle');
    }
  };

  const handleHarvest = (itemId) => {
    AudioSystem.playSFX('harvest');
    setInventory(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const handleStationClick = (stationId) => {
    updateRoomState('lab', {
      view: 'station',
      activeStation: stationId,
      slots: { A: null, B: null, fuel: null, result: null },
      selectedSlot: 'A'
    });
    AudioSystem.playSFX('click');
  };

  const handleSlotClick = (slotKey) => {
    const currentSlots = gameState.lab.slots;
    if (currentSlots[slotKey]) {
      updateRoomState('lab', { slots: { ...currentSlots, [slotKey]: null } });
      AudioSystem.playSFX('click'); 
    }
    updateRoomState('lab', { selectedSlot: slotKey });
    if (!currentSlots[slotKey]) AudioSystem.playSFX('click');
  };

  const handleInventoryClick = (itemId) => {
    const { activeStation, selectedSlot, slots: currentSlots } = gameState.lab;
    if (!activeStation || !selectedSlot) return; 
    
    const itemObj = ITEMS[itemId];
    if (!itemObj || (inventory[itemId] || 0) <= 0) return;

    updateRoomState('lab', { slots: { ...currentSlots, [selectedSlot]: itemObj } });
    AudioSystem.playSFX('click');
    
    if (selectedSlot === 'A') updateRoomState('lab', { selectedSlot: 'B' });
    else if (selectedSlot === 'B') updateRoomState('lab', { selectedSlot: 'fuel' });
    else if (selectedSlot === 'fuel') updateRoomState('lab', { selectedSlot: null }); 
  };

  const handleProcess = () => {
    const { activeStation, slots } = gameState.lab;
    
    const inputIds = [slots.A?.id, slots.B?.id].filter(Boolean);
    let batchMultiplier = 1; 
    
    let recipe = RECIPES.find(r => {
      if (!r || !r.inputs || r.station !== activeStation || r.inputs.length !== inputIds.length) return false;
      return JSON.stringify(r.inputs.map(i => i.id).sort()) === JSON.stringify([...inputIds].sort());
    });

    if (!recipe && inputIds.length === 2 && inputIds[0] === inputIds[1]) {
      recipe = RECIPES.find(r => r.station === activeStation && r.inputs.length === 1 && r.inputs[0].id === inputIds[0]);
      if (recipe) batchMultiplier = 2;
    }

    if (!recipe) {
      showToast("Reaction Failed: No recipe matches these ingredients.");
      AudioSystem.playSFX('error');
      return;
    }

    for (const id of inputIds) {
      if ((inventory[id] || 0) <= 0) {
        showToast(`Reaction Failed: You are out of ingredients!`);
        AudioSystem.playSFX('error');
        return;
      }
    }

    if (recipe.heatLevel > 0) {
      const fuelItem = slots.fuel;
      if (!fuelItem) { showToast("Reaction Failed: This process requires fuel!"); return; }
      
      const currentHeat = FUEL_POWER[fuelItem.id] || 0;
      if (currentHeat < recipe.heatLevel) {
        showToast(`Not hot enough! Try using ${FUEL_HINTS[recipe.heatLevel]}.`);
        return;
      }

      if ((inventory[fuelItem.id] || 0) <= 0) { showToast("Reaction Failed: Out of fuel!"); return; }
      const ingredientCount = inputIds.filter(id => id === fuelItem.id).length;
      if ((inventory[fuelItem.id] || 0) < ingredientCount + 1) {
         showToast(`Reaction Failed: Not enough ${fuelItem.name} for both input and fuel!`);
         return;
      }
    }

    const newInventory = { ...inventory };
    inputIds.forEach(id => { newInventory[id] = Math.max(0, newInventory[id] - 1); });
    if (recipe.heatLevel > 0 && slots.fuel) {
      newInventory[slots.fuel.id] = Math.max(0, newInventory[slots.fuel.id] - 1);
    }
    
    const productID = recipe.output;
    const yieldCount = recipe.yield || 1; 
    const inputNames = [slots.A?.name, slots.B?.name].filter(Boolean).join(" + ");
    const stationFormatted = activeStation.charAt(0) + activeStation.slice(1).toLowerCase();
    
    showToast(`${inputNames} → ${stationFormatted} → ${ITEMS[productID].name}!`, 'success');
    newInventory[productID] = (newInventory[productID] || 0) + (yieldCount * batchMultiplier);

    setInventory(newInventory);
    
    const nextSlots = { ...slots, result: ITEMS[productID] };
    if (slots.A && newInventory[slots.A.id] <= 0) nextSlots.A = null;
    if (slots.B && newInventory[slots.B.id] <= 0) nextSlots.B = null;
    if (slots.fuel && newInventory[slots.fuel.id] <= 0) nextSlots.fuel = null;
    
    updateRoomState('lab', { slots: nextSlots });
    
    AudioSystem.playSFX('success');
    if (!unlockedRecipes.includes(recipe.id)) setUnlockedRecipes(prev => [...prev, recipe.id]);
  };

  const handleCompleteCommission = (commissionId) => {
    const comm = COMMISSIONS.find(c => c.id === commissionId);
    if (!comm) return;

    for (const r of comm.req) {
      if ((inventory[r.id] || 0) < r.count) {
        showToast("Insufficient items.");
        AudioSystem.playSFX('error');
        return;
      }
    }

    const newInv = { ...inventory };
    comm.req.forEach(r => newInv[r.id] -= r.count);
    setInventory(newInv);
    setFlorins(prev => prev + comm.reward.florins);
    
    const newCompleted = [...completedCommissions, commissionId];
    setCompletedCommissions(newCompleted);
    showToast(`Order Delivered! Earned ${comm.reward.florins} Florins.`);
    AudioSystem.playSFX('success');

    const eraCommissions = COMMISSIONS.filter(c => c.era === currentEra);
    if (eraCommissions.every(c => newCompleted.includes(c.id))) {
      if (currentEra < 7) {
        const nextEra = currentEra + 1;
        setCurrentEra(nextEra);
        showToast(nextEra === 7 ? "THE DIGITAL DAWN: Era 7 Unlocked!" : `ERA ${nextEra} UNLOCKED! New letters arrived.`);
        AudioSystem.playSFX('success_long');
      } else if (currentEra === 7) {
        showToast("ALL ERAS COMPLETE! YOU HAVE MASTERED NATURE.");
      }
    }
  };

  const handleRepairStation = (stationId) => {
    const repairCosts = { RETORT: { id: 'glass', count: 1, name: 'Glass' }, PLANTER: { id: 'wood', count: 5, name: 'Wood' } };
    const cost = repairCosts[stationId];
    if (!cost) return; 

    if ((inventory[cost.id] || 0) < cost.count) {
      showToast(`Construction Failed: You need ${cost.count} ${cost.name} to build this.`);
      AudioSystem.playSFX('error');
      return;
    }
    
    setInventory(prev => ({ ...prev, [cost.id]: prev[cost.id] - cost.count }));
    setLabUpgrades(prev => ({ ...prev, [stationId]: true }));
    
    updateRoomState('lab', { slots: { A: null, B: null, fuel: null, result: null } });
    
    showToast(`${stationId === 'PLANTER' ? 'Planter Built' : 'Retort Repaired'}!`);
    AudioSystem.playSFX('success');
  };

  return {
    handlePurchaseItem,
    handleHarvest,
    handleStationClick,
    handleSlotClick,
    handleInventoryClick,
    handleProcess,
    handleCompleteCommission,
    handleRepairStation
  };
};