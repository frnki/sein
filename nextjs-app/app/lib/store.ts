import { create } from 'zustand'
import { SelectedProduct } from '../types/product'

interface ProductStore {
  selectedProducts: SelectedProduct[]
  addProduct: (product: SelectedProduct) => void
  removeProduct: (productId: string) => void
  clearProducts: () => void
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProducts: [],
  addProduct: (product) =>
    set((state) => ({
      selectedProducts: [...state.selectedProducts, product],
    })),
  removeProduct: (productId) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.filter((p) => p.id !== productId),
    })),
  clearProducts: () => set({ selectedProducts: [] }),
}))

