/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF, useAnimations } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type GLTFResult = GLTF & {
  nodes: {
    Chapeau: THREE.SkinnedMesh;
    root: THREE.Bone;
  };
  materials: {
    ['color_main.014']: THREE.MeshStandardMaterial;
  };
};

// type ActionName = 'course_chapeau' | 'pose_chapeau';
// type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const Korrigan: React.FC<GroupProps> = (props: GroupProps) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-hat/model.gltf',
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions['pose_chapeau']?.play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group castShadow>
        <primitive object={nodes.root} />
        <skinnedMesh
          geometry={nodes.Chapeau.geometry}
          material={materials['color_main.014']}
          skeleton={nodes.Chapeau.skeleton}
          castShadow
        />
      </group>
    </group>
  );
};
export default Korrigan;
useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-hat/model.gltf',
);
