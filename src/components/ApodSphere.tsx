import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ApodResponse } from '../api/api';

interface Props {
  position: {
    x: number;
    y: number;
    z: number;
  };
  color?: string;
  apodData: ApodResponse;
  onClick: () => void;
}

export const ApodSphere = ({ position, color = '#fdfb74', apodData, onClick }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    if (!meshRef.current) return;

    meshRef.current.userData = apodData;
  }, [apodData]);

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.002;
  });

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
  };

  return (
    <mesh
      ref={meshRef}
      position={[position.x, position.y, position.z]}
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <sphereGeometry args={[20, 64, 32]} />

      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0} roughness={0.7} />
    </mesh>
  );
};
