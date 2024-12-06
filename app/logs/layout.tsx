import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Workout Logs",
};

type LogsLayoutProps = {
    children: React.ReactNode
}

export default function LogsLayout({ children }: LogsLayoutProps) {
    return (
        <>
            {children}
        </>
    );
}