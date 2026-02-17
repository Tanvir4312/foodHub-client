/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { cartType } from "@/types/cart.type";
import { CartItemsType } from "@/types/cartItems.type";
import { MealType } from "@/types/meal.type";
import { ProviderType } from "@/types/provider.type";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { createOrderAction } from "@/action/order.action";
import { OrderDataType } from "@/types/orderData.type";

const orderSchema = z.object({
  street: z.string().min(5, "Address is too short").max(100, ""),
  apartment: z.string().min(1, "Apartment/House info is required"),
  phone: z.string(),
  note: z.string(),
});

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

  const totalFee = Math.ceil(totalPrice + deliveryFee + Number(serviceFee));

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
          ? cartItems.map((item) => ({
              mealId: item.meal.id,
              quantity: item.quantity,
            }))
          : meal
            ? [{ mealId: meal.id, quantity: quantity }]
            : [];
      const orderData = {
        delivery_address: fullAddress,
        phone_number,
        items: items,
      };

      try {
        const res = await createOrderAction(orderData as OrderDataType);

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("Order Confirmed", { id: toastId });
        form.reset();
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  const serviceFees =
    cartItems?.reduce((total, item) => total + item.price, 0) * 0.1;
  const servicesFee = Math.floor(serviceFees);

  const total =
    cartItems?.reduce((total, item) => total + item.price, 0) +
    deliveryFee +
    serviceFees;

  const totalAmount = Math.floor(total);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
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
                          className=" focus:ring-pink-500"
                          onChange={(e) => field.handleChange(e.target.value)}
                        ></Input>
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="apartment">
                  {(field) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Apartment</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          placeholder="Apartment #"
                          className="focus:ring-pink-500"
                          onChange={(e) => field.handleChange(e.target.value)}
                        ></Input>
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="phone">
                  {(field) => {
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
                          className="focus:ring-pink-500"
                          onChange={(e) => field.handleChange(e.target.value)}
                        ></Input>
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
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Your order from</h2>
            <p className="text-gray-600 mb-6 font-medium">{provider?.name}</p>

            {cartItems ? (
              cartItems?.map((item, idx) => (
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
              {cartItems ? (
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
              className="w-full mt-8 bg-[#E21B70] hover:bg-[#c41761] text-white font-bold py-4 rounded-xl transition-all cursor-pointer
             disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
