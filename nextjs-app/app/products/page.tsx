'use client'

import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { useEffect, useState } from 'react'
import FeaturedCarousel from '../components/FeaturedCarousel'
import FloatingCartButton from '../components/FloatingCartButton'
import Header from '../components/Header'
import InquiryDialog from '../components/InquiryDialog'
import ProductFilter from '../components/ProductFilter'
import ProductGrid from '../components/ProductGrid'
import ProductHeader from '../components/ProductHeader'
import SelectedProductsPanel from '../components/SelectedProductsPanel'
import { useProductStore } from '../lib/store'

// Sanity 쿼리
const productsQuery = groq`*[_type == "product"] {
  _id,
  name,
  code,
  dimensions,
  category,
  subCategory,
  mainImage,
  publishedAt,
  slug,
  "imageUrl": mainImage.asset->url
} | order(order desc, publishedAt desc)`

// 카테고리별 필터 데이터 생성 함수
const generateFilters = (products: any[]) => {
  const categoryCounts = products.reduce((acc, product) => {
    // 메인 카테고리 카운트
    acc[product.category] = (acc[product.category] || 0) + 1
    
    // 서브카테고리 카운트
    if (product.subCategory) {
      const subKey = `${product.category}-${product.subCategory}`
      acc[subKey] = (acc[subKey] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  return [
    {
      id: 'rest',
      name: '휴게시설물',
      count: categoryCounts['rest'] || 0,
      subCategories: [
        { id: 'modern', name: '현대식', count: categoryCounts['rest-modern'] || 0 },
        { id: 'traditional', name: '전통식', count: categoryCounts['rest-traditional'] || 0 },
        { id: 'hybrid', name: '하이브리드', count: categoryCounts['rest-hybrid'] || 0 },
      ],
    },
    {
      id: 'management',
      name: '관리시설물',
      count: categoryCounts['management'] || 0,
      subCategories: [
        { id: 'modern', name: '현대식', count: categoryCounts['management-modern'] || 0 },
        { id: 'traditional', name: '전통식', count: categoryCounts['management-traditional'] || 0 },
        { id: 'hybrid', name: '하이브리드', count: categoryCounts['management-hybrid'] || 0 },
      ],
    },
    {
      id: 'sculpture',
      name: '조형물',
      count: categoryCounts['sculpture'] || 0,
      subCategories: [
        { id: 'modern', name: '현대식', count: categoryCounts['sculpture-modern'] || 0 },
        { id: 'traditional', name: '전통식', count: categoryCounts['sculpture-traditional'] || 0 },
        { id: 'hybrid', name: '하이브리드', count: categoryCounts['sculpture-hybrid'] || 0 },
      ],
    },
    {
      id: 'play',
      name: '놀이시설물',
      count: categoryCounts['play'] || 0,
      subCategories: [
        { id: 'modern', name: '현대식', count: categoryCounts['play-modern'] || 0 },
        { id: 'traditional', name: '전통식', count: categoryCounts['play-traditional'] || 0 },
        { id: 'hybrid', name: '하이브리드', count: categoryCounts['play-hybrid'] || 0 },
      ],
    },
  ]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [showSelectedPanel, setShowSelectedPanel] = useState(false)
  const { selectedProducts } = useProductStore()

  // 데이터 페칭
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await client.fetch(productsQuery)
      setProducts(fetchedProducts)
    }
    fetchProducts()
  }, [])

  const handleFilterChange = (category: string, subCategory: string, checked: boolean) => {
    const filterId = `${category}-${subCategory}`
    setActiveFilters(current => {
      const updated = new Set(current)
      if (checked) {
        updated.add(filterId)
      } else {
        updated.delete(filterId)
      }
      return updated
    })
  }

  const filteredProducts = products.filter(product => {
    // 검색어 필터링
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.code.toLowerCase().includes(searchLower)
      )
    }

    // 카테고리 필터링
    if (activeFilters.size === 0) return true
    
    return Array.from(activeFilters).some(filter => {
      const [category, subCategory] = filter.split('-')
      return product.category === category && 
             (!subCategory || product.subCategory === subCategory)
    })
  })

  // 정렬된 제품 목록
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime()
    const dateB = new Date(b.publishedAt).getTime()
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
  })

  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <div className="pt-[var(--header-height)]">
        <FeaturedCarousel />
        <div className="flex container mx-auto">
          <ProductFilter
            filters={generateFilters(products)}
            onFilterChange={handleFilterChange}
          />
          <div className="flex-1">
            <ProductHeader
              totalProducts={filteredProducts.length}
              selectedCount={selectedProducts.length}
              sortOrder={sortOrder}
              onSortChange={(value: 'newest' | 'oldest') => setSortOrder(value)}
              onSearch={setSearchTerm}
            />
            <ProductGrid
              products={sortedProducts}
              sortOrder={sortOrder}
            />
          </div>
          {showSelectedPanel && <SelectedProductsPanel onClose={() => setShowSelectedPanel(false)} />}
        </div>
        <InquiryDialog />
      </div>
      <FloatingCartButton onClick={() => setShowSelectedPanel(true)} />
    </div>
  )
}

