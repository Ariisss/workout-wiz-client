import React from "react"

type PageProps = {
    id?: Text
    children: React.ReactNode
    //side: "left" | "right"  // maybe?
}

function Page({ children }: PageProps) {
    return (
        <div className="w-[50%] ">
            {children}
        </div>
    )
}


type BookProps = {
    children: React.ReactNode
}

export default function Book({ children }: BookProps) {
    if (React.Children.count(children) !== 2) {
        throw new Error("Book component must have exactly two children: left and right pages.");
    }
    
    const [leftPage, rightPage] = React.Children.toArray(children)

    return (
        <div className="bg-yellow-800 w-[1440px] flex-col p-[40px]">
            <Page>{leftPage}</Page>
            <Page>{rightPage}</Page>
        </div>
    )
}