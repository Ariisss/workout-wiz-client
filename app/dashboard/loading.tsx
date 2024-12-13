import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
      <div className='h-fit w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8'>
          <div>
              <Skeleton className="w-1/2 h-8 mb-4 bg-gray-800" />
              <Skeleton className="w-1/4 h-4 bg-gray-700" />
          </div>

          <div className='min-h-[144px] flex flex-col lg:flex-row gap-6'>
              {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="w-full p-4 border rounded-md border-gray-700">
                      <Skeleton className="w-1/2 h-6 mb-2 bg-gray-800" />
                      <Skeleton className="w-1/3 h-4 mb-4 bg-gray-700" />
                      <Skeleton className="w-1/4 h-4 bg-gray-700" />
                  </div>
              ))}
          </div>

          <div className='lg:h-[350px] flex flex-col lg:flex-row gap-6'>
              <div className="w-full p-4 border rounded-md border-gray-700">
                  <Skeleton className="w-1/2 h-6 mb-2 bg-gray-800" />
                  <Skeleton className="w-2/3 h-4 mb-4 bg-gray-700" />
                  <Skeleton className="w-1/2 h-16 bg-gray-800" />
                  <Skeleton className="w-3/4 h-10 mt-4 bg-gray-700" />
              </div>
              <div className="w-full p-4 border rounded-md border-gray-700">
                  <Skeleton className="w-1/2 h-6 mb-2 bg-gray-800" />
                  <Skeleton className="w-2/3 h-4 mb-4 bg-gray-700" />
                  <Skeleton className="w-full h-16 bg-gray-800" />
                  <Skeleton className="w-3/4 h-10 mt-4 bg-gray-700" />
              </div>
          </div>

          <div className='h-max flex flex-col lg:flex-row gap-4'>
              <div className="w-full p-4 border rounded-md border-gray-700">
                  <Skeleton className="w-full h-6 mb-2 bg-gray-800" />
                  <div className="flex gap-6 mt-4">
                      <Skeleton className="w-1/2 h-32 bg-gray-800" />
                      <div className="w-full">
                          {Array.from({ length: 5 }).map((_, idx) => (
                              <div key={idx} className="mb-4">
                                  <Skeleton className="w-2/3 h-6 mb-2 bg-gray-800" />
                                  <Skeleton className="w-1/3 h-4 bg-gray-700" />
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}
