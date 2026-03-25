// src/components/ItemIcon.jsx
import React from 'react';

export function ItemIcon({ icon, size = '100%', className = '' }) {
  // 1. Safety Check
  if (!icon) return null;

  // 2. Detect if it's an Image URL, local path, or an Emoji string
  const isUrl = icon.startsWith('http') || 
  icon.startsWith('blob:') || 
  icon.includes('githubusercontent') ||
  icon.startsWith('/') || // <-- THE MAGIC FIX!
  icon.endsWith('.png');

  // 3. Render Image (Watercolor Style)
  if (isUrl) {
    return (
      <img 
        src={icon} 
        alt="item" 
        className={className}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          // THE MAGIC TRICK: Makes white backgrounds transparent
          mixBlendMode: 'multiply', 
          filter: 'contrast(110%)',
          display: 'block'
        }} 
      />
    );
  }

  // 4. Render Emoji (Text Style) - Fallback
  return (
    <span 
      className={className}
      style={{ 
        fontSize: typeof size === 'number' ? size : '2rem', 
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size
      }}
    >
      {icon}
    </span>
  );
}