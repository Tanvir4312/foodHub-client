/* eslint-disable @typescript-eslint/no-unused-vars */

import { getMyMealByIdAction } from "@/action/meals.action";
import UpdateMealForm from "@/components/modules/providerDashboard/UpdateMealForm";

const MyMealUpdate = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const mealData = await getMyMealByIdAction(id);
  const meal = mealData?.data;

  return <UpdateMealForm meal={meal} id={id} />;
};

export default MyMealUpdate;
