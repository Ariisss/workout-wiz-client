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

type Props = {}

export default function Dashboard({ }: Props) {
    // get info thingies
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
            }
        ]
    }

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
                    <ValueContent main={data.statSum.weekStreak.toString()} sub="Fuelling the progress machine!" />
                </DashboardCard>
            </div>
            <div className='lg:h-[350px] flex flex-col lg:flex-row gap-6'>
                <DashboardCard
                    title='Current Workout Plan'
                    desc='Your next scheduled workout.'
                    glow={data.workoutData.hasWorkoutToday}
                >
                    <div className='flex flex-col h-full justify-between'>
                        <WorkoutContent
                            workoutName={data.workoutData.workoutName}
                            date={data.workoutData.date}
                            hasWorkoutToday={data.workoutData.hasWorkoutToday}
                            upcomingExercise={data.workoutData.upcomingExercise}
                        />
                        <Button className='min-h-[3rem]'>
                            <ScrollText />
                            Log Exercise
                        </Button>
                    </div>
                </DashboardCard>
                <DashboardCard
                    title='Weekly Progress'
                    desc={`${4} out of ${5} workouts completed`}
                >
                    <div className='flex flex-col h-full justify-between'>
                        <div className='mt-4 flex w-full h-full'>
                            <Progress value={80} className='h-[16px] bg-black/50' />
                        </div>
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
                    desc='Your last 3 workouts'
                    className=''
                >
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
                </DashboardCard>
            </div>
        </div>
    )
}