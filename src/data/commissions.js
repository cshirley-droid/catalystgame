// src/data/commissions.js

export const COMMISSIONS = [
  // ==========================================
  // ERA 0: TUTORIAL
  // ==========================================
  {
    id: "cm_salt",
    era: 0,
    year: -6000,
    sender: "Hallstatt Chieftain",
    text: "We have found a way to preserve our meats for the long winter. Extract the white crystals from the sea.",
    req: [{ id: "salt", count: 5 }],
    reward: { florins: 100 }
  },

  // ==========================================
  // ERA 1: THE ANCIENT WORLD
  // ==========================================
  {
    id: "cm_beer",
    era: 1,
    year: -3500,
    sender: "High Priestess of Ninkasi",
    text: "The temple requires the divine drink to honor the goddess. We need lively yeast foam from a grain brew to bring the vessels to life.",
    req: [{ id: "beer", count: 5 }],
    reward: { florins: 350 }
  },
  {
    id: "cm_slaked_lime",
    era: 1,
    year: -3000,
    sender: "Imhotep",
    text: "The Pharaoh's tomb must stand for eternity. I need a lime that has been 'slaked'—drowned in water until it becomes a smooth putty.",
    req: [{ id: "slaked_lime", count: 10 }],
    reward: { florins: 800 }
  },
  {
    id: "cm_enmebaragesi_leather",
    era: 1,
    year: -2600, // Contemporary with Imhotep
    sender: "Lugal of Kish",
    text: "Our sandals rot in the marshes of the Euphrates. We require hides treated with the 'waters of the pot' (ammonia) to strip the hair and fats before the tanning oils are applied.",
    req: [{ id: "leather", count: 15 }],
    reward: { florins: 1200 }
  },
  {
    id: "cm_glass",
    era: 1,
    year: -2500,
    sender: "Mesopotamian Artisan",
    text: "The king desires jewels that capture the light. I require stones of perfect clarity, melted from sand and ash in the hottest furnace.",
    req: [{ id: "soda_lime_glass", count: 10 }],
    reward: { florins: 1500 }
  },
  {
    id: "cm_sargon_bronze",
    era: 1,
    year: -2334, 
    sender: "Sargon of Akkad",
    text: "Our smiths speak of a Sun-Metal. Our current blades are soft. Wed the pale ore of the far hills to the red metal of the pits.",
    req: [{ id: "bronze_ingot", count: 20 }],
    reward: { florins: 2500 }
  },
  // ==========================================
  // ERA 2: THE CLASSICAL WORLD
  // ==========================================  
  {
    id: "cm_concrete",
    era: 2,
    year: -600,
    sender: "Nabatean Engineer",
    text: "The desert is unforgiving. We must build secret cisterns that hold water without leaking.",
    req: [{ id: "concrete", count: 20 }],
    reward: { florins: 1000 }
  },
  {
    id: "cm_compass",
    era: 2,
    year: -100,
    sender: "Shen Kuo",
    text: "The Emperor's armies must navigate the trackless wastes. We need a lodestone needle that always finds the South, floating in a bowl.",
    req: [{ id: "compass", count: 5 }],
    reward: { florins: 800 }
  },
  {
    id: "cm_paper",
    era: 2,
    year: 105,
    sender: "Cai Lun",
    text: "The bamboo scrolls are too heavy for the imperial courts. Press a pulp until it is perfectly flat and dry.",
    req: [{ id: "paper", count: 20 }],
    reward: { florins: 1200 }
  },
  {
    id: "cm_galen_soap",
    era: 2,
    year: 162,
    sender: "Galen",
    text: "The Gauls use these fatty lyes merely to redden their hair, but I find it a superior way to purge the body's largest organ of impurities. Bring me this 'soft salt' of the forest.",
    req: [{ id: "soft_soap", count: 12 }],
    reward: { florins: 450 }
  },
  // =========================
  // ERA 3: THE MEDIEVAL WORLD
  // =========================
  {
    id: "cm_alkindi_spirits",
    era: 3,
    year: 850, 
    sender: "Al-Kindi",
    text: "I seek the 'soul' of the wine—the hidden vapor that rises when the fruit-water is heated but not burned. My patients suffer from wounds that turn black and weep; I have found that this 'fire-water' keeps the flesh sweet and cleanses the physician's tools. Capture this essence for my House of Wisdom.",
    req: [{ id: "ethanol_spirits", count: 8 }],
    reward: { florins: 1800 }
  },
  {
    id: "cm_succotash",
    era: 3,
    year: 1000,
    sender: "Wampanoag Elder",
    text: "The soil provides when respected. Show the young ones how the beans, corn, and squash feed one another when planted together.",
    req: [{ id: "succotash", count: 10 }],
    reward: { florins: 250 }
  },
  {
    id: "cm_bacon_powder",
    era: 3,
    year: 1267,
    sender: "Roger Bacon",
    text: "I have found a mixture that crackles with the spirit of the stars. Grind the yellow sulfur, the black charcoal, and the white 'salt of the rock' into a fine powder.",
    req: [{ id: "gunpowder", count: 20 }],
    reward: { florins: 2500 }
  },

  // =======
  // ERA 4
  // =======
  {
    id: "cm_coal_tar",
    era: 4,
    year: 1681,
    sender: "Johann Joachim Becher",
    text: "There are hidden spirits in the earth's coal! Render the black rock in a retort without air, and bring me the thick pitch it yields.",
    req: [{ id: "coal_tar", count: 3 }],
    reward: { florins: 1200 }
  },
  {
    id: "cm_willow_study",
    era: 4,
    year: 1763,
    sender: "Rev. Edward Stone",
    text: "I have observed that the bark of the willow tree has a bitter taste. I believe it may cure the 'agues' that plague our parish. Provide a concentrated brew.",
    req: [{ id: "pain_tea", count: 5 }],
    reward: { florins: 500 }
  },
  // =============
  // ERA 5
  // =============
  {
    id: "cm_battery",
    era: 5,
    year: 1800,
    sender: "Alessandro Volta",
    text: "I stack discs of copper, zinc, and brine-soaked cloth. A continuous flow of electrical fluid is born! Send me the components to build more.",
    req: [
      { id: "zinc_half_cell", count: 20 },
      { id: "copper_half_cell", count: 20 },
      { id: "salt_bridge", count: 10 }
    ],
    reward: { florins: 18000 }
  },
  {
    id: "cm_opium_isolation",
    era: 5,
    year: 1804,
    sender: "Friedrich Sertürner",
    text: "I am searching for the 'Principium Somniferum'—the sleep-inducing principle. I need the raw extract from the poppies to begin my filtrations.",
    req: [{ id: "raw_opium", count: 4 }],
    reward: { florins: 2000 }
  },
  {
    id: "cm_rubber",
    era: 5,
    year: 1839,
    sender: "Charles Goodyear",
    text: "The natural gum melts in summer and cracks in winter. I must stabilize it! Cook it with brimstone (Sulfur) and intense heat.",
    req: [{ id: "vulcanized_rubber", count: 10 }],
    reward: { florins: 2500 }
  },
  // ======
  // ERA 6
  // ======
  {
    id: "cm_fertilizer",
    era: 4,
    year: 1842,
    sender: "John Bennet Lawes",
    text: "The population grows and the soil starves. We must dissolve phosphate rocks with strong acid to feed the world's crops.",
    req: [{ id: "superphosphate", count: 20 }],
    reward: { florins: 7000 }
  },
  {
    id: "cm_brass_gears",
    era: 4,
    year: 1843,
    sender: "Ada Lovelace",
    text: "Mr. Babbage’s Engine is a symphony of motion, but requires a perfect alloy. Send me brass crafted from copper and zinc.",
    req: [{ id: "brass_ingot_high_zinc", count: 10 }],
    reward: { florins: 12000 }
  },

  // ==========================================
  // ERA 5: MID-CENTURY SCIENCE & STEEL
  // ==========================================
  {
    id: "cm_semmelweis_bleach",
    era: 5,
    year: 1847,
    sender: "Ignaz Semmelweis",
    text: "The doctors carry death on their hands from the morgue to the maternity ward! We need a strong disinfectant immediately.",
    req: [
      { id: "bleach", count: 20 },
    ],
    reward: { florins: 6000 }
  },
  {
    id: "cm_nightingale_soap",
    era: 5,
    year: 1854,
    sender: "Florence Nightingale",
    text: "The sanitation at Scutari is dire! Please send a shipment of hard soap immediately to help preserve the lives of our wounded men.",
    req: [
      { id: "hard_soap", count: 20 }
    ],
    reward: { florins: 6000 }
  },
  {
    id: "cm_steel",
    era: 5,
    year: 1856,
    sender: "Henry Bessemer",
    text: "Puddling iron is too slow. We must blow air directly through the molten pig iron to burn off the impurities and forge pure steel!",
    req: [{ id: "steel_ingot", count: 15 }],
    reward: { florins: 3500 }
  },
  {
    id: "cm_perkin_dye",
    era: 6,
    year: 1856,
    sender: "William Henry Perkin",
    text: "I was trying to synthesize quinine from coal tar, but I found something much more beautiful. Help me produce enough of this 'Mauveine' to dye the Queen's silk.",
    req: [{ id: "synthetic_dye", count: 10 }],
    reward: { florins: 5000 }
  },
  {
    id: "cm_mendel_peas",
    era: 5,
    year: 1856,
    sender: "Gregor Mendel",
    text: "I have noticed that crossing yellow and green peas makes the green vanish! I suspect it is merely 'recessive.' I need hybrid seeds for my trials.",
    req: [{ id: "hybrid_peas", count: 8 }],
    reward: { florins: 1000 }
  },
  {
    id: "cm_morphine",
    era: 5,
    year: 1862,
    sender: "Major Jonathan Letterman",
    text: "The scale of the carnage at Antietam is unimaginable. The amputation saw is cruel. We need the deep sleep of the poppy, purified.",
    req: [{ id: "morphine", count: 5 }],
    reward: { florins: 10000 }
  },

  // ==========================================
  // ERA 6: LATE INDUSTRIAL & SYNTHESIS
  // ==========================================
  {
    id: "cm_tnt",
    era: 6,
    year: 1863,
    sender: "Alfred Nobel",
    text: "Nitroglycerin is too volatile. It claims too many lives. I seek a stable compound to make the mines and tunnels safer.",
    req: [{ id: "tnt", count: 10 }],
    reward: { florins: 4500 }
  },
  {
    id: "cm_bell_insulation",
    era: 6,
    year: 1876,
    sender: "Alexander Graham Bell",
    text: "I am attempting to transmit the human voice over a wire. Gutta-percha is failing me. I need durable casings to insulate the electrical flow.",
    req: [
      { id: "vulcanized_rubber", count: 50 },
      { id: "bakelite_casing", count: 10 }
    ],
    reward: { florins: 15000 }
  },
  {
    id: "cm_lightbulb",
    era: 6,
    year: 1879,
    sender: "Thomas Edison",
    text: "I have found 10,000 ways that won't work. Now I need carbon filaments encased in a vacuum of glass to hold the light.",
    req: [{ id: "lightbulb", count: 20 }],
    reward: { florins: 20000 }
  },
  {
    id: "cm_aspirin",
    era: 6,
    year: 1897,
    sender: "Felix Hoffmann",
    text: "My father suffers rheumatism. Willow tea is too rough on his stomach. Synthesize the stable acetylated acid.",
    req: [{ id: "aspirin", count: 20 }],
    reward: { florins: 8500 }
  },

  // ==========================================
  // ERA 7: THE MODERN AGE
  // ==========================================
  {
    id: "cm_wright_fuel",
    era: 7,
    year: 1903,
    sender: "The Wright Brothers",
    text: "The Flyer's engine is built, but it needs a fuel that burns exceptionally clean and hot to lift us from the dunes of Kitty Hawk.",
    req: [{ id: "ethanol_spirits", count: 50 }],
    reward: { florins: 3000 }
  },
  {
    id: "cm_silicon_purity",
    era: 7,
    year: 1947,
    sender: "William Shockley",
    text: "Vacuum tubes are too fragile. I need silicon reduced from the finest sand—pure and crystalline—to see if it can conduct as a 'solid-state' valve.",
    req: [{ id: "silicon", count: 2 }],
    reward: { florins: 5000 }
  },
  {
    id: "cm_microchip",
    era: 7,
    year: 1958,
    sender: "Robert Noyce",
    text: "Wiring individual transistors is the bottleneck of modern computing. We must etch the entire circuit onto a single monolithic block of silicon.",
    req: [{ id: "microchip", count: 10 }],
    reward: { florins: 25000 }
  }
];