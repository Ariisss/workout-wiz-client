"use client"
import CircularRunes from "./CircularRunes"
import { ReactNode, Children } from "react"
import { useMeasure } from "react-use"
import { cn } from "@/lib/utils"
import clsx from "clsx"
import Logo from "./Logo"

type CoverRunesProp = {
    parentHeight: number,
    children?: React.ReactElement
}

export function CoverRunes({ parentHeight, children }: CoverRunesProp) {

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

type BookHalfProps = {
    id?: string
    children?: ReactNode
    side: "left" | "right"
}

export function BookHalf({ children, side }: BookHalfProps) {
    const [ref, { height }] = useMeasure<HTMLDivElement>();
    const childExists = Children.count(children) !== 0

    const isLeft = side === "left"
    const borderRadius = clsx({
        'rounded-l-[24px] rounded-r-[30px]': isLeft,
        'rounded-l-[30px] rounded-r-[24px]': !isLeft,
    })

    const tw = {
        cover: 'bg-[#1E1F21] w-[50%] h-full py-[15px]',
        page: 'w-full h-full rounded-[24px] overflow-hidden',
        front: 'flex justify-center items-center',
    }

    const padding = (option: "page" | "cover") => {
        const padValues = {
            "page": 10,
            "cover": 20
        }
        return isLeft
            ? { paddingLeft: padValues[option], paddingRight: 0 }
            : { paddingLeft: 0, paddingRight: padValues[option] }
    }

    return (
        <div className={cn(tw.cover, borderRadius)} style={padding("cover")}>
            <div className={cn('bg-[#25262A]', tw.page, childExists ?? tw.front, 'relative')}
                style={padding("page")} ref={ref}
            >
                {childExists
                    ? (
                        <div className={cn('bg-[#2A2B33]', tw.page)} style={padding("page")}>
                            <div className={cn('bg-[#343541] drop-shadow-2xl', tw.front, tw.page)}>
                                {children}
                            </div>
                        </div>
                    ) : (
                        <CoverRunes parentHeight={height}>
                            <div className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-45%]`}>
                                <Logo height={height/1.4} width={height/1.4}/>
                            </div>
                        </CoverRunes>
                    )}
            </div>
        </div>
    )
}



type BookProps = {
    children: ReactNode
}

export function Book({ children }: BookProps) {

    return (
        <div className="w-[80%] h-[90%] flex flex-row rounded-[27px]">
            {children}
        </div>
    )
}