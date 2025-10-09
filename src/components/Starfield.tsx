import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const STAR_COUNT = 1000;
const PALETTE: [number, number, number][] = [
  [0.7, 0.8, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 0.95, 0.7],
  [1.0, 0.85, 0.5],
  [1.0, 0.6, 0.3],
  [1.0, 0.4, 0.4],
  [0.5, 0.7, 1.0],
];

export const Starfield = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const geometry = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const phases = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 2000;
      positions[idx + 1] = (Math.random() - 0.5) * 2000;
      positions[idx + 2] = (Math.random() - 0.5) * 2000;

      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      colors[idx] = color[0];
      colors[idx + 1] = color[1];
      colors[idx + 2] = color[2];

      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    return geometry;
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexColors
        uniforms={{
          uTime: { value: 0.0 },
          uSize: { value: 6.0 },
        }}
        vertexShader={`
          uniform float uTime;
          uniform float uSize;
          attribute float phase;
          varying vec3 vColor;

          void main() {
            float flicker = 0.7 + sin(uTime + phase) * 0.3;
            vColor = color * flicker;

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = uSize * (300.0 / -mvPosition.z);
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            gl_FragColor = vec4(vColor, 1.0 - d * 2.0);
          }
        `}
      />
    </points>
  );
};
