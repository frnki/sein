export interface Product {
  id: string;
  name: string;
  code: string;
  dimensions: string;
  category: string;
  subCategory: string;
  image: string;
  date: string;
}

export interface Filter {
  id: string;
  name: string;
  subCategories: {
    id: string;
    name: string;
  }[];
}

export interface SelectedProduct {
  id: string;
  code: string;
  image: string;
}

