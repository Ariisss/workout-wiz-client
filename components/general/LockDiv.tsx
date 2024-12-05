"use client"
import clsx from "clsx"
import { cn } from "@/lib/utils"
import CircularRunes from "./CircularRunes"
import { motion } from "motion/react"

type LockDivProps = {
    lock: boolean
}


export function LockDiv() {

    const springStyle = {
        transition: {
            type: 'spring',
            mass: 0.5,
            stiffness: 125,
            damping: 8,
            delay: 0.25
        }
    }

    return (
        <motion.div
            className={cn(`absolute-center overflow-hidden select-none bg-background-darkest`, "hidden lg:block")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.3 } }}
            key={'l1'}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0.4] }}
                exit={{ opacity: [0.4, 0] }}
                transition={{ duration: 0.75, times: [0.2, 1] }}
                key={'l2'}
                className="animate-pulse animate-delay-[1s] opacity-40"
            >
                <CircularRunes
                    parentHeight={350}
                    fontSize={128}
                    letterSpacing={0}
                    glow="off"
                />
            </motion.div>
            <div className="relative flex justify-center items-center text-primary-light text-[416px]">
                <motion.div
                    className={cn('flex flex-row')}
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%', ...springStyle }}
                    exit={{ x: '-100%', ...springStyle }}
                    key={'l3'}
                >
                    {"ᛝᛝᛝ".split("").map((char, index) => (
                        <span key={`horizontal-${index}`} className='rotate-90 p-[50px]'>
                            <p
                                className="font-bramham"
                                style={{ textShadow: '0px 0px 50px rgba(0, 0, 0, 0.6)' }}>
                                {char}
                            </p>
                        </span>
                    ))}
                </motion.div>
                <motion.div
                    className={cn('flex flex-col absolute')}
                    initial={{ y: '-100%' }}
                    animate={{ y: '0px', ...springStyle }}
                    exit={{ y: '-100%', ...springStyle }}
                    key={'l4'}
                >
                    {"ᛝᛝᛝ".split("").map((char, index) => (
                        <span key={`vertical-${index}`} className="h-[340px] flex items-center">
                            <p
                                className="font-bramham"
                                style={{ textShadow: '0px 0px 50px rgba(0, 0, 0, 0.6)' }}>
                                {char}
                            </p>
                        </span>
                    ))}
                </motion.div>
            </div >
        </motion.div >
    )
}