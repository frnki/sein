'use client'

import dynamic from 'next/dynamic'

const ThreeScene = dynamic(() => import('./three/ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-white/5 animate-pulse rounded-lg" />
  ),
})

interface Props {
  modelType: 'customer' | 'quality' | 'innovation'
}

export default function BrandValue3DClient({ modelType }: Props) {
  return <ThreeScene modelType={modelType} />
} 