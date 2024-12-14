"use client"
import { useFormContext } from "../context/FormProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "../ui/checkbox"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import clsx from "clsx"
import {
    RadioGroup,
    RadioGroupItem
} from "../ui/radio-group"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useEffect, useState } from "react"
import { useWindowSize } from "react-use"
import { useAuth } from "../context/AuthProvider"
import { convertBinaryDaysToWeekdays } from "@/lib/data-utils"
import { Preferences, PreferencesForm } from "@/types/workout"
import ToastError from "../general/ToastError"
import { toast } from "react-toastify"

const days_of_week = [
    { id: "monday", label: "Mon" },
    { id: "tuesday", label: "Tue" },
    { id: "wednesday", label: "Wed" },
    { id: "thursday", label: "Thu" },
    { id: "friday", label: "Fri" },
    { id: "saturday", label: "Sat" },
    { id: "sunday", label: "Sun" },
] as const;

const intensity_levels = ["Beginner", "Intermediate", "Advanced"] as const

const formSchema = z.object({
    with_gym: z.preprocess(
        (value) => value === "true" || value === true,
        z.boolean()),

    workout_days: z.array(z.string()).refine((value) => value.some((day) => day), {
        message: "You have to select at least one day.",
    }),

    intensity: z.enum(intensity_levels, {
        required_error: "You need to set your experience level."
    })
})

type FormProps = {
    formId: string
    nextForm?: () => void
}

export default function WorkoutPreferencesForm({
    formId,
    nextForm = () => null
}: FormProps) {
    const { prefs: workoutPrefs, updateWorkoutPrefs } = useAuth()
    const { width } = useWindowSize()
    const [isLocked, setIsLocked] = useState(false)
    const [prefsData, setPrefsData] = useState<PreferencesForm>({
        with_gym: false,
        workout_days: [],
        intensity: "Beginner"
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...prefsData
        },
    })

    useEffect(() => {
        try {
            const data: PreferencesForm = {
                with_gym: workoutPrefs?.with_gym ?? prefsData.with_gym,
                workout_days: workoutPrefs ? convertBinaryDaysToWeekdays(workoutPrefs.workout_days || '') : prefsData.workout_days,
                intensity: workoutPrefs?.intensity || prefsData.intensity || 'Beginner'
            }
            console.log(data)
            setPrefsData(data)
            form.reset(data)
        } catch (error) {
            console.error(error)
        }
    }, [workoutPrefs])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLocked(true)
            const { workout_days, ...filteredValues } = values
            const filteredData: Partial<Preferences> = {
                workout_days: days_of_week.reduce((acc, day) =>
                    acc + (workout_days.includes(day.id) ? "1" : "0"), ""
                ),
                ...filteredValues
            }
            await updateWorkoutPrefs(filteredData)
            toast.success("Successfully updated workout preferences.")
        } catch (error) {
            toast.error(<ToastError title="Submission Failed" desc={error} />)
        } finally {
            setIsLocked(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col justify-between">
                <div className="space-y-8 mt-4">
                    <FormField
                        control={form.control}
                        name="with_gym"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className="">
                                    Gym Equipment Access
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        disabled={isLocked}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value.toString()}
                                        className="flex flex-row gap-0 bg-white h-[3rem] rounded-[16px] items-center space-y-0"
                                    >
                                        {[true, false].map((action, idx) => {
                                            return (
                                                <FormItem key={"equip" + idx} className={clsx(
                                                    "flex items-center h-full w-full text-black rounded-[14px] border-2 border-white space-y-0",
                                                    "has-[:checked]:bg-background-darkest",
                                                    "has-[:checked]:text-white",
                                                    "has-[:checked]:border-primary-light"
                                                )}>
                                                    <FormControl>
                                                        <RadioGroupItem value={action.toString()} className="hidden" disabled={isLocked}/>
                                                    </FormControl>
                                                    <FormLabel className="font-medium flex w-full h-full items-center justify-center">
                                                        {action ? "Yes" : "No"}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        })}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="workout_days"
                        render={() => (
                            <FormItem>
                                <FormLabel className="flex flexr-row gap-2">
                                    Schedule
                                    <p className="text-muted-foreground flex flex-row">(Choose up to 5)</p>
                                </FormLabel>
                                <div className="flex flex-row bg-white rounded-[16px]">
                                    {days_of_week.map((day) => (
                                        <FormField
                                            key={day.id}
                                            control={form.control}
                                            name="workout_days"
                                            render={({ field }) => {
                                                const checkState = field.value?.includes(day.id)
                                                return (
                                                    <FormItem
                                                        key={day.id}
                                                        className={clsx(
                                                            "flex flex-row items-center justify-center space-y-0",
                                                            "bg-white border-2 border-white  h-[3rem] w-[3.5rem] lg:w-full rounded-[10px] text-black font-sans font-medium",
                                                            {
                                                                "bg-background-darkest text-white border-primary-light border-solid": checkState
                                                            }
                                                        )}
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                className="hidden"
                                                                checked={field.value?.includes(day.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, day.id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== day.id
                                                                            )
                                                                        )
                                                                }}
                                                                disabled={isLocked || (field.value.length == 5 && !checkState)}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="cursor-pointer text-xs lg:text-sm justify-center p-0 font-medium w-full h-full flex items-center">
                                                            {day.label.slice(0, width <= 640 ? 2 : 3)}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="intensity"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Experience Level</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex flex-row gap-0 bg-white h-[3rem] rounded-[16px] items-center"
                                    >
                                        {intensity_levels.map((level) => {
                                            return (
                                                <FormItem key={"equip" + level} className={clsx(
                                                    "flex items-center h-full w-full text-black rounded-[14px] border-2 border-white  space-y-0",
                                                    "has-[:checked]:bg-background-darkest",
                                                    "has-[:checked]:text-white",
                                                    "has-[:checked]:border-primary-light",
                                                )}>
                                                    <FormControl>
                                                        <RadioGroupItem value={level} className="hidden" disabled={isLocked} />
                                                    </FormControl>
                                                    <FormLabel className="text-xs lg:text-sm flex w-full h-full items-center justify-center">
                                                        {level}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        })}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={isLocked} className="mt-8 lg:mt-0">Save</Button>
            </form>
        </Form>
    )
}
