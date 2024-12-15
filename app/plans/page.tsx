"use client";
import React, { useEffect, useState } from "react";
import {
    GenWorkoutCard,
    WorkoutPlanContent,
} from "@/components/plans/PlanCards";
import { WorkoutPlan } from "@/types/workout";
import { useAuth } from "@/components/context/AuthProvider";
import ToastError from "@/components/general/ToastError";
import { toast } from "react-toastify";
import { getActiveWorkoutPlan } from "@/lib/data-utils";
import Loading from "./loading";
import { generateWorkout } from "../api/workouts";
import { DashboardCard, ValueContent } from "@/components/dashboard/DashboardCard";

type Props = {};

export default function Plans({ }: Props) {
    const { plans, logs, loading, refreshPlans } = useAuth();
    const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);
    const [workoutDays, setWorkoutDays] = useState<string[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchActivePlan = getActiveWorkoutPlan(plans);
                setActivePlan(fetchActivePlan);
                setWorkoutDays(
                    Array.from(new Set(fetchActivePlan?.planExercises.map((exercise) => exercise.workout_day))) || []
                );
                setSelectedPlan(fetchActivePlan?.plan_name || "");
                console.log(getActiveWorkoutPlan(plans))
            } catch (error) {
                toast.error(<ToastError title="Data Retrieval Error" desc={error} />);
            }
        };

        fetchData();
    }, [plans]);

    const handleGenerateWorkout = async () => {
        try {
            await generateWorkout();
            await refreshPlans();
        } catch (error) {
            toast.error(<ToastError title="Workout Generation Error" desc={error} />);
        }
    };

    const handlePlanChange = (planName: string) => {
        const selected = plans.find(plan => plan.plan_name === planName);
        setActivePlan(selected || null);
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
                    />
                ) : (
                    <GenWorkoutCard generateWorkout={handleGenerateWorkout}/>
                )}
            </div>

            <div className="h-fit md:h-[144px] flex flex-col lg:flex-row gap-6">
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
