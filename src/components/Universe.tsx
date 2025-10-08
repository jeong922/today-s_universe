import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Starfield } from './Starfield';
import { Galaxy } from './Galaxy';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// 타입 수정하기
interface Props {
  data: any[];
}

const CameraController = () => {
  useFrame(({ clock, camera }) => {
    const elapsed = clock.getElapsedTime();
    const radius = 900;
    camera.position.x = Math.cos(elapsed * 0.01) * radius;
    camera.position.z = Math.sin(elapsed * 0.01) * radius;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export const Universe = ({ data }: Props) => {
  console.log(data);
  return (
    <Canvas
      camera={{
        position: [300, 200, 800],
        fov: 75,
        near: 0.1,
        far: 4000,
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1} position={[200, 300, 200]} />

      <Starfield />
      <Galaxy
        galaxyParams={{
          count: 50000,
          size: 0.01,
          radius: 350,
          branches: 5,
          spin: 5,
          randomness: 0.15,
          randomnessPower: 1.8,
          insideColor: '#d4a15f',
          outsideColor: '#5744ff',
        }}
      />

      {/* PhotoSpheres 구현 및 이름 바꾸기*/}

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
      </EffectComposer>

      <OrbitControls enableZoom={false} enableRotate={false} />
      <CameraController />
    </Canvas>
  );
};
