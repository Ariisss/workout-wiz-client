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
import { Input } from "../ui/input"
import { toast } from "react-toastify"
import ToastError from "../general/ToastError"
import { useAuth } from "../context/AuthProvider"

const formSchema = z.object({
    current_password: z
        .string(),

    new_password: z
        .string()
        .min(1, { message: "Password is required." }),
    confirm: z
        .string()
})

type FormProps = {
    formId: string
    nextForm?: () => void
}

export default function PasswordForm({
    formId,
    nextForm = () => null
}: FormProps) {
    const { updatePassword } = useAuth()
    const [isLocked, setIsLocked] = useState(false) //TEMP ONLY

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLocked(true)
            const passData = {
                oldPassword: values.current_password,
                newPassword: values.new_password
            }
            await updatePassword(passData)
            toast.success("Successfully updated password.")
            form.reset()
        } catch (error) {
            toast.error(<ToastError title="Submission Failed" desc={error} />)
        } finally {
            setIsLocked(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-full flex flex-col justify-between">
                <div className="space-y-4 mt-8">
                    <FormField
                        control={form.control}
                        name="current_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder="Current Password" {...field} disabled={isLocked} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="new_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="password" placeholder="New Password" {...field} disabled={isLocked} />
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
                </div>
                <Button type="submit" disabled={isLocked || !(form.formState.isDirty)} className="mt-8 lg:mt-0 bg-red-500">Change Password</Button>
            </form>
        </Form >
    )
}
