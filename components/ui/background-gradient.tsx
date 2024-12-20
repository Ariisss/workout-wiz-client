"use client"
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
    children,
    className,
    containerClassName,
    animate = true,
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    animate?: boolean;
}) => {
    const variants = {
        initial: {
            backgroundPosition: "0 50%",
        },
        animate: {
            backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
        },
    };
    return (
        <div className={cn("relative p-[4px] group h-full", containerClassName)}>
            <motion.div
                variants={animate ? variants : undefined}
                initial={animate ? "initial" : undefined}
                animate={animate ? "animate" : undefined}
                transition={
                    animate
                        ? {
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }
                        : undefined
                }
                style={{
                    backgroundSize: animate ? "400% 400%" : undefined,
                }}
                className={cn(
                    "absolute inset-0 rounded-2xl z-[-1] opacity-60 group-hover:opacity-100 blur-md  transition duration-500 will-change-transform",
                    "bg-[radial-gradient(circle_farthest-side_at_0_100%,#005B3A,#17B978,#3CFBB5,#005B3A),radial-gradient(circle_farthest-side_at_100%_0,#17B978,#3CFBB5,#1D9D67,#17B978),radial-gradient(circle_farthest-side_at_100%_100%,#3CFBB5,#1D9D67,#80E8C8,#3CFBB5),radial-gradient(circle_farthest-side_at_0_0,#1D9D67,#80E8C8,#005B3A,#1D9D67)]")}
            />
            <motion.div
                variants={animate ? variants : undefined}
                initial={animate ? "initial" : undefined}
                animate={animate ? "animate" : undefined}
                transition={
                    animate
                        ? {
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }
                        : undefined
                }
                style={{
                    backgroundSize: animate ? "400% 400%" : undefined,
                }}
                className={cn(
                    "absolute inset-0 rounded-2xl z-[1] will-change-transform",
                    "bg-[radial-gradient(circle_farthest-side_at_0_100%,#005B3A,transparent),radial-gradient(circle_farthest-side_at_100%_0,#17B978,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#3CFBB5,transparent),radial-gradient(circle_farthest-side_at_0_0,#1D9D67,#80E8C8)]"
                )}
            />

            <div className={cn("relative z-10 h-full", className)}>{children}</div>
        </div>
    );
};
