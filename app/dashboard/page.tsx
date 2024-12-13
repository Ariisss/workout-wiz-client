'use client'
import React, { use } from 'react'
import { ActivityContent, DashboardCard, ValueContent, WorkoutContent } from '@/components/dashboard/DashboardCard'
import {
    Dumbbell,
    Flame,
    Zap,
    ChartNoAxesColumn,
    ScrollText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CalorieChart } from '@/components/general/DataChart'
import WeeklyProgress from '@/components/dashboard/WeeklyProgress'
import { useEffect, useState } from 'react'
import { getRecentExercises, countDailyExercises, getWorkoutToday, countTotalWorkouts, calculateCaloriesBurned, getCaloriesByWeek, getWeeklyCompletion } from '@/lib/data-utils'
import { DashboardData } from '@/types/workout'
import { useAuth } from '@/components/context/AuthProvider'
import { toast } from 'react-toastify'
import ToastError from '@/components/general/ToastError'
import Loading from './loading'
import Link from 'next/link'

type Props = {}



export default function Dashboard({ }: Props) {
    const { userData, workouts, plans, logs, loading } = useAuth();
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        recentExercises: [],
        workoutStats: { total: 0, lastWeek: 0 },
        caloriesStats: { total: 0, lastWeek: 0 },
        dailyExercises: [],
        todaysWorkout: { planName: '', exercise: null, upcomingDay: '' },
        weeklyCalories: []
    });
    const hasPlanSelected = dashboardData.todaysWorkout.planName !== ""
    const hasWorkoutToday = dashboardData.todaysWorkout.upcomingDay == "Today"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const computedData: DashboardData = {
                    recentExercises: getRecentExercises(logs, plans),
                    workoutStats: countTotalWorkouts(logs),
                    caloriesStats: calculateCaloriesBurned(logs),
                    dailyExercises: countDailyExercises(plans[0], logs),
                    todaysWorkout: getWorkoutToday(plans, logs),
                    weeklyCalories: getCaloriesByWeek(logs)
                };

                setDashboardData(computedData);
            } catch (error) {
                toast.error(<ToastError title="Data Retrieval Error" desc={error} />);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loading />

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

    const { completedDays, totalDays } = getWeeklyCompletion(dashboardData.dailyExercises);

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

    return (
        <div className='h-fit w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8'>
            <div>
                <ValueContent main={`Welcome back, ${userData?.username}`} sub={"Here's your fitness overview for today"} />
            </div>
            <div className='min-h-[144px] flex flex-col lg:flex-row gap-6'>
                <DashboardCard
                    subHeader
                    title='Total Workouts'
                    icon={<Dumbbell className='-rotate-45 text-primary-light h-6 w-6 my-[-5px]' />}
                >
                    <ValueContent main={dashboardData.workoutStats.total.toString()} sub={`+${dashboardData.workoutStats.lastWeek} from last week`} />
                </DashboardCard>
                <DashboardCard
                    subHeader
                    title='Calories Burned'
                    icon={<Flame className='text-primary-light h-6 w-6' />}
                >
                    <ValueContent main={Math.ceil(dashboardData.caloriesStats.total).toString()} sub={`+${Math.ceil(dashboardData.caloriesStats.lastWeek)} from last week`} />
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
                    glow={hasWorkoutToday}
                >
                    {hasPlanSelected ? (
                        <div className='flex flex-col h-full justify-between'>
                            <WorkoutContent
                                workoutName={dashboardData.todaysWorkout.planName}
                                date={dashboardData.todaysWorkout.upcomingDay}
                                hasWorkoutToday={hasWorkoutToday}
                                upcomingExercise={dashboardData.todaysWorkout.exercise}  // Assuming the first exercise is next
                            />
                            <Link href={'logs'}>
                                <Button className='min-h-[3rem]'>
                                    <ScrollText />
                                    Log Exercise
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className='flex flex-col h-full justify-between'>
                            <p>No active workout plan</p>
                            <Link href={'plans'}>
                                <Button className='min-h-[3rem]'>
                                    <Dumbbell />
                                    Select a Workout Plan
                                </Button>
                            </Link>
                        </div>
                    )}
                </DashboardCard>
                <DashboardCard
                    title='Weekly Progress'
                    desc={`${completedDays} out of ${totalDays} workouts completed`}
                    className='px-2 pt-2 pb-[5px]'
                >
                    <div className='flex flex-col h-full justify-between'>
                        <div className='flex w-full'>
                            <Progress value={(completedDays / totalDays) * 100} className='h-[16px] bg-black/50' />
                        </div>
                        <WeeklyProgress data={dashboardData.dailyExercises} />
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
                            <CalorieChart data={dashboardData.weeklyCalories} />
                        </div>
                        <div className='w-full flex flex-col justify-center'>
                            {
                                dashboardData.recentExercises.map((activity, idx) => (
                                    <ActivityContent
                                        key={idx}
                                        last={idx == data.activities.length - 1}
                                        title={activity.exercise_name}
                                        date={activity.date}
                                        calories={Math.ceil(activity.calories_burned) + " cal"}
                                        duration={activity.duration_mins + " min"}
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