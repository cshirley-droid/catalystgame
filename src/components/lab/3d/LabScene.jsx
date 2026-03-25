// src/components/lab/3d/LabScene.jsx
import React, { useRef, useLayoutEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Sparkles } from '@react-three/drei';
import { useMousewheelRotation } from '../../../hooks/useMousewheelRotation';
import { STATION_POSITIONS, getStationDefinition } from '../labConfig';
import { PinnedStation } from './PinnedStation';

// --- 1. NEW: DEFINE THE URL AND PRE-LOAD IT ---
const SKYBOX_URL = '/assets/lab/lab2skybox.webp';
// Calling this outside the component tells the browser to fetch the image immediately
useLoader.preload(THREE.TextureLoader, SKYBOX_URL);

// --- 1. THE CAMERA CONTROLLER ---
const CameraController = ({ activeStationId, isZoomed }) => {
  const { camera } = useThree(); // <--- Get direct access to the camera
  const controlsRef = useRef(null);
  
  const isAnimating = useRef(false);
  const isFirstRun = useRef(true); // <--- NEW: Memory flag for the first load
  
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useMousewheelRotation(controlsRef, isZoomed, isAnimating);

  useLayoutEffect(() => {
    const pos = STATION_POSITIONS[activeStationId];
    if (!pos) return;

    const [sx, sy, sz] = pos; 
    
    const center = new THREE.Vector3(0, 0, 0.1);
    const stationPos = new THREE.Vector3(sx, sy, sz);
    const spokeDirection = new THREE.Vector3().subVectors(stationPos, center).normalize();

    if (isZoomed) {
      // --- POSITION 2: ZOOMED IN ---
      const zoomDistance = 5.0; // Your custom distance
      targetPos.current.copy(stationPos).sub(spokeDirection.clone().multiplyScalar(zoomDistance));
      targetLook.current.copy(stationPos);

    } else {
      // --- POSITION 1: NEUTRAL ---
      targetPos.current.set(0, 0, 0.1); 
      targetLook.current.copy(center).add(spokeDirection.clone().multiplyScalar(1.0));
    }

    // --- THE INSTANT SNAP FIX ---
    if (isFirstRun.current) {
      // It's the first load! Teleport instantly, do NOT animate.
      camera.position.copy(targetPos.current);
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLook.current);
        controlsRef.current.update();
      }
      isFirstRun.current = false; // Turn off the flag forever
    } else {
      // It's a normal update. Turn the animation ON so it glides smoothly.
      isAnimating.current = true; 
    }

  }, [activeStationId, isZoomed, camera]);

  useFrame((state, delta) => {
    if (!isAnimating.current) return;

    state.camera.position.lerp(targetPos.current, 4 * delta);
    
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLook.current, 4 * delta);
      controlsRef.current.update();
    }

    const distPos = state.camera.position.distanceTo(targetPos.current);
    const distTarget = controlsRef.current.target.distanceTo(targetLook.current);

    if (distPos < 0.005 && distTarget < 0.005) {
      isAnimating.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enableRotate={!isZoomed} 
      rotateSpeed={0.4}
      minPolarAngle={Math.PI / 2} 
      maxPolarAngle={Math.PI / 2}
      onStart={() => { 
        isAnimating.current = false; 
      }}
    />
  );
};

// --- 2. THE BACKGROUND (Click-Catcher) ---
const SkyboxRoom = ({ isZoomed, onSelectStation }) => {
  // It will grab the pre-loaded texture from the cache instantly!
  const skyboxTexture = useLoader(THREE.TextureLoader, SKYBOX_URL);

  const handleBackgroundClick = (event) => {
    if (!isZoomed) return;
    if (event.delta > 2) return; // It was a drag, do nothing

    event.stopPropagation();
    onSelectStation(null); // True click: zoom out
  };

  return (
    <mesh onClick={handleBackgroundClick}>
      <sphereGeometry args={[12, 64, 64]} />
      <meshBasicMaterial map={skyboxTexture} side={THREE.BackSide} />
    </mesh>
  );
};

// --- 3. THE MAIN SCENE ---
export const LabScene = ({ activeStationId, isZoomed, onSelectStation, currentEra, cameraTarget }) => {
  return (
    <>
      <CameraController 
        activeStationId={activeStationId} 
        isZoomed={isZoomed} 
        cameraTarget={cameraTarget} 
      />

      <ambientLight intensity={1.5} />
      <pointLight position={[0, 5, 0]} intensity={50} distance={200} decay={1.5} />
      
      <Sparkles count={300} scale={[12, 8, 12]} size={3} speed={0.2} opacity={0.15} color="#fff8e7" noise={1} />
      
      <SkyboxRoom isZoomed={isZoomed} onSelectStation={onSelectStation} />

      <group>
        {Object.keys(STATION_POSITIONS).map((stationId) => {
          const stationData = STATION_POSITIONS[stationId];
          if (!stationData) return null;

          const [x, y, z, rotY, width, height] = stationData;
          const stationDef = getStationDefinition(stationId, currentEra);
          if (!stationDef) return null;

          const size = height !== undefined ? [width, height] : [width, width];

          return (
            <PinnedStation
              key={stationId}
              id={stationId}
              textureUrl={stationDef.img}
              position={[x, y, z]}
              rotation={[0, rotY || 0, 0]}
              size={size}
              onClick={onSelectStation}
              isGlowing={!isZoomed && stationId === activeStationId}
              isInteractive={stationDef.isInteractive !== false}
              isBillboard={stationDef.isBillboard}
            />
          );
        })}
      </group>
    </>
  );
};