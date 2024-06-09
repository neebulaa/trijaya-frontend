import { BaseModel } from '@/types/base';
import { IProduct } from '@/types/product';

export interface ICart extends BaseModel {
  userId: string;
  subtotal: number;
  total: number;
  items: ICartItem[] | any;
}

export interface ICartItem extends BaseModel {
  cartId: string;
  productId: string;
  quantity: number;
  meta: null;
  product: IProduct;
}