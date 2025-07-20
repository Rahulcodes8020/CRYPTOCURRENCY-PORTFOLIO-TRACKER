import "./../styles/globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Crypto Watch",
  description: "Track live crypto prices and portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-white font-sans min-h-screen antialiased">
        <Toaster position="top-right" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
