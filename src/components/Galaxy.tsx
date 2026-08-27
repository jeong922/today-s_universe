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

    // 반복문마다 Color 객체를 새로 생성하지 않고 하나를 재사용
    const mixedColor = new THREE.Color();

    for (let i = 0; i < galaxyParams.count; i++) {
      const idx = i * 3;

      // 중심에 별이 더 많이 모이도록 거리 분포 조정
      const r = Math.pow(Math.random(), 2) * galaxyParams.radius;

      // 별을 나선 팔 중 하나에 배치
      const branch = i % galaxyParams.branches;
      const branchAngle = (branch / galaxyParams.branches) * Math.PI * 2;

      // 중심에서 멀어질수록 더 많이 회전
      const spinAngle = (r * galaxyParams.spin) / galaxyParams.radius;

      // 나선 형태가 너무 일정하지 않도록 랜덤 오프셋 추가
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

      // 매 반복마다 insideColor부터 다시 시작해서
      // 중심 거리 비율에 따라 outsideColor와 보간
      mixedColor.copy(colorInside).lerp(colorOutside, r / galaxyParams.radius);

      colors[idx] = mixedColor.r;
      colors[idx + 1] = mixedColor.g;
      colors[idx + 2] = mixedColor.b;

      // 별마다 크기에 약간의 차이 추가
      scales[i] = Math.random() * 0.8 + 0.2;
    }

    return {
      positions,
      colors,
      scales,
    };
  }, [galaxyParams]);

  const uniforms = useMemo(
    () => ({
      size: {
        value: galaxyParams.size * Math.min(window.devicePixelRatio, 2),
      },
    }),
    [galaxyParams.size],
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.02;
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
          uniforms={uniforms}
          vertexShader={`
            uniform float size;
            attribute float scale;
            varying vec3 vColor;
            void main() {
              vColor = color;
              vec4 mvPosition =
                modelViewMatrix * vec4(position, 1.0);
              gl_PointSize =
                size *
                (1.0 / -mvPosition.z) *
                scale;
              gl_Position =
                projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            void main() {
              float dist =
                length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) {
                discard;
              }
              gl_FragColor =
                vec4(vColor, 1.0);
            }
          `}
        />
      </points>
    </group>
  );
};
