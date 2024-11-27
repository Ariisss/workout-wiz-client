import { FormProvider } from "@/components/context/FormProvider";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Workout Wizard",
};

type AuthLayoutType = {
  children: React.ReactNode
}

// AVOID TOO MUCH PROP DRILLING REUSE FORMPROVIDER AS CONTEXT FOR EVERYTHING ELSE TO NOT MAKE IT MESSY
export default function AuthLayout({ children }: AuthLayoutType) {
  return (
    <FormProvider>
      <div className="bg-gradient-to-r from-[#131313] to-[#031900] h-screen w-screen">
        {children}
      </div>
    </FormProvider>
  );
}
