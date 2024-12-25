import Image from 'next/image'

export default function ProductBanner() {
  return (
    <div className="relative h-[50vh] min-h-[400px]">
      <Image
        src="/placeholder.svg?height=800&width=1600"
        alt="Products Banner"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl md:text-2xl">Innovative solutions for modern living and working spaces</p>
        </div>
      </div>
    </div>
  )
}

