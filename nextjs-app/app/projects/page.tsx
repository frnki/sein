'use client'

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import Header from '../components/Header';
import Pagination from '../components/portfolio/Pagination';
import PortfolioCarousel from '../components/portfolio/PortfolioCarousel';
import PortfolioFilters from '../components/portfolio/PortfolioFilters';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import { PortfolioItem, portfolioCarouselImages, portfolioItems } from '../lib/mock-data';

const categories = ['전체', '주거', '공공시설', '오피스', '리조트'] as const;
const sortOptions = ['최근 등록 순', '프로젝트 코드 순', '이름순'] as const;
const ITEMS_PER_PAGE = 12;

type Category = typeof categories[number];
type SortOption = typeof sortOptions[number];

export default function PortfolioPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<SortOption>('최근 등록 순');

  // Memoized years array
  const years = useMemo(() => {
    const yearSet = new Set<number>();
    portfolioItems.forEach((item: PortfolioItem) => {
      yearSet.add(item.year);
    });
    return Array.from(yearSet).sort((a, b) => b - a);
  }, []);

  // Memoized filtered and sorted items
  const filteredAndSortedItems = useMemo(() => {
    const filtered = portfolioItems.filter((item: PortfolioItem) => {
      const matchesCategory = selectedCategory === '전체' ? true : item.category === selectedCategory;
      const matchesYear = selectedYear === 'all' ? true : item.year === parseInt(selectedYear);
      const matchesSearch = searchTerm === '' ? true :
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesYear && matchesSearch;
    });

    return [...filtered].sort((a: PortfolioItem, b: PortfolioItem) => {
      if (sortOrder === '최근 등록 순') return b.year - a.year;
      if (sortOrder === '프로젝트 코드 순') return a.code.localeCompare(b.code);
      if (sortOrder === '이름순') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [selectedCategory, selectedYear, searchTerm, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE);
  const currentItems = filteredAndSortedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter handlers
  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: Category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleYearChange = useCallback((year: string) => {
    setSelectedYear(year);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((sort: SortOption) => {
    setSortOrder(sort);
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[var(--header-height)]">
        <PortfolioCarousel images={portfolioCarouselImages} />
        
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
  );
}
