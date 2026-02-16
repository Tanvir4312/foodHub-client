export interface CartItemsType {
  id: string;
  cart_id: string;
  meal_id: string;
  price: number;
  quantity: number;
  meal: {
    id : string;
    name: string;
    image_url: string;
    price: number;
  };
}
