"use client";

import SelectedProductsPanel from "@/app/components/SelectedProductsPanel";
import { Button } from "@/components/ui/button";
import { Share2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import InquiryDialog from "../../components/InquiryDialog";
import RelatedProductsCarousel from "../../components/RelatedProductsCarousel";
import { useProductStore } from "../../lib/store";

// Mock product data - in real app, this would come from an API
const product = {
  id: "sip-387",
  name: "MEDIUM PIÉ TOTE (Black)",
  code: "SIP-387",
  category: "휴게시설물",
  description: `직물이 움직이는 '석재(piédesta)'의 실루엣에서 영감을 얻어 탄생한 파고라입니다.

유연하고 내구성이 강한 Steel Plate/Pipe와 화강석 등의 소재를 사용했습니다.

세인의 시그니처 디자인은 장인의 섬세한 기술력으로 완성되었습니다.

LED 조명이 적용되어 야간에도 아름다운 공간을 연출할 수 있습니다.`,
  specs: {
    code: "SIP-387",
    size: "W5700 x D2800 x H3000",
    material:
      "Steel Plate/Pipe, 화강석, Polycarbonate, Hard Wood, NT Panel, LED",
    category: "휴게시설물",
  },
  images: [
    "/placeholder.svg?height=800&width=800&text=Image1",
    "/placeholder.svg?height=800&width=800&text=Image2",
    "/placeholder.svg?height=800&width=800&text=Image3",
    "/placeholder.svg?height=800&width=800&text=Image4",
    "/placeholder.svg?height=800&width=800&text=Image5",
  ],
};

// Mock related products
const relatedProducts = [
  {
    id: "sip-388",
    name: "친수형 파고라 B-Type",
    code: "SIP-388",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "sip-389",
    name: "친수형 파고라 C-Type",
    code: "SIP-389",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "sip-390",
    name: "친수형 파고라 D-Type",
    code: "SIP-390",
    image: "/placeholder.svg?height=400&width=600",
  },
];

export default function ProductDetail() {
  const { addProduct, removeProduct, openInquiry, selectedProducts } = useProductStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showSelectedPanel, setShowSelectedPanel] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isProductSelected = selectedProducts.some(p => p.id === product.id);

  const handleInquiry = () => {
    // 현재 제품을 선택된 제품에 추가하고 문의 다이얼로그 열기
    addProduct({
      id: product.id,
      code: product.code,
      image: product.images[0],
    });
    openInquiry();
  };

  const handleAddToCart = () => {
    if (isProductSelected) {
      removeProduct(product.id);
    } else {
      addProduct({
        id: product.id,
        code: product.code,
        image: product.images[0],
      });
    }
    setShowSelectedPanel(true);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <main className="pt-[var(--header-height)]">
        <div className="container mx-auto py-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left: Product Images */}
            <div className="col-span-2 space-y-6">
              {/* Main Image */}
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.images[selectedImage]}
                  alt={`${product.name} view ${selectedImage + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnail Navigation */}
              <div className="relative">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="flex gap-4 pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden 
                          ${selectedImage === index 
                            ? 'ring-2 ring-black' 
                            : 'ring-1 ring-gray-200 hover:ring-gray-300'
                          }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <dl className="max-w-sm space-y-2 text-sm">
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">제품번호</dt>
                  <dd>{product.specs.code}</dd>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">카테고리</dt>
                  <dd>{product.specs.category}</dd>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">Size</dt>
                  <dd>{product.specs.size}</dd>
                </div>
                <div className="grid grid-cols-[100px,1fr] gap-2 items-center py-2 border-b">
                  <dt className="text-gray-600">Material</dt>
                  <dd>{product.specs.material}</dd>
                </div>
              </dl>

              <div className="space-y-4 text-gray-600">
                {product.description.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  variant={isProductSelected ? "secondary" : "outline"}
                  className="flex-1 h-12 text-lg"
                  onClick={handleAddToCart}
                  disabled={isProductSelected}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {isProductSelected ? '추가됨' : '관심 상품 추가'}
                </Button>
                <Button
                  className="flex-1 h-12 text-lg text-white"
                  onClick={handleInquiry}
                >
                  문의하기
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products
          <div className="mt-24">
            <h2 className="text-2xl font-bold mb-8">
              다른 {product.category} 제품
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-lg mb-4">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold mb-1">{relatedProduct.name}</h3>
                  <p className="text-sm text-gray-600">{relatedProduct.code}</p>
                </Link>
              ))}
            </div>
          </div> */}
          <RelatedProductsCarousel category={product.category} />
          {/* <FloatingButton onClick={() => addProduct({
            id: product.id,
            code: product.code,
            image: product.images[0],
          })} /> */}
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
