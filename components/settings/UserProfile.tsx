"use client"
import { useFormContext } from "../context/FormProvider"
import { useWindowSize } from "react-use"
import { CalendarIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar } from "../ui/calendar"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { z } from "zod"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../ui/popover"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useState } from "react"


const formSchema = z.object({
    username: z
        .string()
        .min(1, { message: "Username is required." }),
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .email("This is not a valid email."),

    dob: z
        .date(),


    height: z.coerce
        .number({ invalid_type_error: "Height is required" })
        .positive("Invalid height"),
    weight: z.coerce
        .number({ invalid_type_error: "Weight is required" })
        .positive("Invalid weight"),
})

type FormProps = {
    formId: string
    nextForm?: () => void
}

export default function UserProfileForm({
    formId,
    nextForm = () => null
}: FormProps) {
    const { width } = useWindowSize()
    const [isLocked, setIsLocked] = useState(false) //TEMP ONLY
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "Ced69",
            dob: new Date("03/19/2003"),
            height: 69,
            weight: 42
        },
    })
    //     const { isLocked, lockForm, unlockForm, submitForm } = useFormContext(formId);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLocked(true)
        console.log(values)
        setIsLocked(false)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col justify-between">
                <div className="space-y-4 mt-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Username" {...field} disabled={isLocked} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                disabled={isLocked}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left text-sm font-normal bg-white text-black",
                                                    "hover:bg-[#B8FCE3] hover:text-gray-600",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    <span className="pl-2">{format(field.value, "P")}</span>
                                                ) : (
                                                    <span className="pl-2">Date of Birth</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="p-0 bg-background-darker"
                                        align="center"
                                        side={width <= 640 ? "top" : "right"}>
                                        <Calendar
                                            className="font-sans"
                                            mode="single"
                                            captionLayout="dropdown"
                                            fromYear={new Date().getFullYear() - 100}
                                            toYear={new Date().getFullYear() - 5}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row space-x-4 w-full">
                        <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Height</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="cm" {...field} disabled={isLocked} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Weight</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="kg" {...field} disabled={isLocked} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" disabled={isLocked} className="mt-8 lg:mt-0">Save</Button>
            </form>
        </Form>
    )

}