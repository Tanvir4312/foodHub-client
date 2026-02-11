"use client";

import { addToCartAction } from "@/action/addToCart.action";

import { MealType } from "@/types/meal.type";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { useState } from "react";
import { toast } from "sonner";

const MealDetailsClient = ({ meal }: { meal: MealType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [click, setclick] = useState("");

  const handleAddToCart = async () => {
    const price = quantity * meal.price;
    try {
      const cart = await addToCartAction(meal.id, price, quantity);
      if (cart) {
        toast.success("AddToCart Successfully");
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
      if (err) {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <div>
      <div className="md:flex gap-5 items-center space-y-4 md:space-y-0">
        <button
          onClick={() => {
            setIsModalOpen(true);
            setclick("order");
          }}
          className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
        >
          <ShoppingCart className="w-5 h-5" />
          Order Now
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setclick("cart");
          }}
          className="w-full border-2 cursor-pointer border-[#ff6900] text-orange-600 hover:bg-orange-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>

      {/* --- ORDER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Customize Order
            </h2>

            <div className="flex items-center gap-4 mb-8 bg-gray-50 p-4 rounded-2xl">
              <Image
                src={meal.image_url}
                alt=""
                width={200}
                height={200}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div>
                <h4 className="font-bold text-lg">{meal.name}</h4>
                <p className="text-orange-600 font-bold">
                  ${(meal.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8 px-4">
              <span className="font-semibold text-gray-700">Quantity</span>
              <div className="flex items-center gap-6 bg-gray-100 p-2 rounded-2xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 bg-white rounded-xl shadow-sm hover:text-orange-500 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-bold min-w-5 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 bg-white rounded-xl shadow-sm hover:text-orange-500 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 font-bold text-gray-500 hover:bg-gray-100 rounded-2xl transition-all"
              >
                Cancel
              </button>
              {click === "cart" && (
                <button
                  className="flex-2 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all px-5 cursor-pointer"
                  onClick={() => {
                    handleAddToCart();
                    setIsModalOpen(false);
                  }}
                >
                  {" "}
                  Confirm - ${(meal.price * quantity).toFixed(2)}
                </button>
              )}
              {click === "order" && (
                <button
                  className="flex-2 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all px-5 cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  {" "}
                  Confirm - ${(meal.price * quantity).toFixed(2)}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealDetailsClient;
