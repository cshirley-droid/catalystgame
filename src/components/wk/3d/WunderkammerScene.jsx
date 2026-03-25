// src/components/wk/3d/WunderkammerScene.jsx
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Billboard, useTexture, useCursor } from '@react-three/drei';
import { useMousewheelRotation } from '../../../hooks/useMousewheelRotation';
import { useGameStore } from '../../../store/useGameStore'; 
import { CATALOG_ITEMS } from '../../../data/catalog';

const WK_SKYBOX_URL = 'assets/wk/wunderkammerskybox.webp';

// Converts old 2D percentage coordinates to 3D world coordinates
const convert2DTo3D = (oldX, oldY) => {
  const radius = 10; 
  const angle = ((oldX / 100) * Math.PI) - (Math.PI / 2);
  const height = 4 - ((oldY / 100) * 8);

  const x = radius * Math.sin(angle);
  const z = -radius * Math.cos(angle); 
  
  return { x, y: height, z };
};

// --- NEW: THE LOADING AURA ---
const TransmutationAura = ({ placement }) => {
  const meshRef = useRef();

  // We use the exact same position math as Curio3D so the aura spawns in the right spot!
  const pos = placement.z !== undefined 
    ? [placement.x, placement.y, placement.z] 
    : [convert2DTo3D(placement.x, placement.y).x, convert2DTo3D(placement.x, placement.y).y, convert2DTo3D(placement.x, placement.y).z];

  // useFrame runs 60 times a second. We use it to animate the rotation and scale.
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Spin it around the Y axis
      meshRef.current.rotation.y += delta * 2;
      // Make it gently pulse bigger and smaller using a sine wave
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.2;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={pos}>
      {/* An octahedron looks like a cool magical crystal! */}
      <octahedronGeometry args={[1.2, 0]} />
      <meshBasicMaterial color="#FCD36A" wireframe={true} transparent opacity={0.8} />
    </mesh>
  );
};

// --- 2. INDIVIDUAL CURIO COMPONENT ---
const Curio3D = ({ itemId, placement, isDragging, onPointerDown }) => {
  const item = CATALOG_ITEMS.find(i => i.id === itemId);
  if (!item || !item.img) return null;

  const texture = useTexture(item.img);

  // Use the 3D placement, or convert old 2D saves on the fly
  const pos = placement.z !== undefined 
    ? [placement.x, placement.y, placement.z] 
    : [convert2DTo3D(placement.x, placement.y).x, convert2DTo3D(placement.x, placement.y).y, convert2DTo3D(placement.x, placement.y).z];

  const scale = item.type === 'wall_curio' ? [3, 3, 3] : [1.5, 1.5, 1.5];

  // Optional: Add a slight hover effect when grabbing
  const activeScale = isDragging ? scale.map(s => s * 1.1) : scale;

  return (
    <Billboard 
        position={pos} 
        onPointerDown={(e) => {
            e.stopPropagation(); // Prevent the click from hitting the wall behind it
            onPointerDown(itemId);
        }}
    >
      <mesh scale={activeScale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial 
            map={texture} 
            transparent={true} 
            depthTest={false} // Ensures the item always renders on top of the wall cleanly
        />
      </mesh>
    </Billboard>
  );
};

// --- NEW: REUSABLE INTERACTIVE PROP WITH GLOW ---
const InteractiveEnvProp = ({ texture, position, rotation, size, onClick, isFocused }) => {
  const [hovered, setHovered] = useState(false);
  
  // Create a combined variable for the glow condition
  const shouldGlow = hovered || isFocused; 
    
  useCursor(shouldGlow); // Change cursor if hovered or keyboard-selected

  const glowColor = '#FCD36A';
  const glowLayers = 4;

  return (
    <group position={position} rotation={rotation}>
      
      {/* THE FADING AURA */}
      {shouldGlow && ( // <-- Use shouldGlow instead of hovered
        <group position={[0, 0, -0.05]}>
          {Array.from({ length: glowLayers }).map((_, index) => {
            const scaleAmount = 1.03 + (index * 0.05);
            const layerOpacity = 0.5 - (index * 0.15);

            return (
              <mesh
                key={`glow-layer-${index}`}
                position={[0, 0, -index * 0.001]}
                scale={[scaleAmount, scaleAmount, 1]}
              >
                <planeGeometry args={size} />
                <meshBasicMaterial
                  map={texture}
                  transparent={true}
                  opacity={layerOpacity}
                  alphaTest={0.01}
                  side={THREE.DoubleSide}
                  color={glowColor}
                  depthWrite={false}
                />
              </mesh>
            );
          })}
        </group>
      )}

      {/* THE MAIN VISUAL & HITBOX */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={size} />
        <meshBasicMaterial 
          map={texture} 
          transparent={true} 
          alphaTest={0.05} 
          side={THREE.DoubleSide} 
          color="#ffffff" 
        />
      </mesh>
    </group>
  );
};

// --- 3. THE MAIN SCENE ---
export const WunderkammerScene = ({ purchasedItems, studyPlacement, onPlaceItem, onReturnToLab, onOpenDesk }) => {
  // Grab the currently selected item from Zustand (default to DESK)
  const activeStation = useGameStore(state => state.gameState?.wunderkammer?.activeStation || 'DESK');
  const skyboxTexture = useTexture(WK_SKYBOX_URL);
  const doorTexture = useTexture('assets/wk/doorback.png');
  const deskTexture = useTexture('assets/wk/wkdesk.png');
  const { gl } = useThree();

  // State to manage dragging
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [localPlacements, setLocalPlacements] = useState(studyPlacement);

  // ---> 1. ADD THESE TWO REFS <---
  const controlsRef = useRef(null);
  // We make a dummy 'isAnimating' ref that is always false, just to satisfy the hook's requirements
  const isAnimating = useRef(false);

  // ---> 2. CALL THE HOOK <---
  // We convert draggedItemId into a boolean (!!) to act as our "lock" state
  useMousewheelRotation(controlsRef, !!draggedItemId, isAnimating);

  // Keep local placements synced with the global store (e.g., when a crate is unpacked)
  useEffect(() => {
    setLocalPlacements(studyPlacement);
  }, [studyPlacement]);

  // Update cursor style
  useEffect(() => {
    gl.domElement.style.cursor = draggedItemId ? 'grabbing' : 'grab';
  }, [draggedItemId, gl]);

  // Handle the drag movement against the invisible wall
  const handlePointerMove = (e) => {
    if (draggedItemId) {
      e.stopPropagation();
      // e.point is the exact 3D coordinate where the mouse intersects the invisible sphere!
      setLocalPlacements(prev => ({
        ...prev,
        [draggedItemId]: { x: e.point.x, y: e.point.y, z: e.point.z }
      }));
    }
  };

  // When the user lets go, save to the global store
  const handlePointerUp = (e) => {
    if (draggedItemId) {
      const newPos = localPlacements[draggedItemId];
      const itemType = CATALOG_ITEMS.find(i => i.id === draggedItemId)?.type || 'desk';
      
      // Save the finalized 3D coordinate to your Zustand store
      onPlaceItem(draggedItemId, newPos, itemType);
      setDraggedItemId(null);
    }
  };

  return (
    <>
      {/* Disable camera orbit while dragging an item */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        minPolarAngle={Math.PI / 2.5} 
        maxPolarAngle={Math.PI / 1.8}
        enabled={!draggedItemId} 
      />

      <ambientLight intensity={1.5} />

      {/* The Visible Skybox */}
      <mesh>
        <sphereGeometry args={[12, 64, 64]} />
        <meshBasicMaterial map={skyboxTexture} side={THREE.BackSide} />
      </mesh>

      {/* The INVISIBLE "Sticky Wall" for Dragging */}
      <mesh 
        visible={false} 
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp} // Failsafe if they drag too fast out of bounds
      >
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial side={THREE.BackSide} />
      </mesh>

      {/* --- THE DOOR (Return to Lab) --- */}
      <InteractiveEnvProp 
        texture={doorTexture} 
        position={[-4, 0, 9]} 
        rotation={[0, 3, 0]} 
        size={[3, 6]} // Tweak size here
        onClick={onReturnToLab} 
        isFocused={activeStation === 'DOOR'}
      />

      {/* --- THE DESK (Open WkDesk) --- */}
      <InteractiveEnvProp 
        texture={deskTexture} 
        position={[-4, -3, -9]} 
        rotation={[0, 0.3, 0]} 
        size={[10, 5]} // Tweak size here
        onClick={onOpenDesk} 
        isFocused={activeStation === 'DESK'}
      />

      {/* Render Items */}
      <group>
        {purchasedItems.map((itemId) => {
          const placement = localPlacements[itemId];
          if (!placement) return null; 
          
          return (
            <Suspense key={itemId} fallback={<TransmutationAura placement={placement} />}>
              <Curio3D 
                  key={itemId} 
                  itemId={itemId} 
                  placement={placement} 
                  isDragging={draggedItemId === itemId}
                  onPointerDown={setDraggedItemId}
              />
            </Suspense>
          );
        })}
      </group>
    </>
  );
};