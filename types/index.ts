// Core product types
export type ProductCategory =
  | 'laptops'
  | 'tvs'
  | 'acs'
  | 'refrigerators'
  | 'mobiles'
  | 'washing-machines'
  | 'air-purifiers'
  | 'headphones'
  | 'microwaves';


export interface AIMatchMetadata {
  score: number; // 0–100
  whyMatches: string | string[];
  keyStrengths: string[];
  potentialDrawback: string;
  efficiencyBadge: string | null; // e.g. "5 Star BEE", "Energy Saver", null
  targetUser?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice: number; // for showing discount
  discount: number; // percentage
  rating: number; // 1–5
  reviewCount: number;
  image: string;
  images: string[]; // gallery
  description: string;
  specs: ProductSpec[];
  aiMatch: AIMatchMetadata;
  stock: number;
  inStock?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isDeal?: boolean;
  tags?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  warranty?: string;
  seller?: string;
  pros?: string[];
  cons?: string[];
  aiReviewSummary?: {
    praise: string[];
    complaints: string[];
    verdict: string;
  };
}


export interface Category {
  id: string;
  slug: ProductCategory;
  name: string;
  icon: string; // emoji or icon name
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ShoppingPriority =
  | 'best-value'
  | 'energy-efficient'
  | 'premium-quality'
  | 'budget-friendly'
  | 'latest-tech';

export interface UserAIPreferences {
  priorities: ShoppingPriority[];
  budgetLimit: number; // in INR
  preferredBrands: string[];
  requireEnergyStar: boolean;
  minimumRating: number; // 1–5
  preferredCategory: ProductCategory | 'all';
}
