'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useProductStore } from '../lib/store'

interface Product {
  id: string
  name: string
  code: string
  dimensions: string
  category: string
  subCategory: string
  image: string
  date: string
}

interface Props {
  products: Product[]
  sortOrder: 'newest' | 'oldest'
}

export default function ProductGrid({ products, sortOrder }: Props) {
  const router = useRouter()
  const { selectedProducts, toggleProduct } = useProductStore()

  const sortedProducts = [...products].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {sortedProducts.map((product) => {
        const isSelected = selectedProducts.includes(product.id)
        
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* Selected Overlay */}
            {isSelected && (
              <div className="absolute inset-0 bg-blue-500/10 z-10" />
            )}

            {/* Checkbox */}
            <div 
              className="absolute top-4 right-4 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleProduct(product.id)}
                className="bg-white/80 backdrop-blur data-[state=checked]:bg-blue-500"
              />
            </div>

            {/* Product Card */}
            <div 
              className="cursor-pointer"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <div className="relative h-64 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.code}</p>
                  </div>
                  <span className="text-sm text-gray-500">{product.dimensions}</span>
                </div>
                
                <div className="flex gap-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                    {product.category}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                    {product.subCategory}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

