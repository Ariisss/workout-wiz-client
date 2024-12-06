"use client"

import { useFormContext } from "../context/FormProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "../context/AuthProvider"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"


const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .email("This is not a valid email."),
    // . refine(async (e) => { }) // search database for "email not found"
    password: z
        .string()
        .min(1, { message: "Password is required." })
})

type LoginFormProps = {
    formId: string
}

export default function LoginForm({ formId }: LoginFormProps) {
    const { isLocked, lockForm, unlockForm, submitForm } = useFormContext(formId);
    const { login } = useAuth()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

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
        //unlockForm()
        login("Ced420")
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} disabled={isLocked} />
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
                                <Input type="password" placeholder="Password" {...field} disabled={isLocked} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLocked}>Login</Button>
            </form>
        </Form>
    )

}