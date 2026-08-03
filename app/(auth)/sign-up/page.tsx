"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";

const signupSchema = z.object({
  fullName: z.string().min(2, "Full legal name is required"),
  email: z.string().email("Please enter a valid financial network email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  investmentGoal: z
    .string()
    .min(1, "Please choose an overarching portfolio goal"),
  riskTolerance: z
    .string()
    .min(1, "Please rate your volatility tolerance threshold"),
  preferredIndustry: z
    .string()
    .min(1, "Please select a target market sector focus"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      investmentGoal: "",
      riskTolerance: "",
      preferredIndustry: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    // Implement database ingestion and routing profile assignment here
    console.log("Provisioning Trader Strategy Profile:", data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <div className="w-full max-w-xl space-y-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Create Trader Profile
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Configure parameters to construct tailored index routing
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Identity Array Fields */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Full Legal Name
              </label>
              <input
                {...register("fullName")}
                type="text"
                className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="Jane Doe"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Network Email Interface
              </label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="trader@apexterminal.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Security Password (8+ characters)
              </label>
              <input
                {...register("password")}
                type="password"
                className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-600 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="••••••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Strategy Select Options Array */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Investment Engine Goal
              </label>
              <select
                {...register("investmentGoal")}
                className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                <option value="" disabled className="text-slate-600">
                  Select Goal Strategy...
                </option>
                {INVESTMENT_GOALS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-slate-950"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.investmentGoal && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.investmentGoal.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Risk Tolerance Metric
              </label>
              <select
                {...register("riskTolerance")}
                className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                <option value="" disabled className="text-slate-600">
                  Select Threshold...
                </option>
                {RISK_TOLERANCE_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-slate-950"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.riskTolerance && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.riskTolerance.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Target Core Industry Sector
              </label>
              <select
                {...register("preferredIndustry")}
                className="mt-1 block w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                <option value="" disabled className="text-slate-600">
                  Select Market Focus...
                </option>
                {PREFERRED_INDUSTRIES.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-slate-950"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.preferredIndustry && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.preferredIndustry.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-linear-to-r from-cyan-500 to-emerald-500 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? "Provisioning Node..." : "Deploy Financial Account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          Already verified operator?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-cyan-400 hover:underline"
          >
            Access active node
          </Link>
        </p>
      </div>
    </div>
  );
}
