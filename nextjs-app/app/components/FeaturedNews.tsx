import Image from 'next/image'

interface FeaturedNewsProps {
  news: {
    date: string
    title: string
    content: string
    image: string | null
  }
}

export default function FeaturedNews({ news }: FeaturedNewsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-sm text-gray-500 mb-2">{news.date}</div>
        <h1 className="text-3xl font-bold mb-6">{news.title}</h1>
        {news.image && (
          <div className="relative h-[300px] mb-6">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div className="whitespace-pre-line text-gray-700">
          {news.content}
        </div>
      </div>
    </div>
  )
}

