import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {

    return (
      <input
        type={type}
        className={cn(
          "text-[16px] sm:text-[20px] md:text-[24px]",       
          "flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "min-w-full sm:min-w-[320px] md:min-w-[400px] lg:min-w-[100px]",
          "bg-white text-black font-poppins rounded-[8px]",
          "p-[12px] sm:p-[16px] md:p-[20px]",
          "focus-visible:ring-2 focus-visible:ring-primary",                  
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
export { Input }
