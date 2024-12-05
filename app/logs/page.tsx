import { ActivityContent, DashboardCard, ValueContent } from '@/components/dashboard/DashboardCard'
import { ActiveWorkoutsTabs } from '@/components/logs/LogCards'
import React from 'react'

type Props = {}

export default function Logs({ }: Props) {
    const data = {
        past: [
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
        current: [
            {
                "exercise_name": "Bulgarian Squats",
                "description": "Gahd damn",
                "sets": 3,
                "reps": 12,
                "duration_mins": 40,
                "workout_day": "Friday",
                "met_value": 123.23
            }
        ],
        missing: [
            {
                "exercise_name": "Squats",
                "description": "Squatters",
                "sets": 3,
                "reps": 12,
                "duration_mins": 40,
                "workout_day": "Monday",
                "met_value": 123.23
            },
            {
                "exercise_name": "Leg Machine",
                "description": "Idk what this is",
                "sets": 3,
                "reps": 12,
                "duration_mins": 40,
                "workout_day": "Wednesday",
                "met_value": 123.23
            },
        ]
    }
    return (
        <div className='h-fit lg:h-full w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8'>
            <div>
                <ValueContent main="Workout Logs" sub="Track your exercises" />
            </div>
            <div className='flex flex-col lg:flex-row w-full h-full gap-4'>
                <ActiveWorkoutsTabs missed={data.missing} current={data.current} />
                <DashboardCard
                    title='Past exercises'
                    className=''
                >
                    <div className='flex flex-col lg:flex-row gap-6'>
                        <div className='w-full flex flex-col justify-center'>
                            {
                                data.past.map((activity, idx) => (
                                    <ActivityContent
                                        key={idx}
                                        last={idx == data.past.length - 1}
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