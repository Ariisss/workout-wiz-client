import { RefreshCcw, Trash2 } from "lucide-react";
import { DashboardCard } from "../dashboard/DashboardCard";
import Logo from "../general/Logo";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "../ui/card";
import { WorkoutOptions, WorkoutSelect } from "./WorkoutOptions";

type TitleCardProps = {
    title: string
    duration: number
    data: string[]
    selected: string
}

export const TitleCard = ({ title, duration, data, selected }: TitleCardProps) => {
    return (
        <DashboardCard
            title={title}
            desc={`Duration: ${duration} weeks`}
            icon={
                <div className="hidden lg:flex flex-row gap-2">
                    <WorkoutOptions selected={selected} data={data} />
                </div>
            }
        >
            <div className="flex flex-col gap-2 lg:hidden">
                <WorkoutOptions selected={selected} data={data} />
            </div>
        </DashboardCard>
    )
}

export const GenWorkoutCard = () => (
    <DashboardCard
        title='Create your first workout plan'
        desc='Get started with a personalized AI-generated workout plan'
        className='p-0'
        glow
    >
        <div className='flex flex-col h-full items-center justify-center gap-4'>
            <Logo width={200} height={200} />
            <p className='font-roboto text-muted-foreground text-justify lg:text-right'>
                No workout plans generated yet.
                Let's create a customized plan tailored to your fitness goals!
            </p>
            <Button className='w-full lg:w-[50%]'>
                <RefreshCcw />
                Generate Workout
            </Button>
        </div>
    </DashboardCard>
)

type ExerciseProps = {
    exercise_name: string;
    description: string;
    sets: number;
    reps: number;
    duration_mins: number;
    workout_day: string;
    met_value: number;
}

const ExerciseCard = ({
    exercise_name,
    sets,
    reps,
    duration_mins
}: ExerciseProps) => {

    return (
        <Card className={cn("w-full h-full p-0 flex flex-col gap-2 bg-background-darker border-2 border-primary font-sans")}>
            <CardHeader className="flex flex-row justify-between items-center p-6 pb-0">
                <div className="p-0">
                    <h3 className="text-white font-medium text-xl mt-[2px]">{exercise_name}</h3>
                </div>
            </CardHeader>
            <CardContent className="h-full">
                <div className="h-full w-full flex flex-row justify-between">
                    <div className="w-fit">
                        <p className="text-primary-light">Sets</p>
                        <p className="text-muted-foreground">{sets}</p>
                    </div>
                    <div className="w-fit">
                        <p className="text-primary-light">Reps</p>
                        <p className="text-muted-foreground">{reps}</p>
                    </div>
                    <div className="w-fit">
                        <p className="text-primary-light">Len</p>
                        <p className="text-muted-foreground">{duration_mins} min</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

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


export const WorkoutPlanContent = ({ plan }: WorkoutPlanProps) => {
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