// src/components/office/journal/Journal.jsx
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './Journal.css';
import { useGameStore } from '../../../store/useGameStore'; // Adjust path if needed
import { RECIPES } from '../../../data/recipes';
import { ITEMS } from '../../../data/items';
import { ItemIcon } from '../../ItemIcon';
import { paginateRecipes } from './journalUtils';
import { RecipeEntry } from './RecipeEntry';
import { Page, Cover } from './JournalPages';
import { STATION_TO_TAB, TAB_LOCATIONS } from './journalConfig';
import { HinrichsSpiral } from './HinrichsSpiral';
import { ClavisMechanica } from './ClavisMechanica';

// 1. Remove ALL props!
export function Journal() {
  
// 2. Pull exactly what we need from Zustand
const gameState = useGameStore(state => state.gameState);
const setGameState = useGameStore(state => state.setGameState);
const unlockedRecipes = useGameStore(state => state.unlockedRecipes);
  
  // 3. Derive our local variables from the global state
  const officeState = gameState.office || {};
  const labState = gameState.lab || {};
  const isFocused = labState.view === 'popup' && labState.activeStation === 'JOURNAL';
  const currentPage = officeState.journalPage || 0;

  const bookRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // We useMemo here to ensure HTMLFlipBook only gets this starting page value ONCE when it mounts.
  const initialPage = useMemo(() => officeState?.journalPage || 0, []);
  useEffect(() => { setMounted(true); }, []);
  const jumpToPage = (index) => {
    if (bookRef.current) bookRef.current.pageFlip().flip(index);
  };
const handleFlip = (e) => {
    // Use the functional update to safely record the new page globally
    setGameState(prev => ({
      ...prev,
      office: { ...prev.office, journalPage: e.data }
    }));
  };

  const jumpToNextSection = useCallback(() => {
    if (!bookRef.current) return;
    const nextTab = TAB_LOCATIONS.find(t => t.pageIndex > currentPage + 1);
    if (nextTab) {
      jumpToPage(nextTab.pageIndex);
    } else if (currentPage < 33) {
      jumpToPage(33);
    }  }, [currentPage, TAB_LOCATIONS]);

  const jumpToPrevSection = useCallback(() => {
    if (!bookRef.current) return;
    const prevTab = [...TAB_LOCATIONS].reverse().find(t => t.pageIndex < currentPage - 1);
    if (prevTab) jumpToPage(prevTab.pageIndex);
    else jumpToPage(0); 
  }, [currentPage, TAB_LOCATIONS]);

  // --- KEYBOARD LISTENER ---
  useEffect(() => {
    if (!isFocused) return; 

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault();

      switch(e.key) {
        case 'ArrowRight':
          if (bookRef.current) bookRef.current.pageFlip().flipNext();
          break;
        case 'ArrowLeft':
          if (bookRef.current) bookRef.current.pageFlip().flipPrev();
          break;
        case 'ArrowDown':
          jumpToNextSection();
          break;
        case 'ArrowUp':
          jumpToPrevSection();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, jumpToNextSection, jumpToPrevSection]);

  const bookElements = useMemo(() => {
    
    // 1. Organize Recipes
    const buckets = { Mechanikos: [], Pyrotechny: [], Biomancy: [] };
    RECIPES.forEach(recipe => {
      if (unlockedRecipes.includes(recipe.id)) {
        const tab = STATION_TO_TAB[recipe.station] || "Mechanikos";
        buckets[tab].push(recipe);
      }
    });

    // 3. Pre-Calculate Tabs
    const tabsByPage = {};
    TAB_LOCATIONS.forEach(tab => {
      let rightPageIndex = tab.pageIndex % 2 === 0 ? tab.pageIndex : tab.pageIndex - 1;
      let leftPageIndex = rightPageIndex + 1;

      if (!tabsByPage[rightPageIndex]) tabsByPage[rightPageIndex] = [];
      if (!tabsByPage[leftPageIndex]) tabsByPage[leftPageIndex] = [];

      tabsByPage[rightPageIndex].push(tab);
      tabsByPage[leftPageIndex].push(tab);
    });

    // 4. Create Empty Book Structure (Hardcoded to 34! Extremely important to avoid react-pageflip crashes and to maintain diegetic UI)
    const pages = Array.from({ length: 34 }, (_, i) => {
      const isRightSide = i % 2 === 0;
      const side = isRightSide ? 'right' : 'left';
      const pageTabs = tabsByPage[i] || [];

      return (
        <Page key={`page-${i}`} number={i > 1 && i < 32 ? i - 1 : null} tabs={pageTabs} side={side} onTabClick={jumpToPage} />
      );
    });

    // 5. Overwrite Static Pages
    pages[0] = <Cover key="front" className="side-right"><div className="emboss-area-top"><h1 className="embossed-title">JOURNAL</h1></div></Cover>;
    pages[1] = <Page key="inside-f" className="inside-cover-paper" side="left" />;
    
    pages[2] = (
      <Page key="p1" number={1} tabs={tabsByPage[2]} side="right" onTabClick={jumpToPage}>
        <div style={{textAlign: 'center', marginTop: '40%'}}>
          <p className="foreword-text">Property of the Alchemist</p>
          <hr style={{width: '50%', margin: '20px auto', borderColor: '#8b7355'}}/>
        </div>
      </Page>
    );

    // 6. Fill Sections safely into Hardcoded Ranges
    const fillSection = (bucketName, startIndex, endIndex) => {
      const recipes = buckets[bucketName];
      const chunks = paginateRecipes(recipes);

      if (chunks.length > (endIndex - startIndex + 1)) {
        console.warn(`[Journal] Heads up! ${bucketName} has overflowed its physical allocated pages!`);
      }

      for (let i = startIndex; i <= endIndex; i++) {
        const pageNum = i - 1; 
        const isRightSide = i % 2 === 0;
        const side = isRightSide ? 'right' : 'left';
        const pageTabs = tabsByPage[i] || [];
        
        const chunkIndex = i - startIndex;
        const chunk = chunks[chunkIndex];

        pages[i] = (
          <Page key={`page-${i}`} number={pageNum} tabs={pageTabs} side={side} onTabClick={jumpToPage}>
            {i === startIndex && <h2 className="category-header">{bucketName}</h2>}
            {chunk && chunk.map(recipe => <RecipeEntry key={recipe.id} recipe={recipe} />)}
          </Page>
        );
      }
    };

    fillSection("Mechanikos", 4, 7);   
    fillSection("Pyrotechny", 8, 18);  
    fillSection("Biomancy", 19, 29);   

    pages[30] = (
      <Page key="p30" number={29} tabs={tabsByPage[30]} side="right" onTabClick={jumpToPage}>
        <HinrichsSpiral unlockedRecipes={unlockedRecipes} />
      </Page>
    );

    pages[32] = (
      <Page key="p32" number={31} tabs={tabsByPage[32] || []} side="right" onTabClick={jumpToPage}>
        <ClavisMechanica />
      </Page>
    );

    pages[33] = (
      <Cover key="back" className="cover-back side-left">
        <div className="emboss-area-top">
           <svg viewBox="0 0 100 100" className="embossed-svg-symbol mystical-glow" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M35 20 Q50 35 65 20" /><circle cx="50" cy="42" r="12" /><circle cx="50" cy="42" r="1.5" fill="currentColor" /><line x1="50" y1="54" x2="50" y2="82" /><line x1="35" y1="68" x2="65" y2="68" /><path d="M35 82 Q40 72 50 82 Q60 72 65 82" />
          </svg>
        </div>
      </Cover>
    );

    return pages;
  }, [unlockedRecipes]);

  if (!mounted) return null;

  // --- Calculate Background Tabs ---
  const backgroundTabsRight = [];
  const backgroundTabsLeft = [];

  TAB_LOCATIONS.forEach(tab => {
    const rightPage = tab.pageIndex % 2 === 0 ? tab.pageIndex : tab.pageIndex - 1;
    const leftPage = rightPage + 1;
    const isVisibleOnSpread = (currentPage === rightPage - 1) || (currentPage === leftPage);

    if (!isVisibleOnSpread) {
      if (currentPage < rightPage - 1) backgroundTabsRight.push(tab);
      else backgroundTabsLeft.push(tab); 
    }
  });

  return (
    <div className="journal-outer-wrapper">
      <div 
        className="journal-container" 
        style={{ 
          position: 'relative', 
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{
          position: 'absolute', width: '900px', height: '600px',
          transform: 'translateX(0px)', pointerEvents: 'none', zIndex: 0 
        }}>
          {backgroundTabsRight.map(cat => (
            <div key={`bg-${cat.name}`} className="category-tabs tabs-right" style={{ right: '5px', left: 'auto' }}>
              <button 
                className={`physical-tab tab-${cat.name.toLowerCase()}`}
                style={{ marginTop: `${cat.order * 102}px`, pointerEvents: 'auto' }}
                onClick={(e) => { e.stopPropagation(); jumpToPage(cat.pageIndex); }}
              >
                <span className="tab-text">{cat.name}</span>
              </button>
            </div>
          ))}

          {backgroundTabsLeft.map(cat => (
            <div key={`bg-${cat.name}`} className="category-tabs tabs-left" style={{ left: '5px', right: 'auto' }}>
              <button 
                className={`physical-tab tab-${cat.name.toLowerCase()}`}
                style={{ marginTop: `${cat.order * 102}px`, pointerEvents: 'auto' }}
                onClick={(e) => { e.stopPropagation(); jumpToPage(cat.pageIndex); }}
              >
                <span className="tab-text">{cat.name}</span>
              </button>
            </div>
          ))}
        </div>

        <HTMLFlipBook
          key="fixed-book-v2" 
          width={450} 
          height={600}
          size="fixed" 
          showCover={true}
          flippingTime={800}
          className="book-canvas"
          ref={bookRef}
          onFlip={handleFlip}
          startPage={initialPage}
          style={{ pointerEvents: 'none' }}
          showPageCorners={false}
        >
          {bookElements}
        </HTMLFlipBook>
      </div>
    </div>
  );
}