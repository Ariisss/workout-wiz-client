import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Workout Plans",
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