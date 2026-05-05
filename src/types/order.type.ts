export type Order = {
  id: string;
  delivery_address: string;
  total_amount: number;
  status: string;
  createdAt: string;
  orderItems: [];
  provider: {
    name: string;
  }
};
