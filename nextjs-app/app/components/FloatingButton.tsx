'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useProductStore } from '../lib/store'

interface FloatingButtonProps {
  onClick: () => void
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  const { selectedProducts } = useProductStore()

  return (
    <Button
      className="fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg bg-white"
      onClick={onClick}
    >
      <ShoppingCart className="w-6 h-6" />
      {selectedProducts.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          {selectedProducts.length}
        </span>
      )}
    </Button>
  )
}

