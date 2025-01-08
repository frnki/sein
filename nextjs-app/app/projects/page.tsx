'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Header from '../components/Header'

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

const portfolioCarouselImages = [
  {
    id: 1,
    title: '서울숲 복합문화공원',
    description: '도시 재생을 통한 새로운 문화 공간 창출',
    image: '/images/banner-acrotower.jpg',
    category: '공공시설'
  },
  {
    id: 2,
    title: '판교 더샵 퍼스트파크',
    description: '자연과 기술이 공존하는 주거 공간',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
    category: '주거'
  },
  {
    id: 3,
    title: '해운대 마린시티',
    description: '해안 도시의 새로운 랜드마크',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071',
    category: '복합단지'
  }
]

function PortfolioCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
  })

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="relative bg-black">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {portfolioCarouselImages.map((item) => (
            <div key={item.id} className="flex-[0_0_100%] min-w-0">
              <div className="relative h-[500px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                  <div className="container mx-auto">
                    <Badge variant="outline" className="mb-4 text-white border-white">
                      {item.category}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {item.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4 text-white" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4 text-white" />
      </Button>
    </div>
  )
}

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
      <main>
        <PortfolioCarousel />
        
        <div className="container mx-auto px-4 py-16 space-y-12">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">포트폴리오</h1>
            <p className="text-gray-600 text-lg">
              세인디자인이 만들어온 혁신적인 공간들을 소개합니다
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-6">
            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="year-select" className="text-sm font-medium">연도</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger id="year-select">
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

              <div>
                <Label htmlFor="category-select" className="text-sm font-medium">카테고리</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category-select">
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

              <div>
                <Label htmlFor="sort-select" className="text-sm font-medium">정렬</Label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger id="sort-select">
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
            <div>
              <Label htmlFor="search" className="text-sm font-medium">검색</Label>
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

          {/* Results Info */}
          <div className="flex items-center justify-between text-sm text-gray-600 border-b pb-4">
            <div>
              총 <span className="font-bold text-primary">{sortedItems.length}</span>개의 프로젝트
            </div>
            <div>
              페이지 <span className="font-bold text-primary">{currentPage}</span> / {totalPages}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => router.push(`/project/${item.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-white space-y-2">
                        <p className="text-sm">{item.location}</p>
                        <p className="text-sm">{item.size}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-primary text-sm font-medium">{item.code}</span>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <h2 className="font-medium text-lg group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                이전
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
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
