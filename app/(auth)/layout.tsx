import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return <main className="min-h-screen text-gray-400">{children}</main>;
};

export default RootLayout;
