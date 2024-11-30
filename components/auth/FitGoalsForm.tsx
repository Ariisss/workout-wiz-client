"use client"
import { useFormContext } from "../context/FormProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { LockDiv } from "../general/LockDiv"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { Checkbox } from "../ui/checkbox"

const goals = [
    {
        id: "muscle_gain",
        label: "Muscle Gain",
    },
    {
        id: "weight_loss",
        label: "Weight Loss",
    },
    {
        id: "endurance",
        label: "Endurance",
    },
    {
        id: "gen_fitness",
        label: "General Fitness",
    },
    {
        id: "aesthetic",
        label: "Aesthetic",
    },
] as const

const formSchema = z.object({
    goals: z.array(z.string()).refine((value) => value.some((goal) => goal), {
        message: "You have to select at least one goal.",
    }),
})

type FormProps = {
    formId: string
    nextForm?: () => void
}

export default function SignupForm({
    formId,
    nextForm = () => null
}: FormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            goals: [],
        },
    })


    const { isSubmitted, lockForm, unlockForm, submitForm } = useFormContext(formId);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        lockForm()
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        // ON SUCCESS
        submitForm()
        function timeout(delay: number) {
            return new Promise(res => setTimeout(res, delay));
        }

        await timeout(2000)     // TESTING PURPOSES
        unlockForm()
        nextForm()
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="goals"
                    render={() => (
                        <FormItem>
                            {goals.map((goal) => (
                                <FormField
                                    key={goal.id}
                                    control={form.control}
                                    name="goals"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={goal.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(goal.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, goal.id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== goal.id
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">
                                                    {goal.label}
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
