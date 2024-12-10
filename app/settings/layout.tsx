import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Settings",
};

type SettingsLayoutProps = {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <>
            {children}
        </>
    );
}