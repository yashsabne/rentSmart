import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Html } from '@react-three/drei';
import * as THREE from 'three'; 

export const GiftBoxAnimation = ({...props }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/gift_loot_box_thing_wip.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions['Take 001']) { 
      actions['Take 001']
        .reset()
        .setLoop(THREE.LoopOnce, 1)  
        .setEffectiveTimeScale(0.5) 
        .clampWhenFinished = true;  
      actions['Take 001'].play();

    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="SceneRoot">
        <group name="ModelRoot" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="GiftBoxContainer" rotation={[Math.PI / 2, 0, 0]}>
            <group name="BoxStructure">
              <group name="BoxRootNode">
                <group name="GiftBoxMesh" />
                <group name="GiftBoxJoints" rotation={[0, -Math.PI / 2, 0]}>
                  <group name="JointsContainer">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="GiftBoxMeshObject"
                      geometry={nodes.Object_9.geometry}
                      material={materials.blinn1}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    <group name="MeshContainer" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/models/gift_loot_box_thing_wip.glb');

export default GiftBoxAnimation;
