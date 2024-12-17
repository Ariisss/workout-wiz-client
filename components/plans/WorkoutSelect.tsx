import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from "@/components/ui/select"
import clsx from "clsx"
import { RefreshCcw, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { useAuth } from "../context/AuthProvider"

type WorkoutSelectProps = {
    selected: string
    data: string[]
    onSelect?: (value: string) => void
    onDelete?: () => void
}

export function WorkoutSelect({ selected, data, onSelect, onDelete }: WorkoutSelectProps) {
    const { workoutGenerating } = useAuth()
    const [isGenerating, setIsGenerating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    return (
        <div className="flex flex-row gap-2">
            <Select value={selected} onValueChange={onSelect}>
                <SelectTrigger className="w-[240px] bg-black/30 h-[3rem] font-medium">
                    <SelectValue className="text-xl" placeholder="Switch workout" />
                </SelectTrigger>
                <SelectContent className="bg-background-darkest w-[240px]">
                    <SelectGroup>
                        {data.map((element, idx) => (
                            <SelectItem
                                value={element}
                                key={idx}
                                disabled={element === selected}
                                className={clsx("font-roboto")}
                            >
                                {element}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                    <SelectItem
                        value={"new"}
                        className="w-full"
                        disabled={(workoutGenerating || isGenerating)}
                        onClick={() => setIsGenerating(true)}
                    >
                        <div className="flex flex-row gap-2 items-center justify-between w-full cursor-pointer">
                            Generate New
                            <RefreshCcw className="h-4 w-4" />
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
            <Button
                className="w-full lg:w-fit bg-red-600 hover:bg-destructive"
                onClick={() => {
                    setIsDeleting(true)
                    onDelete && onDelete();
                }}
                disabled={isDeleting}
            >
                <Trash2 className="stroke-[2px]" />
            </Button>
        </div>
    )
}
