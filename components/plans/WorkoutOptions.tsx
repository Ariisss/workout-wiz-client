import * as React from "react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup
} from "@/components/ui/select"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import clsx from "clsx"
import { RefreshCcw, Trash2 } from "lucide-react"
import { Button } from "../ui/button"

type WorkoutSelectProps = {
    selected: string
    data: string[]
}

export function WorkoutSelect({ selected, data }: WorkoutSelectProps) {
    return (
        <Select>
            <SelectTrigger className="w-[240px] bg-primary h-[3rem] font-medium">
                <SelectValue className="text-xl" placeholder="Switch workout" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data.map((element, idx) => (
                        <SelectItem
                            value={element} key={idx}
                            disabled={element === selected}
                            className={clsx({ "bg-background-darkest": element === selected })}
                        >
                            {element}
                        </SelectItem>
                    ))}
                </SelectGroup>
                <SelectItem value={"new"}>
                    <div className="flex flex-row gap-2 items-center justify-between w-full">
                        Generate New
                        <RefreshCcw className="h-4 w-4" />
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    )
}

export const WorkoutOptions = ({ selected, data }: WorkoutSelectProps) => {
    return (
        <NavigationMenu>
            <NavigationMenuList className="bg-none rounded-[12px] mt-2 lg:mt-0">
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className="w-full md:w-[240px] bg-primary hover:bg-primary-dark h-[3rem] font-medium flex flex-row justify-between"
                    >
                        Switch Workout
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className=" w-full rounded-[12px] pl-[0.4rem] pr-[0.5rem] py-[0.6rem]">
                        <ul className="w-full md:w-[228px]">
                            {data.map((element, idx) => (
                                <li key={idx}>
                                    <NavigationMenuLink>
                                        <div
                                            className={clsx(
                                                "h-[3rem] flex items-center text-sm px-2 rounded-md",
                                                {
                                                    "select-none text-gray-400": element === selected,
                                                    "hover:bg-primary-dark": element !== selected
                                                }
                                            )}
                                        >
                                            {element}
                                        </div>
                                    </NavigationMenuLink>
                                </li>
                            ))}
                            <li>
                                <NavigationMenuLink className="h-fit cursor-pointer">
                                    <div className={clsx("h-[3rem] flex items-center text-sm ")}>
                                        <div className="flex flex-row items-center gap-[0.8rem] justify-between h-full w-full bg-background px-2 rounded-md hover:bg-primary-dark">
                                            Generate New
                                            <RefreshCcw className="h-4 w-4" />
                                        </div>
                                    </div>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Button className='w-full lg:w-fit bg-red-600 hover:bg-destructive'>
                        <NavigationMenuLink>
                            <Trash2 className="stroke-[2px]" />
                        </NavigationMenuLink>
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu >
    )
}
