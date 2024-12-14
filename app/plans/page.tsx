"use client";
import React, { useEffect, useState } from "react";
import {
    ActivityContent,
    DashboardCard,
    ValueContent,
    WorkoutContent,
} from "@/components/dashboard/DashboardCard";
import clsx from "clsx";
import {
    GenWorkoutCard,
    WorkoutPlanContent,
    ExerciseProps,
} from "@/components/plans/PlanCards";
import { WorkoutPlan } from "@/types/workout";
import { useAuth } from "@/components/context/AuthProvider";
import ToastError from "@/components/general/ToastError";
import { toast } from "react-toastify";
import { getActiveWorkoutPlan } from "@/lib/data-utils";
import Loading from "./loading";

type Props = {};

export default function Plans({ }: Props) {
    const { plans, logs, loading } = useAuth();
    const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);
    const [workoutDays, setWorkoutDays] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchActivePlan = getActiveWorkoutPlan(plans)
                setActivePlan(fetchActivePlan);
                setWorkoutDays(
                    Array.from(new Set(fetchActivePlan?.planExercises.map((exercise) => exercise.workout_day))) || []
                );
                console.log(getActiveWorkoutPlan(plans))
            } catch (error) {
                toast.error(<ToastError title="Data Retrieval Error" desc={error} />);
            }
        };

        fetchData();
    }, [loading]);

    if (loading) return <Loading />
    return (
        <div className="h-fit lg:h-full w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8">
            <div>
                <ValueContent
                    main="Workout plans"
                    sub="Your personalized training schedule"
                />
            </div>
            <div className="h-fit flex flex-col">
                {activePlan ? (
                    <div>
                        <WorkoutPlanContent active={activePlan} plans={plans} workoutDays={workoutDays}/>
                    </div>
                ) : (
                    <GenWorkoutCard />
                )}
            </div>

            <div
                className={clsx("h-fit md:h-[144px] flex flex-col lg:flex-row gap-6", {
                    hidden: activePlan,
                })}
            >
                <DashboardCard title="Personalized Workouts">
                    <p className="text-muted-foreground font-roboto">
                        AI-generated plans tailored to your fitness level and goals.
                    </p>
                </DashboardCard>
                <DashboardCard title="Flexible Scheduling">
                    <p className="text-muted-foreground font-roboto">
                        Adjust your workout days to better suit your lifestyle.
                    </p>
                </DashboardCard>
                <DashboardCard title="Progress Tracking">
                    <p className="text-muted-foreground font-roboto">
                        Monitor your improvements with detailed progress charts and
                        analytics.
                    </p>
                </DashboardCard>
            </div>
        </div>
    );
}

