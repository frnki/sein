'use client'

import { useState } from 'react'
import FeaturedCarousel from '../components/FeaturedCarousel'

import FloatingCartButton from '../components/FloatingCartButton'
import Header from '../components/Header'
import InquiryDialog from '../components/InquiryDialog'
import ProductFilter from '../components/ProductFilter'
import ProductGrid from '../components/ProductGrid'
import ProductHeader from '../components/ProductHeader'
import SelectedProductsPanel from '../components/SelectedProductsPanel'
import { useProductStore } from '../lib/store'

// Generate 100 mock products
const mockProducts = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  code: `SP${1500 + i}`,
  dimensions: `${1000 + i * 100}x${800 + i * 50}x${300 + i * 20}(H)`,
  category: ['휴게시설물', '관리시설물', '조형물', '놀이시설물'][Math.floor(i / 25)],
  subCategory: ['현대식', '전통식', '하이브리드'][i % 3],
  image: `/placeholder.svg?height=400&width=600&text=Product${i + 1}`,
  date: new Date(2024, 0, 1 + i).toISOString(),
}))

// Calculate counts for each category and subcategory
const calculateCounts = () => {
  const counts = new Map()
  mockProducts.forEach(product => {
    // Update category count
    counts.set(product.category, (counts.get(product.category) || 0) + 1)
    // Update subcategory count
    const subKey = `${product.category}-${product.subCategory}`
    counts.set(subKey, (counts.get(subKey) || 0) + 1)
  })
  return counts
}

const productCounts = calculateCounts()

const mockFilters = [
  {
    id: 'rest',
    name: '휴게시설물',
    count: productCounts.get('휴게시설물') || 0,
    subCategories: [
      { id: 'pergola', name: '파고라', count: 15 },
      { id: 'bench', name: '벤치', count: 12 },
      { id: 'table', name: '테이블', count: 8 },
      { id: 'shelter', name: '쉘터', count: 10 },
    ],
  },
  {
    id: 'management',
    name: '관리시설물',
    count: productCounts.get('관리시설물') || 0,
    subCategories: [
      { id: 'bicycle', name: '자전거 거치대', count: 8 },
      { id: 'trash', name: '휴지통', count: 6 },
      { id: 'sign', name: '안내판', count: 5 },
    ],
  },
  // ... Add other categories with counts
]

export default function ProductsPage() {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [showSelectedPanel, setShowSelectedPanel] = useState(false)
  const { selectedProducts } = useProductStore()

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

  const filteredProducts = mockProducts.filter(product => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.code.toLowerCase().includes(searchLower)
      )
    }
    if (activeFilters.size === 0) return true
    // Add your filter logic here
    return true
  })

  const toggleSelectedPanel = () => {
    setShowSelectedPanel(true)
  }

  const toggleSelectedPanel2 = () => {
    setShowSelectedPanel(!showSelectedPanel)
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      <div className="pt-[var(--header-height)]">
        <FeaturedCarousel />
        <div className="flex container mx-auto">
          <ProductFilter
            filters={mockFilters}
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
              products={filteredProducts}
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

