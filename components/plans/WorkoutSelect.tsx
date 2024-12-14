import * as React from "react";
import { RefreshCcw } from "lucide-react";

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
  selected: string; 
  onSelectPlan: (plan: string) => void; 
  onGenerateNew?: () => void; 
};

export function WorkoutSelect({
  data,
  selected,
  onSelectPlan,
  onGenerateNew,
}: WorkoutSelectProps) {
  const handleSelect = (value: string) => {
    if (value === "new") {
      if (onGenerateNew) onGenerateNew(); 
    } else if (onSelectPlan) {
      onSelectPlan(value); 
    }
  };

  return (
    <Select onValueChange={handleSelect} value={selected}>
      <SelectTrigger className="w-[240px] bg-primary h-[3rem] font-medium hover:bg-primary-dark hover:bg-opacity-90 transition">
        <SelectValue className="text-xl" placeholder="Switch workout" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((element: string, idx: number) => (
            <SelectItem value={element} key={idx} className="cursor-pointer">
              {element}
            </SelectItem>
          ))}

          <SelectItem value="new" className="flex flex-row gap-2 items-center cursor-pointer">
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
