"use client";

import { getMealAction } from "@/action/meals.action";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CheckOut = () => {
  const searchParams = useSearchParams();
  const mealId = searchParams.get("mealId")
  const quantity = Number(searchParams.get("quantity"))

  useEffect(() =>{
    (async () =>{
        const {data} = await getMealAction(mealId as string)
        console.log(data)
    })()
  },[mealId])

  return <div>CheckOut</div>;
};

export default CheckOut;
