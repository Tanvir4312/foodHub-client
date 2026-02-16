"use client";

import { getCartByIdAction } from "@/action/addToCart.action";
import { getMealAction } from "@/action/meals.action";
import { providerAction } from "@/action/provider.action";
import Checkout from "@/components/orderCheckout/checkout";
import { cartType } from "@/types/cart.type";
import { MealType } from "@/types/meal.type";
import { ProviderType } from "@/types/provider.type";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CheckOut = () => {
  const [meal, setMeal] = useState<MealType>({} as MealType);
  const [provider, setProvider] = useState<ProviderType>({} as ProviderType);
  const [carts, setCarts] = useState<cartType>({} as cartType);
  const searchParams = useSearchParams();
  const mealId = searchParams.get("mealId");
  const quantity = Number(searchParams.get("quantity"));
  const cartId = searchParams.get("cartId");

  useEffect(() => {
    (async () => {
      const { data } = await getMealAction(mealId as string);
      setMeal(data);

      const { data: provider } = await providerAction(meal?.provider_id);
      setProvider(provider);

     
        const { data: cart } = await getCartByIdAction(cartId as string);
        setCarts(cart);
      

      if (cartId) {
        const { data: provider } = await providerAction(cart.provider_id);
        setProvider(provider);
      }
    })();
  }, [cartId, meal?.provider_id, mealId]);

  const totalPrice = quantity * Number(meal?.price);

  return (
    <div className="max-w-7xl mx-auto">
      <Checkout
        meal={meal}
        quantity={quantity}
        totalPrice={totalPrice || 0}
        provider={provider}
        carts={carts}
      />
    </div>
  );
};

export default CheckOut;
