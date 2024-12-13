import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
      <div className='h-fit w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8'>
          <div>
              <Skeleton className="w-1/2 h-8 mb-4 bg-primary-dark" />
              <Skeleton className="w-1/4 h-4 bg-primary-dark" />
          </div>

          <div className='min-h-[144px] flex flex-col lg:flex-row gap-6'>
              {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="w-full p-4 border rounded-md border-primary-dark">
                      <Skeleton className="w-1/2 h-6 mb-2 bg-primary-dark" />
                      <Skeleton className="w-1/3 h-4 mb-4 bg-primary-dark" />
                      <Skeleton className="w-1/4 h-4 bg-primary-dark" />
                  </div>
              ))}
          </div>

          <div className='lg:h-[350px] flex flex-col lg:flex-row gap-6'>
              <div className="w-full p-4 border rounded-md border-primary-dark">
                  <Skeleton className="w-1/2 h-6 mb-2 bg-primary-dark" />
                  <Skeleton className="w-2/3 h-4 mb-4 bg-primary-dark" />
                  <Skeleton className="w-1/2 h-16 bg-primary" />
                  <Skeleton className="w-3/4 h-10 mt-4 bg-primary-dark" />
              </div>
              <div className="w-full p-4 border rounded-md border-primary-dark">
                  <Skeleton className="w-1/2 h-6 mb-2 bg-primary-dark" />
                  <Skeleton className="w-2/3 h-4 mb-4 bg-primary-dark" />
                  <Skeleton className="w-full h-16 bg-primary" />
                  <Skeleton className="w-3/4 h-10 mt-4 bg-primary-dark" />
              </div>
          </div>

          <div className='h-max flex flex-col lg:flex-row gap-4'>
              <div className="w-full p-4 border rounded-md border-primary-dark">
                  <Skeleton className="w-full h-6 mb-2 bg-primary-dark" />
                  <div className="flex gap-6 mt-4">
                      <Skeleton className="w-1/2 h-32 bg-primary-dark" />
                      <div className="w-full">
                          {Array.from({ length: 5 }).map((_, idx) => (
                              <div key={idx} className="mb-4">
                                  <Skeleton className="w-2/3 h-6 mb-2 bg-primary-dark" />
                                  <Skeleton className="w-1/3 h-4 bg-primary-light" />
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}
