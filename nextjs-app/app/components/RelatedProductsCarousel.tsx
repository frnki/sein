'use client'

import { client } from '@/sanity/lib/client';
import useEmblaCarousel from 'embla-carousel-react';
import { ImageIcon } from 'lucide-react';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  code: string;
  "slug": string;
  "imageUrl": string;
}

interface RelatedProductsCarouselProps {
  series?: { _id: string; name: string };
  currentProductId: string;
}

const ImageWithFallback = ({ src, alt, ...props }: any) => {
  const [error, setError] = useState(false)

  return (
    <>
      {error ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <ImageIcon className="w-12 h-12 text-gray-400" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          onError={() => setError(true)}
          {...props}
        />
      )}
    </>
  )
}

export default function RelatedProductsCarousel({ series, currentProductId }: RelatedProductsCarouselProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 3 }
    }
  })

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!series?._id) {
        setRelatedProducts([]);
        setIsLoading(false);
        return;
      }

      try {
        const query = groq`*[_type == "product" && series._ref == $seriesId && _id != $currentProductId] {
          _id,
          name,
          code,
          "slug": slug.current,
          "imageUrl": mainImage.asset->url
        }`;
        
        const data = await client.fetch<Product[]>(query, {
          seriesId: series._id,
          currentProductId
        });
        
        setRelatedProducts(data);
      } catch (error) {
        console.error('관련 제품 로딩 실패:', error);
        setRelatedProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [series?._id, currentProductId]);

  if (isLoading) {
    return null;
  }

  if (!series?.name || relatedProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold mb-4">다른 {series.name} 제품</h2>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex space-x-4">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                className="flex-[0_0_140px]"
              >
                <Link href={`/products/${product.slug}`} className="block group">
                  <div className="relative w-[140px] aspect-square overflow-hidden rounded-lg mb-4">
                    <ImageWithFallback
                      src={product.imageUrl || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.code}</p>
                </Link>
              </div>
            ))}
          </div>
        </div> 
      </div>
    </div>
  )
}

