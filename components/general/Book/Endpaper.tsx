import CircularRunes from "../CircularRunes"
import NextIndicator from "../NextIndicator"
import { BookHalfProps } from "./Book"
import Logo from "../Logo"

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

    const centerElement: React.ReactElement = centerImg === "logo" ? (
        <div className="translate-y-[-45%] absolute-center ">
            <Logo width={parentHeight / 1.4} height={parentHeight / 1.4} />
        </div>
    ) : (
        <div className="absolute-center ">
            <NextIndicator size={parentHeight / 4.5} className="drop-shadow-lg fill-[#25282A]" />
        </div>
    )

    return (
        <CoverRunes>
            {centerElement}
        </CoverRunes>
    )
}