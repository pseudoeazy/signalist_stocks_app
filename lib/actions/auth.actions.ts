"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { inngest } from "../inngest/client";
import { LoginFormData, SignupFormData } from "../validation";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  investmentGoal,
  riskTolerance,
  preferredIndustry,
}: SignupFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email, password, name: fullName },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          name: fullName,
          email,
          investmentGoal,
          riskTolerance,
          preferredIndustry,
        },
      });
    }
    return { success: true, data: response };
  } catch (error) {
    console.log("Signup failed:", error);
    return { success: false, error: "Sign up failed" };
  }
};

export const signInWithEmail = async ({ email, password }: LoginFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
    });

    return { success: true, data: response };
  } catch (error) {
    console.log("Signup failed:", error);
    return { success: false, error: "Sign up failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.log("Sign out failed: ", error);
    return { success: false, error: "Sign out failed" };
  }
};
