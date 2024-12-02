import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "WW | Dashboard",
};

type AuthLayoutType = {
    children: React.ReactNode
}

// AVOID TOO MUCH PROP DRILLING REUSE FORMPROVIDER AS CONTEXT FOR EVERYTHING ELSE TO NOT MAKE IT MESSY
export default function AuthLayout({ children }: AuthLayoutType) {
    return (
        <>
            {children}
        </>
    );
}