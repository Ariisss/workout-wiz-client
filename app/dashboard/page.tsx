'use client'
import React from 'react'
import { ActivityContent, DashboardCard, ValueContent, WorkoutContent } from '@/components/dashboard/DashboardCard'
import {
    Dumbbell,
    Flame,
    Zap,
    ChartNoAxesColumn,
    ScrollText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CalorieChart } from '@/components/general/DataChart'
import WeeklyProgress from '@/components/dashboard/WeeklyProgress'
import { getWorkouts } from '../api/workouts'
import { useEffect, useState } from 'react'
import { ExerciseLog, PlanExercise, WorkoutPlan, GoalTypes, IntensityLevels } from '@/types/workout'

type Props = {}



export default function Dashboard({ }: Props) {
    // get info thingies

    const [workouts, setWorkouts] = useState<any>(null)
    const [loading, setLoading] = useState<any>(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await getWorkouts();
                setWorkouts(response.data);
                // console.log(response.data);
                // console.log(response.data.length);
            } catch (error) {
                console.error('Failed to fetch workouts:', error)
            } finally {
                setLoading(false)
            }
        }
        
        fetchWorkouts()
        // console.log(workouts)
    }, [])

    // if (loading) return <div>Loading...</div>

    const data = {
        credentials: {
            name: 'Ced69'
        },
        statSum: {
            totalWorkouts: { val: '24', last: 2 },
            caloriesBurned: { val: '2,736', last: 168 },
            weekStreak: 7
        },
        workoutData: {
            workoutName: 'Epic Leg Day',
            date: 'Today',
            hasWorkoutToday: true,
            upcomingExercise: { name: 'Squats', sets: 3, reps: 12 }
        },
        activities: [
            {
                title: 'Lower Body',
                date: 'Today',
                calories: '320',
                duration: '45'
            },
            {
                title: 'Cardio',
                date: 'Yesterday',
                calories: '270',
                duration: '30'
            },
            {
                title: 'Upper Body',
                date: '2 days ago',
                calories: '410',
                duration: '50'
            },
            {
                title: 'Upper Body',
                date: '2 days ago',
                calories: '410',
                duration: '50'
            },
            {
                title: 'Upper Body',
                date: '2 days ago',
                calories: '410',
                duration: '50'
            }
        ],
        chartData: {
            calories: [
                { period: "Monday", value: 186 },
                { period: "Tuesday", value: 305 },
                { period: "Wednesday", value: 237 },
                { period: "Thursday", value: 73 },
                { period: "Friday", value: 209 },
                { period: "Saturday", value: 214 },
                { period: "Sundary", value: 10 },
            ],
            progressEx: [
                { day: "Monday", progress: 70 },
                { day: "Tuesday", progress: 100 },
                { day: "Wednesday", progress: 0 },
                { day: "Thursday", progress: 10 },
                { day: "Friday", progress: 80 },
            ]
        }
    }

    // use this when integrated with backend already:

    // const [workouts, setWorkouts] = useState<{
    //     activities: ExerciseLog[];
    //     workoutPlan: WorkoutPlan | null;
    //     statSum: {
    //         totalWorkouts: { val: string, last: number };
    //         caloriesBurned: { val: string, last: number };
    //         weekStreak: number;
    //     };
    //     chartData: {
    //         calories: { period: string; value: number }[];
    //         progressEx: { day: string; progress: number }[];
    //     };
    // } | null>(null)

    // const [loading, setLoading] = useState<boolean>(true)

    return (
        <div className='h-fit w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8'>
            <div>
                <ValueContent main={`Welcome back, ${data.credentials.name}`} sub={"Here's your fitness overview for today"} />
            </div>
            <div className='min-h-[144px] flex flex-col lg:flex-row gap-6'>
                <DashboardCard
                    subHeader
                    title='Total Workouts'
                    icon={<Dumbbell className='-rotate-45 text-primary-light h-6 w-6 my-[-5px]' />}
                >
                    <ValueContent main={data.statSum.totalWorkouts.val} sub={`+${data.statSum.totalWorkouts.last} from last week`} />
                </DashboardCard>
                <DashboardCard
                    subHeader
                    title='Calories Burned'
                    icon={<Flame className='text-primary-light h-6 w-6' />}
                >
                    <ValueContent main={data.statSum.caloriesBurned.val} sub={`+${data.statSum.caloriesBurned.last} from last week`} />
                </DashboardCard>
                <DashboardCard
                    subHeader
                    title='Weekly Streak'
                    icon={<Zap className='text-primary-light h-6 w-6' />}
                >
                    <ValueContent main={data.statSum.weekStreak.toString() + " weeks"} sub="Fuelling the progress machine!" />
                </DashboardCard>
            </div>
            <div className='lg:h-[350px] flex flex-col lg:flex-row gap-6'>
                <DashboardCard
                    title='Current Workout Plan'
                    desc='Your next scheduled workout.'
                    glow={data.workoutData.hasWorkoutToday}
                >
                    <div className='flex flex-col h-full justify-between'>
                        {workoutPlan ? (
                            <WorkoutContent
                                workoutName={workoutPlan.plan_name}
                                date="Today"
                                hasWorkoutToday={true}
                                upcomingExercise={workoutPlan.exercises[0]}  // Assuming the first exercise is next
                            />
                        ) : (
                            <p>No active workout plan</p>
                        )}
                        <Button className='min-h-[3rem]'>
                            <ScrollText />
                            Log Exercise
                        </Button>
                    </div>
                </DashboardCard>
                <DashboardCard
                    title='Weekly Progress'
                    desc={`${4} out of ${5} workouts completed`}
                    className='px-2 pt-2 pb-[5px]'
                >
                    <div className='flex flex-col h-full justify-between'>
                        <div className='flex w-full'>
                            <Progress value={80} className='h-[16px] bg-black/50' />
                        </div>
                        <WeeklyProgress data={data.chartData.progressEx} />
                        <Button className='min-h-[3rem]'>
                            <ChartNoAxesColumn />
                            View Progress
                        </Button>
                    </div>
                </DashboardCard>
            </div>
            <div className='h-max flex flex-col lg:flex-row gap-4'>
                <DashboardCard
                    title='Recent Activity'
                    desc='Your last 5 workouts'
                    className=''
                >
                    <div className='flex flex-col lg:flex-row gap-6'>
                        <div className='w-full'>
                            <CalorieChart data={data.chartData.calories} />
                        </div>
                        <div className='w-full flex flex-col justify-center'>
                            {
                                data.activities.map((activity, idx) => (
                                    <ActivityContent
                                        key={idx}
                                        last={idx == data.activities.length - 1}
                                        title={activity.title}
                                        date={activity.date}
                                        calories={activity.calories + " cal"}
                                        duration={activity.duration + " min"}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </DashboardCard>
            </div>
        </div>
    )
}