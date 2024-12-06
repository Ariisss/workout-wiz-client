import React from 'react';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';

interface ProgressData {
    day: string;
    progress: number;
}

interface WeeklyProgressProps {
    data: ProgressData[]
    className?: string
}

const WeeklyProgress = ({ data, className }: WeeklyProgressProps) => {
    const dummyDivider = 10
    const middleIndex = Math.ceil(data.length / 2);
    const column1 = data.slice(0, middleIndex);
    const column2 = data.slice(middleIndex);

    return (
        <div className={cn("flex flex-row w-full gap-24 justify-between", className)}>
            {[column1, column2].map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-2 h-full w-full">
                    {column.map((item, index) => (
                        <div key={index} className="flex flex-row w-full items-center">
                            <div className='w-full font-normal flex flex-row gap-4'>
                                <p className='w-fit'>{item.day.slice(0, 3)}</p>
                                <p className='w-full text-muted-foreground'>
                                    ({item.progress / dummyDivider}/{100 / dummyDivider})
                                </p>
                            </div>
                            <Progress value={item.progress} className="h-[14px] w-full bg-black/50" />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default WeeklyProgress;
