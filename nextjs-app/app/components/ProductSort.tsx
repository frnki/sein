'use client';

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";

interface ProductSortProps {
  value: 'newest' | 'oldest';
  onValueChange: (value: 'newest' | 'oldest') => void;
}

export function ProductSort({ value, onValueChange }: ProductSortProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger 
        className="w-[120px] border-0 focus:ring-0 focus:ring-offset-0 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {value === 'newest' ? (
            <ArrowUpNarrowWide className="h-4 w-4" />
          ) : (
            <ArrowDownWideNarrow className="h-4 w-4" />
          )}
          <span>{value === 'newest' ? '최신순' : '오래된순'}</span>
        </div>
      </SelectTrigger>
      <SelectContent 
        className="min-w-[120px]"
        align="end"
      >
        {value === 'oldest' ? (
          <SelectItem value="newest">
            최신순
          </SelectItem>
        ) : (
          <SelectItem value="oldest">
            오래된순
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
} 