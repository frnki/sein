"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useProductStore } from "../lib/store";
import SelectedProductsPanel from "./SelectedProductsPanel";

interface Product {
  id: string;
  name: string;
  code: string;
  dimensions: string;
  category: string;
  subCategory: string;
  image: string;
  date: string;
}

interface Props {
  products: Product[];
  sortOrder: "newest" | "oldest";
}

export default function ProductGrid({ products, sortOrder }: Props) {
  const router = useRouter();
  const { selectedProducts, toggleProduct } = useProductStore();
  const [showPanel, setShowPanel] = useState(false);

  const sortedProducts = [...products].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const handleCheckboxChange = (product: Product) => {
    const isSelected = selectedProducts.some(p => p.id === product.id);
    
    // 첫 번째 상품을 추가할 때만 패널 표시
    if (!isSelected && selectedProducts.length === 0) {
      setShowPanel(true);
    }
    
    toggleProduct({
      id: product.id,
      code: product.code,
      image: product.image
    });
  };

  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 pr-0">
        {sortedProducts.map((product) => {
          const isSelected = selectedProducts.some(p => p.id === product.id);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {isSelected && (
                <div 
                  className="cursor-pointer absolute inset-0 bg-blue-500/10 z-10" 
                  onClick={() => handleCheckboxChange(product)}
                />
              )}
              <div
                className="cursor-pointer"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <div className="relative h-64 bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{product.code}</h3>
                      {/* <p className="text-sm text-gray-500">{product.code}</p> */}
                    </div>

                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                        {product.category}
                      </span>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                        {product.subCategory}
                      </span>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleCheckboxChange(product)}
                        className={`p-2 rounded-full transition-colors ${
                          isSelected 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {showPanel && (
        <SelectedProductsPanel onClose={() => setShowPanel(false)} />
      )}
    </>
  );
}
