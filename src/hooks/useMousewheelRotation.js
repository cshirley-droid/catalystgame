// src/hooks/useMousewheelRotation.js
import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

export const useMousewheelRotation = (controlsRef, isZoomed, isAnimatingRef) => {
  const { camera, gl } = useThree();
  
  // NEW: We store "spin speed" in a ref so it persists across frames without causing React re-renders
  const velocity = useRef(0);

useEffect(() => {
  const handleWheel = (event) => {
    // 1. We still bail out if zoomed or if controls aren't ready
    if (isZoomed || !controlsRef.current) return;

    // 2. THE FIX: If the camera is currently lerping and the user scrolls,
    // cancel the animation so they instantly regain control.
    if (isAnimatingRef.current) {
      isAnimatingRef.current = false;
    }

    // 3. Add energy to our momentum
    velocity.current += event.deltaY * 0.0001; 
  };

  const canvas = gl.domElement;
  canvas.addEventListener('wheel', handleWheel, { passive: true });

  return () => canvas.removeEventListener('wheel', handleWheel);
}, [isZoomed, isAnimatingRef, controlsRef, gl]);

  // NEW: useFrame runs 60 times a second, drawing the animation
  useFrame(() => {
    // If we click a station or zoom in, instantly kill the momentum and bail out
    if (isZoomed || isAnimatingRef.current || !controlsRef.current) {
      velocity.current = 0;
      return;
    }

    // Only do the heavy math if the room is actually spinning
    if (Math.abs(velocity.current) > 0.0001) {
      const theta = velocity.current;
      
      const dx = controlsRef.current.target.x - camera.position.x;
      const dz = controlsRef.current.target.z - camera.position.z;

      const newX = dx * Math.cos(theta) - dz * Math.sin(theta);
      const newZ = dx * Math.sin(theta) + dz * Math.cos(theta);

      controlsRef.current.target.set(
        camera.position.x + newX,
        controlsRef.current.target.y, 
        camera.position.z + newZ
      );
      controlsRef.current.update();

      // FRICTION: Multiply velocity by 0.92 every frame. 
      // This bleeds off 8% of the speed per frame, creating a smooth deceleration curve.
      velocity.current *= 0.92; 
    } else {
      // Once it gets slow enough, snap it to a complete stop to save CPU
      velocity.current = 0;
    }
  });
};