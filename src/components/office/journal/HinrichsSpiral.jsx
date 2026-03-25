// src/components/office/journal/HinrichsSpiral.jsx
import React from 'react';

// Notice how we are destructuring unlockedRecipes right here! 
// This is exactly what we just learned. We are opening the delivery box.
export const HinrichsSpiral = ({ unlockedRecipes = [] }) => {
  const SPIRAL_ELEMENTS = [
    { id: "hydrogen", recipeId: "water_electrolysis", name: "Hydrogen", cx: 240, cy: 200, textX: 235, textY: 190 },
    { id: "nitrogen", recipeId: "ammonia_recovery", name: "Nitrogen", cx: 200, cy: 256, textX: 208, textY: 244 },
    { id: "sodium_nugget", recipeId: "isolate_sodium", name: "Sodium", cx: 160, cy: 200, textX: 110, textY: 195 },
    { id: "silicon", recipeId: "silicon_purification", name: "Silicon", cx: 200, cy: 120, textX: 208, textY: 147 },
    { id: "sulfur", recipeId: "pyrite_roasting", name: "Sulfur", cx: 280, cy: 200, textX: 275, textY: 190 },
    { id: "chlorine_gas", recipeId: "chlorine_generation", name: "Chlorine", cx: 200, cy: 299, textX: 208, textY: 284 },
    { id: "potassium_nugget", recipeId: "isolate_potassium", name: "Potassium", cx: 120, cy: 200, textX: 60, textY: 195 },
    { id: "chromium_ingot", recipeId: "chrome_extraction", name: "Chromium", cx: 200, cy: 79, textX: 208, textY: 106 },
    { id: "iron_bloom", recipeId: "iron_smelting", name: "Iron", cx: 320, cy: 200, textX: 310, textY: 190 },
    { id: "copper_ingot", recipeId: "copper_smelting", name: "Copper", cx: 200, cy: 340, textX: 208, textY: 324 },
    { id: "zinc_ingot", recipeId: "zinc_smelting", name: "Zinc", cx: 80, cy: 200, textX: 50, textY: 195 },
    { id: "tin_ingot", recipeId: "tin_smelting", name: "Tin", cx: 200, cy: 40, textX: 208, textY: 65 }
  ];

  return (
    <div className="spiral-container">
      <h3 className="category-header">Hinrich's Spiral</h3>
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="spiral-svg">
        <path d="M200,200 m0,0 a20,20 0 1,0 40,0 a40,40 0 1,0 -80,0 a60,60 0 1,0 120,0 a80,80 0 1,0 -160,0 a100,100 0 1,0 200,0 a120,120 0 1,0 -240,0 a140,140 0 1,0 280,0 a160,160 0 1,0 -320,0" fill="none" stroke="#8b7355" strokeDasharray="4" strokeWidth="1.5" />
        <g stroke="#8b7355" strokeWidth="1" opacity="0.6">
          <line x1="200" y1="200" x2="200" y2="50" /> 
          <line x1="200" y1="200" x2="350" y2="200" /> 
          <line x1="200" y1="200" x2="200" y2="350" /> 
          <line x1="200" y1="200" x2="50" y2="200" />  
        </g>
        {SPIRAL_ELEMENTS
          .filter(element => unlockedRecipes.includes(element.recipeId))
          .map(element => (
            <g key={element.id}>
              <circle cx={element.cx} cy={element.cy} r="5" fill="#4A90E2" />
              <text x={element.textX} y={element.textY} fontSize="12" fill="#3d2b22">{element.name}</text>
            </g>
          ))
        }
      </svg>
      <p className="quill-text" style={{fontSize: '1rem', marginTop: '10px', textAlign: 'center'}}>
        The periodicity of the elements...
      </p>
    </div>
  );
};