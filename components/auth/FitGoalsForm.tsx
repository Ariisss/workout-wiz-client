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
import { toast } from "react-toastify"
import ToastError from "../general/ToastError"

const goals = [
    "Muscle Gain",
    "Weight Loss",
    "Endurance",
    "Flexibility",
    "Balance"
] as const

const formSchema = z.object({
    goal_type: z
        .array(z.enum(goals))
        .refine((value) => value.length > 0, {
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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            goal_type: [],
        },
    })


    const { isLocked, lockForm, unlockForm, submitForm } = useFormContext(formId);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        lockForm()
        try {
            submitForm({ goal_type: values.goal_type.join(",") })
            nextForm()
        } catch (error) {
            toast.error(<ToastError title="Submission Failed" desc={error} />)
        } finally {
            unlockForm()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                                key={goal+"item"}
                                                className={clsx(
                                                    "flex flex-row items-center space-x-3 space-y-0",
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
                <Button type="submit" disabled={isLocked}>Next</Button>
            </form>
        </Form>
    )
}
