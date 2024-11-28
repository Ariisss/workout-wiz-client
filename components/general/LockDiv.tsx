import clsx from "clsx"
import { cn } from "@/lib/utils"

type LockDivProps = {
    lock: boolean
}


export function LockDiv({ lock }: LockDivProps) {
    const stateStyle = clsx({ 'hidden': !lock, "hidden lg:block": lock })

    const animateStyle = {
        base: 'animate-once delay-150 duration-1000',
        horizontal: 'animate-fade-left',
        vertical: 'animate-fade-up',
    }

    return (
        <div className={cn(`absolute-center overflow-hidden select-none bg-background-darker opacity-90`,
            `animate-fade animate-once animate-ease-out animate-alternate animate-fill-backwards`, stateStyle)}>
            <div className="relative flex justify-center items-center text-[#153C2E]/60 text-[416px]">
                <div className={cn('flex flex-row', animateStyle.base, animateStyle.horizontal)}>
                    {"ᛝᛝᛝ".split("").map((char, index) => (
                        <span key={`horizontal-${index}`} className='rotate-90 p-[50px]'>
                            <p
                                className="font-bramham"
                                style={{ textShadow: '0px 0px 50px rgba(0, 0, 0, 0.6)' }}>
                                {char}
                            </p>
                        </span>
                    ))}
                </div>
                <div className={cn("flex flex-col absolute", animateStyle.base, animateStyle.vertical)}>
                    {"ᛝᛝᛝ".split("").map((char, index) => (
                        <span key={`vertical-${index}`} className="h-[340px] flex items-center">
                            <p
                                className="font-bramham"
                                style={{ textShadow: '0px 0px 50px rgba(0, 0, 0, 0.6)' }}>
                                {char}
                            </p>
                        </span>
                    ))}
                </div>
            </div>
        </div >
    )
}