'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../types/product'
import { useProductStore } from '../lib/store'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  sortOrder: 'newest' | 'oldest'
}

export default function ProductGrid({ products, sortOrder }: ProductGridProps) {
  const { selectedProducts, addProduct, removeProduct } = useProductStore()
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 25
  
  const sortedProducts = [...products].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
  })

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  const handleProductSelect = (product: Product, checked: boolean) => {
    if (checked) {
      addProduct({
        id: product.id,
        code: product.code,
        image: product.image,
      })
    } else {
      removeProduct(product.id)
    }
  }

  const handleCardClick = (product: Product) => {
    const isSelected = selectedProducts.some(p => p.id === product.id)
    handleProductSelect(product, !isSelected)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <Link 
            href={`/products/${product.id}`} 
            key={product.id}
            onClick={(e) => {
              if (e.target instanceof HTMLElement && e.target.closest('[data-checkbox]')) {
                e.preventDefault()
              }
            }}
          >
            <div className="relative group cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition-shadow" >
              <div className="absolute top-4 right-4 z-10" data-checkbox>
                <Checkbox
                  checked={selectedProducts.some(p => p.id === product.id)}
                  onCheckedChange={(checked) => {
                    handleProductSelect(product, checked as boolean)
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full aspect-4/3 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{product.code}</h3>
                <p className="text-sm text-gray-600">{product.dimensions}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

