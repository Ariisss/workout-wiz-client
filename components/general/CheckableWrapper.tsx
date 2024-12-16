"use client"
import clsx from "clsx";

type CheckableWrapperProps = {
    onClick?: (checked: boolean) => void;
    children: React.ReactNode
    isClickable?: boolean
    enableCheckbox?: boolean;
    checkedState?: boolean
};

export function CheckableWrapper({
    onClick,
    children,
    enableCheckbox = false,
    checkedState = false, // Controlled by parent
}: CheckableWrapperProps) {
    const handleToggle = () => {
        console.log("Toggle triggered");
        if (onClick) {
            onClick(!checkedState); // Pass the toggled state to the parent
        }
    };

    return (
        <div
            onClick={enableCheckbox ? handleToggle : undefined}
            className={clsx(
                "relative w-full p-2 transition-all",
                {
                    "cursor-pointer hover:bg-primary-light/10": enableCheckbox,
                    "border-primary-light bg-primary-light/20": checkedState, // Use parent-controlled state
                }
            )}
        >
            {children}
        </div>
    )
}
