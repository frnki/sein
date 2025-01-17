interface NewsTableProps {
  news: Array<{
    id: string
    date: string
    title: string
  }>
  selectedNews: string | null
  onNewsSelect: (id: string) => void
}

export default function NewsTable({ news, selectedNews, onNewsSelect }: NewsTableProps) {
  return (
    <div className="overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-4 px-6 text-left w-48">Date</th>
            <th className="py-4 px-6 text-left">Title</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr
              key={item.id}
              className={`border-t border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedNews === item.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => {
                onNewsSelect(item.id);
              }}
            >
              <td className="py-4 px-6">{item.date}</td>
              <td className="py-4 px-6">{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

