import { create } from 'zustand';
import { SelectedProduct } from './types/product';

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
  toggleProduct: (productId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.includes(productId)
        ? state.selectedProducts.filter(id => id !== productId)
        : [...state.selectedProducts, productId],
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

