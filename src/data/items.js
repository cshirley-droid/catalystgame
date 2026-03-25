// src/data/items.js

export const ITEMS = {
  // ============================================
  // RAW MATERIALS (By Biome)
  // ============================================

  // --- FOREST ---
  berries: { id: "berries", name: "Wild Berries", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/berries.png?raw=true", desc: "Sugar source." },
  goatgrass: { id: "goatgrass", name: "Goatgrass", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/goatgrass_small.png?raw=true", desc: "Hardy weed." },
  latex_sap: { id: "latex_sap", name: "Latex Sap", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/sap.png?raw=true", desc: "Raw rubber." },
  wild_emmer: { id: "wild_emmer", name: "Wild Emmer", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/emmer_wheat.png?raw=true", desc: "Wheat ancestor." },
  wild_peas: { id: "wild_peas", name: "Wild Peas", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/wild_peas_small.png?raw=true", desc: "Genetic stock." },
  wild_poppy: { id: "wild_poppy", name: "Wild Poppy", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/poppy.png?raw=true", desc: "Medicinal base." },
  willow_bark: { id: "willow_bark", name: "Willow Bark", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/willow_bark.png?raw=true", desc: "Contains Salicin." },
  wood: { id: "wood", name: "Wood", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/wood.png?raw=true", desc: "Cellulose fuel." },
  yellow_peas: { id: "yellow_peas", name: "Yellow Peas", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/pea.png?raw=true", desc: "Recessive trait." },

  // --- FARM ---
  animal_fat: { id: "animal_fat", name: "Animal Fat", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/fat.png?raw=true", desc: "Tallow." },
  beans: { id: "beans", name: "Beans", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/beans.png?raw=true", desc: "Nitrogen fixer." },
  clay: { id: "clay", name: "Clay", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/clay.png?raw=true", desc: "River mud." },
  corn: { id: "corn", name: "Corn", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/corn.png?raw=true", desc: "Starch crop." },
  hide: { id: "hide", name: "Animal Hide", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/hide.png?raw=true", desc: "Raw leather." },
  manure: { id: "manure", name: "Manure", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/manure.png?raw=true", desc: "Nitrates." },
  soil: { id: "soil", name: "Soil", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/soil_small.png?raw=true", desc: "Rich earth." },
  squash: { id: "squash", name: "Squash", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/squash.png?raw=true", desc: "Hardy gourd." },
  urine: { id: "urine", name: "Urine", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/urine.png?raw=true", desc: "Source of Urea." },
  water: { id: "water", name: "Water", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/water.png?raw=true", desc: "Well water." },

  // --- COAST ---
  kelp: { id: "kelp", name: "Kelp", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/kelp.png?raw=true", desc: "Source of Soda Ash." },
  limestone: { id: "limestone", name: "Limestone", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/limestone.png?raw=true", desc: "Calcium Carbonate (CaCO3)." },
  sand: { id: "sand", name: "Sand", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/sand.png?raw=true", desc: "Silica (SiO2). High melting point." },
  seawater: { id: "seawater", name: "Seawater", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/seawater.png?raw=true", desc: "NaCl + H2O." },

  // --- MINES ---
  chromite_ore: { id: "chromite_ore", name: "Chromite Ore", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/chromite.png?raw=true", desc: "Source of Chrome." },
  coal: { id: "coal", name: "Coal", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/coal.png?raw=true", desc: "Fossil Carbon." },
  copper_ore: { id: "copper_ore", name: "Copper Ore", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/copper.png?raw=true", desc: "Malachite." },
  iron_ore: { id: "iron_ore", name: "Iron Ore", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/iron.png?raw=true", desc: "Hematite." },
  phosphate_rock: { id: "phosphate_rock", name: "Phosphate Rock", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/phosphate.png?raw=true", desc: "Fertilizer base." },
  pyrite: { id: "pyrite", name: "Pyrite", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/pyrite.png?raw=true", desc: "Fool's Gold." },
  tin_ore: { id: "tin_ore", name: "Tin Ore", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/tin.png?raw=true", desc: "Soft metal." },
  tin_ingot: { id: "tin_ingot", name: "Tin Ingot", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/tin.png?raw=true", desc: "Soft metal." },

  // --- BASES & ALKALIS ---
  ash: { id: "ash", name: "Ash", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/ash.png?raw=true", desc: "Alkali source (Potash). Not a pozzolan." },
  potash_solution: { id: "potash_solution", name: "Potash Solution", type: "biomancy", icon: "🧪", desc: "Liquid base." },
  quicklime: { id: "quicklime", name: "Quicklime", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/quicklime.png?raw=true", desc: "Calcium Oxide (CaO). Highly reactive flux stabilizer." },
  slaked_lime: { 
    id: "slaked_lime", 
    name: "Slaked Lime", 
    type: "biomancy", 
    icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/slaked_lime.png?raw=true", 
    desc: "Calcium Hydroxide paste. Essential binder for mortar and concrete." // Keyword: Binder
  },
  soda_ash: { id: "soda_ash", name: "Soda Ash", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/soda_ash.png?raw=true", desc: "Sodium Carbonate. Lowers melting point of silica." }, // Keyword: Flux
  stale_urine: { id: "stale_urine", name: "Stale Urine (Ammonia)", type: "biomancy", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/stale_urine.png?raw=true", desc: "Urea breaks down into ammonia over time." },

  // --- ACIDS & SOLVENTS ---
  ammonia_gas: { id: "ammonia_gas", name: "Ammonia Gas", type: "pyrotechny", icon: "☁️", desc: "NH3." },
  chlorine_gas: { id: "chlorine_gas", name: "Chlorine Gas", type: "pyrotechny", icon: "https://github.com/cshirley-droid/catalyst/blob/main/chlorine_gas.png?raw=true", desc: "Toxic, green oxidizer." },
  muriatic_acid: { 
    id: "muriatic_acid", 
    name: "Muriatic Acid", 
    type: "pyrotechny", 
    icon: "🧪", 
    desc: "Spirit of Salt. A strong, corrosive acid essential for metal etching and producing chlorides." 
  },
  nitric_acid: { id: "nitric_acid", name: "Nitric Acid", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/nitric_acid.png?raw=true", desc: "Strong acid." },
  sulfuric_acid: { id: "sulfuric_acid", name: "Sulfuric Acid", type: "pyrotechny", icon: "🧪", desc: "Vitriol." },
  toluene: { id: "toluene", name: "Toluene", type: "pyrotechny", icon: "🧪", desc: "Solvent." },
  vinegar: { id: "vinegar", name: "Vinegar", type: "biomancy", icon: "🏺", desc: "Acetic acid." },
  wood_alcohol: { id: "wood_alcohol", name: "Wood Alcohol", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/wood_alcohol.png?raw=true", desc: "Methanol (Toxic)." },

  // --- PROCESSED MATERIALS ---
  boiled_water: { id:"boiled_water", name: "Boiled Water", type: "pyrotechny", icon: "https://github.com/cshirley-droid/catalyst/blob/main/boiled_water.png?raw=true", desc: "Water purified by heat. Essential for sterile alchemical processes."},
  ceramic_dust: { 
    id: "ceramic_dust", 
    name: "Ceramic Dust", 
    type: "refined", 
    icon: "🏺", 
    desc: "Cocciopesto. Crushed pottery containing reactive silica for hydraulic cement." // Keywords: Cocciopesto, Silica
  },
  charcoal: { id: "charcoal", name: "Charcoal", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/charcoal.png?raw=true", desc: "Pure carbon fuel." },
  coke: { id: "coke", name: "Coke", type: "pyrotechny", icon: "https://github.com/cshirley-droid/catalyst/blob/main/coke.png?raw=true", desc: "Pure coal fuel." },
  glass_frit: {
    id: "glass_frit",
    name: "Glass Frit",
    type: "pyrotechny",
    icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/glass_frit.png?raw=true",
    desc: "Calcined mixture of sand and soda. Water-soluble until stabilized with lime." // Keywords: Calcined, Stabilizer
  },
  natural_rubber: { id: "natural_rubber", name: "Coagulated Rubber", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/natural_rubber.png?raw=true", desc: "Latex solidified by acid." },
  plant_pulp: { id: "plant_pulp", name: "Plant Pulp", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/plant_pulp.png?raw=true", desc: "Cellulose fibers." },
  
  // --- PROCESSED FOODS & ORGANICS ---
  aniline: { id: "aniline", name: "Aniline", type: "pyrotechny", icon: "https://github.com/cshirley-droid/catalyst/blob/main/aniline.png?raw=true", desc: "Dye base." },
  coal_tar: { id: "coal_tar", name: "Coal Tar", type: "pyrotechny", icon: "https://github.com/cshirley-droid/catalyst/blob/main/coal_tar.png?raw=true", desc: "Sticky byproduct." },
  cornmeal: { id: "cornmeal", name: "Cornmeal", type: "mechanikos", icon: "https://github.com/cshirley-droid/catalyst/blob/main/cornmeal.png?raw=true", desc: "Ground maize." },
  crude_morphine: { id: "crude_morphine", name: "Crude Morphine", type: "biomancy", icon: "🧂", desc: "Precipitated alkaloid crystals." },
  flour: { id: "flour", name: "Flour", type: "mechanikos", icon: "https://github.com/cshirley-droid/catalyst/blob/main/flour.png?raw=true", desc: "Ground wheat." },
  morphine_solution: { id: "morphine_solution", name: "Calcium Morphenate", type: "biomancy", icon: "🧪", desc: "Morphine dissolved in lime water." },
  phenol: { id: "phenol", name: "Phenol", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/phenol_or_carbolic_acid.png?raw=true", desc: "Carbolic acid." },
  raw_opium: { id: "raw_opium", name: "Raw Opium", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/raw_opium.png?raw=true", desc: "Dried latex from poppy pods." },
  salt: { id: "salt", name: "Salt", type: "biomancy", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/salt.png?raw=true", desc: "NaCl." },
  saltpeter: { id: "saltpeter", name: "Saltpeter", type: "biomancy", icon: "⚪", desc: "Potassium Nitrate." },
  wheat_grain: { id: "wheat_grain", name: "Wheat Grain", type: "biomancy", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/wheat_grain.png?raw=true", desc: "Threshed seeds." },

  // --- METALS & ELEMENTS ---
  chromium_ingot: { id: "chromium_ingot", name: "Chromium Ingot", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/chromium.png?raw=true", desc: "Shiny metal." },
  copper_ingot: { id: "copper_ingot", name: "Copper", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/copper_ingot.png?raw=true", desc: "Conductive metal." },
  hydrogen: { id: "hydrogen", name: "Hydrogen", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/hydrogen.png?raw=true", desc: "Flammable gas." },
  iron_bloom: { id: "iron_bloom", name: "Iron Bloom", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/iron_bloom.png?raw=true", desc: "Spongy iron." },
  silicon: { id: "silicon", name: "Silicon", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/silicon.png?raw=true", desc: "Semiconductor." },
  sulfur: { id: "sulfur", name: "Sulfur", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/sulfur.png?raw=true", desc: "Brimstone." },
  wrought_iron_ingot: { id: "wrought_iron_ingot", name: "Wrought Iron Ingot", type: "mechanikos", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/wrought_iron.png?raw=true", desc: "Worked metal." },

  // ============================================
  // FINISHED GOODS (Products)
  // ============================================

  // --- ALCOHOLS & FERMENTATION ---
  wine: { id: "wine", name: "Wine", type: "biomancy", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/wine.png?raw=true", desc: "Fermented maize beer.", desc: "Fermented fruit juice." },
  beer: { id: "beer", name: "Beer", type: "biomancy", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/beer.png?raw=true", desc: "Fermented maize beer.", desc: "Fermented grain mash." },
  chicha: { id: "chicha", name: "Chicha", type: "biomancy", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/chicha.png?raw=true", desc: "Fermented maize beer." },
  ethanol_spirits: { id: "ethanol_spirits", name: "Distilled Spirits", type: "pyrotechny", icon: "🥃", desc: "High-proof potable alcohol for medicine or fuel." },

  // --- FOOD ---
  bread: { id: "bread", name: "Bread", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/bread.png?raw=true", desc: "Staff of life." },
  bread_wheat: { id: "bread_wheat", name: "Bread Wheat", type: "biomancy", icon: "🌾", desc: "Hexaploid hybrid." },
  cornbread: { id: "cornbread", name: "Cornbread", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/cornbread.png?raw=true", desc: "Golden, crumbly bread." },
  hardtack: { id: "hardtack", name: "Hardtack", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/hardtack.png?raw=true", desc: "Simple unleavened bread that lasts forever." },
  hybrid_peas: { id: "hybrid_peas", name: "Hybrid Peas", type: "biomancy", icon: "🫛", desc: "Mendelian genetics." },
  pain_tea: { id: "pain_tea", name: "Willow Tea", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/willow_tea-removebg-preview.png?raw=true", desc: "Bitter tea that soothes aches." },
  pea_soup: { id: "pea_soup", name: "Pea Soup", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/pea_soup.png?raw=true", desc: "Nutritious." },
  roasted_squash: { id: "roasted_squash", name: "Roasted Squash", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/roasted_squash.png?raw=true", desc: "Sweet & nutritious." },
  succotash: { id: "succotash", name: "Succotash", type: "biomancy", icon: "🍲", desc: "Corn and beans. The legumes fixed nitrogen for the maize." },
  wheat_sheaves: { id: "wheat_sheaves", name: "Wheat Sheaves", type: "biomancy", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/wheat.png?raw=true", desc: "Domesticated grain." },

  // --- CONSTRUCTION & MATERIALS ---
  bronze_ingot: { id: "bronze_ingot", name: "Bronze Ingot", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/bronze.png?raw=true", desc: "Ancient alloy." },
  concrete: { id: "concrete", name: "Concrete", type: "biomancy", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/concrete.png?raw=true", desc: "Liquid stone (Opus Caementicium)." }, // Keyword: Opus Caementicium

  leather: { id: "leather", name: "Leather", type: "biomancy", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/leather.png?raw=true", desc: "Tanned hide." },
  paper: { id: "paper", name: "Paper", type: "mechanikos", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/paper.png?raw=true", desc: "Knowledge keeper." },
  pottery: { id: "pottery", name: "Pottery", type: "pyrotechny", icon: "⚗️", desc: "Fired clay vessels." },
  stainless_steel: { id: "stainless_steel", name: "Stainless Steel", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/stainless_steel.png?raw=true", desc: "Rust proof." },
  steel_ingot: { id: "steel_ingot", name: "Steel Ingot", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/steel.png?raw=true", desc: "Strong alloy." },
  vulcanized_rubber: { id: "vulcanized_rubber", name: "Vulcanized Rubber", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/vulcanized_rubber.png?raw=true", desc: "Durable rubber." },

  // --- CHEMICAL PRODUCTS ---
  ammonia_gas: { id: "ammonia_gas", name: "Ammonia Gas", type: "pyrotechny", icon: "🧪", desc: "Haber product." },
  aspirin: { id: "aspirin", name: "Aspirin", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/aspirin.png?raw=true", desc: "Modern pain relief." },
  bleach: { id: "bleach", name: "Bleaching Agent", type: "pyrotechny", icon: "🧴", desc: "A powerful sanitizer (Sodium Hypochlorite)." },
  gunpowder: { id: "gunpowder", name: "Gunpowder", type: "mechanikos", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/gunpowder.png?raw=true", desc: "Explosive." },
  hard_soap: { id: "hard_soap", name: "Hard Soap", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/hard_soap.png?raw=true", desc: "Sodium-based bar soap, excellent for cleaning and laundry." },
  morphine: { id: "morphine", name: "Morphine", type: "pyrotechny", icon: "💉", desc: "Strong analgesic." },
  soft_soap: { id: "soft_soap", name: "Soft Soap", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/soft_soap.png?raw=true", desc: "Potassium-based liquid soap, good for skin." },
  superphosphate: { id: "superphosphate", name: "Superphosphate", type: "biomancy", icon: "🌱", desc: "Modern fertilizer." },
  synthetic_dye: { id: "synthetic_dye", name: "Synthetic Dye", type: "biomancy", icon: "🎨", desc: "Mauveine." },

  // --- PHYSICS & ELECTRIC AGE ---
  bakelite_casing: { id: "bakelite_casing", name: "Bakelite Casing", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/bakelite.png?raw=true", desc: "The first synthetic plastic (Phenol-Formaldehyde Resin)." },
  battery: { id: "battery", name: "Voltaic Pile", type: "mechanikos", icon: "🔋", desc: "Layers of copper and zinc soaked in acid." },
  compass: { id: "compass", name: "Compass", type: "mechanikos", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/compass.png?raw=true", desc: "A magnetized needle pointing North." },
  lightbulb: { id: "lightbulb", name: "Carbon Bulb", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/light_bulb.png?raw=true", desc: "A carbon filament glowing inside a vacuum." },
  microchip: { id: "microchip", name: "Microchip", type: "mechanikos", icon: "💻", desc: "Computing brain." },
  tnt: { id: "tnt", name: "TNT", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/tnt.png?raw=true", desc: "Trinitrotoluene. Stable high explosive." },
  transistor: { id: "transistor", name: "Transistor", type: "pyrotechny", icon: "📻", desc: "Logic gate." },

  // --- ORES & SMELTING ---
  sphalerite: { id: "sphalerite", name: "Sphalerite", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/sphalerite.png?raw=true", desc: "A resinous, dark mineral. Miners call it 'Black-Jack.' It seems to contain a hidden metal." },
  zinc_ingot: { id: "zinc_ingot", name: "Zinc Ingot", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/zinc.png?raw=true", desc: "A bluish-white metal. Essential for creating galvanic potential." },

  // --- GALVANIC COMPONENTS ---
  zinc_half_cell: { id: "zinc_half_cell", name: "Zinc Half-Cell", type: "mechanikos", icon: "🧪", desc: "A zinc plate in acid. One side of the galvanic 'push'." },
  copper_half_cell: { id: "copper_half_cell", name: "Copper Half-Cell", type: "mechanikos", icon: "🧪", desc: "A copper plate in acid. The 'pull' side of the battery." },
  salt_bridge: { id: "salt_bridge", name: "Salt Bridge", type: "mechanikos", icon: "📜", desc: "Paper soaked in brine. Connects two half-cells to complete the circuit." },

  // --- THE ISOLATED TRIAD (Page 29 Elements) ---
  potassium_nugget: { id: "potassium_nugget", name: "Potassium", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/potassium.png?raw=true", desc: "Soft, silvery metal from ash. Reacts violently with water." },
  sodium_nugget: { id: "sodium_nugget", name: "Sodium", type: "pyrotechny", icon: "🤍", desc: "Reactive metal from salt. Can be cut with a dull knife." },
  calcium_nugget: { id: "calcium_nugget", name: "Calcium", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/calcium.png?raw=true", desc: "Bright white metal from lime. The hidden heart of stone." },
  calcium_chloride: { id: "calcium_chloride", name: "Calcium Chloride", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/calcium_chloride.png?raw=true", desc: "A specialized salt bridge to the Alkaline Earth metals." },

  // --- RAW MATERIALS ---
  lead_ore: { id: "lead_ore", name: "Galena (Lead Ore)", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/galena.png?raw=true", desc: "Lead Sulfide (PbS). Heavy, silver-gray ore used to extract lead and silver." },
  kaolin: { id: "kaolin", name: "Kaolin Clay", type: "raw", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/kaolin.png?raw=true", desc: "Pure white aluminosilicate. Essential for high-heat ceramics." },

  lead_ingot: { id: "lead_ingot", name: "Lead Ingot", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/lead_ingot.png?raw=true", desc: "Soft, dense, corrosion-resistant metal. Toxic." },
  litharge: { id: "litharge", name: "Litharge", type: "pyrotechny", icon: "🟠", desc: "Lead(II) Oxide. A powerful flux for making crystal-clear glass." },
  firebrick: { id: "firebrick", name: "Firebrick", type: "pyrotechny", icon: "🧱", desc: "Refractory brick capable of withstanding industrial temperatures (>1500°C)." },

  // --- TOOLS ---
  steel_tools: { id: "steel_tools", name: "Hardened Steel Tools", type: "product", icon: "🛠️", desc: "Files, chisels, and lathe bits capable of cutting iron and brass with precision." },
  bellows: { id: "bellows", name: "Leather Bellows", type: "product", icon: "💨", desc: "Increases oxygen flow to reach smelting temperatures." },

  // --- GLASS TIERS ---
  soda_lime_glass: { id: "soda_lime_glass", name: "Soda-Lime Glass", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/soda_lime_glass.png?raw=true", desc: "Transparent solid (Soda-Lime-Silica)." }, // Keyword: Soda-Lime
  potash_glass: { id: "potash_glass", name: "Potash Glass", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/potash_glass.png?raw=true", desc: "Hard, heat-resistant glass suitable for chemical retorts." },
  flint_glass: { id: "flint_glass", name: "Flint Glass", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/flint_glass.png?raw=true", desc: "High-density lead glass with exceptional optical clarity for lenses." },

  // --- BRASS TIERS ---
  brass_ingot_low_zinc: { id: "brass_ingot_low_zinc", name: "Brass ingot (low-zinc)", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/brass_ingot_low_zinc.png?raw=true", desc: "Golden-colored copper alloy made by cementation. ~20% Zinc. Variable quality." },
  brass_ingot_high_zinc: { id: "brass_ingot_high_zinc", name: "Brass ingot (high-zinc)", type: "pyrotechny", icon: "https://cdn.jsdelivr.net/gh/cshirley-droid/catalyst@main/brass_ingot_high_zinc.png?raw=true", desc: "Precision alloy (70% Cu, 30% Zn). High strength and ductility for machinery." },
};