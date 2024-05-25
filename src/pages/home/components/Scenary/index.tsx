import { Environment, OrbitControls, Plane } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import React, { Suspense } from 'react';

import Bookshelf from '@/pages/home/components/Bookshelf';
import Car from '@/pages/home/components/Car';
import Korrigan from '@/pages/home/components/Korrigan';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Scenary: React.FC = () => {
  return (
    <Canvas shadows="soft" camera={{ position: [-10, 2, 8], fov: 20 }}>
      <OrbitControls
        target={[0.1, 1.8, 1]}
        enableRotate={false}
        enablePan={false}
        enableZoom={false}
      />
      <ambientLight intensity={0.4} />
      <directionalLight castShadow position={[2.5, 8, 5]} intensity={1.5} shadow-mapSize={1024}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
      </directionalLight>
      <Suspense>
        <Environment preset="forest" environmentIntensity={1} blur={0.8} />
        <motion.group initial="hidden" animate="visible" variants={variants}>
          <Bookshelf position={[2, 0, 2.2]} scale={1.5} />
          <Car />
          <Korrigan position={[0, 0, 3.5]} scale={3} rotation={[0, (Math.PI * 2) / 3, 0]} />
        </motion.group>
      </Suspense>

      <Plane position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} args={[50, 50]} receiveShadow>
        <motion.meshStandardMaterial
          initial="hidden"
          animate="visible"
          variants={variants}
          attach="material"
          color="#5eead4"
        />
      </Plane>
    </Canvas>
  );
};

export default Scenary;
