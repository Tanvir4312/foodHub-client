"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, UserCircle, ChevronRight, Store, Sparkles, Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string(),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      password: "",
      email: "",
      role: "CUSTOMER",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...");
      try {
        const { data, error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Account created successfully!", { id: toastId });
        router.push("/login");
      } catch (err) {
        toast.error("Registration failed. Please try again.", { id: toastId });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl overflow-hidden rounded-3xl" {...props}>
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />

        <CardHeader className="space-y-1 pb-6 pt-8 text-center">
          <CardTitle className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            Join <span className="text-orange-500">FoodHub</span>
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">
            Create an account to start ordering or selling food
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <FieldGroup className="space-y-4">
              <form.Field name="name">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="space-y-1.5">
                      <FieldLabel className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</FieldLabel>
                      <div className="relative group">
                        <UserCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        <Input
                          placeholder="John Doe"
                          className="pl-11 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                      {isInvalid && (
                        <FieldError className="text-[10px] font-bold text-red-500 ml-1 mt-1" errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="email">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="space-y-1.5">
                      <FieldLabel className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</FieldLabel>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className="pl-11 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                      {isInvalid && (
                        <FieldError className="text-[10px] font-bold text-red-500 ml-1 mt-1" errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="password">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="space-y-1.5">
                      <FieldLabel className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Password</FieldLabel>
                      <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-11 pr-11 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {isInvalid && (
                        <FieldError className="text-[10px] font-bold text-red-500 ml-1 mt-1" errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="role">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="space-y-2">
                      <FieldLabel className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Select Role</FieldLabel>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => field.handleChange("CUSTOMER")}
                          className={cn(
                            "flex items-center justify-center gap-2 p-3 rounded-2xl border transition-all duration-300",
                            field.state.value === "CUSTOMER"
                              ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                              : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-orange-500/30"
                          )}
                        >
                          <User size={16} />
                          <span className="text-xs font-bold uppercase tracking-wider">Customer</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => field.handleChange("PROVIDER")}
                          className={cn(
                            "flex items-center justify-center gap-2 p-3 rounded-2xl border transition-all duration-300",
                            field.state.value === "PROVIDER"
                              ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                              : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-orange-500/30"
                          )}
                        >
                          <Store size={16} />
                          <span className="text-xs font-bold uppercase tracking-wider">Provider</span>
                        </button>
                      </div>
                      {isInvalid && (
                        <FieldError className="text-[10px] font-bold text-red-500 ml-1 mt-1" errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-6 pb-8">
          <Button
            form="register-form"
            type="submit"
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all duration-300 active:scale-[0.98] group"
          >
            Create Account
            <ChevronRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-600">
        <Sparkles size={16} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Join the food community</span>
      </div>
    </div>
  );
}
