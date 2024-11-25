import { Book, BookHalf } from "@/components/general/Book";
import type { Metadata } from "next";
import React from "react";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Workout Wizard | Login",
  description: "Login page",
};

type AuthLayoutType = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutType) {
  return (
    <div className="bg-gradient-to-r from-[#131313] to-[#031900] flex items-center justify-center h-full w-full">
      {children}
    </div>
  );
}
