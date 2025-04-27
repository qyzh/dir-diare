"use client";
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Model } from '../components/xxx/Model'
export default function PersonalD() {

  return (
    <Canvas shadows dpr={[1, 2]} style={{height:500}} camera={{ fov: 20, position: [0, 2, 45], rotation: [0, 0, 0] }}>
      <Suspense fallback={null}>
        <Stage
          preset="portrait"
          intensity={1}
          environment="city"
          adjustCamera={false}
        >
          <Model />
        </Stage>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
        />
        <pointLight
          position={[-5, 5, -5]}
          intensity={0.5}
        />
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={2}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}
