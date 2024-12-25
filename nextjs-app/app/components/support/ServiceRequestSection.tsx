'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ServiceRequestSection() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [productCode, setProductCode] = useState('')
  const [issueType, setIssueType] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Submitted:', { name, contact, productCode, issueType, description })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>A/S 접수</CardTitle>
        <CardDescription>제품에 문제가 있으신가요? A/S 접수를 통해 신속하게 해결해 드리겠습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">연락처</Label>
            <Input
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productCode">제품 코드</Label>
            <Input
              id="productCode"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issueType">문제 유형</Label>
            <Select value={issueType} onValueChange={setIssueType}>
              <SelectTrigger id="issueType">
                <SelectValue placeholder="문제 유형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="defect">제품 결함</SelectItem>
                <SelectItem value="installation">설치 문제</SelectItem>
                <SelectItem value="usage">사용 방법 문의</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">상세 설명</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">A/S 접수</Button>
        </form>
      </CardContent>
    </Card>
  )
}

