import React from 'react';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';

interface ProgressData {
    day: string;
    completed: number;
    total: number;
}

interface WeeklyProgressProps {
    data: ProgressData[]
    className?: string
}

const WeeklyProgress = ({ data, className }: WeeklyProgressProps) => {
    // const dummyDivider = 10
    const middleIndex = Math.ceil(data.length / 2);
    const column1 = data.slice(0, middleIndex);
    const column2 = data.slice(middleIndex);

    return (
        <div className={cn("flex flex-col lg:flex-row w-full gap-2 lg:gap-24 justify-between my-4", className)}>
            {[column1, column2].map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-2 h-full w-full">
                    {column.map((item, index) => (
                        <div key={index} className="flex flex-row w-full items-center">
                            <div className='w-full font-normal flex flex-row gap-4'>
                                <p className='w-[50%]'>{item.day.slice(0, 3)}</p>
                                <p className='w-full text-left text-muted-foreground'>
                                    ({item.completed}/{item.total})
                                </p>
                            </div>
                            <Progress value={(item.completed / item.total) * 100} className="h-[14px] w-full bg-black/50" />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default WeeklyProgress;
