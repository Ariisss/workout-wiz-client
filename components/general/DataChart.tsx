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

type GenericChartWrapperProps = {
    data: ChartDataProps[]
    className?: string
}


export function CalorieChart({ data, className }: GenericChartWrapperProps) {
    return (
        <GenericChart
            title="Daily Calories Burned Chart"
            description="Data from the recent activities"
            data={data}
            timePeriod="daily"
            yAxisKey="value"
            lineColor="#17B978"
            tooltipFormatter={(value) => `${value} cal`}
            className={className}
        />
    )
}

export function WeeklyCalories({ data, className }: GenericChartWrapperProps) {
    return (
        <GenericChart
            title="Weekly Calories Burned Chart"
            description="Data from the past month"
            data={data}
            timePeriod="weekly"
            yAxisKey="value"
            lineColor="#17B978"
            tooltipFormatter={(value) => `${value} cal`}
            className={className}
        />
    )
}

export function WeeklyDuration({ data, className }: GenericChartWrapperProps) {
    return (
        <GenericChart
            title="Weekly Workout Duration Chart"
            description="Data from the past month"
            data={data}
            timePeriod="weekly"
            yAxisKey="value"
            lineColor="#17B978"
            tooltipFormatter={(value) => `${value} cal`}
            className={className}
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
    className?: string
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
    className
}: GenericChartProps) {
    // Dynamic formatter for X-axis based on timePeriod
    const xAxisFormatter = (value: string) => {
        switch (timePeriod) {
            case "weekly":
                return `W ${value}`; // e.g., "Week 1"
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
                <ChartContainer config={chartConfig} className={className}>
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
                            tickLine={true}
                            axisLine={true}
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
        </Card>
    );
}