"use client";
import React, { useState } from "react";
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
  WorkoutPlan,
  ExerciseProps,
} from "@/components/plans/PlanCards";

type Props = {};

export default function Plans({}: Props) {
  // get info thingies
  const data = {
    workoutPlans: [
      {
        "Plan Name": "Epic Leg Training",
        Description: "Good legs = good life",
        Goal: "Sigma Balls",
        Duration_Weeks: 2,
        Intensity: "Beginner",
        Workout_Days: "Monday, Wednesday, Friday",
        Exercises: [
          {
            exercise_name: "Squats",
            description: "Squatters",
            sets: 3,
            reps: 12,
            duration_mins: 40,
            workout_day: "Monday",
            met_value: 123.23,
          },
          {
            exercise_name: "Leg Machine",
            description: "Idk what this is",
            sets: 3,
            reps: 12,
            duration_mins: 40,
            workout_day: "Wednesday",
            met_value: 123.23,
          },
          {
            exercise_name: "Bulgarian Squats",
            description: "Gahd damn",
            sets: 3,
            reps: 12,
            duration_mins: 40,
            workout_day: "Friday",
            met_value: 123.23,
          },
        ],
      },
      {
        "Plan Name": "Epic Leg Training 2",
        Description: "Good legs = good life",
        Goal: "Sigma Balls",
        Duration_Weeks: 2,
        Intensity: "Beginner",
        Workout_Days: "Monday, Wednesday, Friday",
        Exercises: [
          {
            exercise_name: "Squats",
            description: "Squatters",
            sets: 3,
            reps: 12,
            duration_mins: 40,
            workout_day: "Monday",
            met_value: 123.23,
          },
          {
            exercise_name: "Leg Machine",
            description: "Idk what this is",
            sets: 3,
            reps: 12,
            duration_mins: 40,
            workout_day: "Wednesday",
            met_value: 123.23,
          },
          {
            exercise_name: "Bulgarian Squats",
            description: "Gahd damn",
            sets: 3,
            reps: 12,
            duration_mins: 40,
            workout_day: "Friday",
            met_value: 123.23,
          },
        ],
      },
    ],
    dummy: [],
  };

  // Show only the first workout plan
  const workoutPlanToShow = data.workoutPlans[0]; // This will only display the first plan

  return (
    <div className="h-fit lg:h-full w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8">
      <div>
        <ValueContent
          main="Workout plans"
          sub="Your personalized training schedule"
        />
      </div>
      <div className="h-fit flex flex-col">
        {workoutPlanToShow ? (
          <div>
            <WorkoutPlanContent plan={workoutPlanToShow} />
          </div>
        ) : (
          <GenWorkoutCard />
        )}
      </div>

      <div
        className={clsx("h-fit md:h-[144px] flex flex-col lg:flex-row gap-6", {
          hidden: workoutPlanToShow,
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
