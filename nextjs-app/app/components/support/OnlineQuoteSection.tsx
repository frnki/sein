'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function OnlineQuoteSection() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [projectType, setProjectType] = useState('')
  const [details, setDetails] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Submitted:', { name, company, email, phone, projectType, details })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>온라인 견적 요청</CardTitle>
        <CardDescription>프로젝트에 대한 견적이 필요하신가요? 아래 양식을 작성해 주시면 빠르게 견적을 보내드리겠습니다.</CardDescription>
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
            <Label htmlFor="company">회사명</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">연락처</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectType">프로젝트 유형</Label>
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger id="projectType">
                <SelectValue placeholder="프로젝트 유형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">주거용</SelectItem>
                <SelectItem value="commercial">상업용</SelectItem>
                <SelectItem value="public">공공시설</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">프로젝트 상세 내용</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">견적 요청</Button>
        </form>
      </CardContent>
    </Card>
  )
}

