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

type WorkoutSelectProps = {
    data: string[];
    onGenerateNew?: () => void;
};

export function WorkoutSelect({ data, selected, onSelectPlan }: any) {
    const handleSelect = (value: string) => {
      if (onSelectPlan) onSelectPlan(value);
    };
  
    return (
      <Select onValueChange={handleSelect} value={selected}>
        <SelectTrigger className="w-[240px] bg-primary h-[3rem] font-medium hover:bg-primary-dark hover:bg-opacity-90 transition">
          <SelectValue className="text-xl" placeholder="Switch workout" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.map((element: string, idx: number) => (
              <SelectItem
                value={element}
                key={idx}
                className="cursor-pointer"
              >
                {element}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  
