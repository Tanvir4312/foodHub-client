/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LinkIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createCategoryAction } from "@/action/categories.action";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Category name is required (min 2 chars)")
    .max(30, "Category name cannot exceed 30 characters"),

  description: z
    .string()
    .min(10, "Description is required (at least 10 characters)"),
  image_url: z
    .string()
    .min(1, "Image Link is required")
    .url("Please provide a valid Image URL"),
});
const AddCategory = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      image_url: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const newcategoryData = {
        name: value?.name,
        image_url: value?.image_url,
        description: value?.description,
      };
      const toastId = toast.loading("Category Creating...");
      try {
        const res = await createCategoryAction(newcategoryData);
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("Category Successfully Created", { id: toastId });
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
          Add New Category
        </h2>
        <p className="text-gray-500 mt-2">
          Create a new classification to organize your products or services.
          Proper categorization helps users navigate your platform more
          efficiently.
        </p>
      </div>

      <form
        id="category-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {/* Category Name Field */}
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
                    Category Name
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Category Name"
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

          {/* Image URL Input (ImageBB Focus) */}
          <form.Field name="image_url">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field className="flex flex-col gap-2.5">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2 uppercase tracking-wider"
                  >
                    <LinkIcon size={16} className="text-orange-500" />
                    Category Image Link
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="Paste direct ImageBB link here"
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
                  />
                  <div className="bg-amber-50 p-3 rounded-lg mt-1 border border-amber-100">
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
            form="category-form"
            type="submit"
            className="px-12 py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-2xl shadow-xl shadow-orange-200 transition-all hover:-translate-y-1 active:translate-y-0 cursor-pointer"
          >
            Publish Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
