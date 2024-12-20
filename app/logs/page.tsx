"use client"
import { useAuth } from '@/components/context/AuthProvider'
import { ActivityContent, DashboardCard, ValueContent } from '@/components/dashboard/DashboardCard'
import { ActiveWorkoutsTabs } from '@/components/logs/LogCards'
import { getMissedExercisesThisWeek, getRecentExercises, getUnfinishedExercisesToday } from '@/lib/data-utils'
import { LogData } from '@/types/workout'
import React, { useEffect, useState, useCallback } from 'react'
import Loading from './loading'
import ToastError from '@/components/general/ToastError'
import { toast } from 'react-toastify'

type Props = {}

export default function Logs({ }: Props) {
    const { plans, logs, loading } = useAuth();
    const [data, setData] = useState<LogData>({
        past: [],
        current: [],
        missed: [],
    });

    // Fetch the data and set it to state
    const fetchData = useCallback(async () => {

        try {
            const computedData: LogData = {
                past: getRecentExercises(logs, plans),
                current: getUnfinishedExercisesToday(plans, logs),
                missed: getMissedExercisesThisWeek(plans, logs),
            };

            console.log('Computed Data:', computedData);

            setData(computedData);

        } catch (error) {
            console.error('Error in fetchData:', error);
            toast.error(<ToastError title="Data Retrieval Error" desc={error} />);
        }
    }, [logs, plans]); 

    useEffect(() => {
        console.log('Running useEffect for fetchData...');
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        console.log('Updated data:', data);
    }, [data]);

    if (loading) return <Loading />;

    return (
        <div className='h-fit lg:h-full w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8'>
            <div>
                <ValueContent main="Workout Logs" sub="Track your exercises" />
            </div>
            <div className='flex flex-col lg:flex-row w-full h-full gap-4'>
                <ActiveWorkoutsTabs missed={data.missed} current={data.current} setData={setData} />
                <DashboardCard
                    title='Past exercises'
                    className=''
                >
                    <div className='flex flex-col lg:flex-row gap-6'>
                        <div className='w-full flex flex-col justify-center'>
                            {data.past.length > 0 ? (
                                data.past.map((activity, idx) => (
                                    <ActivityContent
                                        key={idx}
                                        last={idx === data.past.length - 1}
                                        title={activity.exercise_name}
                                        date={activity.date}
                                        calories={activity.calories_burned + " cal"}
                                        duration={activity.duration_mins + " min"}
                                    />
                                ))
                            ) : (
                                <p>No past exercises logged.</p>
                            )}
                        </div>
                    </div>
                </DashboardCard>
            </div>
        </div>
    );
}

