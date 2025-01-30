"use client";
import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Model } from '../components/xxx/Model'
export default function PersonalD() {
  const ref = useRef()
  return (
    <Canvas shadows dpr={[1, 2]} style={{height:500}} camera={{ fov: 20 }}>
      <Suspense fallback={null}>
        <Stage preset="soft" intensity={1} environment="studio">
        false
          <Model />
        false
        </Stage>
      </Suspense>
      <OrbitControls autoRotate />
    </Canvas>
  )
}