'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useProductStore } from '../lib/store'

export default function InquiryDialog() {
  const { selectedProducts, isInquiryOpen, closeInquiry } = useProductStore()
  const [inquiryType, setInquiryType] = useState('제안요청')

  console.log('Dialog open state:', isInquiryOpen)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    closeInquiry()
  }

  return (
    <Dialog open={isInquiryOpen} onOpenChange={(open) => {
      if (!open) closeInquiry()
    }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>제품 문의</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-sm text-gray-600">
            온라인으로 제품문의를 하시면<br />
            관리자가 확인 후 최대한 신속히 처리하여 드리겠습니다.
          </div>

          <RadioGroup
            value={inquiryType}
            onValueChange={setInquiryType}
            className="flex items-center gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="제안요청" id="proposal" />
              <Label htmlFor="proposal">제안요청</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="건축요청" id="construction" />
              <Label htmlFor="construction">건축요청</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="이미지,도면요청" id="design" />
              <Label htmlFor="design">이미지, 도면요청</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="기타" id="other" />
              <Label htmlFor="other">기타</Label>
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
            <Button type="button" variant="outline" onClick={closeInquiry}>
              취소
            </Button>
            <Button type="submit">문의하기</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

