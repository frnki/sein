
interface NewsFeedProps {
  news: Array<{
    id: string
    date: string
    title: string
  }>
  selectedNews: string | null
  onNewsSelect: (id: string) => void
}

export default function NewsFeed({ news, selectedNews, onNewsSelect }: NewsFeedProps) {
  return (
    <div className="divide-y divide-gray-200">
      {news.map((item) => (
        <div
          key={item.id}
          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedNews === item.id ? 'bg-gray-100' : ''
          }`}
          onClick={() => onNewsSelect(item.id)}
        >
          <h3 className="font-medium mb-1">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.date}</p>
        </div>
      ))}
    </div>
  )
}

