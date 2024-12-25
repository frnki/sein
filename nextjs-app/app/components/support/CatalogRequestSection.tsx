'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search } from 'lucide-react'

declare global {
  interface Window {
    daum: any;
  }
}

export default function CatalogRequestSection() {
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [detailAddress, setDetailAddress] = useState('')
  const [message, setMessage] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleAddressSearch = useCallback(() => {
    new window.daum.Postcode({
      oncomplete: function(data: any) {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setAddress(fullAddress);
        // 상세주소 입력 필드로 포커스 이동
        document.getElementById('detailAddress')?.focus();
      },
      width: '100%',
      height: '100%'
    }).open({
      popupName: 'postcodePopup',
      left: (window.screen.width / 2) - (500 / 2),
      top: (window.screen.height / 2) - (600 / 2)
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Submitted:', { 
      name, 
      department, 
      email, 
      company, 
      address,
      detailAddress, 
      message, 
      agreeTerms 
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>카탈로그 요청</CardTitle>
        <CardDescription>최신 제품 카탈로그를 받아보세요. 귀하의 정보를 입력해 주시면 빠르게 보내드리겠습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">회사명</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="department">부서 및 직위</Label>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">주소</Label>
            <div className="flex gap-2">
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                readOnly
                placeholder="주소 검색을 클릭하세요"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddressSearch}
              >
                <Search className="h-4 w-4 mr-2" />
                주소 검색
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="detailAddress">상세 주소</Label>
            <Input
              id="detailAddress"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="상세 주소를 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">요청사항</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              개인정보 수집 및 이용에 동의합니다
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              취소
            </Button>
            <Button type="submit" disabled={!agreeTerms}>
              카탈로그 신청
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

