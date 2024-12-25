'use client'

import { useState } from 'react'
import NewsItem from './NewsItem'

const newsData = [
  { id: 1, title: "New Project Unveiled", date: "2024-03-15", image: "/placeholder.svg?height=400&width=600" },
  { id: 2, title: "Award-Winning Design", date: "2024-03-10", image: "/placeholder.svg?height=400&width=600" },
  { id: 3, title: "Sustainable Architecture Seminar", date: "2024-03-05", image: "/placeholder.svg?height=400&width=600" },
]

export default function NewsList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">News</h1>
      <div className="space-y-8">
        {newsData.map((news, index) => (
          <NewsItem
            key={news.id}
            {...news}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  )
}

