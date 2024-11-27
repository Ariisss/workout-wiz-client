import { useFormContext } from "@/components/context/FormProvider"
import CircularRunes from "../CircularRunes"
import NextIndicator from "../NextIndicator"
import Logo from "../Logo"
import clsx from "clsx"
import { cn } from "@/lib/utils"

type EndpaperProps = {
    parentHeight: number,
    centerImg: "logo" | "next"
    children?: React.ReactElement
    isActive?: boolean
}

type CoverRunesProps = {
    children: React.ReactElement
}

export function Endpaper({
    parentHeight,
    centerImg,
    isActive = false
}: EndpaperProps) {
    try { // when prop is not used for forms
        isActive = useFormContext().isSubmitted
    } catch (error) {
        console.log(error)
    }

    const CoverRunes = (
        { children }: CoverRunesProps
    ): React.ReactNode => {
        return (
            <>
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
            </>
        )
    }

    const indicatorStateStyles = clsx({
        "fill-background-darkest drop-shadow-lg": !isActive,
        "fill-primary-light drop-shadow-glow animate-fade duration-3000 animate-once": isActive,
    })

    const centerElement: React.ReactElement = centerImg === "logo" ? (
        <div className="translate-y-[-45%] absolute-center ">
            <Logo width={parentHeight / 1.4} height={parentHeight / 1.4} />
        </div>
    ) : (
        <div className="absolute-center ">
            <NextIndicator size={parentHeight / 4.5} className={indicatorStateStyles} />
        </div>
    )

    return (
        <CoverRunes>
            {centerElement}
        </CoverRunes>
    )
}