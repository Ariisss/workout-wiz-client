"use client";
import React, { useEffect, useState } from "react";
import {
    GenWorkoutCard,
    WorkoutPlanContent,
} from "@/components/plans/PlanCards";
import { PlanExercise, WorkoutPlan } from "@/types/workout";
import { useAuth } from "@/components/context/AuthProvider";
import ToastError from "@/components/general/ToastError";
import { toast } from "react-toastify";
import { getActiveWorkoutPlan } from "@/lib/data-utils";
import Loading from "./loading";
import { switchWorkoutPlan, deleteWorkoutPlan } from "../api/workouts";
import { DashboardCard, ValueContent } from "@/components/dashboard/DashboardCard";
import clsx from "clsx";

type Props = {};

export default function Plans({ }: Props) {
    const { plans, logs, loading, refreshPlans, handleGenerateWorkout } = useAuth();
    const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);
    const [workoutDays, setWorkoutDays] = useState<string[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<string>("");
    const [isSwitching, setIsSwitching] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchActivePlan = getActiveWorkoutPlan(plans);
                setActivePlan(fetchActivePlan);
                setWorkoutDays(
                    Array.from(new Set(fetchActivePlan?.planExercises.map((exercise: PlanExercise) => exercise.workout_day))) || []
                );
                setSelectedPlan(fetchActivePlan?.plan_name || "");
            } catch (error) {
                toast.error(<ToastError title="Data Retrieval Error" desc={error} />);
            }
        };

        fetchData();
    }, [plans]);

    const handleDeleteWorkout = async (planId: number): Promise<void> => {
        try {
            await deleteWorkoutPlan(planId);
            toast.success("Workout plan deleted successfully!");

            await refreshPlans();

            const remainingPlans = plans.filter((plan) => plan.plan_id !== planId);
            if (remainingPlans.length > 0) {
                const newActivePlan = remainingPlans[0];
                await switchWorkoutPlan(newActivePlan.plan_id);
                toast.success(`Switched to new active plan: ${newActivePlan.plan_name}`);
            } else {
                toast.info("No remaining workout plans to set as active.");
            }

            await refreshPlans();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            toast.error(`Failed to delete or switch workout plan: ${errorMessage}`);
        }
    };

    const handlePlanChange = async (planName: string) => {
        if (planName === "new") {
            handleGenerateWorkout();
            return;
        }

        const selected = plans.find(plan => plan.plan_name === planName);
        if (!selected) {
            toast.error(<ToastError title="Selection Error" desc="Selected plan not found." />);
            return;
        }

        try {
            setIsSwitching(true);
            await switchWorkoutPlan(selected.plan_id);
            toast.success("Workout plan switched successfully!");

            await refreshPlans();
            const updatedActivePlan = getActiveWorkoutPlan(plans);
            setActivePlan(updatedActivePlan);
            setWorkoutDays(
                Array.from(
                    new Set(updatedActivePlan?.planExercises.map(ex => ex.workout_day)) || []
                )
            );
        } catch (error) {
            toast.error(
                <ToastError title="Switch Error" desc={error instanceof Error ? error.message : 'Unknown error'} />
            );
        } finally {
            setIsSwitching(false);
        }
    };


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
                    <WorkoutPlanContent
                        active={activePlan}
                        plans={plans}
                        workoutDays={workoutDays}
                        onPlanChange={handlePlanChange}
                        onDelete={handleDeleteWorkout}
                    />
                ) : (
                    <GenWorkoutCard generateWorkout={handleGenerateWorkout} />
                )}
            </div>

            <div className={clsx("h-fit md:h-[144px] flex flex-col lg:flex-row gap-6", { "hidden": activePlan })}>
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
