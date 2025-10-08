import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { ApodResponse } from '../api/api';
import { useFrame } from '@react-three/fiber';

interface Props {
  position: {
    x: number;
    y: number;
    z: number;
  };
  color?: string;
  apodData: ApodResponse;
}

export const ApodSphere = ({ position, color = '#fdfb74', apodData }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.5,
    metalness: 0,
    roughness: 0.7,
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData = apodData;
    }
  }, [apodData]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} position={[position.x, position.y, position.z]} material={material}>
      <sphereGeometry args={[20, 64, 32]} />
    </mesh>
  );
};
