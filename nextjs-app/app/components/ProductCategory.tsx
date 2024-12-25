import Image from 'next/image'
import Link from 'next/link'

interface Product {
  name: string;
  description: string;
  image: string;
}

interface ProductCategoryProps {
  title: string;
  description: string;
  products: Product[];
}

export default function ProductCategory({ title, description, products }: ProductCategoryProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-600 mb-8">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Link 
                  href={`/products/${product.name.toLowerCase().replace(/ /g, '-')}`}
                  className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
                >
                  더 알아보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

