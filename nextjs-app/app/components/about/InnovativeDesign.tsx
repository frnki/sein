import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { MotionValue, useTransform } from 'framer-motion'

interface InnovativeDesignProps {
  scrollProgress: MotionValue<number>
}

export function InnovativeDesign({ scrollProgress }: InnovativeDesignProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const geometryRef = useRef<THREE.TorusGeometry>(null)

  const radius = useTransform(scrollProgress, [0, 1], [3, 1])
  const tube = useTransform(scrollProgress, [0, 1], [1, 0.3])
  const radialSegments = useTransform(scrollProgress, [0, 1], [32, 8])
  const tubularSegments = useTransform(scrollProgress, [0, 1], [100, 30])
  
  const rotationSpeed = useTransform(scrollProgress, [0, 1], [0.1, 0.5])
  const scale = useTransform(scrollProgress, [0, 0.5], [1, 0.5])
  const opacity = useTransform(scrollProgress, [0, 0.5], [1, 0])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime()
      meshRef.current.rotation.x = time * rotationSpeed.get() * 0.5
      meshRef.current.rotation.y = time * rotationSpeed.get() * 0.3
      meshRef.current.scale.setScalar(scale.get())
      if (meshRef.current.material instanceof THREE.Material) {
        meshRef.current.material.opacity = opacity.get()
      }
    }

    if (geometryRef.current) {
      const r = radius.get()
      const t = tube.get()
      const rs = Math.round(radialSegments.get())
      const ts = Math.round(tubularSegments.get())
      geometryRef.current.dispose()
      geometryRef.current = new THREE.TorusGeometry(r, t, rs, ts)
      if (meshRef.current) {
        meshRef.current.geometry = geometryRef.current
      }
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} castShadow>
        <torusGeometry ref={geometryRef} args={[3, 1, 32, 100]} />
        <meshStandardMaterial 
          color="#4169E1"
          emissive="#4169E1"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          wireframe
          transparent
        />
      </mesh>
    </Float>
  )
}

