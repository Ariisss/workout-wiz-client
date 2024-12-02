"use client"
import React from 'react'
import { DashboardCard, ValueContent } from '@/components/dashboard/DashboardCard'
import {
    Dumbbell,
    Flame,
    Zap
} from 'lucide-react'

type Props = {}

export default function Dashboard({ }: Props) {
    return (
        <div className='h-full w-full space-y-8 py-8 pl-8 md:pl-16 pr-8'>
            <div>
                <ValueContent main={`Welcome back, ${"Ced69"}`} sub={"Here's your fitness overview for today"} />
            </div>
            <div className='min-h-[144px] flex flex-col lg:flex-row gap-6'>
                <DashboardCard
                    title='Total Workouts'
                    icon={<Dumbbell className='-rotate-45 text-primary-light h-6 w-6 my-[-5px]' />}
                >
                    <ValueContent main={'24'} sub={`+${2} from last week`} />
                </DashboardCard>
                <DashboardCard
                    title='Calories Burned'
                    icon={<Flame className='text-primary-light h-6 w-6' />}
                >
                    <ValueContent main={'2,769'} sub={`+${168} from last week`} />
                </DashboardCard>
                <DashboardCard
                    title='Weekly Streak'
                    icon={<Zap className='text-primary-light h-6 w-6' />}
                >
                    <ValueContent main={'7'} sub="Fuelling the progress machine!" />
                </DashboardCard>
            </div>
            <div className='h-[350px] flex flex-col lg:flex-row gap-6'>
                <DashboardCard
                    title='Bruh'
                    icon={<Dumbbell className='-rotate-45' />}
                    glow
                />
                <DashboardCard
                    title='Bruh'
                    icon={<Dumbbell className='-rotate-45' />}
                    className='p-2'
                />
            </div>
            <div className='h-[350px] flex flex-col lg:flex-row gap-4'>
                <DashboardCard
                    title='Bruh'
                    icon={<Dumbbell className='-rotate-45' />}
                />
            </div>
        </div>
    )
}