'use client'

import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { AnimationMixer, Group, LoopOnce, MathUtils } from 'three'

useGLTF.preload('/bitz_explosion_normal.glb')

export default function Cube() {
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { damping: 1, stiffness: 20 })
  const group = useRef<Group>(null)
  const { animations, scene } = useGLTF('/bitz_explosion_normal.glb')
  let mixer = new AnimationMixer(scene)

  const handleClick = () => {
    animations.forEach((clip) => {
      const action = mixer.clipAction(clip)
      action.reset().play()
      action.clampWhenFinished = true
      action.loop = LoopOnce
      action.timeScale = 9
      action.fadeOut(6)
    })
  }

  useFrame((state, delta) => {
    mixer.update(delta)
    group.current?.rotateY(MathUtils.degToRad(0.5))
  })
  const { actions } = useAnimations(animations, scene)

  return (
    <group
      onPointerUp={() => motionVal.set(0)}
      onPointerDown={() => motionVal.set(1)}
      ref={group}
      onClick={handleClick}
    >
      <primitive object={scene} />
    </group>
  )
}
