'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

export function InnovationModel() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      {/* 혁신을 상징하는 나선형 구조 */}
      <group position={[0, 0, 0]}>
        {[...Array(8)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(i * 0.7) * 0.5,
              i * 0.2 - 0.8,
              Math.sin(i * 0.7) * 0.5
            ]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial 
              color="#60A5FA"
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    </mesh>
  )
} 