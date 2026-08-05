import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) redirect("/");
  return <main className="min-h-screen text-gray-400">{children}</main>;
};

export default AuthLayout;
