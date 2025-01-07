'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

export function CustomerModel() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      {/* 사람 형태를 상징하는 기하학적 모형 */}
      <group position={[0, 0, 0]}>
        {/* 머리 */}
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#4B9CD3" />
        </mesh>
        {/* 몸통 */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 1.5, 32]} />
          <meshStandardMaterial color="#4B9CD3" />
        </mesh>
      </group>
    </mesh>
  )
} 