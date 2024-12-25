'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useProductStore } from '../lib/store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

export function useInquiryDialog() {
  const [isOpen, setIsOpen] = useState(false)
  return {
    isOpen,
    openDialog: () => setIsOpen(true),
    closeDialog: () => setIsOpen(false),
  }
}

export default function InquiryDialog() {
  const { isOpen, closeDialog } = useInquiryDialog()
  const { selectedProducts, removeProduct } = useProductStore()
  const [inquiryType, setInquiryType] = useState('product')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    closeDialog()
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>제품 문의</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {selectedProducts.map((product) => (
              <div key={product.id} className="relative flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-100"
                  onClick={() => removeProduct(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Image
                  src={product.image}
                  alt={product.code}
                  width={100}
                  height={100}
                  className="rounded"
                />
                <p className="text-sm mt-1">{product.code}</p>
              </div>
            ))}
          </div>
          
          <RadioGroup
            defaultValue="product"
            onValueChange={setInquiryType}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="product" id="product" />
                <Label htmlFor="product">제안요청</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="construction" id="construction" />
                <Label htmlFor="construction">건축요청</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="design" id="design" />
                <Label htmlFor="design">이미지, 도면요청</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">기타</Label>
              </div>
            </div>
          </RadioGroup>

          <div className="space-y-4">
            <div>
              <Label htmlFor="company">회사명 *</Label>
              <Input id="company" required />
            </div>
            <div>
              <Label htmlFor="contact">이름/부서 및 직함 *</Label>
              <Input id="contact" required />
            </div>
            <div>
              <Label htmlFor="phone">연락처(전화번호/메일) *</Label>
              <Input id="phone" required />
            </div>
            <div>
              <Label htmlFor="project">프로젝트명 *</Label>
              <Input id="project" required />
            </div>
            <div>
              <Label htmlFor="message">요청내용 *</Label>
              <Textarea id="message" rows={4} required />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={closeDialog}>
              취소
            </Button>
            <Button type="submit">문의하기</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

