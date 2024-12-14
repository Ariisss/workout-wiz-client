"use client"
import { useFormContext } from "../context/FormProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "../ui/checkbox"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import clsx from "clsx"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthProvider"
import { toast } from "react-toastify"
import ToastError from "../general/ToastError"
import { Preferences } from "@/types/workout"

const goals = [
    "Muscle Gain",
    "Weight Loss",
    "Endurance",
    "Flexibility",
    "Balance"
] as const

const formSchema = z.object({
    goal_type: z.array(z.string()).refine((value) => value.some((goal) => goal), {
        message: "You have to select at least one goal.",
    }),
})

type FormProps = {
    formId: string
    nextForm?: () => void
}

export default function FitnessGoalsForm({
    formId,
    nextForm = () => null
}: FormProps) {
    const { prefs, updateWorkoutPrefs } = useAuth()
    const [isLocked, setIsLocked] = useState(false)
    const [goalData, setGoalData] = useState<{ goal_type: string[] }>({ goal_type: [] })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: goalData
    })

    useEffect(() => {
        if (prefs?.goal_type) {
            const updatedGoalData = {goal_type: prefs.goal_type.split(",")}
            setGoalData(updatedGoalData)
            form.reset(updatedGoalData);
        }
    }, [prefs])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLocked(true)
            await updateWorkoutPrefs({ goal_type: values.goal_type.join(",") })
            toast.success("Successfully updated workout preferences.")
        } catch (error) {
            toast.error(<ToastError title="Submission Failed" desc={error} />)
        } finally {
            setIsLocked(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-full flex flex-col justify-between">
                <div className="space-y-8 mt-4">
                    <FormField
                        control={form.control}
                        name="goal_type"
                        render={() => (
                            <FormItem>
                                {goals.map((goal) => (
                                    <FormField
                                        key={goal}
                                        control={form.control}
                                        name="goal_type"
                                        render={({ field }) => {
                                            const checkState = field.value?.includes(goal)
                                            return (
                                                <FormItem
                                                    key={goal}
                                                    className={clsx(
                                                        "flex flex-row items-center space-x-3 space-y-2",
                                                        "bg-white border-primary-light h-[3rem] rounded-[16px] text-black font-sans font-medium",
                                                        {
                                                            "bg-background-darkest text-white border-2": checkState
                                                        }
                                                    )}
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            className="border-0 shadow-none ml-[5%] h-[1.5rem] w-[1.5rem]"
                                                            checked={field.value?.includes(goal)}
                                                            onCheckedChange={(checked) => {
                                                                const currentValues = Array.isArray(field.value) ? field.value : [];

                                                                if (checked) {
                                                                    field.onChange([...currentValues, goal]);
                                                                } else {
                                                                    field.onChange(currentValues.filter((value) => value !== goal));
                                                                }
                                                            }}
                                                            disabled={isLocked}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-medium w-full h-full flex items-center">
                                                        {goal}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={isLocked || !(form.formState.isDirty)} className="mt-8 lg:mt-0">Save</Button>
            </form>
        </Form >
    )
}
