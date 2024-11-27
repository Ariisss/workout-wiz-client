"use client"
import { Book, BookHalf } from "@/components/general/Book";
import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

export default function Signup() {

    const Content = (): React.ReactNode => (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
                <p className="title-primary">Sign Up</p>
                <p className="text-gray-400 text-sm">
                    Create an account to be a scholar of fitness magic!
                </p>
            </div>
            <SignupForm />
            <span className="flex flex-row space-x-2">
                <p className="text-gray-400">Already have an account?</p>
                <Link href={'login'} className="highlight">Login here.</Link>
            </span>
        </div>
    )

    return (
        <>
            <div className="hidden lg:container-center">
                <Book>
                    <BookHalf side="left" >
                        <Content />
                    </BookHalf>
                    <BookHalf side="right" />
                </Book>
            </div>
            <div className="container-center lg:hidden">
                <Content />
            </div >
        </>
    )
}