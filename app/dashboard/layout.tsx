import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Wiz | Dashboard",
};

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <>
            {children}
        </>
    );
}