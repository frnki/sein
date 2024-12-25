import Image from 'next/image'
import Link from 'next/link'

export default function BestProducts() {
  const products = [
    { id: 1, name: 'Minimalist Chair', category: 'Furniture', image: '/placeholder.svg?height=300&width=300' },
    { id: 2, name: 'Smart Lighting System', category: 'Lighting', image: '/placeholder.svg?height=300&width=300' },
    { id: 3, name: 'Eco-friendly Flooring', category: 'Flooring', image: '/placeholder.svg?height=300&width=300' },
    { id: 4, name: 'Modular Kitchen System', category: 'Kitchen', image: '/placeholder.svg?height=300&width=300' },
  ]

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Best Products & Categories</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.category}</p>
              <Link href={`/products/${product.id}`} className="text-primary hover:underline">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

