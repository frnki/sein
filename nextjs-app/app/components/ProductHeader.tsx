"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, X } from "lucide-react";
import Image from "next/image";
import { useProductStore } from "../lib/store";

interface Props {
  totalProducts: number;
  selectedCount: number;
  sortOrder: "newest" | "oldest";
  onSortChange: (value: "newest" | "oldest") => void;
  onSearch: (value: string) => void;
}

export default function ProductHeader({
  totalProducts,
  selectedCount,
  sortOrder,
  onSortChange,
  onSearch,
}: Props) {
  const { selectedProducts, toggleProduct, openInquiry } = useProductStore();
  const handleCheckboxChange = (id: string) => (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    toggleProduct({
      id,
    });
  };

  return (
    <div className="sticky top-[57px] bg-white z-40 border-b">
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="제품명 또는 코드로 검색"
              className="pl-10"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-600 whitespace-nowrap">
            총 <span className="font-bold text-primary">{totalProducts}</span>
            개의 제품
          </div>
        </div>
      </div>

      {selectedProducts.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 mr-4">
              선택된 제품
            </span>
            <div className="flex gap-2 overflow-x-auto">
              {selectedProducts.map((product) => (
                <Badge
                  key={product.id}
                  variant="secondary"
                  className="pl-2 pr-3 py-1 flex items-center gap-2"
                >
                  <div className="relative w-6 h-6 rounded overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.code}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{product.code}</span>

                  <X
                    onClick={handleCheckboxChange(product.id)}
                    className="h-3 w-3 hover:text-red-500"
                  />
                </Badge>
              ))}
            </div>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={openInquiry}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white ml-4 whitespace-nowrap"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{selectedProducts.length}개 제품 문의하기</span>
          </Button>
        </div>
      )}
    </div>
  );
}
