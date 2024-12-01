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
import clsx from "clsx"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select"


const formSchema = z.object({
    first_name: z
        .string()
        .min(1, { message: "First Name is required." }),
    last_name: z
        .string()
        .min(1, { message: "Last Name is required." }),

    dob: z
        .date(),
    sex: z
        .preprocess(
            (value) => value === "true" || value === true,
            z.boolean()),

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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
        },
    })

    const { isLocked, lockForm, unlockForm, submitForm } = useFormContext(formId);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="First Name" {...field} disabled={isLocked} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Last Name" {...field} disabled={isLocked} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row space-x-4 w-full font-sans">
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
                                                    <span className="text-sm">{format(field.value, "P")}</span>
                                                ) : (
                                                    <span className="text-sm">Date of Birth</span>
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
                    <FormField
                        control={form.control}
                        name="sex"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                    disabled={isLocked}
                                >
                                    <FormControl className={clsx(
                                        "h-[3rem] bg-white text-black transition-colors hover:bg-[#B8FCE3]")}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={<p className="text-muted-foreground hover:text-gray-800">Select Sex</p>} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-background-darker font-sans">
                                        <SelectItem value="false" className="hover:bg-primary">Male</SelectItem>
                                        <SelectItem value="true">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                <Button type="submit" disabled={isLocked}>Next</Button>
            </form>
        </Form>
    )

}