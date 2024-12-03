import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "WW | Dashboard",
};

type DashboardLayoutProps = {
    children: React.ReactNode
}

// AVOID TOO MUCH PROP DRILLING REUSE FORMPROVIDER AS CONTEXT FOR EVERYTHING ELSE TO NOT MAKE IT MESSY
export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <>
            {children}
        </>
    );
}