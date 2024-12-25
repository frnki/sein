'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface ProductSearchProps {
  onSearch: (term: string) => void
}

export default function ProductSearch({ onSearch }: ProductSearchProps) {
  return (
    <div className="relative max-w-xs">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="search"
        placeholder="제품명 또는 제품 코드로 검색"
        className="pl-10 pr-4 py-2 w-full"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

