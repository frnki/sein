import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MotionValue, useTransform } from 'framer-motion'

interface GlowingRingProps {
  scrollProgress: MotionValue<number>
}

export function GlowingRing({ scrollProgress }: GlowingRingProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Custom shader for chromatic aberration effect
  const shader = {
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float progress;
      varying vec2 vUv;

      void main() {
        float thickness = 0.02;
        vec2 center = vec2(0.5);
        float radius = 0.3;
        vec2 point = vUv - center;
        float len = length(point);
        
        // Create the base ring
        float ring = smoothstep(radius - thickness, radius, len) - 
                    smoothstep(radius, radius + thickness, len);

        // Create chromatic aberration
        float r = ring * smoothstep(radius + thickness * 2.0, radius - thickness * 2.0, len + 0.01);
        float g = ring * smoothstep(radius + thickness * 2.0, radius - thickness * 2.0, len);
        float b = ring * smoothstep(radius + thickness * 2.0, radius - thickness * 2.0, len - 0.01);

        gl_FragColor = vec4(r, g, b, 1.0) * (1.0 - progress);
      }
    `
  }

  const opacity = useTransform(scrollProgress, [0, 0.5], [1, 0])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
      materialRef.current.uniforms.progress.value = scrollProgress.get()
    }
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[2, 0, 0]} scale={8}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        transparent
        uniforms={{
          time: { value: 0 },
          progress: { value: 0 }
        }}
      />
    </mesh>
  )
}

