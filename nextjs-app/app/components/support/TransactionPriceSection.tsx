'use client'

import { useState, useMemo } from 'react'
import { FileDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Generate mock data for the last 3 years
const generateMockData = () => {
  const data = []
  const currentDate = new Date()
  
  for (let i = 0; i < 36; i++) {
    const date = new Date(currentDate)
    date.setMonth(currentDate.getMonth() - i)
    
    data.push({
      id: i + 1,
      title: `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월`,
      date: date.toISOString().split('T')[0],
      downloads: Math.floor(Math.random() * 400) + 50,
    })
  }
  
  return data
}

const priceData = generateMockData()

export default function TransactionPriceSection() {
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const years = useMemo(() => {
    const uniqueYears = new Set(priceData.map(item => new Date(item.date).getFullYear()))
    return ['all', ...Array.from(uniqueYears).sort((a, b) => b - a)]
  }, [])

  const filteredData = useMemo(() => {
    if (selectedYear === 'all') return priceData
    return priceData.filter(item => new Date(item.date).getFullYear().toString() === selectedYear)
  }, [selectedYear])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handleDownload = (id: number) => {
    // Handle file download
    console.log('Downloading file:', id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>거래가격 공시</CardTitle>
        <CardDescription>매월 업데이트되는 거래가격 정보를 확인하실 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Select value={selectedYear} onValueChange={(value) => { setSelectedYear(value); setCurrentPage(1); }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="연도 선택" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year === 'all' ? '전체 연도' : `${year}년`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedData.map((item) => (
            <Card key={item.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full mb-2"
                    onClick={() => handleDownload(item.id)}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    다운로드
                  </Button>
                  <span className="text-sm text-gray-500">다운로드: {item.downloads}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  )
}

