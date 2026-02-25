import { getOrderByIdAction } from "@/action/order.action";
import { OrderItemType } from "@/types/orderItems.type";

import ReviewCard from "@/components/reviewCard/reviewCard";

const CustomerReview = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await getOrderByIdAction(id);

  const order = res?.data || [];

  const { orderItems } = order || {};

  return (
    <div>
      {orderItems?.map((orderItem: OrderItemType) => (
        <ReviewCard key={orderItem?.id} orderItem={orderItem}></ReviewCard>
      ))}
    </div>
  );
};

export default CustomerReview;
