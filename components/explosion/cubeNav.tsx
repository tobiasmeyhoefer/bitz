'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Group, MathUtils } from 'three'

useGLTF.preload('/bitz_transparent.glb')

export default function Cube() {
  const motionVal = useMotionValue(0)
  const group = useRef<Group>(null)
  const { scene } = useGLTF('/bitz_transparent.glb')

  useFrame((state, delta) => {
    group.current?.rotateY(MathUtils.degToRad(0.5))
  })

  return (
    <group onPointerUp={() => motionVal.set(0)} onPointerDown={() => motionVal.set(1)} ref={group}>
      <primitive object={scene} />
    </group>
  )
}
