export type Order = {
  id: string;
  delivery_address: string;
  total_amount: number;
  status: string;
  orderItems: [];
}[];
