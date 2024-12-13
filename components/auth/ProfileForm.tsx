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
import { toast } from "react-toastify"
import ToastError from "../general/ToastError"
import { useAuth } from "../context/AuthProvider"


const formSchema = z.object({
    username: z
        .string()
        .min(1, { message: "Username is required." }),

    date_of_birth: z
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
    const { setProfile } = useAuth()
    const { width } = useWindowSize()
    const { isLocked, lockForm, unlockForm, submitForm } = useFormContext(formId);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            height: 0,
            weight: 0
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        lockForm()
        try {
            const transformedValues = {
                ...values,
                date_of_birth: (values.date_of_birth instanceof Date)
                    ? format(values.date_of_birth, 'yyyy-MM-dd') // Format the Date object to "YYYY-MM-DD"
                    : values.date_of_birth, // Retain original if not a Date object
            }

            console.log(transformedValues)
            await setProfile(transformedValues)
            nextForm()
        } catch (error) {
            toast.error(<ToastError title="Submission Failed" desc={error} />)
        } finally {
            unlockForm()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <div className="flex flex-row space-x-4 w-full font-sans">
                    <FormField
                        control={form.control}
                        name="date_of_birth"
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
                                    <Input
                                        type="number"
                                        placeholder="cm"
                                        {...field}
                                        value={field.value === 0 ? "" : field.value}
                                        disabled={isLocked}
                                    />
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
                                    <Input
                                        type="number"
                                        placeholder="kg"
                                        {...field}
                                        value={field.value === 0 ? "" : field.value}
                                        disabled={isLocked}
                                    />
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

export type ProfileData = Omit<z.infer<typeof formSchema>, 'date_of_birth'> & {
    date_of_birth: string
}