/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { updateUserStatusAction } from "@/action/admin.action";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { error } from "console";
import { use } from "react";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  status: z.string(),
});

const UserStatusUpdate = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const form = useForm({
    defaultValues: {
      status: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const rawValueStatus = value?.status;
      const updateStatus = {
        status: rawValueStatus !== "" && value?.status,
      };
      const toastId = toast.loading("Updating...");

      try {
        const res = await updateUserStatusAction(
          id,
          updateStatus as unknown as string,
        );
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
        }
        toast.success("Suuccessfully updated", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong!!", { id: toastId });
      }
    },
  });

  return (
    <div>
      <form
        id="status-update"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="status">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                  <select
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none
                    ${
                      isInvalid
                        ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    }`}
                  >
                    <option value="">Select a Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="SUSPENDED">Suspended</option>
                  </select>
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
      <div className="pt-8 flex justify-end items-center gap-6">
        <button
          form="status-update"
          type="submit"
          className="px-12 py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-2xl shadow-xl shadow-orange-200 transition-all hover:-translate-y-1 active:translate-y-0 cursor-pointer"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default UserStatusUpdate;
