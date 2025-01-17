import type { SelectedProduct } from '@/app/lib/types/product';
import { create } from 'zustand';

interface ProductStore {
  selectedProducts: SelectedProduct[];
  isInquiryOpen: boolean;
  toggleProduct: (product: SelectedProduct) => void;
  addProduct: (product: SelectedProduct) => void;
  removeProduct: (id: string) => void;
  clearProducts: () => void;
  openInquiry: () => void;
  closeInquiry: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProducts: [],
  isInquiryOpen: false,
  toggleProduct: (product) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.some(p => p.id === product.id)
        ? state.selectedProducts.filter(p => p.id !== product.id)
        : [...state.selectedProducts, product],
    })),
  addProduct: (product) =>
    set((state) => ({
      selectedProducts: [...state.selectedProducts, product],
    })),
  removeProduct: (id) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.filter(p => p.id !== id),
    })),
  clearProducts: () => set({ selectedProducts: [] }),
  openInquiry: () => set({ isInquiryOpen: true }),
  closeInquiry: () => set({ isInquiryOpen: false }),
}));

