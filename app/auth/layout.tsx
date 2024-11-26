import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Workout Wizard | Login",
  description: "Login page",
};

type AuthLayoutType = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutType) {
  return (
    <div className="bg-gradient-to-r from-[#131313] to-[#031900] container-center">
      {children}
    </div>
  );
}
