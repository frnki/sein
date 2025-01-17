'use client'

import { useProductStore } from '@/app/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { client } from '@/sanity/lib/client';
import useEmblaCarousel from 'embla-carousel-react';
import { ImageIcon, ShoppingCart } from 'lucide-react';
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
  const { addProduct, removeProduct, selectedProducts } = useProductStore();

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
          <div className="flex space-x-6">
            {relatedProducts.map((product) => {
              const isSelected = selectedProducts.some(p => p.id === product._id);
              
              return (
                <div
                  key={product._id}
                  className="flex-[0_0_280px]"
                >
                  <Card className="group relative h-full overflow-hidden">
                    <Link href={`/products/${product.slug}`}>
                      <div className="relative aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={product.imageUrl || '/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600">{product.code}</p>
                      </div>
                    </Link>
                    
                    {/* Cart Button */}
                    <Button
                      variant={isSelected ? "secondary" : "outline"}
                      size="icon"
                      className="absolute bottom-3 right-3 w-8 h-8 rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        if (isSelected) {
                          removeProduct(product._id);
                        } else {
                          addProduct({
                            id: product._id,
                            name: product.name,
                            code: product.code,
                            image: product.imageUrl,
                          });
                        }
                      }}
                      disabled={isSelected}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">
                        {isSelected ? "장바구니에서 제거" : "장바구니에 추가"}
                      </span>
                    </Button>
                  </Card>
                </div>
              );
            })}
          </div>
        </div> 
      </div>
    </div>
  )
}

