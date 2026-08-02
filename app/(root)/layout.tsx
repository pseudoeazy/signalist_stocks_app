import { PropsWithChildren } from "react";
import Header from "@/components/Header";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen text-gray-400">
      <Header />
      <div className="container py-10">{children}</div>
    </main>
  );
};

export default RootLayout;
