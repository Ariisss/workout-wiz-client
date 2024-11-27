"use client"
import { Book, BookHalf } from "@/components/general/Book";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function Login() {

    const Content = (): React.ReactNode => (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
                <p className="title-primary">Welcome Back</p>
                <p className="text-gray-400 text-sm">
                    Your physical enhancement spells need working!
                </p>
            </div>
            <LoginForm />
            <div className="text-sm space-y-2">
                <Link href={'forgotPassword'} className="highlight">Forgot Password?</Link>
                <span className="flex flex-row space-x-2">
                    <p className="text-gray-400">Don't have an account?</p>
                    <Link href={'signup'} className="highlight">Sign up here.</Link>
                </span>
            </div>
        </div>
    )

    return (
        <>
            <div className="hidden lg:container-center">
                <Book>
                    <BookHalf side="left" />
                    <BookHalf side="right">
                        <Content />
                    </BookHalf>
                </Book>
            </div>
            <div className="container-center lg:hidden">
                <Content />
            </div >
        </>
    )
}