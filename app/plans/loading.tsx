import { Skeleton } from "@/components/ui/skeleton";

export default function PlansLoading() {
    return (
        <div className="h-fit lg:h-full w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8">
            <div>
                <Skeleton className="w-1/3 h-8 mb-2 bg-primary-dark" />
                <Skeleton className="w-1/4 h-4 bg-primary-light" />
            </div>

            <div className="h-fit flex flex-col gap-6">
                <div className="p-4 border rounded-md border-primary-dark">
                    <Skeleton className="w-1/6 h-6 mb-4 bg-primary-dark" />
                    <Skeleton className="w-1/3 h-4 mb-4 bg-primary-light" />
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="mb-4">
                            <Skeleton className="w-1/2 h-6 mb-2 bg-primary-dark" />
                            <Skeleton className="w-1/3 h-4 bg-primary-light" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-fit md:h-[144px] flex flex-col lg:flex-row gap-6">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="w-full h-36 p-4 border rounded-md border-primary-dark flex flex-col justify-between"
                    >
                        <Skeleton className="w-1/2 h-6 bg-primary-dark mb-2" />
                        <Skeleton className="w-1/2 h-6 bg-primary-dark mb-2" />
                        <Skeleton className="w-3/4 h-4 bg-primary-light" />
                    </div>
                ))}
            </div>
        </div>
    );
}
