import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Starfield } from './Starfield';
import { Galaxy } from './Galaxy';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import type { ApodResponse } from '../api/api';
import { ApodSphere } from './ApodSphere';
import { useState } from 'react';
import { Detail } from './Detail';
import { ModalPortal } from './ModalPortal';
import { useApodData } from '../hooks/useApodData';

const positions = [
  { x: 500, y: 100, z: 100 },
  { x: 350, y: 100, z: 300 },
  { x: -400, y: -60, z: 600 },
  { x: -500, y: 300, z: 200 },
  { x: 200, y: -100, z: -600 },
];

const colors = ['#fffd98', '#8ddbff', '#f885a8', '#b3f774', '#c9a7ff'];

// const CameraController = () => {
//   useFrame(({ clock, camera }) => {
//     const elapsed = clock.getElapsedTime();
//     const radius = 900;
//     camera.position.x = Math.cos(elapsed * 0.01) * radius;
//     camera.position.z = Math.sin(elapsed * 0.01) * radius;
//     camera.lookAt(0, 0, 0);
//   });

//   return null;
// };

export const Universe = () => {
  const { data } = useApodData(5);

  const [selectedData, setSelectedData] = useState<ApodResponse | null>(null);

  const onClick = (data: ApodResponse) => {
    setSelectedData(data);
  };

  const onClose = () => {
    setSelectedData(null);
  };

  return (
    <>
      <Canvas
        camera={{
          position: [300, 200, 1000],
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

        {data.slice(0, positions.length).map((item, index) => (
          <ApodSphere
            key={item.date}
            position={positions[index]}
            color={colors[index]}
            apodData={item}
            onClick={() => onClick(item)}
          />
        ))}

        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.4} luminanceSmoothing={0.9} />
        </EffectComposer>

        <OrbitControls
          enableZoom={true}
          minDistance={400}
          maxDistance={1500}
          zoomSpeed={1.1}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.05}
        />

        {/* <CameraController /> */}
      </Canvas>

      {selectedData && (
        <ModalPortal>
          <Detail apodData={selectedData} onClose={onClose} />
        </ModalPortal>
      )}
    </>
  );
};
