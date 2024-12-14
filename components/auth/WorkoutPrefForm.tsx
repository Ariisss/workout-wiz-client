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
import { toast } from "react-toastify"
import ToastError from "../general/ToastError"
import { useAuth } from "../context/AuthProvider"

const days_of_week = [
    { id: "monday", label: "Mon" },
    { id: "tuesday", label: "Tue" },
    { id: "wednesday", label: "Wed" },
    { id: "thursday", label: "Thu" },
    { id: "friday", label: "Fri" },
    { id: "saturday", label: "Sat" },
    { id: "sunday", label: "Sun" },
] as const;

const dayIds = days_of_week.map((day) => day.id)
const intensity_levels = ["Beginner", "Intermediate", "Advanced"] as const

const formSchema = z.object({
    with_gym: z.preprocess(
        (value) => value === "true" || value === true,
        z.boolean()),

    workout_days: z
        .array(z.enum(dayIds as [string, ...string[]])) // Ensures only valid day IDs
        .refine((value) => value.length > 0, {
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
    const { setWorkoutPrefs } = useAuth()
    const { isLocked, lockForm, unlockForm, signupData } = useFormContext(formId);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            with_gym: false,
            workout_days: [],
            intensity: "Beginner"
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        lockForm()
        try {
            const { workout_days, ...filteredValues } = values
            if (!signupData.goal_type || signupData.goal_type.length === 0) {
                throw new Error("Missing fitness goals data.");
            }

            const prefsData = {
                workout_days: days_of_week.reduce((acc, day) =>
                    acc + (workout_days.includes(day.id) ? "1" : "0"), ""
                ),
                ...signupData,
                ...filteredValues
            }
            
            await setWorkoutPrefs(prefsData)
            toast.success("Account Setup Complete")
            nextForm()
        } catch (error) {
            toast.error(<ToastError title="Submission Failed" desc={error} />)
        } finally {
            unlockForm()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 font-sans">
                <div className="space-y-4">
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
                                        {[true, false].map((action) => {
                                            return (
                                                <FormItem className={clsx(
                                                    "flex items-center h-full w-full text-black rounded-[14px] border-2 border-white space-y-0",
                                                    "has-[:checked]:bg-background-darkest",
                                                    "has-[:checked]:text-white",
                                                    "has-[:checked]:border-primary-light"
                                                )}>
                                                    <FormControl>
                                                        <RadioGroupItem value={action.toString()} className="hidden" />
                                                    </FormControl>
                                                    <FormLabel className="cursor-pointer font-medium flex w-full h-full items-center justify-center">
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
                                                        key={day.id + "item"}
                                                        className={clsx(
                                                            "flex flex-row items-center justify-center space-y-0",
                                                            "bg-white border-2 border-white  h-[3rem] w-[3.5rem] rounded-[10px] text-black font-sans font-medium",
                                                            {
                                                                "bg-background-darkest text-white border-primary-light border-solid": checkState
                                                            }
                                                        )}
                                                    >
                                                        <FormControl key={day.id+"fc"}>
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
                                                            {day.label}
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
                                        defaultValue={field.value}
                                        className="flex flex-row gap-0 bg-white h-[3rem] rounded-[16px] items-center"
                                    >
                                        {intensity_levels.map((level, idx) => {
                                            return (
                                                <FormItem key={"il"+idx} className={clsx(
                                                    "flex items-center h-full w-full text-black rounded-[14px] border-2 border-white  space-y-0",
                                                    "has-[:checked]:bg-background-darkest",
                                                    "has-[:checked]:text-white",
                                                    "has-[:checked]:border-primary-light",
                                                )}>
                                                    <FormControl>
                                                        <RadioGroupItem value={level} className="hidden" />
                                                    </FormControl>
                                                    <FormLabel className="cursor-pointer text-xs lg:text-sm flex w-full h-full items-center justify-center">
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
                <Button type="submit" disabled={isLocked}>Submit</Button>
            </form>
        </Form>
    )
}
