"use client";

import SelectedProductsPanel from "@/app/components/SelectedProductsPanel";
import { Button } from "@/components/ui/button";
import { client } from '@/sanity/lib/client';
import { Share2, ShoppingCart } from "lucide-react";
import { groq } from 'next-sanity';
import Image from "next/image";
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from "react";
import InquiryDialog from "../../components/InquiryDialog";
import RelatedProductsCarousel from "../../components/RelatedProductsCarousel";
import { useProductStore } from "../../lib/store";

interface Product {
  _id: string;
  name: string;
  code: string;
  category: { name: string };
  series?: { _id: string; name: string };
  description?: string;
  dimensions?: {
    width: number;
    depth: number;
    height: number;
    unit: string;
  };
  material?: string[];
  imageUrl?: string;
  imageUrls?: string[];
}

const productQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  code,
  category->{
    name
  },
  series->{
    _id,
    name
  },
  description,
  dimensions,
  material,
  "imageUrl": mainImage.asset->url,
  "imageUrls": images[].asset->url
}`

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addProduct, removeProduct, openInquiry, selectedProducts } = useProductStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showSelectedPanel, setShowSelectedPanel] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch<Product>(productQuery, { slug });
        console.log("🚀 ~ fetchProduct ~ data:", data)
        if (!data?._id) {
          notFound();
        }
        setProduct(data);
      } catch (error) {
        console.error('제품 데이터 로딩 실패:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const images = [
    product.imageUrl,
    ...(product.imageUrls || [])
  ].filter(Boolean);

  const isProductSelected = selectedProducts.some((p) => p.id === product._id);

  const handleInquiry = () => {
    addProduct({
      id: product._id,
      code: product.code,
      image: images[0],
    });
    openInquiry();
  };

  const handleAddToCart = () => {
    if (isProductSelected) {
      removeProduct(product._id);
    } else {
      addProduct({
        id: product._id,
        code: product.code,
        image: images[0],
      });
    }
    setShowSelectedPanel(true);
  };

  const specs = {
    code: product.code,
    size: product.dimensions ? `W${product.dimensions.width} x D${product.dimensions.depth} x H${product.dimensions.height} ${product.dimensions.unit}` : '',
    material: Array.isArray(product.material) ? product.material.join(', ') : '',
    category: product.category?.name || '',
  };

  return (
    <div className="min-h-screen bg-white relative">
      <main className="pt-[var(--header-height)]">
        <div className="container mx-auto py-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left: Product Images */}
            <div className="col-span-2 space-y-6">
              {/* Main Image */}
              <div className="relative aspect-square w-full overflow-hidden rounded-lg ">
                <Image
                  src={images[selectedImage] || '/placeholder.jpg'}
                  alt={`${product.name} view ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Thumbnail Navigation */}
              <div className="relative">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="flex gap-4 pb-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden m-1
                          ${
                            selectedImage === index
                              ? "ring-2 ring-black"
                              : "ring-1 ring-gray-200 hover:ring-gray-300"
                          }`}
                      >
                        <Image
                          src={image || '/placeholder.jpg'}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <dl className="max-w-sm space-y-2 text-sm">
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">제품번호</dt>
                  <dd>{specs.code}</dd>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">카테고리</dt>
                  <dd>{specs.category}</dd>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">Size</dt>
                  <dd>{specs.size}</dd>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">Material</dt>
                  <dd>{specs.material}</dd>
                </div>
              </dl>

              <div className="space-y-4 text-gray-600">
                {typeof product.description === 'string' ? 
                  product.description.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                  : null
                }
              </div>

              <div className="flex gap-4">
                <Button
                  variant={isProductSelected ? "secondary" : "outline"}
                  className="flex-1 h-12 text-base font-semibold"
                  onClick={handleAddToCart}
                  disabled={isProductSelected}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {isProductSelected ? "추가됨" : "관심 상품 추가"}
                </Button>
                <Button
                  className="flex-1 h-12 text-base font-semibold text-white"
                  onClick={handleInquiry}
                >
                  문의하기
                </Button>
              </div>
            </div>
          </div>
          <RelatedProductsCarousel 
            series={product.series} 
            currentProductId={product._id}
          />
        </div>
      </main>
      <InquiryDialog />
      {showSelectedPanel && (
        <SelectedProductsPanel onClose={() => setShowSelectedPanel(false)} />
      )}

      {/* Floating Cart Button */}
      <Button
        onClick={() => setShowSelectedPanel(true)}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg z-10 p-0 hover:scale-105 transition-transform"
      >
        <div className="relative">
          <ShoppingCart className="h-6 w-6" />
          {selectedProducts.length > 0 && (
            <span className="absolute -top-6 -right-6 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {selectedProducts.length}
            </span>
          )}
        </div>
      </Button>
    </div>
  );
}