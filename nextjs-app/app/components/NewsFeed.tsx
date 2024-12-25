import Image from 'next/image'

interface NewsFeedProps {
  news: Array<{
    id: number
    date: string
    title: string
    content: string
    image: string | null
  }>
  selectedNews: number | null
  onNewsSelect: (id: number) => void
}

export default function NewsFeed({ news, selectedNews, onNewsSelect }: NewsFeedProps) {
  return (
    <div className="space-y-6">
      {news.map((item) => (
        <div
          key={item.id}
          className={`border rounded-lg overflow-hidden ${
            selectedNews === item.id ? 'bg-gray-50' : ''
          }`}
        >
          <div
            className="p-4 cursor-pointer"
            onClick={() => onNewsSelect(item.id)}
          >
            <div className="text-sm text-gray-500 mb-2">{item.date}</div>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

