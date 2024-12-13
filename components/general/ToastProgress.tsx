import React from 'react'

type Props = {
    title: string,
    desc: any,
}

export default function ToastProgress({ title, desc }: Props) {
    return (
        <div className="font-sans space-y-1">
            <p>{title}</p>
            <p className="font-roboto text-xs text-muted-foreground">{`${desc}`}</p>
        </div>
    )
}