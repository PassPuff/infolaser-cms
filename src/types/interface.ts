// Product Type
export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  orderPrice: number;
  stockPrice: number;
  newPrice?: number;
  inStock: boolean;
  rating?: number;
  guarantee?: number;
  guaranteeContent?: string;
  order?: number;
  category_ids: number[];
  label_ids?: number[];
  created_at?: string;
  updated_at?: string;
}

// Category Type
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  order?: number;
  banner_image_url?: string;
  type: "product" | "accessory";
  created_at?: string;
  updated_at?: string;
}
