import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  galaxyParams: {
    count: number;
    size: number;
    radius: number;
    branches: number;
    spin: number;
    randomness: number;
    randomnessPower: number;
    insideColor: string;
    outsideColor: string;
  };
}

export const Galaxy = ({ galaxyParams }: Props) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const { positions, colors, scales } = useMemo(() => {
    const positions = new Float32Array(galaxyParams.count * 3);
    const colors = new Float32Array(galaxyParams.count * 3);
    const scales = new Float32Array(galaxyParams.count);

    const colorInside = new THREE.Color(galaxyParams.insideColor);
    const colorOutside = new THREE.Color(galaxyParams.outsideColor);

    for (let i = 0; i < galaxyParams.count; i++) {
      const idx = i * 3;

      const r = Math.pow(Math.random(), 2.0) * galaxyParams.radius;
      const branch = i % galaxyParams.branches;
      const branchAngle = (branch / galaxyParams.branches) * Math.PI * 2;
      const spinAngle = (r * galaxyParams.spin) / galaxyParams.radius;

      const randomX =
        Math.pow(Math.random(), galaxyParams.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        galaxyParams.randomness *
        r;
      const randomY =
        Math.pow(Math.random(), galaxyParams.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        galaxyParams.randomness *
        r;
      const randomZ =
        Math.pow(Math.random(), galaxyParams.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        galaxyParams.randomness *
        r;

      positions[idx] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[idx + 1] = randomY;
      positions[idx + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, r / galaxyParams.radius);

      colors[idx] = mixedColor.r;
      colors[idx + 1] = mixedColor.g;
      colors[idx + 2] = mixedColor.b;

      scales[i] = Math.random() * 0.8 + 0.2;
    }

    return { positions, colors, scales };
  }, [galaxyParams]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} rotation={[THREE.MathUtils.degToRad(5), 0, THREE.MathUtils.degToRad(5)]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach='attributes-position' args={[positions, 3]} />
          <bufferAttribute attach='attributes-color' args={[colors, 3]} />
          <bufferAttribute attach='attributes-scale' args={[scales, 1]} />
        </bufferGeometry>

        <shaderMaterial
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          uniforms={{
            size: { value: galaxyParams.size * Math.min(window.devicePixelRatio, 2) },
          }}
          vertexShader={`
            uniform float size;
            attribute float scale;
            varying vec3 vColor;
            void main() {
              vColor = color;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (1.0 / -mvPosition.z) * scale;
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              gl_FragColor = vec4(vColor, 1.0);
            }
          `}
        />
      </points>
    </group>
  );
};
