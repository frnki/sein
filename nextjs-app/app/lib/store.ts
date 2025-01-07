import { create } from 'zustand'

interface ProductStore {
  selectedProducts: string[]
  toggleProduct: (productId: string) => void
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProducts: [],
  toggleProduct: (productId) => 
    set((state) => ({
      selectedProducts: state.selectedProducts.includes(productId)
        ? state.selectedProducts.filter(id => id !== productId)
        : [...state.selectedProducts, productId]
    })),
}))

