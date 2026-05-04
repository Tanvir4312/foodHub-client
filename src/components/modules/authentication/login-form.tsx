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
import { ShieldCheck, User, Store, Fingerprint, Mail, Lock, ChevronRight, Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.string().email("Invalid email address"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");

      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Welcome back!", { id: toastId });
        window.location.href = "/";
      } catch (err) {
        toast.error("Authentication failed. Please try again.", { id: toastId });
      }
    },
  });

  const handleDemoLogin = (role: "admin" | "provider" | "customer") => {
    const credentials = {
      admin: { email: "tanvirulislam@gmail.com", password: "Admin123456" },
      provider: { email: "provider1@gmail.com", password: "password1234" },
      customer: { email: "customer1@gmail.com", password: "password1234" },
    };

    const { email, password } = credentials[role];
    
    // Update form values
    form.setFieldValue("email", email);
    form.setFieldValue("password", password);
    
    toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} credentials filled!`, {
      description: "Logging you in automatically...",
      duration: 2000,
    });

    // Auto-submit after a brief delay to ensure state synchronization
    setTimeout(() => {
      form.handleSubmit();
    }, 100);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl overflow-hidden rounded-3xl">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />

        <CardHeader className="space-y-1 pb-6 pt-8 text-center">
          <CardTitle className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            Welcome <span className="text-orange-500">Back</span>
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          {/* Demo Login Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-orange-500/50 hover:bg-orange-50 dark:hover:bg-orange-500/5 transition-all duration-300"
            >
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform text-rose-500">
                <ShieldCheck size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-orange-600">Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("provider")}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-orange-500/50 hover:bg-orange-50 dark:hover:bg-orange-500/5 transition-all duration-300"
            >
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform text-indigo-500">
                <Store size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-orange-600">Provider</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("customer")}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-orange-500/50 hover:bg-orange-50 dark:hover:bg-orange-500/5 transition-all duration-300"
            >
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform text-emerald-500">
                <User size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-orange-600">Customer</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-950 px-2 text-slate-400 font-bold tracking-widest">Or login with</span>
            </div>
          </div>

          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <FieldGroup className="space-y-4">
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
                      <div className="flex items-center justify-between ml-1">
                        <FieldLabel className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</FieldLabel>
                        <Link href="#" className="text-[10px] font-bold text-orange-500 hover:underline">Forgot password?</Link>
                      </div>
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
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-6 pb-8">
          <Button
            form="login-form"
            type="submit"
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all duration-300 active:scale-[0.98] group"
          >
            Sign In
            <ChevronRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-orange-500 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>

      <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-600">
        <Fingerprint size={16} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Secure Authentication</span>
      </div>
    </div>
  );
}
