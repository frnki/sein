'use client'

import { motion } from 'framer-motion'

interface BrandValueIconProps {
  modelType: 'customer' | 'quality' | 'innovation'
}

export default function BrandValueIcon({ modelType }: BrandValueIconProps) {
  return (
    <div className="h-[400px] w-full flex items-center justify-center">
      <motion.div
        className="p-8 rounded-full bg-primary/10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {modelType}
      </motion.div>
    </div>
  )
} 