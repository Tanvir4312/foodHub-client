/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { createMealAction } from "@/action/meals.action";
import { useEffect, useState } from "react";
import { CategoryType } from "@/types/categories.type";
import { getCategoriesAction } from "@/action/categories.action";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Meal name length is minimum 2")
    .max(30, "Meal name cannot exceed 30 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),
  dietary: z.string().min(1, "Please select a valid dietary preference"),
  price: z
    .number("Price must be a number")
    .positive("Price must be greater than 0"),

  category_name: z.string().min(1, "Please select a category"),

  image_url: z.string(),
});

const AddMeal = () => {
  const [categories, setCategories] = useState<CategoryType[]>(
    [] as CategoryType[],
  );

  useEffect(() => {
    (async () => {
      const res = await getCategoriesAction();
      setCategories(res?.data?.data);
    })();
  }, []);

  console.log(categories);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      dietary: "",
      price: 0,
      category_name: "",
      image_url: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const newMeal = {
        name: value?.name,
        description: value?.description,
        dietary: value?.dietary,
        price: value?.price,
        category_name: value?.category_name,
        image_url: value?.image_url,
      };
      const toastId = toast.loading("Creating...");
      try {
        const res = await createMealAction(newMeal);
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("Creating Successfully", { id: toastId });
        form.reset();
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div className="md:w-5xl mx-auto md:p-10 p-3 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="mb-10 border-b pb-6">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          Add New Meal
        </h2>
        <p className="text-gray-500 mt-2">
          Provide the details below to list a new item in your kitchen menu.
        </p>
      </div>

      <form
        id="meal-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {/* Meal Name Field */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field className="flex flex-col gap-2.5">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1"
                  >
                    Meal Name
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Spicy Basil Pasta"
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

          {/* Category Name Field */}
          <form.Field name="category_name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <Field className="flex flex-col gap-2.5">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1"
                  >
                    Category
                  </FieldLabel>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none
                    ${
                      isInvalid
                        ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories?.map((category) => (
                      <option key={category?.id} value={category?.name}>
                        {category?.name}
                      </option>
                    ))}
                  </select>

                  <FieldError
                    className="text-red-700"
                    errors={field.state.meta.errors}
                  ></FieldError>
                </Field>
              );
            }}
          </form.Field>

          {/* Price Field */}
          <form.Field name="price">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field className="flex flex-col gap-2.5">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1"
                  >
                    Price (Tk)
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      placeholder="0.00"
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
                  </div>
                </Field>
              );
            }}
          </form.Field>

          {/* Dietary Preference Field */}
          <form.Field name="dietary">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field className="flex flex-col gap-2.5">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1"
                  >
                    Dietary Preference
                  </FieldLabel>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none
                    ${
                      isInvalid
                        ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    }`}
                  >
                    <option value="">Select dietary type</option>
                    <option value="VEGAN">Vegan</option>
                    <option value="VEGETARIAN">Vegetarian</option>
                    <option value="GLUTEN_FREE">Gluten Free</option>
                    <option value="KETO">Keto</option>
                    <option value="NON_VEGETARIAN">Non Vegetarian</option>
                    <option value="DAIRY_FREE">Dairy Free</option>
                    <option value="NUT_FREE">Nut Free</option>
                    <option value="EGG_FREE">Egg Free</option>
                    <option value="LOW_CARB">Low Carb</option>
                    <option value="LOW_FAT">Low Fat</option>
                    <option value="HIGH_PROTEIN">High Protein</option>
                  </select>

                  <FieldError
                    className="text-red-700"
                    errors={field.state.meta.errors}
                  ></FieldError>
                </Field>
              );
            }}
          </form.Field>

          {/* Image URL Input (ImageBB Focus) */}
          <form.Field name="image_url">
            {(field) => {
              return (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2"
                  >
                    <LinkIcon size={16} className="text-[#E21B70]" />
                    Profile Image Link
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Paste direct ImageBB link here"
                    onChange={(e) => field.handleChange(e.target.value)}
                  ></Input>
                  <div className="bg-amber-50 p-3 rounded-lg mt-2 border border-amber-100">
                    <p className="text-[11px] text-amber-700 leading-tight">
                      <strong>Tip:</strong> Upload your image to{" "}
                      <a
                        href="https://imgbb.com/"
                        target="_blank"
                        className="underline font-bold"
                      >
                        imgbb.com
                      </a>{" "}
                      and use the <strong>Direct Link</strong> for best results.
                    </p>
                  </div>
                </Field>
              );
            }}
          </form.Field>

          {/* Description Field (Full Width) */}
          <div className="md:col-span-2">
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="flex flex-col gap-2.5">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1"
                    >
                      Description
                    </FieldLabel>
                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={4}
                      placeholder="Describe the ingredients, taste, and special features..."
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
                  </div>
                );
              }}
            </form.Field>
          </div>
        </FieldGroup>

        {/* Submit Button Section */}
        <div className="pt-8 flex justify-end items-center gap-6">
          <button
            form="meal-form"
            type="submit"
            className="px-12 py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-2xl shadow-xl shadow-orange-200 transition-all hover:-translate-y-1 active:translate-y-0 cursor-pointer"
          >
            Publish Meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeal;
