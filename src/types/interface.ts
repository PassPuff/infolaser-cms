// Label Type
export interface Label {
  id: number;
  name: string;
  slug: string;
  color: string;
  created_at: string | null;
  updated_at: string | null;
  pivot?: {
    product_id: number;
    label_id: number;
  };
}

// Product Attachment Type
export interface ProductAttachment {
  id: number;
  product_id: number;
  external_url: string;
  internal_path: string | null;
  type: "image" | "video";
  is_main: number;
  order: number;
  width: number | null;
  height: number | null;
  created_at: string;
  updated_at: string;
  name: string | null;
}

// Product Characteristic Type
export interface ProductCharacteristic {
  id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}

// Product Type
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  orderPrice: number;
  stockPrice: number;
  newPrice: number | null;
  inStock: number; // 1 или 0
  rating: number | null;
  guarantee: number | null;
  guaranteeContent: string | null;
  created_at: string | null;
  updated_at: string | null;
  order: number;
  categories: Category[];
  labels: Label[];
  product_attachments: ProductAttachment[];
  product_characteristics: ProductCharacteristic[];
}

export interface product_attachments {
  id: number;
  name: string;
  external_url: string;
  product_id: number;
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
