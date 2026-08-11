export interface ProductSpecs {
  [key: string]: string;
}

export interface AIInsights {
  summary: string;
  pros: string[];
  cons: string[];
  score: number; // AI score out of 100
}

export interface ProductReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  categorySlug: string;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  features: string[];
  specs: ProductSpecs;
  aiInsights: AIInsights;
  stock: number;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}
