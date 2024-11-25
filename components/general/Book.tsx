import { ReactNode, Children } from "react"
import { cn } from "@/lib/utils"
import clsx from "clsx"

type RuneCoverProps = {

}

export function RuneCover() {
    return (
        <>
        </>
    )
}

type BookHalfProps = {
    id?: string
    children?: ReactNode
    side: "left" | "right"
}

export function BookHalf({ children, side }: BookHalfProps) {
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
            <div className={cn('bg-[#25262A]', tw.page)} style={padding("page")}>
                {childExists ? (
                    <div className={cn('bg-[#2A2B33]', tw.page)} style={padding("page")}>
                        <div className={cn('bg-[#343541] drop-shadow-2xl', tw.front, tw.page)}>
                            {children}
                        </div>
                    </div>
                ) : null}
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