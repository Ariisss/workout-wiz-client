"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProgressLoading() {
    const [svgWidth, setSvgWidth] = useState(0);
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (svgRef.current) {
            setSvgWidth(svgRef.current.clientWidth);
        }
    }, []);

    const polylinePoints = `${0},35 ${svgWidth * 0.1},25 ${svgWidth * 0.2},30 ${svgWidth * 0.3},15 ${svgWidth * 0.4},40 ${svgWidth * 0.5},20 ${svgWidth * 0.6},25 ${svgWidth * 0.7},10 ${svgWidth * 0.8},35 ${svgWidth},25`;

    return (
        <div className='h-fit w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8'>
            <div>
                <Skeleton className='w-1/3 h-8 mb-2 bg-primary-dark' />
                <Skeleton className='w-1/4 h-4 bg-primary-light' />
            </div>

            <div className='min-h-[144px] flex flex-col lg:flex-row gap-6'>
                {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                        key={idx}
                        className='w-full h-36 p-4 border rounded-md border-primary-dark flex flex-col justify-between'
                    >
                        <Skeleton className='w-1/2 h-6 bg-primary-dark mb-2' />
                        <Skeleton className='w-3/4 h-10 bg-primary-light' />
                    </div>
                ))}
            </div>

            {/* Improved skeleton for the line chart */}
            <div className='flex flex-col justify-between p-4 border rounded-md border-primary-dark'>
                <div className="flex flex-col gap-2">
                    <Skeleton className='w-1/3 h-6 mb-4 bg-primary-dark' />
                    <Skeleton className='w-1/4 h-4 mb-6 bg-primary-light' />
                </div>
                <div className='w-full h-40'>
                    <svg ref={svgRef} className='w-full h-full' xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="transparent" />
                        <polyline
                            points={polylinePoints}
                            className='stroke-primary-light fill-none stroke-[2] opacity-50'
                        />
                    </svg>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-6 h-full lg:h-[360px]'>
                <div className='w-full lg:w-1/2 p-4 border rounded-md border-primary-dark flex flex-col gap-4'>
                    <Skeleton className='w-2/3 h-6 mb-2 bg-primary-dark' />
                    <Skeleton className='w-2/3 h-4 mb-4 bg-primary-light' />
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className='mb-2'>
                            <Skeleton className='w-1/2 h-6 mb-1 bg-primary-dark' />
                            <Skeleton className='w-1/3 h-4 bg-primary-light' />
                        </div>
                    ))}
                </div>

                <div className='w-full lg:w-1/2 p-4 border rounded-md border-primary-dark flex flex-col gap-4'>
                    <Skeleton className='w-2/3 h-6 mb-2 bg-primary-dark' />
                    <Skeleton className='w-2/3 h-4 mb-4 bg-primary-light' />
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className='flex justify-between items-center mb-2'>
                            <Skeleton className='w-1/2 h-6 bg-primary-dark' />
                            <Skeleton className='w-1/5 h-4 bg-primary-light' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
