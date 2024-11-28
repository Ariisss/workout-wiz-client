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
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { z } from "zod"


const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .email("This is not a valid email."),
    // . refine(async (e) => { }) // search database for "email not found"
    password: z
        .string()
        .min(1, { message: "Password is required." }),
    confirm: z
        .string()
}).refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"]
})

type FormProps = {
    formId: string
}

export default function SignupForm({ formId }: FormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm: "",
        },
    })


    const { isSubmitted, lockForm, unlockForm, submitForm } = useFormContext(formId);
    function onSubmit(values: z.infer<typeof formSchema>) {
        submitForm()
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        // ON SUCCESS
        lockForm()
        // ON FAILURE
        // unlockForm()
        console.log(values)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email" {...field} disabled={isSubmitted} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} disabled={isSubmitted} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm Password" {...field} disabled={isSubmitted} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitted}>Sign Up</Button>
                </form>
            </Form>
            <LockDiv lock={isSubmitted} />
        </>
    )

}