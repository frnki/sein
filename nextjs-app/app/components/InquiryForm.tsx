'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface InquiryFormProps {
  type: 'product' | 'construction' | 'design' | 'other'
}

export default function InquiryForm({ type }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    contact: '',
    project: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm font-medium text-gray-700">회사명 *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">이름/부서 및 직함 *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact" className="text-sm font-medium text-gray-700">연락처(전화번호/메일) *</Label>
          <Input
            id="contact"
            value={formData.contact}
            onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project" className="text-sm font-medium text-gray-700">프로젝트명 *</Label>
          <Input
            id="project"
            value={formData.project}
            onChange={(e) => setFormData(prev => ({ ...prev, project: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium text-gray-700">요청내용 *</Label>
        <Textarea
          id="message"
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="flex justify-end">
        <Button 
          type="submit"
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
        >
          문의하기
        </Button>
      </div>
    </form>
  )
}

