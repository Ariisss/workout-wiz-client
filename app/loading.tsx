"use client"
import CircularRunes from "@/components/general/CircularRunes"
import { motion } from "motion/react";
import { useMeasure } from "react-use"

export default function Loading() {
    const [ref, { width, height }] = useMeasure<HTMLDivElement>();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="h-screen overflow-hidden flex justify-center" ref={ref}>
                <motion.div
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{
                        opacity: [1, 0.35],
                        scale: [0.95, 1.2],
                        rotate: [0, 60],
                        transition: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "reverse",
                        }
                    }}
                >
                    <CircularRunes
                        parentHeight={height * 0.65}
                        fontSize={0}
                        letterSpacing={0}
                        glow={"intense"}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0.5 }}
                    animate={{
                        opacity: [0.2, 1],
                        rotate: [0, 60],
                        transition: {
                            duration: 40,
                            type: 'spring',
                            repeat: Infinity,
                            repeatType: "reverse",
                        }
                    }}
                >
                    <CircularRunes
                        parentHeight={height * 0.4}
                        fontSize={0}
                        letterSpacing={0}
                        glow={"intense"}
                    />
                </motion.div>
            </div>
        </motion.div>
    )
}