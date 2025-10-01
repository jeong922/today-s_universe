import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Starfield } from './Starfield';

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
  return (
    <Canvas camera={{ position: [300, 200, 800], fov: 75 }}>
      {/* Ambient + Directional Light */}
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1} position={[200, 300, 200]} />

      <Starfield />

      {/* PhotoSpheres 구현 및 이름 바꾸기*/}

      <OrbitControls enableZoom={false} />
      <CameraController />
    </Canvas>
  );
};
