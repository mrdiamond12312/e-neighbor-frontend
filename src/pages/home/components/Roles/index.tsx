import { Billboard, Environment, OrbitControls, Plane, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { history, useIntl } from '@umijs/max';
import { motion } from 'framer-motion-3d';
import React, { Suspense } from 'react';

import { PATH_ADMIN, PATH_LESSOR, PATH_USER_PROFILE_EDIT } from '@/const/path';
import { ROLE } from '@/const/roles';
import Druid from '@/pages/home/components/Druid';
import OldKorrigan from '@/pages/home/components/OldKorrigan';
import YoungKorigan from '@/pages/home/components/YoungKorrigan';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export type TLandingRolesSectionProps = {
  setRoles: React.Dispatch<React.SetStateAction<ROLE>>;
};

const Roles: React.FC<TLandingRolesSectionProps> = ({ setRoles }) => {
  const { formatMessage } = useIntl();
  return (
    <Canvas
      key={'roles'}
      shadows="soft"
      camera={{ position: [(5 * Math.sqrt(3)) / 2, 5, -3.5], fov: 60 }}
    >
      <OrbitControls target={[(5 * Math.sqrt(3)) / 6, 1, 1]} maxPolarAngle={Math.PI / 2} />
      <ambientLight intensity={0.4} />
      <directionalLight castShadow position={[2.5, 8, 5]} intensity={1.5} shadow-mapSize={1024}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
      </directionalLight>
      <Suspense>
        <Environment preset="forest" environmentIntensity={1} blur={0.8} />
        <motion.group initial="hidden" animate="visible" variants={variants}>
          <YoungKorigan
            position={[0, 0, -1.5]}
            scale={3}
            rotation={[0, Math.PI / 6, 0]}
            onClick={() => history.push(PATH_USER_PROFILE_EDIT)}
            onPointerEnter={() => setRoles(ROLE.USER)}
          />
          <Billboard position={[0, 2, -1.5]}>
            <Text
              // Adjust position based on your scene
              fontSize={0.3}
              color="black"
              textAlign="center"
            >
              {formatMessage({ id: 'common.role.user', defaultMessage: 'User' })}
            </Text>
          </Billboard>

          <OldKorrigan
            position={[(5 * Math.sqrt(3)) / 2, 0, 1]}
            scale={3}
            rotation={[0, (Math.PI * 3) / 2, 0]}
            onClick={() => history.push(PATH_LESSOR)}
            onPointerEnter={() => setRoles(ROLE.LESSOR)}
          />
          <Billboard position={[(5 * Math.sqrt(3)) / 2, 2, 1]}>
            <Text
              // Adjust position based on your scene
              fontSize={0.3}
              color="black"
              textAlign="center"
            >
              {formatMessage({ id: 'common.role.lessor', defaultMessage: 'Lessor' })}
            </Text>
          </Billboard>

          <Druid
            position={[0, 0, 3.5]}
            scale={1}
            rotation={[0, (Math.PI * 5) / 6, 0]}
            onClick={() => history.push(PATH_ADMIN)}
            onPointerEnter={() => setRoles(ROLE.ADMIN)}
          />
          <Billboard position={[0, 2, 3.5]}>
            <Text
              // Adjust position based on your scene
              fontSize={0.3}
              color="black"
              textAlign="center"
            >
              {formatMessage({ id: 'common.role.admin', defaultMessage: 'Administrator' })}
            </Text>
          </Billboard>
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

export default Roles;
