import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import clsx from "clsx"
import { ArrowUp } from "lucide-react"

export function LogChartTabs({ children }: { children: React.ReactNode }) {
    const tabTriggerClass = "flex flex-row gap-4 data-[state=active]:bg-primary rounded-lg h-[3rem] justify-center items-center"
    return (
        <Tabs defaultValue="calories" className="w-full space-y-4">
            <TabsList className="grid w-full h-fit grid-cols-2 gap-2 bg-black/40 p-2 rounded-lg border-2">
                <TabsTrigger value="calories" className={tabTriggerClass}>Calories</TabsTrigger>
                <TabsTrigger value="duration" className={tabTriggerClass}>Duration</TabsTrigger>
            </TabsList>
            {children}
        </Tabs>
    )
}

type HighlightContentProps = {
    main: string
    value: string
    unit: string
}
export function HighlightContent({ main, value, unit }: HighlightContentProps) {
    return (
        <div className="space-y-0">
            <p className="text-lg font-medium font-sans text-white">{main}</p>
            <div className="text-sm text-muted-foreground text font-roboto flex flex-row gap-2">
                <p className='text-primary-light font-medium'>
                    {value}
                </p> {unit}
            </div>
        </div>
    )
}

type WeeklyCompRow = {
    data: {
        val: number
        inc: number
    },
    title: string
}

export function WeeklyCompRow({ title, data }: WeeklyCompRow) {
    return (
        <div className='flex flex-col justify-between h-fit w-full'>
            <div className="grid grid-cols-[1fr,auto] gap-2">
                <p className="text-[#C0D0E6]">{title}</p>
                <div className="flex flex-row justify-end items-center gap-2">
                    <p className="text-white">{data.val}</p>
                    <p className={clsx('text-xs flex flex-row', { 'text-primary-light': data.inc > 0, 'text-red-500': data.inc < 0 })}>
                        <ArrowUp className={clsx('h-[1rem] w-[1rem]', {
                            'rotate-180': data.inc < 0,
                            'rotate-0': data.inc > 0,
                            'hidden': data.inc == 0
                        })} />
                        {data.inc.toFixed(1).toString()} %
                    </p>
                </div>
            </div>
        </div>
    )
}