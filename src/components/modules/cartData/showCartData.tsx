/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { providerAction } from "@/action/provider.action";
import { cartType } from "@/types/cart.type";
import { useEffect, useState } from "react";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { CartItemsType } from "@/types/cartItems.type";
import { deleteCartAction, deleteCartItemAction } from "@/action/addToCart.action";

interface ProviderType {
  name: string;
  logo_url: string;
}

const ShowCartData = ({
  cart,
  initialCarts,
}: {
  cart: cartType;
  initialCarts: cartType[];
}) => {
  const [provider, setProvider] = useState<ProviderType>({} as ProviderType);
  const { provider_id, cartItems } = cart || {};
  const cartItemsArr = cart?.cartItems;
  const [allCart, setAllCart] = useState(initialCarts);
  const [allCartItem, setAllCartItem] = useState<CartItemsType[]>(cartItemsArr);

  useEffect(() => {
    const fetchCount = async () => {
      const { data } = await providerAction(provider_id);

      setProvider(data);
    };

    fetchCount();

    window.addEventListener("cartUpdated", fetchCount);

    return () => window.removeEventListener("cartUpdated", fetchCount);
  }, [provider_id]);
  const { name, logo_url } = provider || {};

  const handleDelete = async (id: string) => {
    const previousCarts = [...allCart];

    setAllCart((prev) => prev.filter((cart) => cart.id !== id));

    try {
      const res = await deleteCartAction(id);

      if (res?.error) {
        setAllCart(previousCarts);
        alert("Could not delete: " + res.error);
      } else {
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      setAllCart(previousCarts);
      alert("Failed to connect to the server");
    }
  };

  const handleItemsDelete = async (id: string) => {
    const previousItem = [...allCartItem];

    setAllCartItem((prevItem) => prevItem.filter((item) => item.id !== id));

    try {
      const res = await deleteCartItemAction(id);

      if (res?.error) {
        setAllCartItem(previousItem);
        alert("Could not delete: " + res.error);
      } else {
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
       setAllCartItem(previousItem);
      alert("Failed to connect to the server");
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-y-auto shadow-sm border border-gray-100 overflow-hidden mb-6  flex flex-col">
      <div className="bg-orange-50/50 p-4 flex items-center justify-between border-b border-orange-100">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-orange-200">
            {logo_url && (
              <Image
                src={logo_url}
                alt={logo_url || "Food"}
                fill
                className="object-cover"
              />
            )}
          </div>
          <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
        </div>
        <button
          onClick={() => handleDelete(cart.id)}
          className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors"
        >
          <Trash2 className="w-5 h-5 cursor-pointer" />
        </button>
      </div>

      {/* Cart Item*/}
      <div className="p-4 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          (cartItems as unknown as CartItemsType[])?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden relative">
                  {item.meal?.image_url && item.meal.image_url !== "" ? (
                    <Image
                      src={item.meal.image_url}
                      alt={item.meal.name || "Food"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <ShoppingBag className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">
                    {item.meal?.name || "Delicious Meal"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ৳{item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-bold text-orange-600">
                  ৳{item.price * item.quantity}
                </p>
                <button
                  onClick={() => handleItemsDelete(item.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                >
                  <Trash2 className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-4">
            No items in this cart
          </p>
        )}
      </div>

      <div className="p-4 bg-gray-50 flex justify-between items-center">
        <p className="text-sm text-gray-500 font-medium">Subtotal</p>
        <p className="text-xl font-black text-gray-800">
          ৳
          {(cartItems as unknown as CartItemsType[])?.reduce(
            (total, item) => total + item?.price * item.quantity,
            0,
          )}
        </p>
      </div>

      <button
        onClick={() => console.log("Order placed for provider:", provider_id)}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 transform active:scale-[0.98] shadow-md shadow-orange-200 flex items-center justify-center gap-2 group"
      >
        <span>Place Order</span>

        <svg
          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="ArrowRightIcon"
          />
          <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  );
};

export default ShowCartData;
