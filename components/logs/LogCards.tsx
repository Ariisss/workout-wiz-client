"use client"
import { CircleCheckBig } from "lucide-react";
import { DashboardCard } from "../dashboard/DashboardCard";

import { cn } from "@/lib/utils";
import { ExerciseCard, ExerciseProps, TitleCard } from "../plans/PlanCards";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckableWrapper } from "../general/CheckableWrapper";
import clsx from "clsx";
import { useState } from "react";
import { logExercise } from "@/app/api/logs";
import { LogData } from "@/types/workout";


export type WorkoutPlan = {
    "Plan Name": string;
    Description: string;
    Goal: string;
    Duration_Weeks: number;
    Intensity: string;
    Workout_Days: string;
    Exercises: ExerciseProps[];
}

export type WorkoutPlanProps = {
    plan: WorkoutPlan
}

export const WorkoutLogsContent = ({ plan }: WorkoutPlanProps) => {
    return (
        <div className="flex flex-col gap-8">
            <TitleCard
                title={plan["Plan Name"]}
                duration={plan.Duration_Weeks}
                selected={plan["Plan Name"]}
                data={[plan["Plan Name"]]}
            />
            <div className="flex flex-col md:flex-row gap-8">
                {plan.Workout_Days.split(', ').map((day, didx) => (
                    <DashboardCard title={day} key={didx} className="w-full">
                        <div className="flex flex-col gap-4 pt-2">
                            {plan.Exercises.filter((ex) => ex.workout_day == day).map((exercise, eidx) =>
                                <ExerciseCard key={[didx, eidx].join('')} {...exercise} />
                            )}
                        </div>
                    </DashboardCard>
                ))}
            </div>
        </div>
    )
}



export type AWTProps = {
    missed: ExerciseProps[]
    current: ExerciseProps[]
    setData: React.Dispatch<React.SetStateAction<LogData>>
}

export function ActiveWorkoutsTabs({ missed, current, setData }: AWTProps) {
    const tabTriggerClass = "flex flex-row gap-4 data-[state=active]:bg-primary rounded-lg h-[3rem] justify-center items-center"
    return (
        <Tabs defaultValue="current" className="w-full lg:w-[40%] space-y-4">
            <TabsList className="grid w-full h-fit grid-cols-2 bg-background-darkest p-2 rounded-lg border-2 border-background">
                <TabsTrigger value="current" className={tabTriggerClass}>Current</TabsTrigger>
                <TabsTrigger
                    id="missed"
                    value="missed"
                    className={cn(tabTriggerClass, "data-[state=active]:bg-red-800")}
                >
                    Missed
                    <div className="w-2 h-2 flex justify-center items-center">
                        ({missed.length})
                    </div>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="current">
                <DashboardCard title={"Current Workouts"} className="w-full">
                    <ExerciseCheckbox data={current} setData={setData} />
                </DashboardCard>
            </TabsContent>
            <TabsContent value="missed">
                <DashboardCard title={"Missed Workouts"} className="w-full">
                    <ExerciseCheckbox data={missed} setData={setData} />
                </DashboardCard>
            </TabsContent>
        </Tabs>
    )
}

export type ExerciseCheckboxProps = {
    data: ExerciseProps[]
    setData: React.Dispatch<React.SetStateAction<LogData>>
}

export const ExerciseCheckbox = ({ data, setData }: ExerciseCheckboxProps) => {
    const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({});

    const handleCheckboxToggle = (id: number, checked: boolean) => {
        setCheckedStates((prev) => ({ ...prev, [id]: checked })); // for "instant return" 
        // !!!!!!!!!!!!!!!!!!! 
        // MIGHT WANT TO PLACE IN A CONTEXT WRAPPER LATER FOR EASIER STATE MANAGEMENT AND SHIZZLERS
        // !!!!!!!!!!!!!!!!!!!
        if (checked) {
            logExercise({plan_exercise_id: id}).then(() => {
              // Delete the current exercise from data.current in Logs
              // Assuming data.current is an array of exercises
              const updatedData = data.filter((exercise) => exercise.plan_exercise_id !== id);
              console.log("asdasdasd"+updatedData);
              setData((prevData) => ({ ...prevData, current: updatedData }));
            });
            
          }
        console.log(`Exercise ${id} is now ${checked ? "checked" : "unchecked"}`);
        // Here you can update local state, JSON, or trigger a database update
    };

    return (
        <div className="flex flex-col gap-2 pt-2">
            {data.map((exercise, eidx) => {
                const isChecked = checkedStates[exercise.exercise_name] || false;

                return (
                    <CheckableWrapper
                        key={eidx}
                        enableCheckbox={true}
                        checkedState={isChecked}
                        onClick={(checked) => handleCheckboxToggle(exercise.plan_exercise_id, checked)}
                    >
                        <ExerciseCard
                            className={clsx("border-muted-foreground", {
                                "border-primary-light [&_#title]:text-primary-light": isChecked
                            })}
                            icon={<CircleCheckBig className={clsx("h-full text-muted-foreground", { "text-primary": isChecked })} />}
                            key={eidx}
                            {...exercise}
                        />
                    </CheckableWrapper>
                )
            })}
        </div>
    )
}