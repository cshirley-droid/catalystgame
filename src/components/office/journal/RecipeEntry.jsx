import React from 'react';
import { ITEMS } from '../../../data/items';
import { ItemIcon } from '../../ItemIcon';

// We pass the "recipe" object in as a prop so this component knows what to draw
export function RecipeEntry({ recipe }) {
  const outputItem = ITEMS[recipe.output];
  const stationName = recipe.station.charAt(0).toUpperCase() + recipe.station.slice(1).toLowerCase();
  const fuelName = recipe.fuel ? (ITEMS[recipe.fuel]?.name || recipe.fuel) : null;

  return (
    <div className="journal-entry unlocked-ink-bleed">
      <div className="recipe-equation-vertical">
        <div className="equation-row inputs-row">
          {recipe.inputs.map((input, index) => {
            const item = ITEMS[input.id];
            return (
              <React.Fragment key={index}>
                <div className="equation-item">
                  {item && <ItemIcon icon={item.icon} size="20px" />}
                  <span>{item ? item.name : "???"}</span>
                </div>
                {index < recipe.inputs.length - 1 && <span className="math-symbol">+</span>}
              </React.Fragment>
            );
          })}
        </div>
        
        <div className="equation-row station-row">
          <div className="station-item">
            <span className="station-name">({stationName}{fuelName ? ` + ${fuelName}` : ''})</span>
          </div>
          <span className="math-symbol vertical-arrow">↓</span>
        </div>
        
        <div className="equation-row output-row">
          <div className="equation-item output-item">
            {outputItem && <ItemIcon icon={outputItem.icon} size="24px" />}
            <span className="output-name">{outputItem?.name}</span>
          </div>
        </div>
      </div>
      
      <p className="quill-text">{recipe.science}</p>
    </div>
  );
}