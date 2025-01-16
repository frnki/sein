"use client";

import { useProductStore } from "@/app/lib/store";
import { urlForImage } from "@/sanity/lib/image";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  code: string;
  dimensions?: {
    width: number;
    depth: number;
    height: number;
    unit: string;
  };
  category: string;
  subCategory?: string;
  mainImage: any;
  publishedAt: string;
  slug: {
    current: string;
  };
  imageUrl?: string;
}

interface ProductGridProps {
  products: Product[];
  sortOrder: "newest" | "oldest";
}

export default function ProductGrid({ products }: ProductGridProps) {
  const router = useRouter();
  const { selectedProducts, toggleProduct } = useProductStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products.map((product) => {
        console.log("🚀 ~ {products.map ~ product:", product)
        const isSelected = selectedProducts.includes(product._id);

        return (
          <div
            key={product._id}
            className=" relative bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Product Image */}
            <div
              className="group relative aspect-square cursor-pointer"
              onClick={() => router.push(`/products/${product.slug.current}`)}
            >
              <Image
                src={
                  product.imageUrl ||
                  (product.mainImage
                    ? urlForImage(product.mainImage).url()
                    : "/placeholder.jpg")
                }
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300" />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <Link href={`/products/${product.slug.current}`}>
                <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 mb-2">{product.code}</p>
              {!!product.dimensions && (
                <p className="text-sm text-gray-500">{`W${product.dimensions.width} x D${product.dimensions.depth} x H${product.dimensions.height}`}</p>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => toggleProduct(product._id)}
              className={`
                absolute bottom-3 right-3 w-8 h-8 rounded-full 
                flex items-center justify-center
                p-2
                transition-all duration-300
                ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-white/80 hover:bg-gray-100 text-gray-600 hover:text-primary"
                }
              `}
            >
              <span className="sr-only">
                {isSelected ? "장바구니에서 제거" : "장바구니에 추가"}
              </span>
              {isSelected ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <ShoppingCartIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function CheckIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
