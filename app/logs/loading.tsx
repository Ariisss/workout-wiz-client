import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx"

export default function LogsLoading() {
  return (
    <div className="h-fit lg:h-full w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8">
      <div>
        <Skeleton className="w-1/3 h-8 mb-2 bg-primary-dark" />
        <Skeleton className="w-1/4 h-4 bg-primary-dark" />
      </div>

      <div className="flex flex-col lg:flex-row w-full h-full gap-4">
        <div className="w-full lg:flex-1 lg:basis-1/4 p-4 border rounded-md border-primary-dark">
          <Skeleton className="w-1/4 h-6 mb-4 bg-primary-dark" />
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="mb-6">
              <Skeleton className="w-full h-6 mb-2 bg-primary-dark" />
              <Skeleton className="w-2/3 h-4 bg-primary-light" />
            </div>
          ))}
        </div>

        <div className="w-full lg:flex-3 lg:basis-3/4 p-4 border rounded-md border-primary-dark">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className={clsx(
                `flex flex-row justify-between items-center border-primary-dark mt-2 p-4`,
                { "border-b-2": idx !== 4 } 
              )}
            >
              <div className="flex flex-col justify-end w-full">
                <Skeleton className="w-1/2 h-6 mb-2 bg-primary-dark" />
                <Skeleton className="w-1/3 h-4 bg-primary-light" />
              </div>

              <div className="flex flex-col justify-end w-full text-right">
                <Skeleton className="w-1/4 h-6 mb-2 bg-primary-dark ml-auto" />
                <Skeleton className="w-1/6 h-4 bg-primary-light ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
