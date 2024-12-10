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
import { useState } from "react"

const goals = [
    "Muscle Gain",
    "Weight Loss",
    "Endurance",
    "General Fitness",
    "Aesthetic"
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
    const [isLocked, setIsLocked] = useState(false) //TEMP ONLY

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            goal_type: ["Muscle Gain", "Weight Loss", "Aesthetic",],
        },
    })


    //const { isLocked, lockForm, unlockForm, submitForm } = useFormContext(formId);
    async function onSubmit(values: z.infer<typeof formSchema>) {

        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(values)
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
                                                                return checked
                                                                    ? field.onChange([...field.value, goal])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== goal
                                                                        )
                                                                    )
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
                <Button type="submit" disabled={isLocked} className="mt-8 lg:mt-0">Save</Button>
            </form>
        </Form >
    )
}
