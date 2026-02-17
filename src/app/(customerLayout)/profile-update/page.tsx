/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { customerProfileUpdateAction } from "@/action/customer.action";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UpdateProfileData } from "@/types/customerUpdate.type";
import { useForm } from "@tanstack/react-form";
import { LinkIcon, Phone, User } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
const formSchema = z.object({
  name: z.string().min(1),
  phone_number: z
    .string()
    .min(11, "Must be at least 11 digits")
    .max(15, "Too long")
    .regex(/^01[3-9]\d{8}$/, "Please enter a valid Bangladeshi phone number"),
  image: z.string(),
});

const ProfileUpdate = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      phone_number: "",
      image: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating...");
      try {
        const res = await customerProfileUpdateAction(
          value as UpdateProfileData,
        );

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("Update Successfully Done", { id: toastId });
        form.reset();
      } catch (err) {
        toast.error("Something went wrong!!", { id: toastId });
      }
    },
  });
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Update Profile</h2>
        <p className="text-sm text-gray-500 mt-1">
          Keep your profile information up to date
        </p>
      </div>

      <form
        id="profile-update"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* Name Input */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2"
                  >
                    <User size={16} className="text-[#E21B70]" />
                    Full Name
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="e.g. John Doe"
                    onChange={(e) => field.handleChange(e.target.value)}
                  ></Input>
                  {isInvalid && (
                    <FieldError
                      className="text-red-800"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Phone Number Input */}
          <form.Field name="phone_number">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2"
                  >
                    <Phone size={16} className="text-[#E21B70]" />
                    Phone Number
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="e.g. 017XXXXXXXX"
                    onChange={(e) => field.handleChange(e.target.value)}
                  ></Input>
                  {isInvalid && (
                    <FieldError
                      className="text-red-800"
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>
          {/* Image URL Input (ImageBB Focus) */}
          <form.Field name="image">
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
        </FieldGroup>

        {/* Action Buttons */}
        <div className="pt-4">
          <button
            form="profile-update"
            type="submit"
            className="w-full px-4 py-3 rounded-xl font-bold text-white bg-[#E21B70] hover:bg-[#c41761] shadow-lg shadow-pink-100 transition-all active:scale-95 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
