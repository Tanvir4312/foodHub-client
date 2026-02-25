export type OrderMealType = {
  name: string;
  price: number;
  image_url: string;
};

export type OrderItemType = {
  id: string;
  meal: OrderMealType;
  meal_id: string;
  order_id: string;
  price: number;
  quantity: number;
  total_price: number;
};
