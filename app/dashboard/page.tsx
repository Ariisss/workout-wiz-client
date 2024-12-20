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
                    dailyExercises: countDailyExercises(plans, logs),
                    todaysWorkout: getWorkoutToday(plans, logs),
                    weeklyCalories: getCaloriesByWeek(logs)
                };

                setDashboardData(computedData);
            } catch (error) {
                toast.error(<ToastError title="Data Retrieval Error" desc={error} />);
            }
        };

        fetchData();
    }, [plans, logs, userData]);


    const { completedDays, totalDays } = getWeeklyCompletion(dashboardData.dailyExercises);

    if (loading) return <Loading />
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
                    {userData?.weeklyStreak === 0 || userData?.weeklyStreak === undefined ? (
                        <ValueContent main="No streak" sub="Get moving to start your streak!" />
                        ) : (
                        <ValueContent main={userData.weeklyStreak.toString() + " week" + (userData.weeklyStreak > 1 ? "s" : "")} sub="Fuelling the progress machine!" />
                    )}
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
                    desc={totalDays == 0 ? "No workouts yet" : `${completedDays} out of ${totalDays} workouts completed`}
                    className='px-2 pt-2 pb-[5px]'
                >
                    <div className='flex flex-col h-full justify-between'>
                        <div className='flex w-full'>
                            <Progress value={(completedDays / totalDays) * 100} className='h-[16px] bg-black/50' />
                        </div>
                        <WeeklyProgress data={dashboardData.dailyExercises} />
                        <Link href={'progress'}>
                            <Button className='min-h-[3rem]'>
                                <ChartNoAxesColumn />
                                View Progress
                            </Button>
                        </Link>
                    </div>
                </DashboardCard>
            </div>
            <div className='h-max flex flex-col lg:flex-row gap-4'>
                <DashboardCard
                    title='Recent Activity'
                    desc='Your last 5 workouts'
                    className=''
                >
                    {
                        dashboardData.recentExercises.length == 0 ? (
                            <p>No recent activities</p>
                        ) : (
                            <div className='flex flex-col lg:flex-row gap-6'>
                                <div className='w-full'>
                                    <CalorieChart data={dashboardData.weeklyCalories} />
                                </div>
                                <div className='w-full flex flex-col justify-center'>
                                    {
                                        dashboardData.recentExercises.map((activity, idx) => (
                                            <ActivityContent
                                                key={idx}
                                                last={idx == dashboardData.recentExercises.length - 1}
                                                title={activity.exercise_name}
                                                date={activity.date}
                                                calories={Math.ceil(activity.calories_burned) + " cal"}
                                                duration={activity.duration_mins + " min"}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </DashboardCard>
            </div>
        </div>
    )
}