/**
 * Renders a 3D scene with a cube and various lighting effects.
 *
 * This component sets up a Three.js canvas and adds several directional and point lights to create a dynamic lighting environment. It then renders a `Cube` component at the center of the scene, wrapped in a `Suspense` component to handle any asynchronous loading.
 *
 * The `Canvas` component from `@react-three/fiber` is used to create the 3D rendering context, and the `Center` component from `@react-three/drei` is used to position the `Cube` at the center of the scene.
 */
'use client'
import { Center } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Cube from './cubeNav'

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
