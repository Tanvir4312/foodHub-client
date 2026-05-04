/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { cartType } from "@/types/cart.type";
import { CartItemsType } from "@/types/cartItems.type";
import { MealType } from "@/types/meal.type";
import { ProviderType } from "@/types/provider.type";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { createOrderAction } from "@/action/order.action";
import { deleteCartAction } from "@/action/addToCart.action";
import { OrderDataType } from "@/types/orderData.type";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { orderSchema } from "../zod/checkOut.validation";
import { ShowSkeleton } from "../SharedSkileton/Skileton/Skileton";





const Checkout = ({
  meal,
  quantity,
  totalPrice,
  provider,
  carts,
}: {
  meal: MealType;
  quantity: number;
  totalPrice: number;
  provider: ProviderType;
  carts: cartType;
}) => {
  const { name } = meal || {};
  const { cartItems } = carts || {};
  const deliveryFee = 70;

  const serviceFee = Math.floor(totalPrice * 0.1);

  // --- Hydration state ---
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- Order success state ---
  const [orderSuccess, setOrderSuccess] = useState(false);
  const router = useRouter();

  // --- Coupon state ---
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    console.log("coupon input", couponInput);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/coupons/validate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ code: couponInput }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Invalid coupon");
        return;
      }
      const data = await res.json();
      console.log("coupon validated", data);
      setAppliedCoupon({ code: data.code, discount: data.discount });
      toast.success(`${data.discount}% discount applied!`);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
  };
  // --- Coupon state end ---

  const discountAmountSingle = appliedCoupon
    ? Math.floor((totalPrice * appliedCoupon.discount) / 100)
    : 0;
  const totalFee = Math.ceil(
    totalPrice - discountAmountSingle + deliveryFee + Number(serviceFee),
  );

  const form = useForm({
    defaultValues: {
      street: "",
      apartment: "",
      phone: "",
      note: "",
    },
    validators: {
      onSubmit: orderSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Processing....");
      const fullAddress = `${value.street}, Apartment: ${value.apartment}${value.note ? `, Note: ${value.note}` : ""}`;
      const phone_number = value?.phone;

      const items =
        cartItems?.length > 0
          ? cartItems.map((item: any) => ({
            mealId: item.meal_id || item.meal?.id,
            quantity: item.quantity,
          }))
          : meal?.id
            ? [{ mealId: meal.id, quantity: quantity }]
            : [];
      const orderData = {
        delivery_address: fullAddress,
        phone_number,
        items: items,
        couponCode: appliedCoupon?.code ?? undefined,
      };

      try {
        const res = await createOrderAction(orderData as OrderDataType);

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        // ✅ Order success: reset form + coupon
        toast.success("Order Confirmed! Your food is on the way.", { id: toastId });
        form.reset();
        setAppliedCoupon(null);
        setCouponInput("");
        setOrderSuccess(true);

        // If ordered from cart, delete the whole cart from backend
        if (cartItems?.length > 0 && carts?.id) {
          await deleteCartAction(carts.id);
        }

        // Trigger Navbar to update its cart count instantly
        window.dispatchEvent(new Event("cartUpdated"));

        // Refresh server components
        router.refresh();
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  const serviceFees =
    cartItems?.reduce((total, item) => total + item.price, 0) * 0.1;
  const servicesFee = Math.floor(serviceFees);

  const cartSubtotal = cartItems?.reduce((total, item) => total + item.price, 0) ?? 0;
  const discountAmountCart = appliedCoupon
    ? Math.floor((cartSubtotal * appliedCoupon.discount) / 100)
    : 0;
  const total = cartSubtotal - discountAmountCart + deliveryFee + serviceFees;

  const totalAmount = Math.floor(total);

  // Show skeleton during hydration or if critical data isn't provided yet
  if (!isMounted || (!carts?.id && !meal?.id) || !provider) return <ShowSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 my-10 rounded-lg md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Review and place your order
          </h1>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Delivery address</h2>

            <form
              id="order-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <form.Field name="street">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Street / House Number
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          placeholder="Street / House Number"
                          className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none
                    ${isInvalid
                              ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 bg-gray-50/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            }`}
                          onChange={(e) => field.handleChange(e.target.value)}
                        ></Input>
                        <FieldError
                          className="text-red-700"
                          errors={field.state.meta.errors}
                        ></FieldError>
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="apartment">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Apartment</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          placeholder="Apartment #"
                          className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none
                    ${isInvalid
                              ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 bg-gray-50/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            }`}
                          onChange={(e) => field.handleChange(e.target.value)}
                        ></Input>
                        <FieldError
                          className="text-red-700"
                          errors={field.state.meta.errors}
                        ></FieldError>
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="phone">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Phone Number
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          placeholder="e.g. 017XXXXXXXX"
                          className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none
                    ${isInvalid
                              ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 bg-gray-50/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            }`}
                          onChange={(e) => field.handleChange(e.target.value)}
                        ></Input>
                        <FieldError
                          className="text-red-700"
                          errors={field.state.meta.errors}
                        ></FieldError>
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="note">
                  {(field) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Note</FieldLabel>
                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          placeholder="Note to rider - e.g. building, landmark"
                          className="focus:ring-pink-500"
                          onChange={(e) => field.handleChange(e.target.value)}
                        ></Textarea>
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup>
            </form>

            <div className="space-y-4"></div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
            <div className="p-4 border-2 border-pink-500 rounded-lg bg-pink-50 flex justify-between items-center">
              <span className="font-medium text-pink-700">
                Cash on Delivery
              </span>
              <div className="h-4 w-4 rounded-full bg-pink-600"></div>
            </div>
          </div>

          {/* Coupon Field */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-3">Coupon Code</h2>
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <div>
                  <span className="text-sm font-bold text-green-700">
                    {appliedCoupon.code}
                  </span>
                  <span className="text-sm text-green-600 ml-2">
                    -{appliedCoupon.discount}% applied
                  </span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-sm text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  placeholder="Enter coupon code"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50/50 text-gray-800 placeholder:text-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponLoading}
                  className="bg-[#E21B70] hover:bg-[#c41761] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all disabled:opacity-60"
                >
                  {couponLoading ? "..." : "Apply"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Your order from</h2>
            <p className="text-gray-600 mb-6 font-medium">{provider?.name}</p>

            {cartItems ? (
              carts?.cartItems?.map((item, idx) => (
                <div key={idx} className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>
                      {item?.quantity} x {item?.meal?.name}
                    </span>
                    <span>Tk {item?.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>
                    {quantity} x {name}
                  </span>
                  <span>Tk {totalPrice}</span>
                </div>
              </div>
            )}
            <hr className="my-4" />

            <div className="space-y-2 text-gray-600">
              {carts?.cartItems ? (
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    Tk{" "}
                    {(cartItems as CartItemsType[])?.reduce(
                      (total, item) => total + item.price,
                      0,
                    )}
                  </span>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Tk {totalPrice}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard delivery</span>
                <span>Tk {deliveryFee}</span>
              </div>

              {cartItems ? (
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>Tk {servicesFee}</span>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>Tk {serviceFee}</span>
                </div>
              )}

              {appliedCoupon && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount ({appliedCoupon.discount}%)</span>
                  <span>
                    - Tk{" "}
                    {Math.floor(
                      ((carts?.cartItems?.length > 0 ? cartItems.reduce((t, i) => t + i.price, 0)
                        : totalPrice) *
                        appliedCoupon.discount) /
                      100,
                    )}
                  </span>
                </div>
              )}
            </div>

            {cartItems ? (
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">Total</p>
                  <p className="text-xs text-gray-500">(incl. fees and tax)</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  Tk {totalAmount}
                </p>
              </div>
            ) : (
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">Total</p>
                  <p className="text-xs text-gray-500">(incl. fees and tax)</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  Tk {totalFee}
                </p>
              </div>
            )}

            <button
              form="order-form"
              disabled={orderSuccess}
              onClick={() => orderSuccess && setOrderSuccess(false)}
              className={`w-full mt-8 font-bold py-4 rounded-xl transition-all
                ${orderSuccess
                  ? "bg-green-500 text-white cursor-default"
                  : "bg-[#E21B70] hover:bg-[#c41761] text-white cursor-pointer"
                } disabled:opacity-80`}
            >
              {orderSuccess ? "✓ Order Placed" : "Place order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
