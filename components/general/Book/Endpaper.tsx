import { useFormContext } from "@/components/context/FormProvider"
import CircularRunes from "../CircularRunes"
import NextIndicator from "../NextIndicator"
import { AnimatePresence, motion } from "motion/react"
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
    isActive = false
}: EndpaperProps) {
    try { // when prop is not used for forms
        isActive = useFormContext(formRef).isSubmitted
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
        <div className="absolute-center translate-y-[-45%]">
            <Logo width={parentHeight / 1.4} height={parentHeight / 1.4} className={logoStateStyles}/>
        </div>
    ) : (
        <div className="absolute-center">
            <NextIndicator size={parentHeight / 4.5} className={indicatorStateStyles} />
        </div>
    )

    return (
        <CoverRunes>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    transition={{ duration: 0.5 }} key={"last"}
                >
                    {centerElement}
                </motion.div>
            </AnimatePresence>
        </CoverRunes>
    )
}