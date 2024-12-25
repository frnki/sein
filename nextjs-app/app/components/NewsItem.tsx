import Image from 'next/image'

interface NewsItemProps {
  title: string
  date: string
  image: string
  isOpen: boolean
  onClick: () => void
}

export default function NewsItem({ title, date, image, isOpen, onClick }: NewsItemProps) {
  return (
    <div className="border-b pb-8">
      <div className="flex justify-between items-center cursor-pointer" onClick={onClick}>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <span className="text-gray-500">{date}</span>
      </div>
      {isOpen && (
        <div className="mt-4">
          <Image src={image} alt={title} width={600} height={400} className="w-full h-auto" />
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      )}
    </div>
  )
}

