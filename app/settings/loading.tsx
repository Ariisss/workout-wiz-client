"use client"

import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {

    return (
        <div className="h-fit w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8">
            <div>
                <Skeleton className='w-1/3 h-8 mb-2 bg-primary-dark' />
                <Skeleton className='w-1/4 h-4 bg-primary-light' />
            </div>

            <div className="min-h-[500px] w-full lg:min-h-[500px] flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/5 p-4 border rounded-md border-primary-dark">
                    <Skeleton className="w-1/4 h-6 mb-4 bg-primary-dark" />
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="mb-6">
                            <Skeleton className="w-full h-6 mb-2 bg-primary-dark" />
                            <Skeleton className="w-2/3 h-4 bg-primary-light" />
                        </div>
                    ))}
                </div>

                <div className="w-full lg:w-1/3 p-4 border rounded-md border-primary-dark">
                    <Skeleton className="w-1/4 h-6 mb-4 bg-primary-dark" />
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="mb-6">
                            <Skeleton className="w-full h-6 mb-2 bg-primary-dark" />
                            <Skeleton className="w-2/3 h-4 bg-primary-light" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
