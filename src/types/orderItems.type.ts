export type OrderMealType = {
  name: string;
  price: number;
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
