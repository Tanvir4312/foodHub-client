/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  getCategoryByIdAction,
  updateCategoryAction,
} from "@/action/categories.action";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { NewCategoryType } from "@/types/createCategory.type";
import { useForm } from "@tanstack/react-form";
import { LinkIcon } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters long")
    .max(50, "Category name cannot exceed 50 characters")
    .trim(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(200, "Description is too long (max 200 characters)")
    .trim(),

  image_url: z
    .string()
    .url("Please provide a valid image URL")
    .startsWith("https://", {
      message: "Image must be hosted on a secure server(https)",
    }),
});

const CategoryUpdate = ({ params }: { params: Promise<{ id: string }> }) => {
  const [category, setCategory] = useState<NewCategoryType>(
    {} as NewCategoryType,
  );
  const { id } = use(params);

  useEffect(() => {
    (async () => {
      const res = await getCategoryByIdAction(id);
      setCategory(res?.data);
    })();
  }, [id]);

  const form = useForm({
    defaultValues: {
      name: category?.name,
      image_url: category?.image_url,
      description: category?.description,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating....");
      try {
        const res = await updateCategoryAction(value, id);
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("Update Done", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });
  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* --- Header Section --- */}
      <div className="mb-10 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Update Category
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Modify the category details, image, and description to keep your
            menu up to date.
          </p>
        </div>
        <div className="px-4 py-2 bg-orange-50 rounded-2xl border border-orange-100">
          <span className="text-orange-600 text-xs font-bold uppercase tracking-wider">
            Editor Mode
          </span>
        </div>
      </div>

      {/* --- Main Form Card --- */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <form
          id="category-update"
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-6">
            {/* Category Name Field */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <Field className="flex flex-col gap-2">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-[13px] font-bold text-slate-700 ml-1"
                    >
                      CATEGORY NAME
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ""}
                      placeholder="Enter category name"
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

            {/* Image URL Field */}
            <form.Field name="image_url">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <Field className="flex flex-col gap-2">
                    <div className="flex justify-between items-center ml-1">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-[13px] font-bold text-slate-700 flex items-center gap-2"
                      >
                        <LinkIcon size={14} className="text-orange-600" />
                        IMAGE SOURCE URL
                      </FieldLabel>
                    </div>
                    <Input
                      id="image_url"
                      name="image_url"
                      value={field.state.value || ""}
                      placeholder="https://i.ibb.co/..."
                      className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none
                    ${
                      isInvalid
                        ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    }`}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError
                      className="text-red-700"
                      errors={field.state.meta.errors}
                    ></FieldError>
                    <div className="bg-slate-50 p-4 rounded-2xl mt-1 border border-slate-100 flex items-start gap-3">
                      <div className="bg-white p-1.5 rounded-lg shadow-sm">
                        💡
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        For better performance, use direct links from
                        <a
                          href="https://imgbb.com/"
                          target="_blank"
                          className="text-orange-600 font-bold hover:underline mx-1"
                        >
                          ImgBB
                        </a>
                        or a similar CDN. Ensure the link ends with .jpg, .png
                        or .webp.
                      </p>
                    </div>
                  </Field>
                );
              }}
            </form.Field>

            {/* Description Field */}
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <Field className="flex flex-col gap-2">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-[13px] font-bold text-slate-700 ml-1"
                    >
                      DESCRIPTION
                    </FieldLabel>
                    <Textarea
                      id="description"
                      name="description"
                      value={field.state.value || ""}
                      rows={4}
                      placeholder="Describe the category features..."
                      className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none
                    ${
                      isInvalid
                        ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    }`}
                      onChange={(e) => field.handleChange(e.target.value)}
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

        {/* --- Action Buttons --- */}
        <div className="mt-10 pt-6 border-t border-slate-50 flex flex-col sm:flex-row gap-4">
          <button
            form="category-update"
            type="submit"
            className="flex-1 h-14 rounded-2xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-200 hover:bg-black hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-8 h-14 rounded-2xl bg-white text-slate-600 font-bold border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
