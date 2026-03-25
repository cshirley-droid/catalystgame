// src/components/lab/labConfig.js
import { useTexture } from '@react-three/drei';

export const REPAIR_REQ = {
  PLANTER: { text: "Wood", count: 5 }
};

// Format: [ x, y, z, rotationY, width, height (optional) ]
export const STATION_POSITIONS = {
  // --- BACK WALL ---
  TABLE:        [  -4, -4.5, -7,   30 * (Math.PI / 180), 14, 5 ],
  BOWL:         [  -6.8, -3, -5,   30 * (Math.PI / 180), 2 ],
  MILL:         [  -4, -2.6, -6,   30 * (Math.PI / 180), 1.5 ],
  ELECTROLYSIS: [  -2, -2.2, -6,   30 * (Math.PI / 180), 1.5 ],

  DESK:         [ -7, -4, 6, -220 * (Math.PI / 180), 6, 4 ],

  // --- RIGHT WALL ---
  KILN:         [ 3, -3.3,  -9, 0 * (Math.PI / 180), 7 ],
  SYSTEM:       [ 6.5,   4,    8, 94 * (Math.PI / 180), 1.5 ], // Added above the door!
  
  // --- FRONT WALL ---
  ATHANOR:      [   2, -2.7,   8.5, 185 * (Math.PI / 180), 5, 5 ],
  POT:          [  3, -1.6,  8, 180 * (Math.PI / 180), 2 ],
  RETORT:       [1, -1.5,  8, 180 * (Math.PI / 180), 1.5 ],

  // --- LEFT WALL ---
  DOOR:         [ -9.2,  -1,    0.5, 94 * (Math.PI / 180), 6, 9 ],

  // --- FLOOR ITEMS ---
  VAT:          [   9, -3.5,   4, -195 * (Math.PI / 180), 3 ], 
  PLANTER:      [   6.5, -2.4,   0, 270 * (Math.PI / 180), 2.5 ], 

  // --- DESK ITEMS ---
  // We flip the Map 180 degrees so it's perfectly right-side up
  MAP:          [ -5.5, -1.1, 7, 180 * (Math.PI / 180), 3, 2.24 ],
  
  // We flip the Journal 170 degrees so it rests at a slight, natural tilt
  JOURNAL:      [ -5.5, -2, 5, 170 * (Math.PI / 180), 1, 1.3 ],
  
  // We flip the Mail 195 degrees so it tilts slightly the other way
  MAIL:         [ -7, -2, 5, 195 * (Math.PI / 180), 1, 1.3 ],
};

export const STATION_COLORS = {
  KILN:         '#ff4500', 
  POT:          '#8b4513', 
  RETORT:       '#add8e6', 
  PLANTER:      '#228b22', 
  VAT:          '#800080', 
  BOWL:         '#deb887', 
  MILL:         '#a9a9a9', 
  ELECTROLYSIS: '#00ffff'  
};

export const STATION_BASE_INFO = {
  RETORT: { 
    title: "Retort", 
    img: 'assets/lab/alembic.png', 
    theme: 'retort', 
    isBillboard: true,
    uiType: 'STATION',
    cameraBehavior: 'ZOOM'
  },
  POT: { 
    title: "Pot", 
    img: '/assets/lab/pot.png', 
    theme: 'pot', 
    isBillboard: true,
    uiType: 'STATION',
    cameraBehavior: 'ZOOM'
  },
  BOWL: { 
    title: "Bowl", 
    img: '/assets/lab/bowl.png', 
    theme: 'bowl', 
    isBillboard: true,
    uiType: 'STATION',
    cameraBehavior: 'ZOOM'
  },
  MILL: { 
    era1: { 
      title: "Mill", 
      img: '/assets/lab/stone_quern.png', 
      processName: "Grind", 
      theme: 'mill', 
      isBillboard: true 
    },
    era2_plus: { 
      title: "Press", 
      img: '/assets/lab/handscrewpress.png', 
      processName: "Press", 
      theme: 'mill', 
      isBillboard: true 
    },
    uiType: 'STATION',
    cameraBehavior: 'ZOOM'
  },
  VAT: { 
    title: "Vat", 
    img: '/assets/lab/vat.png', 
    theme: 'vat', 
    isBillboard: true,
    uiType: 'STATION',
    cameraBehavior: 'ZOOM'
  },
  KILN: { 
    title: "Kiln", 
    img: '/assets/lab/kiln.png', 
    theme: 'kiln',
    uiType: 'STATION',
    cameraBehavior: 'ZOOM'
  },
  PLANTER: { 
    title: "Planter", 
    img: '/assets/lab/planter.png', 
    theme: 'planter', 
    isBillboard: true,
    uiType: 'STATION',
    cameraBehavior: 'ZOOM'
  },
  ELECTROLYSIS: { 
    title: "Electrolysis", 
    img: '/assets/lab/electrolysis.png', 
    theme: 'electrolysis', 
    isBillboard: true,
    uiType: 'STATION',
    cameraBehavior: 'ZOOM'
  },
  ATHANOR: { 
    title: "Athanor", 
    img: '/assets/lab/athanor.png', 
    theme: 'athanor',
    isInteractive: false,        
  },
  TABLE: { 
    title: "Table", 
    img: '/assets/lab/table.png', 
    theme: 'table',
    isInteractive: false,    
  },
  DOOR: { 
    title: "Door", 
    img: '/assets/lab/door.png', 
    theme: 'door',
    uiType: 'NAV', 
    cameraBehavior: 'STATIC',
    // --- NEW ROUTING DATA ---
    targetRoom: 'WUNDERKAMMER',       
  },
  DESK: { 
    title: "Desk", 
    img: '/assets/lab/desk.png', 
    theme: 'desk',
    isInteractive: false 
  },

  // --- NEW UNIFIED DESK ITEMS ---
  MAP: {
    title: "Map",
    img: '/assets/lab/map_background.webp',
    isBillboard: true,
    uiType: 'POPUP',
    cameraBehavior: 'STATIC'
  },
  JOURNAL: {
    title: "Journal",
    img: '/assets/lab/journal.png', 
    isBillboard: true,
    uiType: 'POPUP',
    cameraBehavior: 'STATIC'
  },
  MAIL: {
    title: "Mail",
    img: 'https://placehold.co/240x160/f4f4ece/555?text=Letters', 
    isBillboard: true,
    uiType: 'POPUP',
    cameraBehavior: 'STATIC'
  },
  SYSTEM: {
    title: "System Menu",
    img: '/assets/lab/ouroboros.png',
    isBillboard: true,
    uiType: 'NAV', 
    cameraBehavior: 'STATIC'
  },
};

export const SPATIAL_ORDER = [
  'DOOR',         // Left Wall
  'BOWL',         // Back Wall (Rightish)
  'MILL',         // Back Wall (Center)
  'ELECTROLYSIS', // Back Wall (Left)
  'KILN',         // Right Wall
  'PLANTER',      // Floor (Right)
  'VAT',          // Floor (Left)
  'SYSTEM',       // System Menu
  'POT',          // Floor (Front Wall)
  'RETORT',       // Front Wall
  'MAP',          // Desk
  'JOURNAL',      // Desk
  'MAIL',         // Desk
];

// Preload all textures defined in STATION_BASE_INFO
Object.values(STATION_BASE_INFO).forEach(info => {
  if (info.img) useTexture.preload(info.img);
  if (info.era1) useTexture.preload(info.era1.img);
  if (info.era2_plus) useTexture.preload(info.era2_plus.img);
});

export const getStationDefinition = (stationId, currentEra) => {
    // Safety check so we don't crash if an invalid ID is passed
    if (!STATION_BASE_INFO[stationId]) return null;
    
    if (stationId !== 'MILL') return { id: stationId, ...STATION_BASE_INFO[stationId] };
    
    // Merge the base info with the era-specific info for the mill
    const baseInfo = { ...STATION_BASE_INFO[stationId] };
    const eraInfo = baseInfo[currentEra >= 2 ? 'era2_plus' : 'era1'];
    return { id: stationId, ...baseInfo, ...eraInfo };
};