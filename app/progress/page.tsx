import { ValueContent, DashboardCard } from '@/components/dashboard/DashboardCard'
import { WeeklyCalories, WeeklyDuration } from '@/components/general/DataChart'
import { HighlightContent, LogChartTabs, WeeklyCompRow } from '@/components/progress/ProgressCards'
import { TabsContent } from '@/components/ui/tabs'
import { Dumbbell, Flame, Clock, ArrowUp } from 'lucide-react'
import React from 'react'

type Props = {}

export default function Progress({ }: Props) {
    const data = {
        statSum: {
            totalWorkouts: '30',
            totalCalories: '7,901',
            totalDuration: 960
        },
        weeklyCalories: [
            { period: "1", value: 1186 },
            { period: "2", value: 2305 },
            { period: "3", value: 1237 },
            { period: "4", value: 1373 },
            { period: "5", value: 1209 },
        ],
        weeklyDurations: [
            { period: "1", value: 186 },
            { period: "2", value: 305 },
            { period: "3", value: 123 },
            { period: "4", value: 133 },
            { period: "5", value: 109 },
        ],
        highlights: {
            calories: 2200,
            duration: 280,
            consistency: 4
        },
        weeklyComp: {
            calories: { val: 2200, inc: 10 },
            workouts: { val: 4, inc: 10 },
            exercises: { val: 31, inc: 14.7 },
            duration: { val: 280, inc: 7.7 }
        }
    }

    const chartClass = 'h-[25%] aspect-square lg:aspect-[3/1]'
    return (
        <div className='h-fit w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8'>
            <div>
                <ValueContent main={`Progress statistics`} sub={"Monitor your fitness improvements"} />
            </div>
            <div className='flex h-full w-full flex-col gap-4'>
                <div className='min-h-[144px] flex flex-col lg:flex-row gap-6'>
                    <DashboardCard
                        subHeader
                        title='Total Workouts'
                        icon={<Dumbbell className='-rotate-45 text-primary-light h-6 w-6 my-[-5px]' />}
                    >
                        <ValueContent main={data.statSum.totalWorkouts} sub="" />
                    </DashboardCard>
                    <DashboardCard
                        subHeader
                        title='Total calories burned'
                        icon={<Flame className='text-primary-light h-6 w-6' />}
                    >
                        <ValueContent main={data.statSum.totalCalories + " kcal"} sub="" />
                    </DashboardCard>
                    <DashboardCard
                        subHeader
                        title='Total duration'
                        icon={<Clock className='text-primary-light h-6 w-6' />}
                    >
                        <ValueContent main={data.statSum.totalDuration.toString() + " mins"} sub="" />
                    </DashboardCard>
                </div>
                <DashboardCard
                    title={'Progress overview'}
                    desc="Your workout performance over the weeks"
                >
                    <LogChartTabs>
                        <TabsContent value="calories">
                            <WeeklyCalories data={data.weeklyCalories} className={chartClass} />
                        </TabsContent>
                        <TabsContent value="duration">
                            <WeeklyDuration data={data.weeklyDurations} className={chartClass} />
                        </TabsContent>
                    </LogChartTabs>
                </DashboardCard>
                <div className='flex flex-col lg:flex-row gap-4 h-full lg:h-[360px]'>
                    <DashboardCard
                        title="Progress Highlights"
                        desc="Key achievements in your fitness journey"
                        className='gap-4 p-4'
                    >
                        <div className='flex flex-col gap-4'>
                            <hr className='w-full h-[2px] bg-muted-foreground/50 my-2' />
                            <HighlightContent
                                main={"Most calories burned"}
                                value={data.highlights.calories + " kcal"}
                                unit='in a week'
                            />
                            <HighlightContent
                                main={"Longest workout week"}
                                value={data.highlights.duration + " mins"}
                                unit='in a week'
                            />
                            <HighlightContent
                                main={"Monst consistent week"}
                                value={data.highlights.consistency.toString()}
                                unit='workouts completed'
                            />
                        </div>
                    </DashboardCard>
                    <DashboardCard
                        title="Weekly comparison"
                        desc="Compare your progress week by week"
                        className='gap-4 p-4 h-full'
                    >
                        <div className='flex flex-col gap-4'>
                            <hr className='w-full h-[2px] bg-muted-foreground/50 my-2' />
                            <WeeklyCompRow title="Calories burned" data={data.weeklyComp.calories}/>
                            <WeeklyCompRow title="Workouts completed" data={data.weeklyComp.workouts}/>
                            <WeeklyCompRow title="Exercises completed" data={data.weeklyComp.exercises}/>
                            <WeeklyCompRow title="Total duration" data={data.weeklyComp.duration}/>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    )
}