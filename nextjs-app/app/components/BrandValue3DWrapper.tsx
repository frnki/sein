'use client'

import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import CustomerCentricModel from './three/CustomerCentricModel'
import InnovationModel from './three/InnovationModel'
import QualityModel from './three/QualityModel'

interface BrandValue3DProps {
  modelType: 'customer' | 'quality' | 'innovation'
}

export default function BrandValue3DWrapper({ modelType }: BrandValue3DProps) {
  return (
    <div className="h-[500px] w-full">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          {modelType === 'customer' && <CustomerCentricModel />}
          {modelType === 'quality' && <QualityModel />}
          {modelType === 'innovation' && <InnovationModel />}
        </Suspense>
      </Canvas>
    </div>
  )
} 