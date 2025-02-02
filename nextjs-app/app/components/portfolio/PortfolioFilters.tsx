"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const categories = ["전체", "주거", "공공시설", "오피스", "리조트"] as const;
const sortOptions = ["최근 등록 순", "프로젝트 코드 순", "이름순"] as const;

type Category = (typeof categories)[number];
type SortOption = (typeof sortOptions)[number];

interface PortfolioFiltersProps {
  years: number[];
  categories: typeof categories;
  sortOptions: typeof sortOptions;
  selectedYear: string;
  selectedCategory: Category;
  sortOrder: SortOption;
  searchTerm: string;
  onYearChange: (year: string) => void;
  onCategoryChange: (category: Category) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
}

export default function PortfolioFilters({
  years,
  selectedYear,
  searchTerm,
  onYearChange,
  onSearchChange,
}: PortfolioFiltersProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
        <div className="col-span-3 space-y-2">
          <Label htmlFor="year-select" className="text-sm font-medium">
            연도
          </Label>
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger id="year-select" className="bg-white">
              <SelectValue placeholder="연도 선택" />
            </SelectTrigger>
            <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
              <SelectItem value="all">전체</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}년
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-9 space-y-2">
          <Label htmlFor="search" className="text-sm font-medium">
            검색
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search"
              placeholder="프로젝트명, 코드 또는 태그로 검색"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
