'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

const QualityModel = () => {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      {/* 품질을 상징하는 다이아몬드 형태 */}
      <group position={[0, 0, 0]}>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#A78BFA"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      </group>
    </mesh>
  )
}

export default QualityModel 