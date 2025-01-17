'use client'

import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import Header from '../components/Header'
import NewsContent from '../components/NewsContent'
import NewsFeed from '../components/NewsFeed'
import NewsTable from '../components/NewsTable'
import Pagination from '../components/portfolio/Pagination'
import { useMediaQuery } from '../hooks/use-media-query'

interface NewsItem {
  _id: string
  title: string
  publishedAt: string
  content: any[]
}

const newsQuery = groq`*[_type == "news"] | order(publishedAt desc) {
  _id,
  title,
  publishedAt,
  content
}`

function NewsPageContent() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedNews, setSelectedNews] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const searchParams = useSearchParams()

  const itemsPerPage = 25
  const totalPages = Math.ceil(news.length / itemsPerPage)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await client.fetch<NewsItem[]>(newsQuery)
        setNews(data)
        if (data.length > 0 && !selectedNews) {
          setSelectedNews(data[0]._id)
        }
      } catch (error) {
        console.error('뉴스 데이터 로딩 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchNews()
  }, [])

  useEffect(() => {
    const newsId = searchParams.get('id')
    if (newsId) {
      setSelectedNews(newsId)
      const pageIndex = Math.floor((news.findIndex(item => item._id === newsId) || 0) / itemsPerPage) + 1
      setCurrentPage(pageIndex)
    } else if (news.length > 0 && !selectedNews) {
      setSelectedNews(news[0]._id)
    }
  }, [searchParams, news])

  useEffect(() => {
    if (selectedNews) {
      const rightColumn = document.getElementById('right-column')
      if (rightColumn) {
        rightColumn.scrollTop = 0
      }
    }
  }, [selectedNews])

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentNews = news.slice(startIndex, startIndex + itemsPerPage).map(item => ({
    id: item._id,
    date: new Date(item.publishedAt).toLocaleDateString('ko-KR'),
    title: item.title,
  }))

  const selectedNewsItem = news.find(item => item._id === selectedNews)
  const formattedSelectedNews = selectedNewsItem ? {
    id: selectedNewsItem._id,
    date: new Date(selectedNewsItem.publishedAt).toLocaleDateString('ko-KR'),
    title: selectedNewsItem.title,
    content: selectedNewsItem.content,
  } : null

  const handleNewsSelect = (id: string) => {
    setSelectedNews(id)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    const leftColumn = document.querySelector('.overflow-y-auto')
    if (leftColumn) {
      leftColumn.scrollTop = 0
    }
    const rightColumn = document.getElementById('right-column')
    if (rightColumn) {
      rightColumn.scrollTop = 0
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-[var(--header-height)]">
          <div className="container mx-auto px-4 pb-8">
            <div className="flex items-center justify-center h-[calc(100vh-var(--header-height))]">
              <div className="text-lg">Loading...</div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[var(--header-height)]">
        <div className="container mx-auto px-4 pb-20">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 border-r overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400" style={{ height: 'calc(100vh - 4rem)' }}>
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
            <div className="w-full md:w-2/3 md:pl-4 md:sticky md:top-16" style={{ height: 'calc(100vh - 4rem)' }}>
              <div id="right-column" className="overflow-y-auto h-full">
                <Suspense fallback={<div>Loading...</div>}>
                  {formattedSelectedNews && <NewsContent news={formattedSelectedNews} />}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function NewsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-[var(--header-height)]">
          <div className="container mx-auto px-4 pb-8">
            <div className="flex items-center justify-center h-[calc(100vh-var(--header-height))]">
              <div className="text-lg">Loading...</div>
            </div>
          </div>
        </main>
      </div>
    }>
      <NewsPageContent />
    </Suspense>
  )
}

