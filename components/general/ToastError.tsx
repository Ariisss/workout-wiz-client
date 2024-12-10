import React from 'react'

type Props = {
    title: string,
    desc: any,
}

export default function ToastError({ title, desc }: Props) {
    return (
        <div className="font-sans">
            <p>{title}</p>
            <p className="font-roboto text-xs text-muted-foreground">{`${desc}`}</p>
        </div>
    )
}