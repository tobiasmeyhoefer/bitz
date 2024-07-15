'use client'
import { Center, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Cube from './cube'

export default function Scene() {
  return (
    <Canvas className="" id="myCanvas" dpr={[1, 2]} camera={{ fov: 100 }}>
      <OrbitControls enableZoom={false} />
      <ambientLight position={[-5, -5, -5]} intensity={5} />
      <directionalLight position={[-5, 5, 5]} intensity={16} />
      <directionalLight position={[5, -5, -5]} intensity={6} />
      <directionalLight position={[5, -5, 5]} intensity={8} />
      <pointLight position={[5, 2, 2]} intensity={40} />

      <Center>
        <Cube />
      </Center>
    </Canvas>
  )
}
