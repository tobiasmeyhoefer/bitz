'use client'
import { Center } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Cube from './cube-nav'

export default function Scene() {
  return (
    <Canvas id="myCanvas" dpr={[1, 2]}>
      <ambientLight position={[-5, -5, -5]} intensity={5} />
      <directionalLight position={[-5, 5, 5]} intensity={16} />
      <directionalLight position={[5, -5, -5]} intensity={6} />
      <directionalLight position={[5, -5, 5]} intensity={8} />
      <pointLight position={[5, 2, 2]} intensity={40} />

      <Suspense fallback={null}>
        <Center>
          <Cube />
        </Center>
      </Suspense>
    </Canvas>
  )
}
