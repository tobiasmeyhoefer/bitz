'use client'
import { Center, OrbitControls, ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Cube from './cube'

export default function Scene() {
  return (
    <Canvas dpr={[1, 2]}>
      {/* <directionalLight position={[-5, -5, -5]} intensity={2000} /> */}

      <OrbitControls enableZoom={false} />
      <ambientLight position={[-5, -5, -5]} intensity={5} />
      <directionalLight position={[-5, 5, 5]} intensity={16} />
      <directionalLight position={[5, -5, -5]} intensity={6} />
      <directionalLight position={[5, -5, 5]} intensity={8} />
      <pointLight position={[5, 2, 2]} intensity={40} />

      <ScrollControls
        pages={0.1}
        damping={0.1}
        children={undefined}
      ></ScrollControls>
      <Suspense fallback={null}>
        <Center>
          <Cube />
        </Center>
      </Suspense>
    </Canvas>
  )
}
