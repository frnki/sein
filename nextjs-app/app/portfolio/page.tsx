'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Header from '../components/Header'
import { Label } from '@/components/ui/label'

// Generate more realistic mock data
const portfolioItems = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  code: `SIP-${(1000 + i).toString()}`,
  title: [
    '대전 한밭수목원',
    '중흥S클래스 세종1-5생활권',
    '포스코 판교 더 샵 퍼스트파크',
    '포스코 하남 감일 C2BL',
    '창원 중동 대영 유니시티 1차',
    '고양 항동 계룡 리슈빌',
    '진주혁신도시 A-12BL',
    '진주혁신도시 공공주택',
  ][i % 8],
  image: `/placeholder.svg?height=600&width=800&text=Project+${i + 1}`,
  year: 2010 + Math.floor(i / 10),
  category: ['주거', '공공시설', '오피스', '리조트'][i % 4],
  tags: ['도시재생', '친환경', '스마트시티', '복합단지'].slice(0, Math.floor(Math.random() * 4) + 1),
  location: '서울특별시',
  size: `${Math.floor(Math.random() * 50000 + 10000)}㎡`,
}))

const years = Array.from(
  new Set(portfolioItems.map(item => item.year))
).sort((a, b) => b - a)

const categories = ['전체', '주거', '공공시설', '오피스', '리조트']
const sortOptions = ['최근 등록 순', '프로젝트 코드 순', '이름순']

export default function PortfolioPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedYear, setSelectedYear] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('최근 등록 순')
  const itemsPerPage = 12

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === '전체' ? true : item.category === selectedCategory
    const matchesYear = selectedYear === 'all' ? true : item.year === parseInt(selectedYear)
    const matchesSearch = searchTerm === '' ? true :
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesCategory && matchesYear && matchesSearch
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === '최근 등록 순') return b.year - a.year
    if (sortOrder === '프로젝트 코드 순') return a.code.localeCompare(b.code)
    if (sortOrder === '이름순') return a.title.localeCompare(b.title)
    return 0
  })

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
  const currentItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">포트폴리오</h1>
            
            <div className="space-y-6">
              {/* Filters Row */}
              <div className="flex flex-wrap gap-4 items-end">
                <div className="w-full sm:w-auto">
                  <Label htmlFor="year-select" className="mb-2 block">연도</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger id="year-select" className="w-[140px]">
                      <SelectValue placeholder="연도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}년
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-auto">
                  <Label htmlFor="category-select" className="mb-2 block">카테고리</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger id="category-select" className="w-[140px]">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-auto">
                  <Label htmlFor="sort-select" className="mb-2 block">정렬</Label>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger id="sort-select" className="w-[140px]">
                      <SelectValue placeholder="정렬 방식" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search Row */}
              <div className="relative">
                <Label htmlFor="search" className="mb-2 block">검색</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="프로젝트명, 코드 또는 태그로 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              총 <span className="font-bold text-primary">{sortedItems.length}</span>개의 프로젝트
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-bold text-primary">{currentPage}</span> / {totalPages} 페이지
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => router.push(`/portfolio/${item.id}`)}
                className="cursor-pointer group"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">자세히 보기</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-primary text-sm font-medium flex items-center justify-between">
                    <span>{item.code}</span>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <h2 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                이전
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                다음
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

