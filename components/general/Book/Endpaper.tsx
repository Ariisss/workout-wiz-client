"use client"
import { AnimatePresence, motion } from "motion/react"
import { useFormContext } from "@/components/context/FormProvider"
import CircularRunes from "../CircularRunes"
import NextIndicator from "../NextIndicator"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Logo from "../Logo"
import clsx from "clsx"

type EndpaperProps = {
    parentHeight: number,
    centerImg: "logo" | "next"
    children?: React.ReactElement
    isActive?: boolean
    formRef?: string    // formId for reference
}

type CoverRunesProps = {
    children: React.ReactElement
}

export function Endpaper({
    parentHeight,
    centerImg,
    formRef = "",
}: EndpaperProps) {
    let isActive = false
    try { // when prop is not used for forms
        isActive = (useFormContext(formRef).isLocked)
    } catch (error) { }

    const CoverRunes = (
        { children }: CoverRunesProps
    ): React.ReactNode => {
        return (
            <div className="select-none">
                <CircularRunes
                    parentHeight={parentHeight}
                    fontSize={128}
                    letterSpacing={0}
                    glow="intense"
                />
                <CircularRunes
                    parentHeight={parentHeight / 1.8}
                    fontSize={64}
                    letterSpacing={0}
                    glow="off"
                />

                {children}
            </div>
        )
    }

    const indicatorStateStyles = clsx({
        "fill-background-darkest drop-shadow-lg": !isActive,
        "fill-primary-light drop-shadow-glow": isActive,
    })

    const logoStateStyles = clsx({
        "drop-shadow-glow": isActive
    })

    const centerElement: React.ReactElement = centerImg === "logo" ? (
        <motion.div
            initial={{ filter: "drop-shadow(0px 0px 12px black)" }}
            animate={{
                filter: isActive
                    ? "drop-shadow(0px 0px 12px #66FFC7)"
                    : "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))",
                transition: { duration: 0.5 }
            }}
            className="absolute-center translate-y-[-45%] drop-shadow-glow">
            <Logo width={parentHeight / 1.4} height={parentHeight / 1.4} />
        </motion.div>
    ) : (
        <div className="absolute-center">
            <NextIndicator size={parentHeight / 4.5} className={indicatorStateStyles} />
        </div>
    )

    return (
        <CoverRunes>
            {centerElement}
        </CoverRunes>
    )
}