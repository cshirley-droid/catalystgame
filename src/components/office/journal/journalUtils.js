// src/components/office/journal/journalUtils.js

/**
 * Calculates how many recipes can fit on a single page based on text length.
 * Returns an array of arrays (pages containing recipes).
 */
 export function paginateRecipes(recipes) {
  const chunks = [];
  let currentPageItems = [];
  let currentHeight = 0; 
  const MAX_SAFE_HEIGHT = 420; // Pixel limit before overflow

  recipes.forEach((recipe) => {
    // Estimate the height of the recipe based on character count
    const charCount = recipe.science ? recipe.science.length : 0;
    const estimatedLines = Math.max(1, Math.ceil(charCount / 40)); 
    const entryHeight = 75 + (estimatedLines * 20) + 25; 

    const isFirstOfSection = chunks.length === 0 && currentPageItems.length === 0;
    const headerHeight = isFirstOfSection ? 60 : 0;
    const totalSpaceNeeded = entryHeight + headerHeight;

    // If adding this recipe exceeds our safe height, push the current chunk and start a new one
    if (currentHeight + totalSpaceNeeded > MAX_SAFE_HEIGHT && currentPageItems.length > 0) {
      chunks.push(currentPageItems);
      currentPageItems = [recipe];
      currentHeight = entryHeight; 
    } else {
      currentPageItems.push(recipe);
      currentHeight += totalSpaceNeeded;
    }
  });

  // Don't forget to add the very last page of items!
  if (currentPageItems.length > 0) {
    chunks.push(currentPageItems);
  }
  
  return chunks; 
}