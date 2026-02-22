/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { providerProfileAction } from "@/action/provider.action";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { LinkIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(50),
  description: z
    .string()
    .min(10, "Description should be more detailed")
    .max(500),
  logo_url: z.string(),
  location: z.string().min(10, "Address is too short"),
  phone_number: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
});

const ProviderDashboard = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      logo_url: "",
      location: "",
      phone_number: "",
    },

    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);

      const providerProfileData = {
        name: value?.name,
        description: value?.description,
        logo_url: value?.logo_url,
        location: value?.location,
        phone_number: value?.phone_number,
      };

      const toastId = toast.loading("Creating...");
      try {
        const res = await providerProfileAction(providerProfileData);

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
        }
        toast.success("Profile Successfully created", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong!!", { id: toastId });
      }
    },
  });

  return (
    <div className="p-5">
      <form
        id="provider-profile"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1"
                  >
                    Meal NAme
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Name"
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
          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1"
                  >
                    Description
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Description"
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
          <form.Field name="logo_url">
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
          <form.Field name="location">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1"
                  >
                    Location
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Location"
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
          <form.Field name="phone_number">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1"
                  >
                    Phone Number
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder=" Phone Number"
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
        <div>
          <button
            form="provider-profile"
            type="submit"
            className="w-full mt-8 bg-[#E21B70] hover:bg-[#c41761] text-white font-bold py-4 rounded-xl transition-all cursor-pointer
             disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProviderDashboard;
