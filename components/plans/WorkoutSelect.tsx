import * as React from "react";
import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select";

import { RefreshCcw } from "lucide-react";

type WorkoutSelectProps = {
    data: string[];
    onGenerateNew?: () => void;
};

export function WorkoutSelect({ data, onGenerateNew }: WorkoutSelectProps) {
    const [workouts, setWorkouts] = useState(data);
    const [selected, setSelected] = useState(data[0] || ""); 

    const handleSelect = (value: string) => {
        if (value === "new") {
            handleGenerateNew();
        } else {
            setSelected(value);
        }
    };

    const handleGenerateNew = () => {
        const newWorkout = `Workout ${workouts.length + 1}`; 
        const updatedWorkouts = [...workouts, newWorkout];
        setWorkouts(updatedWorkouts);
        setSelected(newWorkout);
        if (onGenerateNew) onGenerateNew();
    };

    return (
        <Select onValueChange={handleSelect} value={selected}>
            <SelectTrigger className="w-[240px] bg-primary h-[3rem] font-medium">
                <SelectValue
                    className="text-xl"
                    placeholder="Switch workout"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {workouts.map((element, idx) => (
                        <SelectItem value={element} key={idx}>
                            {element}
                        </SelectItem>
                    ))}
                    <SelectItem
                        value="new"
                        className="flex flex-row gap-2 items-center"
                    >
                        <div className="flex items-center gap-2">
                            <span>Generate New</span>
                            <RefreshCcw className="h-4 w-4" />
                        </div>
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
