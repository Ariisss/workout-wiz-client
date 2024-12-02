"use client"
import { BackgroundGradient } from "../ui/background-gradient";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type DashboardCardProps = {
    title: string;
    icon?: React.ReactNode;
    children?: React.ReactNode
    glow?: boolean
    subHeader?: boolean
    className?: string
};

export function DashboardCard({ title, icon = undefined, children, glow = false, subHeader = false, className }: DashboardCardProps) {
    const CardElement = () => (
        <Card className={cn("w-full h-full p-0 space-y-2 bg-background-darkest border-2 border-background", className)}>
            {subHeader ?
                <CardHeader className="flex flex-row justify-between items-center p-6 pb-0">
                    <h3 className="text-white font-medium mt-[2px]">{title}</h3>
                    {icon}
                </CardHeader>
                :
                <CardHeader className="flex flex-row justify-between items-center p-6 pb-0">
                    <h3 className="title-primary text-3xl font-bold mt-[2px]">{title}</h3>
                    {icon}
                </CardHeader>
            }
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
    return (
        glow ?
            (
                <BackgroundGradient containerClassName="rounded-[12px] w-full rounded-none" >
                    < CardElement />
                </BackgroundGradient >
            )
            : <CardElement />
    );
}

type ValueContentProps = {
    main: string
    sub: string
}
export function ValueContent({ main, sub }: ValueContentProps) {
    return (
        <div className="space-y-1">
            <p className="text-2xl font-bold font-sora text-primary-light">{main}</p>
            <p className="text-sm text-muted-foreground text font-roboto">{sub}</p>
        </div>
    )
}
