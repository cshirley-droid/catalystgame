// src/components/office/journal/JournalPages.jsx
import React from 'react';

// We add 'export' here
export const Page = React.forwardRef(({ children, number, className = "", tabs = [], onTabClick, side }, ref) => {
  return (
    <div className={`page-content ${className} side-${side}`} ref={ref} data-density="soft">
      <div className="page-paper">
        <div className="parchment-spots" />
        
        {tabs.length > 0 && (
          <div className={`category-tabs tabs-${side}`}>
            {tabs.map((cat) => (
              <button 
                key={cat.name} 
                className={`physical-tab tab-${cat.name.toLowerCase()}`}
                style={{ marginTop: `${cat.order * 102}px` }} 
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClick(cat.pageIndex);
                }}
              >
                <span className="tab-text">{cat.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="content-wrapper">{children}</div>
        {number && <span className="page-number">{number}</span>}
      </div>
    </div>
  );
});

// We add 'export' here too
export const Cover = React.forwardRef(({ children, className = "" }, ref) => (
  <div className={`page-cover crimson-leather ${className}`} ref={ref} data-density="hard">
    <div className="leather-grain" />
    <div className="cover-content">{children}</div>
  </div>
));