"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { toast } from "@/components/ui/toast";
import { LoginFormData, loginSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Authenticated User Session:", data);

      const result = await signInWithEmail(data);
      if (result.success) {
        router.push("/");
      }
    } catch (error) {
      toast.add({
        type: "error",
        description:
          error instanceof Error ? error.message : "Failed to sign in",
        priority: "high",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Signalist Trading Terminal
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to access secure real-time market data
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Corporate or Personal Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="trader@apexterminal.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Security Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="••••••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-linear-to-r from-emerald-500 to-cyan-500 py-3 font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? "Securing Tunnel..." : "Initialize Session"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          New to the clearing house?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-emerald-400 hover:underline"
          >
            Establish secure account
          </Link>
        </p>
      </div>
    </div>
  );
}
