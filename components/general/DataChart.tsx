"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


export function CalorieChart({ data }: { data: ChartDataProps[] }) {
    return (
        <GenericChart
            title="Daily Calories Burned Chart"
            description="This Week"
            data={data}
            timePeriod="daily"
            yAxisKey="value"
            lineColor="#17B978"
            tooltipFormatter={(value) => `${value} cal`}
        />
    )
}

export function WeeklyCalories({ data }: { data: ChartDataProps[] }) {
    return (
        <GenericChart
            title="Weekly Calories Burned Chart"
            description="This Week"
            data={data}
            timePeriod="weekly"
            yAxisKey="value"
            lineColor="#17B978"
            tooltipFormatter={(value) => `${value} cal`}
        />
    )
}

export function WeeklyDuration({ data }: { data: ChartDataProps[] }) {
    return (
        <GenericChart
            title="Weekly Workout Duration Chart"
            description="This Week"
            data={data}
            timePeriod="weekly"
            yAxisKey="value"
            lineColor="#17B978"
            tooltipFormatter={(value) => `${value} cal`}
        />
    )
}



type ChartDataProps = {
    period: string; // Time period (e.g., day, week, or month)
    value: number; // Y-axis data
};

type TimePeriod = "daily" | "weekly" | "monthly";

type GenericChartProps = {
    title: string; // Chart title
    description: string; // Chart description
    data: ChartDataProps[]; // Chart data
    timePeriod: TimePeriod; // Time period for the data
    yAxisKey: string; // Y-axis data key
    chartConfig?: ChartConfig; // Chart configuration
    lineColor?: string; // Color of the line
    tooltipFormatter?: (value: any) => string; // Formatter for tooltips
};

export function GenericChart({
    title,
    description,
    data,
    timePeriod = "daily",
    yAxisKey = "value",
    chartConfig = {},
    lineColor = "hsl(var(--chart-1))",
    tooltipFormatter,
}: GenericChartProps) {
    // Dynamic formatter for X-axis based on timePeriod
    const xAxisFormatter = (value: string) => {
        switch (timePeriod) {
            case "weekly":
                return `Week ${value}`; // e.g., "Week 1"
            case "monthly":
                return value.slice(0, 3); // First 3 letters of the month
            case "daily":
            default:
                return value.slice(0, 3); // First 3 letters of the day
        }
    };

    return (
        <Card className="bg-black/40">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="period"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={xAxisFormatter}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    formatter={tooltipFormatter}
                                />
                            }
                        />
                        <Line
                            dataKey={yAxisKey}
                            type="linear"
                            stroke={lineColor}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total {yAxisKey} for the selected period
                </div>
            </CardFooter>
        </Card>
    );
}