"use client"
import { useFormContext } from "../context/FormProvider"
import { zodResolver } from "@hookform/resolvers/zod"
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
import ToastError from "../general/ToastError"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthProvider"


const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .email("This is not a valid email."),
    // . refine(async (e) => { }) // search database for "email not found"

    password: z
    .string()
    .min(1, { message: "Password is required." }) // Ensure the field is not empty
    .regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, { 
        message: "Password must be at least 8 characters long, including one uppercase and one lowercase letter."
    }),
    confirm: z
        .string()

}).refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"]
})

type FormProps = {
    formId: string
    nextForm?: () => void
}

export default function SignupForm({
    formId,
    nextForm = () => null
}: FormProps) {
    const { isLocked, lockForm, unlockForm, submitForm } = useFormContext(formId);
    const { signup } = useAuth()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        lockForm()
        try {
            const { confirm, ...filteredValues } = values
            console.log(filteredValues)
            await signup(filteredValues)
            nextForm()
        } catch (error) {
            toast.error(<ToastError title="Signup Failed" desc={error} />)
        } finally {
            unlockForm()
        }
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
                <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Confirm Password" {...field} disabled={isLocked} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLocked}>Sign Up</Button>
            </form>
        </Form>
    )

}

export type SignUpCredentials = Omit<z.infer<typeof formSchema>, 'confirm'>