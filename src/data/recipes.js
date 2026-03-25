// src/data/recipes.js

export const RECIPES = [
  // ==========================================
  // ERA 1: THE ANCIENT FOREST (Organic Chem)
  // ==========================================

  // --- SURVIVAL & SAFETY ---
  {
    id: "water_purification",
    station: "POT",
    inputs: [{ id: "water", count: 1 }],
    heatLevel: 1,
    output: "boiled_water",
    science: "Pasteurization: Heating water to 100°C kills pathogens and parasites, preventing waterborne diseases like Cholera."
  },

  // --- FUELS & BASES ---
  {
    id: "charcoal_pyrolysis",
    station: "RETORT",
    inputs: [{ id: "wood", count: 1 }],
    heatLevel: 1, 
    output: "charcoal",
    secondary: "wood_alcohol",
    science: "Pyrolysis: Thermal decomposition of organic material in an inert atmosphere."
  },
  {
    id: "ash_combustion",
    station: "KILN",
    inputs: [{ id: "wood", count: 1 }],
    heatLevel: 1,
    output: "ash",
    science: "Combustion: Complete oxidation of biomass yields mineral salts (Potash)."
  },
  {
    id: "potash_leaching",
    station: "POT",
    inputs: [{ id: "ash", count: 1 }, { id: "water", count: 1 }],
    heatLevel: 1,
    output: "potash_solution",
    science: "Leaching: Solvent extraction of soluble potassium carbonate from insoluble matter."
  },

  {
    id: "urine_fermentation",
    station: "VAT",
    inputs: [{ id: "urine", count: 1 }],
    heatLevel: 0,
    output: "stale_urine",
    science: "Alkaline Fermentation: Just as yeast turns sugar into alcohol, bacteria in urine break down urea into ammonia. This makes the liquid 'basic' or alkaline, allowing it to dissolve fats and treat animal hides."
  },

  // --- SOAP & CLEANING ---
  {
    id: "soft_soap_saponification",
    station: "POT",
    inputs: [{ id: "animal_fat", count: 1 }, { id: "potash_solution", count: 1 }],
    heatLevel: 1,
    output: "soft_soap", // OFFICIAL ID
    science: "Saponification: Hydrolysis of triglycerides by a strong base to form fatty acid salts."
  },
  {
    id: "hard_soap_reaction",
    station: "POT",
    inputs: [{ id: "animal_fat", count: 1 }, { id: "soda_ash", count: 1 }],
    heatLevel: 1,
    output: "hard_soap", // OFFICIAL ID
    science: "Saponification: Sodium carbonate (Soda Ash) creates a harder soap bar than Potassium (Potash)."
  },

  // --- MEDICINE (Basic) ---
  {
    id: "willow_tea_brewing",
    station: "POT",
    inputs: [{ id: "willow_bark", count: 1 }, { id: "water", count: 1 }], // Reverted to raw water
    heatLevel: 1, // The Heat kills the germs!
    output: "pain_tea",
    science: "Decoction: Boiling bark extracts Salicin, a precursor to modern aspirin."
  },

  // --- FERMENTATION (The Alcohol Split) ---
  {
    id: "wine_fermentation",
    station: "VAT",
    inputs: [{ id: "berries", count: 1 }],
    heatLevel: 0,
    output: "wine",
    science: "Ethanol Fermentation: Yeast converts fruit sugars into alcohol and CO2."
  },
  {
    id: "beer_brewing",
    station: "VAT",
    inputs: [{ id: "wheat_grain", count: 1 }, { id: "boiled_water", count: 1 }],
    heatLevel: 0,
    output: "beer",
    science: "This ancient process involves soaking grains in warm water to activate natural enzymes, which break complex starches down into simple sugars. Yeast (a microorganism) then consumes these sugars to grow and reproduce, releasing Carbon Dioxide gas and Ethanol as metabolic waste."
  },
  {
    id: "chicha_brewing",
    station: "VAT",
    inputs: [{ id: "corn", count: 1 }, { id: "boiled_water", count: 1 }],
    heatLevel: 0,
    output: "chicha",
    science: "Amylolytic Fermentation: Saliva or sprouting enzymes break down corn starch in purified water."
  },
  {
    id: "kvass_fermentation",
    station: "VAT",
    inputs: [{ id: "hardtack", count: 1 }, { id: "boiled_water", count: 1 }],
    heatLevel: 0,
    output: "beer", 
    science: "Wild Fermentation: Rehydrating dried bread allows airborne yeast to restart fermentation."
  },

  // --- VINEGAR PATHWAYS ---
  {
    id: "wine_vinegar",
    station: "VAT",
    inputs: [{ id: "wine", count: 1 }],
    heatLevel: 0, 
    output: "vinegar",
    science: "Acetification: Bacteria oxidize the ethanol in wine into acetic acid."
  },
  {
    id: "malt_vinegar",
    station: "VAT",
    inputs: [{ id: "beer", count: 1 }], 
    heatLevel: 0, 
    output: "vinegar",
    science: "Acetification: Bacteria oxidize the ethanol in beer into acetic acid."
  },

  // --- DISTILLATION ---
  {
    id: "spirit_distillation", // Brandy
    station: "RETORT",
    inputs: [{ id: "wine", count: 1 }],
    heatLevel: 1,
    output: "ethanol_spirits", // OFFICIAL ID
    science: "Distillation: Separating alcohol from water by exploiting their different boiling points."
  },

  // --- FOOD ---
  {
    id: "bread_baking",
    station: "KILN",
    inputs: [{ id: "flour", count: 1 }, { id: "beer", count: 1 }], // Beer barm!
    heatLevel: 1,
    output: "bread",
    science: "Leavening: Live yeast from the beer foam (barm) makes the dough rise."
  },
  {
    id: "corn_leavened_bread",
    station: "KILN",
    inputs: [{ id: "flour", count: 1 }, { id: "chicha", count: 1 }],
    heatLevel: 1,
    output: "bread",
    science: "Leavening: Yeast from the fermented corn mash makes the wheat dough rise."
  },
  {
    id: "hardtack_baking",
    station: "KILN",
    inputs: [{ id: "flour", count: 1 }, { id: "water", count: 1 }],
    heatLevel: 2, 
    output: "hardtack",
    science: "Dehydration: Baking without yeast yields a dense, long-lasting cracker."
  },
  {
    id: "cornbread_baking",
    station: "KILN",
    inputs: [{ id: "cornmeal", count: 1 }, { id: "water", count: 1 }],
    heatLevel: 1,
    output: "cornbread",
    science: "Quick Bread: Maize dough baked on a hot stone."
  },
  {
    id: "pea_soup_cooking",
    station: "POT",
    inputs: [{ id: "wild_peas", count: 1 }, { id: "water", count: 1 }],
    heatLevel: 1,
    output: "pea_soup",
    science: "Boiling: Heat breaks down the tough cell walls of the legume."
  },
  {
    id: "succotash_cooking",
    station: "POT",
    inputs: [{ id: "corn", count: 1 }, { id: "beans", count: 1 }],
    heatLevel: 1,
    output: "succotash",
    science: "Complementary Proteins: Cooking corn and beans together creates a complete amino acid profile."
  },
  {
    id: "roasted_squash",
    station: "KILN",
    inputs: [{ id: "squash", count: 1 }],
    heatLevel: 1,
    output: "roasted_squash",
    science: "Maillard Reaction: Browning of sugars improves flavor."
  },

  // --- PROCESSING (Milling/Threshing) ---
  {
    id: "flour_milling_bowl",
    station: "BOWL", // Or MILL if you prefer, but BOWL handles manual grinding well
    inputs: [{ id: "wheat_grain", count: 1 }],
    heatLevel: 0,
    output: "flour",
    science: "Milling: Crushing grain to release the endosperm."
  },
  {
    id: "flour_milling_mill",
    station: "MILL", // Or MILL if you prefer, but BOWL handles manual grinding well
    inputs: [{ id: "wheat_grain", count: 1 }],
    heatLevel: 0,
    output: "flour",
    science: "Milling: Crushing grain to release the endosperm."
  },
  {
    id: "corn_milling",
    station: "BOWL",
    inputs: [{ id: "corn", count: 1 }],
    heatLevel: 0,
    output: "cornmeal",
    science: "Grinding: Pulverizing dried maize kernels."
  },
  {
    id: "wheat_threshing",
    station: "BOWL",
    inputs: [{ id: "wheat_sheaves", count: 1 }],
    heatLevel: 0,
    output: "wheat_grain",
    science: "Threshing: Separating the edible grain from the chaff."
  },

  // --- MATERIAL PROCESSING (DEAD END FIXES) ---
  {
    id: "pottery_firing",
    station: "KILN",
    inputs: [{ id: "clay", count: 1 }],
    heatLevel: 2,
    output: "pottery", 
    science: "Sintering: Heating clay particles until they adhere to each other, creating a hard, ceramic material."
  },

  // --- ROMAN CONCRETE (Cocciopesto Method) ---
  
  // Step 1: Making the artificial volcanic ash
  {
    id: "crush_pottery",
    station: "MILL", // Primary station if unlocked
    inputs: [{ id: "pottery", count: 1 }], 
    heatLevel: 0,
    output: "ceramic_dust",
    science: "Cocciopesto: Romans without access to volcanic ash would crush fired clay tiles and pots (testae) to create an artificial Pozzolana rich in reactive silicates."
  },

  // Step 2: Mixing the hydraulic concrete
  {
    id: "roman_concrete_cocciopesto",
    station: "VAT",
    inputs: [
      { id: "slaked_lime", count: 1 },
      { id: "ceramic_dust", count: 1 }
    ],
    heatLevel: 0,
    output: "concrete",
    science: "Opus Caementicium: The water trapped inside the aged slaked lime reacts with the ceramic silica to form a rock-hard, waterproof bond."
  },

  {
    id: "leather_tanning",
    station: "VAT",
    inputs: [{ id: "hide", count: 1 }, { id: "stale_urine", count: 1 }], 
    heatLevel: 0,
    output: "leather",
    science: "Tanning: Using ammonia/alkaline solutions to alter the protein structure of skin, preventing rot."
  },

  // ==========================================
  // ERA 2: THE COAST (Enlightenment)
  // ==========================================

  // --- GLASS & LIME ---
  {
    id: "quicklime_calcination",
    station: "KILN",
    inputs: [{ id: "limestone", count: 1 }],
    heatLevel: 3, 
    output: "quicklime",
    science: "Calcination: Thermal decomposition of Calcium Carbonate (CaCO3) into Calcium Oxide (CaO) and CO2."
  },
  {
    id: "slaking_lime",
    station: "VAT",
    inputs: [{ id: "quicklime", count: 1 }, { id: "water", count: 1 }],
    heatLevel: 0, // Exothermic!
    output: "slaked_lime", 
    science: "Hydration: Adding water to Quicklime releases massive heat, creating a thick, white putty that improves with age."
  },
  {
    id: "soda_ash_process",
    station: "KILN",
    inputs: [{ id: "kelp", count: 1 }],
    heatLevel: 1,
    output: "soda_ash",
    science: "Calcination: Burning sodium-rich plants leaves behind Sodium Carbonate (Washing Soda)."
  },

  // --- GLASS FRITTING (The 2-Step Process) ---
  
  // Step 1: Making the Frit (Water Glass)
  {
    id: "fritting_process",
    station: "KILN",
    inputs: [{ id: "sand", count: 1 }, { id: "soda_ash", count: 1 }],
    heatLevel: 2, 
    output: "glass_frit",
    science: "Fritting: Heating sand and soda creates Sodium Silicate. This lowers the melting point but creates a 'water glass' that would dissolve if used for cups."
  },

  // Step 2: The Final Melt (Stabilized Glass)
  {
    id: "glass_melting",
    station: "KILN",
    inputs: [{ id: "glass_frit", count: 1 }, { id: "quicklime", count: 1 }], // The Stabilizer
    heatLevel: 3, 
    output: "soda_lime_glass",
    science: "Vitrification: Adding Lime (Calcium) to the melted frit stabilizes the molecular network, making the glass waterproof and durable."
  },

  // --- SALT & PAPER ---
  {
    id: "salt_evaporation_boiling",
    station: "POT",
    inputs: [{ id: "seawater", count: 1 }],
    heatLevel: 1,
    output: "salt",
    science: "Evaporation: Removing water leaves behind dissolved mineral salts."
  },
  {
    id: "salt_evaporation_solar",
    station: "VAT",
    inputs: [{ id: "seawater", count: 1 }],
    heatLevel: 0,
    output: "salt",
    science: "Evaporation: Removing water leaves behind dissolved mineral salts."
  },
  {
    id: "paper_pressing",
    station: "MILL",
    inputs: [{ id: "plant_pulp", count: 1 }], 
    heatLevel: 0,
    output: "paper",
    science: "Felting: Cellulose fibers bond together as they dry under pressure."
  },
  {
    id: "pulp_digestion",
    station: "POT",
    inputs: [{ id: "wood", count: 1 }, { id: "slaked_lime", count: 1 }],
    heatLevel: 1,
    output: "plant_pulp",
    science: "Alkaline Hydrolysis: Lime breaks down lignin in the wood, freeing the cellulose fibers."
  },

  // --- GENETICS & FARMING ---
  // --- WHEAT ORIGIN (CRITICAL RESTORED RECIPE) ---
  {
    id: "wheat_breeding",
    station: "PLANTER",
    inputs: [{ id: "wild_emmer", count: 1 }, { id: "goatgrass", count: 1 }],
    heatLevel: 0,
    output: "wheat_sheaves",
    science: "Hybridization: Crossing Wild Emmer (tetraploid) with Goatgrass (diploid) creates modern Bread Wheat (hexaploid)."
  },
  // --- SUSTAINABLE FARMING ---
  {
    id: "modern_wheat_farming",
    station: "PLANTER",
    inputs: [{ id: "wheat_grain", count: 1 }, { id: "water", count: 1 }],
    heatLevel: 0,
    output: "wheat_sheaves",
    yield: 2,
    science: "Agriculture: Replanting the harvested grain creates a sustainable food loop."
  },
  {
    id: "corn_farming",
    station: "PLANTER",
    inputs: [{ id: "corn", count: 1 }, { id: "water", count: 1 }],
    heatLevel: 0,
    output: "corn",
    yield: 2, 
    science: "Agriculture: Planting a seed with water yields a harvest greater than the input."
  },
  {
    id: "wild_emmer_farming",
    station: "PLANTER",
    inputs: [{ id: "wild_emmer", count: 1 }, { id: "water", count: 1 }],
    heatLevel: 0,
    output: "wild_emmer",
    yield: 2,
    science: "Cultivation: Systematically growing grasses allows for a surplus of grain."
  },
  {
    id: "pea_farming",
    station: "PLANTER",
    inputs: [{ id: "wild_peas", count: 1 }, { id: "water", count: 1 }],
    heatLevel: 0,
    output: "wild_peas",
    yield: 2,
    science: "Propagation: Legumes are hardy crops that multiply rapidly in moist soil."
  },
  {
    id: "pea_breeding",
    station: "PLANTER",
    inputs: [{ id: "wild_peas", count: 1 }, { id: "yellow_peas", count: 1 }],
    heatLevel: 0,
    output: "hybrid_peas",
    science: "Mendelian Inheritance: Crossing plants with distinct traits (Green vs. Yellow pods) to track dominant and recessive genes."
  },
  {
    id: "companion_planting", // Three Sisters
    station: "PLANTER",
    inputs: [{ id: "corn", count: 1 }, { id: "beans", count: 1 }],
    heatLevel: 0,
    output: "succotash", // Simplified output
    yield: 2,
    science: "Symbiosis: Beans fix nitrogen for the corn, while corn provides a trellis for the beans."
  },

  // ==========================================
  // ERA 3: THE MINES (Industrial Age)
  // ==========================================

  // --- METALLURGY ---
  {
    id: "copper_smelting",
    station: "KILN",
    inputs: [{ id: "copper_ore", count: 1 }, { id: "charcoal", count: 1 }],
    heatLevel: 2,
    output: "copper_ingot",
    science: "Reduction: Carbon strips oxygen from the ore at high heat, leaving pure metallic copper."
  },
  {
    id: "tin_smelting",
    station: "KILN",
    inputs: [{ id: "tin_ore", count: 1 }, { id: "charcoal", count: 1 }],
    heatLevel: 2,
    output: "tin_ingot", 
    science: "Smelting: Reducing tin oxide (cassiterite) with carbon to isolate the pure metal."
  },
  {
    id: "bronze_alloying",
    station: "KILN",
    inputs: [{ id: "copper_ingot", count: 1 }, { id: "tin_ingot", count: 1 }],
    heatLevel: 2,
    output: "bronze_ingot",
    science: "Alloying: Mixing molten copper and tin creates a metal lattice harder and more durable than either alone."
  },
  {
    id: "iron_smelting",
    station: "KILN",
    inputs: [{ id: "iron_ore", count: 1 }, { id: "coal", count: 1 }],
    heatLevel: 3, 
    output: "iron_bloom",
    science: "Reduction: Intense heat and carbon monoxide reduce iron oxide to a porous 'bloom' of metallic iron and slag."
  },
  {
    id: "wrought_iron_forging",
    station: "BOWL", // Hammering
    inputs: [{ id: "iron_bloom", count: 1 }],
    heatLevel: 0,
    output: "wrought_iron_ingot",
    science: "Forging: Hammering the hot bloom expels molten slag and aligns the iron crystals into a tough, fibrous structure."
  },
  {
    id: "steel_alloying",
    station: "KILN",
    inputs: [{ id: "wrought_iron_ingot", count: 1 }, { id: "charcoal", count: 1 }],
    heatLevel: 3,
    output: "steel_ingot",
    science: "Cementation: Introducing a precise amount of carbon into wrought iron transforms it into high-strength steel."
  },
  {
    id: "chrome_extraction",
    station: "KILN",
    inputs: [{ id: "chromite_ore", count: 1 }, { id: "charcoal", count: 1 }],
    heatLevel: 3,
    output: "chromium_ingot",
    science: "Reduction: Isolating pure chromium metal from its chromite oxide ore using high-temperature carbon reduction."
  },
  {
    id: "stainless_steel_alloying",
    station: "KILN",
    inputs: [{ id: "steel_ingot", count: 1 }, { id: "chromium_ingot", count: 1 }],
    heatLevel: 3,
    output: "stainless_steel_ingot",
    science: "Passivation: Chromium creates a 'self-healing' oxide layer that prevents the iron in steel from oxidizing (rusting)."
  },
  {
    id: "zinc_smelting",
    station: "KILN",
    inputs: [{ id: "sphalerite", count: 1 }, { id: "coal", count: 1 }],
    fuel: "coal",
    heatLevel: 3,
    output: "zinc_ingot",
    science: "Reduction: Carbon 'steals' the sulfur from Sphalerite to release pure Zinc metal."
  },
  // --- KILN RECIPES (METALLURGY & CERAMICS) ---
  {
    id: "firebrick_firing",
    station: "KILN",
    inputs: [{ id: "kaolin", count: 2 }, { id: "sand", count: 1 }],
    heatLevel: 2,
    output: "firebrick",
    science: "Sintering: High-alumina clay fuses without melting, creating heat-proof ceramics."
  },
  {
    id: "lead_smelting",
    station: "KILN",
    inputs: [{ id: "lead_ore", count: 1 }, { id: "charcoal", count: 1 }],
    heatLevel: 1, // Lead melts easily (327°C)
    output: "lead_ingot",
    science: "Reduction: Charcoal strips oxygen/sulfur from the ore, leaving pure lead."
  },
  {
    id: "litharge_calcination",
    station: "KILN",
    inputs: [{ id: "lead_ingot", count: 1 }],
    heatLevel: 1,
    output: "litharge",
    science: "Oxidation: Heating lead in air creates Lead Oxide, a crucial flux for glass."
  },

  // --- GLASS MAKING ---
  {
    id: "potash_glass_melt",
    station: "KILN",
    inputs: [{ id: "sand", count: 1 }, { id: "ash", count: 1 }], // Using raw potash for the "Hard Glass"
    heatLevel: 2,
    output: "potash_glass",
    science: "Potassium Silicate: Potash creates a harder, more heat-resistant glass than soda ash."
  },
  {
    id: "flint_glass_melt",
    station: "KILN",
    inputs: [{ id: "sand", count: 1 }, { id: "litharge", count: 1 }],
    heatLevel: 2,
    output: "flint_glass",
    science: "Lead Crystal: Lead oxide lowers the melting point but increases density and refractive index."
  },

  // --- BRASS VARIANTS ---
  {
    id: "brass_cementation",
    station: "KILN",
    inputs: [{ id: "copper_ingot", count: 1 }, { id: "sphalerite", count: 1 }, { id: "charcoal", count: 1 }],
    heatLevel: 2,
    output: "brass_ingot_low_zinc",
    science: "Cementation: Zinc vapor diffuses into solid copper. Limited to ~20% zinc content."
  },
  {
    id: "brass_alloying",
    station: "KILN",
    inputs: [{ id: "copper_ingot", count: 1 }, { id: "zinc_ingot", count: 1 }],
    heatLevel: 3, // Requires melting copper (1085°C)
    output: "brass_ingot_high_zinc",
    science: "Direct Alloying: Mixing molten copper and zinc allows for precise, high-strength ratios."
  },

  // --- CRAFTING / TOOLS (BOWL) ---
  {
    id: "bellows_crafting",
    station: "BOWL", // Or "WORKBENCH" if you have one
    inputs: [{ id: "leather", count: 2 }, { id: "wood", count: 1 }],
    heatLevel: 0,
    output: "bellows",
    science: "Pneumatics: A valved mechanism to force air into a fire, increasing combustion rate."
  },
  {
    id: "steel_tool_forging",
    station: "BOWL", // Represents the Anvil/Finishing
    inputs: [{ id: "steel_ingot", count: 1 }],
    heatLevel: 0,
    output: "steel_tools",
    science: "Tempering: Hardened steel can cut softer metals like iron and brass."
  },

  // --- RUBBER & COAL ---
  {
    id: "rubber_coagulation",
    station: "POT",
    inputs: [{ id: "latex_sap", count: 1 }, { id: "vinegar", count: 1 }],
    heatLevel: 1,
    output: "natural_rubber",
    science: "Coagulation: Acid neutralizes the negative charge of latex particles, causing them to clump."
  },
  {
    id: "rubber_vulcanization",
    station: "KILN",
    inputs: [{ id: "natural_rubber", count: 1 }, { id: "sulfur", count: 1 }],
    heatLevel: 2,
    output: "vulcanized_rubber", // OFFICIAL ID
    science: "Cross-Linking: Sulfur atoms form bridges between polymer chains, making the rubber durable and heat-resistant."
  },
  {
    id: "coke_production",
    station: "KILN",
    inputs: [{ id: "coal", count: 1 }],
    heatLevel: 2,
    output: "coke",
    secondary: "coal_tar",
    science: "Destructive Distillation: Baking coal in the absence of air drives off volatiles to leave pure carbon."
  },
  {
    id: "coal_distillation",
    station: "RETORT",
    inputs: [{ id: "coal", count: 1 }],
    heatLevel: 2,
    output: "coal_tar",
    secondary: "coke",
    science: "Destructive Distillation: Heating coal in a closed retort captures the volatile 'waste' as a thick liquid (coal tar) and gas, leaving behind solid coke."
  },

  // --- EXPLOSIVES & FUEL ---
  {
    id: "saltpeter_leaching",
    station: "POT",
    inputs: [{ id: "manure", count: 1 }, { id: "ash", count: 1 }], // Simplified niter bed
    heatLevel: 1,
    output: "saltpeter",
    science: "Nitrification: Bacteria convert ammonia in waste into nitrates, which are harvested with potash."
  },
  {
    id: "gunpowder_mixing",
    station: "BOWL",
    inputs: [{ id: "saltpeter", count: 1 }, { id: "charcoal", count: 1 }],
    heatLevel: 0,
    output: "gunpowder",
    science: "Deflagration: An intimate mixture of oxidizer (saltpeter) and fuel (charcoal)."
  },
  {
    id: "ethanol_distillation",
    station: "RETORT",
    inputs: [{ id: "beer", count: 2 }], // 2 Beer -> 1 Spirit
    heatLevel: 2,
    output: "ethanol_spirits", // OFFICIAL ID
    science: "Fractional Distillation: Separating components based on differences in boiling point to concentrate ethanol."
  },
  {
    id: "pyrite_roasting",
    station: "KILN",
    inputs: [{ id: "pyrite", count: 1 }],
    heatLevel: 2,
    output: "sulfur",
    science: "Roasting: Heating metal sulfides in air converts them into metal oxides and releases elemental sulfur."
  },

  // ==========================================
  // ERA 4: INDUSTRY (Chemistry)
  // ==========================================

  // --- ACIDS & BASES ---
  {
    id: "sulfuric_acid_chamber",
    station: "RETORT",
    inputs: [{ id: "sulfur", count: 1 }, { id: "saltpeter", count: 1 }],
    heatLevel: 2,
    output: "sulfuric_acid",
    science: "Lead Chamber Process: Oxidation of sulfur dioxide by nitrogen oxides to form sulfuric acid."
  },
  {
    id: "muriatic_acid_synthesis",
    station: "RETORT",
    inputs: [{ id: "salt", count: 1 }, { id: "sulfuric_acid", count: 1 }],
    heatLevel: 2,
    output: "muriatic_acid", // Historically accurate name for HCl
    science: "Spirit of Salt: Sulfuric acid displaces hydrogen chloride gas from common salt. When bubbled through water, it creates Muriatic Acid, a staple of industrial chemistry."
  },
  {
    id: "calcium_chloride_production",
    station: "POT",
    inputs: [{ id: "limestone", count: 1 }, { id: "muriatic_acid", count: 1 }],
    heatLevel: 1,
    output: "calcium_chloride",
    science: "Neutralization: Muriatic acid aggressively dissolves calcium carbonate (limestone). The resulting liquid is boiled down to leave behind white, highly hygroscopic crystals of Calcium Chloride."
  },
  {
    id: "nitric_acid_synthesis",
    station: "RETORT",
    inputs: [{ id: "saltpeter", count: 1 }, { id: "sulfuric_acid", count: 1 }],
    heatLevel: 2,
    output: "nitric_acid",
    science: "Displacement: A stronger acid (Sulfuric) displaces a weaker acid (Nitric) from its salt."
  },
  {
    id: "ammonia_recovery",
    station: "RETORT",
    inputs: [{ id: "stale_urine", count: 1 }, { id: "slaked_lime", count: 1 }],
    heatLevel: 1,
    output: "ammonia_gas",
    secondary: "calcium_chloride", // <--- THE FIX
    science: "Displacement: Lime reacts with the ammonium salts and chlorides in stale urine, freeing ammonia gas and leaving behind a residue of calcium chloride."
  },

  // --- FERTILIZER & CHLORINE ---
  {
    id: "fertilizer_synthesis",
    station: "VAT",
    inputs: [{ id: "phosphate_rock", count: 1 }, { id: "sulfuric_acid", count: 1 }],
    heatLevel: 1, // Exothermic
    output: "superphosphate",
    science: "Acidulation: Sulfuric acid converts insoluble phosphate rock into soluble forms plants can eat."
  },
  {
    id: "chlorine_generation",
    station: "RETORT",
    inputs: [{ id: "salt", count: 1 }, { id: "sulfuric_acid", count: 1 }],
    heatLevel: 2,
    output: "chlorine_gas",
    science: "Early Chemical Synthesis: Oxidation of sodium chloride (salt) by sulfuric acid to produce highly toxic chlorine gas."
  },
  {
    id: "bleach_production",
    station: "RETORT",
    inputs: [{ id: "chlorine_gas", count: 1 }, { id: "slaked_lime", count: 1 }], // Using slaked_lime (hydrated)
    heatLevel: 0,
    output: "bleach", // OFFICIAL ID
    science: "Absorption: Chlorine gas reacts with hydrated lime to form bleaching powder (Calcium Hypochlorite)."
  },

  // --- ORGANIC SYNTHESIS (Dyes, Drugs) ---
  {
    id: "aniline_synthesis",
    station: "RETORT",
    inputs: [{ id: "coal_tar", count: 1 }, { id: "nitric_acid", count: 1 }], // Simplified
    heatLevel: 2,
    output: "aniline",
    science: "Nitration & Reduction: Deriving aniline precursors from coal tar waste."
  },
  {
    id: "synthetic_dye_mixing",
    station: "VAT",
    inputs: [{ id: "aniline", count: 1 }, { id: "ethanol_spirits", count: 1 }], 
    heatLevel: 1,
    output: "synthetic_dye",
    science: "Mauveine Synthesis: The first synthetic organic dye, created by Perkin from coal tar aniline."
  },
  {
    id: "aspirin_synthesis",
    station: "RETORT",
    inputs: [{ id: "pain_tea", count: 1 }, { id: "vinegar", count: 1 }], // Vinegar = Acetic Acid source
    heatLevel: 1,
    output: "aspirin",
    science: "Acetylation: Reacting salicylic acid with acetic acid (vinegar) reduces its toxicity to the stomach."
  },
  {
    id: "tnt_synthesis",
    station: "RETORT",
    inputs: [{ id: "toluene", count: 1 }, { id: "nitric_acid", count: 1 }],
    heatLevel: 2,
    output: "tnt",
    science: "Nitration: Adding three nitro groups to toluene creates a stable high explosive."
  },
  {
    id: "toluene_distillation",
    station: "RETORT",
    inputs: [{ id: "coal_tar", count: 1 }],
    heatLevel: 2,
    output: "toluene",
    science: "Fractionation: Isolating toluene from the complex mixture of coal tar."
  },

  // --- OPIUM PATH ---
  {
    id: "opium_extraction",
    station: "POT",
    inputs: [{ id: "wild_poppy", count: 2 }, { id: "water", count: 1 }],
    heatLevel: 1,
    output: "raw_opium",
    science: "Decoction: Boiling the poppy pods extracts the water-soluble latex and alkaloids."
  },
  {
    id: "lime_treatment",
    station: "VAT",
    inputs: [{ id: "raw_opium", count: 1 }, { id: "slaked_lime", count: 1 }],
    heatLevel: 0,
    output: "morphine_solution",
    science: "Alkaline Extraction: Lime reacts with morphine to form soluble calcium morphenate, leaving impurities behind."
  },
  {
    id: "morphine_precipitation",
    station: "VAT",
    inputs: [{ id: "morphine_solution", count: 1 }, { id: "stale_urine", count: 1 }], // Ammonium source
    heatLevel: 0,
    output: "crude_morphine",
    science: "Precipitation: Adding Ammonium (from urine) lowers the pH, causing solid morphine crystals to fall out of solution."
  },
  {
    id: "morphine_purification",
    station: "RETORT",
    inputs: [{ id: "crude_morphine", count: 1 }, { id: "ethanol_spirits", count: 1 }], // OFFICIAL ID
    heatLevel: 1,
    output: "morphine",
    science: "Recrystallization: Dissolving crude crystals in hot alcohol filters out the last remaining plant matter."
  },

  // ==========================================
  // ERA 5: THE ELECTRIC AGE (Physics)
  // ==========================================

  // --- PLASTICS ---
  {
    id: "bakelite_polymerization",
    station: "KILN",
    inputs: [{ id: "phenol", count: 1 }, { id: "wood_alcohol", count: 1 }], // Phenol + Formaldehyde source
    heatLevel: 3, 
    output: "bakelite_casing", // OFFICIAL ID
    science: "Condensation Polymerization: Phenol and Formaldehyde react under heat/pressure to form the first synthetic plastic."
  },
  {
    id: "phenol_extraction",
    station: "RETORT",
    inputs: [{ id: "coal_tar", count: 1 }],
    heatLevel: 2,
    output: "phenol",
    science: "Distillation: Extracting carbolic acid (phenol) from coal tar."
  },

  // --- PHYSICS DEVICES ---
  {
    id: "compass_assembly",
    station: "BOWL",
    inputs: [{ id: "wrought_iron", count: 1 }, { id: "water", count: 1 }],
    heatLevel: 0,
    output: "compass",
    science: "Magnetism: A magnetized iron needle floating on water aligns with the Earth's magnetic field."
  },
  {
    id: "lightbulb_blowing",
    station: "KILN",
    inputs: [{ id: "soda_lime_glass", count: 1 }, { id: "charcoal", count: 1 }], 
    heatLevel: 3, // Requires precision heat to fuse the glass around the wire
    output: "lightbulb",
    science: "Incandescence: A carbon filament glowing in a vacuum. Soda-lime glass is used because its thermal expansion matches the metal lead-in wires, preventing the bulb from cracking as it heats."
  },
  {
    id: "silicon_purification",
    station: "KILN",
    inputs: [{ id: "sand", count: 1 }, { id: "coke", count: 1 }],
    heatLevel: 3,
    output: "silicon",
    science: "Reduction: Removing oxygen from silica sand using carbon at high temperatures."
  },
  {
    id: "transistor_fabrication",
    station: "KILN", 
    inputs: [{ id: "silicon", count: 1 }, { id: "copper", count: 1 }],
    heatLevel: 1,
    output: "transistor",
    science: "Semiconductors: Doping silicon allows it to act as a switch or amplifier for electrical signals."
  },
  {
    id: "microchip_assembly",
    station: "BOWL", 
    inputs: [{ id: "transistor", count: 2 }, { id: "bakelite_casing", count: 1 }], // OFFICIAL ID
    heatLevel: 0,
    output: "microchip",
    science: "Integration: Photolithography allows thousands of transistors to be etched onto a single silicon chip."
  },

  // --- BATTERY ASSEMBLY ---
  {
    id: "make_zinc_cell",
    station: "BOWL",
    inputs: [{ id: "zinc_ingot", count: 1 }, { id: "sulfuric_acid", count: 1 }],
    output: "zinc_half_cell",
    science: "Galvanism: Establishing the negative potential by dissolving zinc in acid."
  },
  {
    id: "make_copper_cell",
    station: "BOWL",
    inputs: [{ id: "copper_ingot", count: 1 }, { id: "sulfuric_acid", count: 1 }],
    output: "copper_half_cell",
    science: "Galvanism: Establishing the positive potential for the electrical circuit."
  },
  {
    id: "make_salt_bridge",
    station: "BOWL",
    inputs: [{ id: "paper", count: 1 }, { id: "seawater", count: 1 }],
    output: "salt_bridge",
    science: "Ionic Path: Brine-soaked paper allows ions to move between cells without the liquids mixing."
  },

  // --- ELECTROLYSIS (The Rig) ---
  {
    id: "water_electrolysis",
    station: "ELECTROLYSIS_RIG",
    // In your LabView logic, slot 2 would be reserved for the "battery" item
    inputs: [{ id: "water", count: 1 }],
    heatLevel: 0,
    output: "hydrogen",
    yield: 2, 
    // If your system supports secondary outputs, add oxygen here
    science: "Stoichiometry: Electrolysis splits water into its constituent gases. You obtain exactly twice the volume of Hydrogen as you do Oxygen."
  },
  {
    id: "isolate_potassium",
    station: "ELECTROLYSIS_RIG",
    inputs: [{ id: "potash_solution", count: 1 }],
    output: "potassium_nugget",
    science: "Electrolysis: Breaking the chemical bonds in potash using raw electrical intensity."
  },
  {
    id: "isolate_sodium",
    station: "ELECTROLYSIS_RIG",
    inputs: [{ id: "salt", count: 1 }],
    output: "sodium_nugget",
    science: "Ionic Splitting: Salt is torn into metallic sodium and chlorine gas (dissipated)."
  },
  {
    id: "isolate_calcium",
    station: "ELECTROLYSIS_RIG",
    inputs: [{ id: "calcium_chloride", count: 1 }],
    output: "calcium_nugget",
    science: "The Ultimate Challenge: High voltage is required to force Calcium out of its salt form."
  }
];