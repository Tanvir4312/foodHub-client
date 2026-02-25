/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";
import { createReviewAction } from "@/action/review.action";
import * as z from "zod";
import Image from "next/image";

import { OrderItemType } from "@/types/orderItems.type";
import { Review } from "@/types/review.type";

const formSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),

  comment: z
    .string()
    .min(5, "Comment must be at least 5 characters long")
    .max(500, "Comment is too long (max 500 characters)"),
});
const ReviewCard = ({ orderItem }: { orderItem: OrderItemType }) => {
  const uniqueFormId = `review-form-${orderItem.id}`;

  const form = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding....");
      try {
        const res = await createReviewAction(
          value as Review,
          orderItem?.meal_id,
        );

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        form.reset();
        toast.success("Review Successfully Add", { id: toastId });
      } catch (err) {
        toast.success("Something went wrong", { id: toastId });
      }
    },
  });
  return (
    <div
      key={orderItem.id}
      className="bg-white rounded-xl shadow-md p-5 mb-5 border border-gray-100"
    >
      <div className=" md:flex items-center gap-4 mb-4">
        <Image
          src={orderItem?.meal?.image_url}
          alt={orderItem?.meal?.name}
          width={200}
          height={200}
          unoptimized
        />

        <h3 className="text-lg font-semibold text-gray-700">
          {orderItem?.meal?.name}
        </h3>
      </div>

      <form
        id={uniqueFormId}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="rating">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field className="max-w-80">
                  <FieldLabel htmlFor={field.name}> Your Rating:</FieldLabel>

                  <input
                    type="number"
                    placeholder="Rate (1-5)"
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none
                    ${
                      isInvalid
                        ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    }`}
                  />
                  <FieldError
                    className="text-red-700"
                    errors={field.state.meta.errors}
                  ></FieldError>
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="comment">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}> Write a Review:</FieldLabel>
                  <textarea
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none
                    ${
                      isInvalid
                        ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    }`}
                  />
                  <FieldError
                    className="text-red-700"
                    errors={field.state.meta.errors}
                  ></FieldError>
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </form>
      <div>
        <button
          form={uniqueFormId}
          className="w-full mt-8 bg-[#E21B70] hover:bg-[#c41761] text-white font-bold py-4 rounded-xl transition-all cursor-pointer
             disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ADD REVIEW
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
