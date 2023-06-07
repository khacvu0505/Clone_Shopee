import { Product } from './product.type';

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5;

export type PurchaseListStatus = PurchaseStatus | 0;

export interface Purchase {
  _id: string;
  buy_count: number;
  price: number;
  price_before_discount: number;
  status: PurchaseStatus;
  user: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface ExtendedPurchases extends Purchase {
  checked: boolean;
}

export interface ProductAddToPurchase {
  product_id: string;
  buy_count: number;
}
