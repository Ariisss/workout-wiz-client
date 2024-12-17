import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Wiz | Progress",
};

type PlansLayoutProps = {
    children: React.ReactNode
}

export default function PlansLayout({ children }: PlansLayoutProps) {
    return (
        <>
            {children}
        </>
    );
}