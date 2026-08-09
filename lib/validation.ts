import { z } from "zod";

export const signupSchema = z.object({
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

export type SignupFormData = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid financial network email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
