// src/hooks/useWindowScale.js
import { useState, useEffect } from 'react';

export const useWindowScale = (baseWidth = 1600) => {
  // We'll bypass this for now to ensure a 1:1 pixel mapping for Three.js
  return 1; 
};