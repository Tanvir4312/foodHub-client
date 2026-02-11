import { CartItemsType } from "./cartItems.type";

export interface cartType {
  id: string;
  provider_id: string;
  user_id: string;
  cartItems: CartItemsType[];
}