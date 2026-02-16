"use client";
import { getCartAction } from "@/action/addToCart.action";
import React, { useEffect, useState } from "react";
import ShowCartData from "./showCartData";
import { cartType } from "@/types/cart.type";

const CartData = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchCount = async () => {
      const res = await getCartAction();

      const actualData = Array.isArray(res.data) ? res.data : res.data?.data || [];

      setCartData(actualData);
    };

    fetchCount();

    window.addEventListener("cartUpdated", fetchCount);

    return () => window.removeEventListener("cartUpdated", fetchCount);
  }, []);

 

  if(!cartData){
    return null
  }


  return (
    <div className="h-7">
      {cartData?.map((cart: cartType) => (
        <ShowCartData 
        key={cart.id} 
        cart={cart}
        initialCarts={cartData}
       
        ></ShowCartData>
      ))}
    </div>
  );
};

export default CartData;
