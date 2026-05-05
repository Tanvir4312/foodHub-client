"use client";

import { getCartAction, getCartByIdAction } from "@/action/addToCart.action";
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
    const fetchData = async () => {
      // 1. Handle Meal Fetching
      if (mealId) {
        const { data: mealResponse } = await getMealAction(mealId);
        const mealData = mealResponse?.data || mealResponse;

        if (mealData) {
          setMeal(mealData);
          // Fetch provider using the meal data directly
          const { data: providerResponse } = await providerAction(
            mealData.provider_id
          );
          const providerData = providerResponse?.data || providerResponse;
          if (providerData) setProvider(providerData);
        }
      }

      // 2. Handle Cart Fetching
      if (cartId) {
        const { data: cartResponse } = await getCartByIdAction(cartId);
        let cartData = cartResponse?.data || cartResponse;

        // Fallback: If specific fetch failed (common for Admin roles on some endpoints),
        // try finding the cart in the general list which we know is accessible.
        if (!cartData || !cartData.id) {
          const { data: allCartsResponse } = await getCartAction();
          const allCarts = allCartsResponse?.data || allCartsResponse;
          if (Array.isArray(allCarts)) {
            cartData = allCarts.find((c: any) => c.id === cartId);
          }
        }

        if (cartData && cartData.id) {
          setCarts(cartData);
          // Fetch provider using the cart data directly
          const { data: providerResponse } = await providerAction(
            cartData.provider_id
          );
          const providerData = providerResponse?.data || providerResponse;
          if (providerData) setProvider(providerData);
        }
      }
    };

    fetchData();
  }, [cartId, mealId]);

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
