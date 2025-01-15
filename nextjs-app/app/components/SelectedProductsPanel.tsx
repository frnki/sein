'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useProductStore } from '../lib/store'

interface SelectedProductsPanelProps {
  onClose: () => void
}

export default function SelectedProductsPanel({ onClose }: SelectedProductsPanelProps) {
  const { selectedProducts, removeProduct, clearProducts, openInquiry } = useProductStore()

  const Panel = () => (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-lg border-l p-4 pt-20 z-10">
      <div className="absolute top-4 right-14">
        {selectedProducts.length > 0 && (
          <span className="bg-primary text-white text-xs font-medium px-2 py-1 rounded-full bg-blue-500">
            {selectedProducts.length}개
          </span>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      {selectedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center mb-4">견적 문의하고 싶은 상품들을 추가해주세요.</p>
          <Button onClick={onClose}>상품 둘러보기</Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">관심 제품</h2>
            <Button variant="ghost" size="sm" onClick={clearProducts}>
              모두 삭제
            </Button>
          </div>
          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {selectedProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-2 border rounded p-2">
                <Image
                  src={product.image}
                  alt={product.code}
                  width={60}
                  height={60}
                  className="rounded"
                />
                <span className="flex-1">{product.code}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProduct(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <Button className="w-full" onClick={openInquiry}>
              문의하기
            </Button>
          </div>
        </>
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 z-40">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/25 backdrop-blur-sm" 
        onClick={onClose}
      />
      {/* Panel */}
      <Panel />
    </div>
  )
}

