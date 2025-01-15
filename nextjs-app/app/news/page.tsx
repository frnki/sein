'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import NewsContent from '../components/NewsContent'
import NewsFeed from '../components/NewsFeed'
import NewsTable from '../components/NewsTable'
import Pagination from '../components/portfolio/Pagination'
import { useMediaQuery } from '../hooks/use-media-query'

// Generate 100 mock news items
const mockNews = Array.from({ length: 100 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i)

  return {
    id: i + 1,
    date: date.toISOString().split('T')[0],
    title: [
      '2025 recruitment - Architect & Interior',
      '2024 recruitment',
      'Open Position - Architects Factory',
      'New Project Announcement',
      'Award Winning Design',
      'Exhibition Opening'
    ][Math.floor(Math.random() * 6)],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: i % 5 === 0 ? '/placeholder.svg?height=400&width=600' : null
  }
})

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedNews, setSelectedNews] = useState<number | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const searchParams = useSearchParams()

  const itemsPerPage = 25
  const totalPages = Math.ceil(mockNews.length / itemsPerPage)

  useEffect(() => {
    const newsId = searchParams.get('id')
    if (newsId) {
      const id = parseInt(newsId, 10)
      setSelectedNews(id)
      const pageIndex = Math.floor((mockNews.findIndex(news => news.id === id) || 0) / itemsPerPage) + 1
      setCurrentPage(pageIndex)
    } else if (mockNews.length > 0 && !selectedNews) {
      setSelectedNews(mockNews[0].id)
    }
  }, [searchParams])

  useEffect(() => {
    if (selectedNews) {
      const rightColumn = document.getElementById('right-column');
      if (rightColumn) {
        rightColumn.scrollTop = 0;
      }
    }
  }, [selectedNews]);

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentNews = mockNews.slice(startIndex, startIndex + itemsPerPage)

  const selectedNewsItem = mockNews.find(item => item.id === selectedNews)

  const handleNewsSelect = (id: number) => {
    setSelectedNews(id);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const leftColumn = document.querySelector('.overflow-y-auto');
    if (leftColumn) {
      leftColumn.scrollTop = 0;
    }
    const rightColumn = document.getElementById('right-column');
    if (rightColumn) {
      rightColumn.scrollTop = 0;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[var(--header-height)]">
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2  border-r overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400" style={{ height: 'calc(100vh - 4rem)' }}>
              {isMobile ? (
                <NewsFeed 
                  news={currentNews}
                  selectedNews={selectedNews}
                  onNewsSelect={handleNewsSelect}
                />
              ) : (
                <NewsTable
                  news={currentNews}
                  selectedNews={selectedNews}
                  onNewsSelect={handleNewsSelect}
                />
              )}
              {/* Pagination */}
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-4 md:sticky md:top-16" style={{ height: 'calc(100vh - 4rem)' }}>
              <div id="right-column" className="overflow-y-auto h-full">
                {selectedNewsItem && <NewsContent news={selectedNewsItem} />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

