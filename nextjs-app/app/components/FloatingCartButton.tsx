'use client'

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useProductStore } from "../lib/store"

interface FloatingCartButtonProps {
  onClick: () => void
}

export default function FloatingCartButton({ onClick }: FloatingCartButtonProps) {
  const { selectedProducts } = useProductStore()

  return (
    <Button
      onClick={onClick}
      className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg z-10 p-0 hover:scale-105 transition-transform"
    >
      <div className="relative">
        <ShoppingCart className="h-6 w-6" />
        {selectedProducts.length > 0 && (
          <span className="absolute -top-6 -right-6 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selectedProducts.length}
          </span>
        )}
      </div>
    </Button>
  )
}