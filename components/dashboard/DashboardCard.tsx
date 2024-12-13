"use client"
import { BackgroundGradient } from "../ui/background-gradient";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import BackgroundWrapper from "../general/BackgroundWrapper";

type DashboardCardProps = {
    title: string
    desc?: string
    icon?: React.ReactNode
    children?: React.ReactNode
    glow?: boolean
    subHeader?: boolean
    className?: string
    contentClassName?: string
    backgroundOptions?: React.FC<{ children: React.ReactNode }>[];
    isLoading?: boolean;
};

export function DashboardCard({
    title,
    children,
    desc = "",
    icon = undefined,
    glow = false,
    subHeader = false,
    className,
    contentClassName,
    backgroundOptions = [],
    isLoading = false
}: DashboardCardProps) {
    const defaultBackgrounds = glow
        ? [BackgroundGradient]
        : []

    const CardElement = () => (
        <Card className={cn("w-full h-full p-0 flex flex-col gap-2 bg-background-darkest border-2 border-background", className)}>
            {subHeader ?
                <CardHeader className="flex flex-row justify-between items-center p-6 pb-0 h-full">
                    <h3 className="text-white font-medium mt-[2px]">{title}</h3>
                    {icon}
                </CardHeader>
                :
                <CardHeader className="flex flex-row justify-between items-center p-6 pb-0">
                    <div className="p-0">
                        <h3 className="title-primary text-2xl font-bold mt-[2px]">{title}</h3>
                        <p className='text-muted-foreground font-roboto'>{desc}</p>
                    </div>
                    {icon}
                </CardHeader>
            }
            <CardContent className="h-full">
                <div className={clsx("h-full w-full", contentClassName)}>
                    {/* {isLoading ? <SkeletonLoader /> : children } */}

                    {isLoading ? children : <SkeletonLoader />} 
                </div>
            </CardContent>
        </Card>
    )
    
    const backgrounds = [...defaultBackgrounds, ...backgroundOptions]; 
    return (
        <div className="rounded-[12px] h-full w-full">
            <BackgroundWrapper backgrounds={backgrounds}>
                <CardElement />
            </BackgroundWrapper>
        </div>
    );
}

function SkeletonLoader() {
    return (
        <div className="flex flex-col justify-start mt-4 mb-4 space-y-6 h-full">
            <div className="flex flex-row justify-between items-center space-x-4">
                <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-gray-700 rounded animate-pulse" />
                    <Skeleton className="h-4 w-1/2 bg-gray-600 rounded animate-pulse" />
                </div>
                <Skeleton className="h-10 w-1/4 bg-gray-800 rounded-lg animate-pulse" />
            </div>
            <div className="flex flex-row justify-between items-center space-x-4">
                <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-gray-700 rounded animate-pulse" />
                    <Skeleton className="h-4 w-1/2 bg-gray-600 rounded animate-pulse" />
                </div>
                <Skeleton className="h-10 w-1/4 bg-gray-800 rounded-lg animate-pulse" />
            </div>
        </div>
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

type WorkoutContentProps = {
    workoutName: string;
    date: string;
    hasWorkoutToday: boolean;
    upcomingExercise?: {
        name: string;
        sets: number;
        reps: number;
    }
}

export function WorkoutContent({
    workoutName,
    date,
    hasWorkoutToday,
    upcomingExercise
}: WorkoutContentProps) {
    return (
        <div className="flex flex-col gap-4 mt-2 md:-mt-2 h-full pb-8 lg:pb-0">
            {!hasWorkoutToday ? (
                <div className="flex flex-row gap-2 h-full justify-center">
                    <div className="flex w-[60%] h-full justify-end items-center ">
                        <p className="text-xl text-gray-400 animate-pulse">Upcoming workout</p>
                    </div>
                    <div className="w-fit pl-5 pr-2 h-full hidden md:flex justify-center items-center">
                        <ChevronsRight className="h-14 w-14 text-gray-600 stroke-[1.25]  animate-pulse" />
                    </div>
                    <div className="w-full h-full items-center">
                        <div className="w-full h-full flex flex-col justify-center gap-0">
                            <p className="text-xl font-medium">{workoutName}</p>
                            <p className="text-muted-foreground font-roboto">{date}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row justify-center gap-2 h-full">
                    <div className="flex w-full justify-between items-end ">
                        <div className="w-full h-full flex flex-col justify-center gap-0">
                            <p className="text-lg font-medium">{workoutName}</p>
                            <p className="text-muted-foreground font-roboto">{date}</p>
                        </div>
                        <motion.div
                            className="w-full pl-5 h-full hidden md:flex items-center"
                            initial={{ x: 0 }}
                            animate={{ x: 40 }}
                            transition={{
                                repeat: Infinity,
                                repeatType: 'reverse',
                                duration: '0.5'
                            }}
                        >
                            <ChevronsRight className="h-16 w-16 text-primary-light stroke-[1.5]  animate-pulse" />
                        </motion.div>
                    </div>
                    {upcomingExercise && (
                        <div className="flex flex-col gap-0 justify-center w-full h-full">
                            <p className="text-lg font-medium">Upcoming Exercise</p>
                            <p className="text-muted-foreground font-roboto">
                                {upcomingExercise.name} | {upcomingExercise.sets} sets, {upcomingExercise.reps} reps
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

type ActivityContentProps = {
    title: string;
    date: string;
    calories: string;
    duration: string;
    last?: boolean
}

export function ActivityContent({
    title,
    date,
    calories,
    duration,
    last = false
}: ActivityContentProps) {
    return (
        <div className="flex flex-col h-full w-full">
            <div className={clsx(
                `flex flex-row justify-between items-center border-background mt-2 p-4`,
                { 'border-b-2': !last }
            )}>
                <div className="flex flex-col justify-end w-full">
                    <h3 className="text-white font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground font-roboto">{date}</p>
                </div>
                <div className="flex flex-col justify-end w-full">
                    <h3 className="text-primary-light font-medium text-right">{calories}</h3>
                    <p className="text-sm text-muted-foreground font-roboto text-right">{duration}</p>
                </div>
            </div>
        </div>
    );
};