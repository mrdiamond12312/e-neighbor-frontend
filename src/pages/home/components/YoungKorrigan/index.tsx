import { useGLTF, useAnimations } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import React, { createRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type GLTFResult = GLTF & {
  nodes: {
    Jeune: THREE.SkinnedMesh;
    root: THREE.Bone;
  };
  materials: {
    ['color_main.003']: THREE.MeshStandardMaterial;
  };
};

// type ActionName = 'course_jeune' | 'pose_jeune';
// type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const YoungKorigan: React.FC<GroupProps> = (props: GroupProps) => {
  const group = createRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/young-korrigan/model.gltf',
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions['pose_jeune']?.play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[0, 0.03, 0]} scale={0.15}>
        <primitive object={nodes.root} />
        <skinnedMesh
          geometry={nodes.Jeune.geometry}
          material={materials['color_main.003']}
          skeleton={nodes.Jeune.skeleton}
        />
      </group>
    </group>
  );
};

export default YoungKorigan;

useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/young-korrigan/model.gltf',
);
