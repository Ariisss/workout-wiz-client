"use client"
import { Book, BookHalf } from "@/components/general/Book/Book";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { useFormContext } from "@/components/context/FormProvider";
import { AnimatePresence } from "motion/react";
import { LockDiv } from "@/components/general/LockDiv";

export default function Login() {
    const formId = "login"
    const { isLocked } = useFormContext(formId)

    const Content = (): React.ReactNode => (
        <div className="flex flex-col space-y-8 lg:space-y-4 w-full p-[15%]">
            <div className="flex flex-col space-y-2">
                <p className="title-primary text-3xl md:text-4xl lg:text-4xl">Welcome Back</p>
                <p className="text-gray-400 text-sm">
                    Your physical enhancement spells need working!
                </p>
            </div>
            <LoginForm formId={formId} />
            <div className="text-xs md:text-sm lg:text-sm space-y-2">
                <Link href={'forgotPassword'} className="highlight hover:text-primary-light">Forgot Password?</Link>
                <span className="flex flex-col lg:flex-row lg:space-x-2">
                    <p className="text-gray-400">Don't have an account?</p>
                    <Link href={'signup'} className="highlight hover:text-primary-light">Sign up here.</Link>
                </span>
            </div>
        </div>
    )

    return (
        <>
            <div className="hidden lg:container-center">
                <Book>
                    <BookHalf side="left"
                        formRef={formId}
                        centerImg="logo"
                        key={"first"}
                    />
                    <BookHalf side="right" className="drop-shadow-2xl">
                        <Content />
                        <AnimatePresence>
                            {isLocked && <LockDiv />}
                        </AnimatePresence>
                    </BookHalf>
                </Book>
            </div>
            <div className="container-center lg:hidden">
                <Content />
            </div >
        </>
    )
}