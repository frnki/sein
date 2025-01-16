'use client'

import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import Pagination from '../components/portfolio/Pagination'
import PortfolioCarousel from '../components/portfolio/PortfolioCarousel'
import PortfolioFilters from '../components/portfolio/PortfolioFilters'
import PortfolioGrid from '../components/portfolio/PortfolioGrid'

const categories = ['전체', '주거', '공공시설', '오피스', '리조트'] as const
const sortOptions = ['최근 등록 순', '프로젝트 코드 순', '이름순'] as const
const ITEMS_PER_PAGE = 12

type Category = typeof categories[number]
type SortOption = typeof sortOptions[number]

// Sanity 쿼리
const projectsQuery = groq`*[_type == "project"] {
  _id,
  title,
  subtitle,
  "slug": slug.current,
  details,
  category,
  featured,
  order,
  publishedAt,
  "imageUrl": mainImage.asset->url,
  "images": images[].asset->url
}`

// 기본 캐러셀 이미지
const DEFAULT_CAROUSEL_IMAGES = [{
  id: 0,
  title: '기본 프로젝트',
  description: '프로젝트 설명',
  image: '/images/portfolio/default.jpg',
  category: '전체'
}]

// Project를 CarouselImage로 변환하는 함수
const projectToCarouselImage = (project: any, index: number) => ({
  id: index,
  title: project.title,
  description: project.subtitle || '',
  image: project.imageUrl || DEFAULT_CAROUSEL_IMAGES[0].image,
  category: project.category || '전체'
})

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortOrder, setSortOrder] = useState<SortOption>('최근 등록 순')

  // 데이터 페칭
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await client.fetch(projectsQuery)
        setProjects(fetchedProjects || [])
        console.log("🚀 ~ fetchProjects ~ fetchedProjects:", fetchedProjects)
      } catch (error) {
        console.error('프로젝트 데이터 로딩 실패:', error)
        setProjects([])
      }
        
    }
    fetchProjects()
  }, [])

  // Memoized years array
  const years = useMemo(() => {
    const yearSet = new Set<number>()
    projects.forEach(project => {
      const year = new Date(project.publishedAt).getFullYear()
      yearSet.add(year)
    })
    return Array.from(yearSet).sort((a, b) => b - a)
  }, [projects])

  // Memoized filtered and sorted items
  const filteredAndSortedItems = useMemo(() => {
    const filtered = projects.filter(project => {
      const projectYear = new Date(project.publishedAt).getFullYear()
      const matchesCategory = selectedCategory === '전체' ? true : project.category === selectedCategory
      const matchesYear = selectedYear === 'all' ? true : projectYear === parseInt(selectedYear)
      const matchesSearch = searchTerm === '' ? true :
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesCategory && matchesYear && matchesSearch
    })

    return [...filtered].sort((a, b) => {
      if (sortOrder === '최근 등록 순') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
      if (sortOrder === '프로젝트 코드 순') {
        return (a.slug || '').localeCompare(b.slug || '')
      }
      if (sortOrder === '이름순') {
        return a.title.localeCompare(b.title)
      }
      return 0
    }).map(project => ({
      id: parseInt(project._id.replace(/^[^\d]*/, '')) || 0,
      title: project.title,
      code: project.slug || '',
      image: project.imageUrl || DEFAULT_CAROUSEL_IMAGES[0].image,
      category: project.category || '전체',
      year: new Date(project.publishedAt).getFullYear(),
      location: project.details?.location || '',
      size: project.details?.area || '',
      tags: [],
      slug: project.slug || ''
    }))
  }, [projects, selectedCategory, selectedYear, searchTerm, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE)
  const currentItems = filteredAndSortedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Carousel images
  const carouselImages = useMemo(() => {
    if (!projects?.length) return DEFAULT_CAROUSEL_IMAGES
    const featuredProjects = projects.filter(p => p?.featured && p?.imageUrl)
    return featuredProjects.length > 0 
      ? featuredProjects.map(projectToCarouselImage)
      : DEFAULT_CAROUSEL_IMAGES
  }, [projects])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search)
    setCurrentPage(1)
  }, [])

  const handleCategoryChange = useCallback((category: Category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }, [])

  const handleYearChange = useCallback((year: string) => {
    setSelectedYear(year)
    setCurrentPage(1)
  }, [])

  const handleSortChange = useCallback((sort: SortOption) => {
    setSortOrder(sort)
    setCurrentPage(1)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[var(--header-height)]">
        <PortfolioCarousel images={carouselImages} />
        
        <div className="container mx-auto px-4 py-16 space-y-12">
          <PortfolioFilters
            years={years}
            categories={categories}
            sortOptions={sortOptions}
            selectedYear={selectedYear}
            selectedCategory={selectedCategory}
            sortOrder={sortOrder}
            searchTerm={searchTerm}
            onYearChange={handleYearChange}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
          />

          <div className="flex items-center justify-between text-sm text-gray-600 border-b pb-4">
            <div>
              총 <span className="font-bold text-primary">{filteredAndSortedItems.length}</span>개의 프로젝트
            </div>
            <div>
              페이지 <span className="font-bold text-primary">{currentPage}</span> / {totalPages}
            </div>
          </div>

          <PortfolioGrid items={currentItems} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  )
}
