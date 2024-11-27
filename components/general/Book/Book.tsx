"use client"
import { ReactNode, Children } from "react"
import { useMeasure } from "react-use"
import { Endpaper } from "./Endpaper"
import { cn } from "@/lib/utils"
import clsx from "clsx"

export type BookHalfProps = {
    id?: string
    children?: ReactNode
    side: "left" | "right"
    centerImg?: "logo" | "next"
    isActive?: boolean
}

export function BookHalf({
    children,
    side,
    centerImg = "logo"
}: BookHalfProps) {
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
                        <div className={cn('bg-[#2A2B33] relative', tw.page)} style={padding("page")}>
                            <div className={cn('bg-[#343541] drop-shadow-2xl', tw.front, tw.page)}>
                                {children}
                            </div>
                        </div>
                    ) : (
                        <Endpaper parentHeight={height} centerImg={centerImg}/>
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
        <div className="aspect-[5/3] max-h-[768px] h-[90%] md:min-h-[560px] flex flex-row rounded-[27px]">
            {children}
        </div>
    )
}