// src/components/lab/3d/PinnedStation.jsx
import React, { useState } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useCursor, Billboard } from '@react-three/drei';

export const PinnedStation = ({ 
  id, 
  textureUrl, 
  position, 
  rotation, 
  size, 
  onClick, 
  isGlowing, 
  isInteractive, 
  isBillboard 
}) => {
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  const [hovered, setHovered] = useState(false);
  
  useCursor(isInteractive && hovered); 

  const shouldGlow = isGlowing || (isInteractive && hovered);
  const glowColor = '#FCD36A';

  const width = size[0];
  const height = size[1] || size[0];
  const hitBoxArgs = [width * 1, height * 1, 1]; 

// THE FADING AURA: Creates 4 stacked layers, getting larger and more transparent
const glowLayers = 4;
const glowMesh = shouldGlow ? (
  <group position={[0, 0, -0.05]}>
    {Array.from({ length: glowLayers }).map((_, index) => {
      // As index goes up (0, 1, 2, 3):
      // Scale increases: 1.03, 1.06, 1.09, 1.12
      const scaleAmount = 1.03 + (index * 0.05); 
      // Opacity decreases: 0.5, 0.35, 0.2, 0.05
      const layerOpacity = 0.5 - (index * 0.15); 

      return (
        <mesh 
          key={`glow-layer-${index}`} 
          // Push each layer microscopically further back so they don't overlap exactly
          position={[0, 0, -index * 0.001]} 
          scale={[scaleAmount, scaleAmount, 1]}
        >
          <planeGeometry args={size} />
          <meshBasicMaterial 
            map={texture} 
            transparent={true} 
            opacity={layerOpacity}
            alphaTest={0.01} // Lowered slightly to ensure maximum edge visibility
            side={THREE.DoubleSide} 
            color={glowColor} 
            depthWrite={false} // Prevents graphical glitching between the transparent layers
          />
        </mesh>
      );
    })}
  </group>
) : null;

  const visualMesh = (
    <mesh>
      <planeGeometry args={size} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        alphaTest={0.05} 
        side={THREE.DoubleSide} 
        color="#ffffff" 
      />
    </mesh>
  );

  const interactiveMesh = isInteractive ? (
    <mesh 
      onClick={(e) => {
        e.stopPropagation(); 
        if (onClick) onClick(id);
      }}
      onPointerOver={(e) => { 
        e.stopPropagation(); 
        setHovered(true); 
      }}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={hitBoxArgs} />
      <meshBasicMaterial 
        visible={false} 
        color="red" 
        wireframe={false} 
        transparent={true} 
        opacity={0.5} 
      />
    </mesh>
  ) : null;

  // Render using Drei's Billboard if flagged, otherwise standard group
  if (isBillboard) {
    return (
      <Billboard position={position}>
        {glowMesh}
        {visualMesh}
        {interactiveMesh}
      </Billboard>
    );
  }

  return (
    <group position={position} rotation={rotation}>
      {glowMesh}
      {visualMesh}
      {interactiveMesh}
    </group>
  );
};