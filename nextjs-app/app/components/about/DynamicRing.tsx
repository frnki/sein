import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MotionValue, useTransform } from 'framer-motion'

interface DynamicRingProps {
  scrollProgress: MotionValue<number>
}

export function DynamicRing({ scrollProgress }: DynamicRingProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Custom shader for dynamic light reflection effect
  const shader = {
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float progress;
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        // Create base ring
        vec2 center = vec2(0.5);
        float radius = 0.3;
        float thickness = 0.03;
        vec2 point = vUv - center;
        float len = length(point);
        
        // Dynamic light effect
        float wave = sin(len * 30.0 - time * 2.0) * 0.5 + 0.5;
        float ring = smoothstep(radius - thickness, radius, len) - 
                    smoothstep(radius, radius + thickness, len);
        
        // Color variations
        vec3 blue = vec3(0.0, 0.4, 1.0);
        vec3 cyan = vec3(0.0, 0.8, 1.0);
        
        // Combine effects
        vec3 color = mix(blue, cyan, wave) * ring;
        
        // Add glow
        float glow = ring * (1.0 + wave * 0.5);
        color += glow * 0.5;
        
        // Apply scroll fade
        float alpha = ring * (1.0 - progress) * (1.0 + wave * 0.2);
        
        gl_FragColor = vec4(color, alpha);
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
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

