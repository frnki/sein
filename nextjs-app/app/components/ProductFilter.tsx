'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

interface SubCategory {
  id: string;
  name: string;
  count: number;
}

interface Filter {
  id: string;
  name: string;
  count: number;
  subCategories: SubCategory[];
}

interface ProductFilterProps {
  filters: Filter[]
  onFilterChange: (category: string, subCategory: string, checked: boolean) => void
}

export default function ProductFilter({ filters, onFilterChange }: ProductFilterProps) {
  return (
    <div className="w-64 bg-white border-r sticky top-[64px] h-[calc(100vh-64px)]">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">필터</h2>
        <Accordion type="multiple" className="space-y-2">
          {filters.map((filter) => (
            <AccordionItem key={filter.id} value={filter.id}>
              <AccordionTrigger className="hover:no-underline">
                <span className="flex justify-between items-center w-full">
                  <span>{filter.name}</span>
                  <span className="text-sm text-gray-500">({filter.count})</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 pt-2 space-y-2">
                  {filter.subCategories.map((subCategory) => (
                    <div key={subCategory.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${filter.id}-${subCategory.id}`}
                          onCheckedChange={(checked) =>
                            onFilterChange(filter.id, subCategory.id, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={`${filter.id}-${subCategory.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {subCategory.name}
                        </label>
                      </div>
                      <span className="text-sm text-gray-500">({subCategory.count})</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

