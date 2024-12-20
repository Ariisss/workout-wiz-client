"use client"
import { Book, BookHalf } from "@/components/general/Book/Book";
import { useFormContext } from "@/components/context/FormProvider";
import { LockDiv } from "@/components/general/LockDiv";
import { AnimatePresence } from "motion/react";
import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";
import clsx from "clsx";
import { useRef, useState } from "react";
import UserProfileForm from "@/components/auth/ProfileForm";
import FitnessGoalsForm from "@/components/auth/FitGoalsForm";
import WorkoutPreferencesForm from "@/components/auth/WorkoutPrefForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ToastProgress from "@/components/general/ToastProgress";

type FormKey = "signup" | "profile" | "fitgoals" | "workoutprefs";
type FormConfig = {
    [key in FormKey]: {
        title: string
        description: string
        formComponent: React.ReactNode
        footer: React.ReactNode

    }
}

export default function Signup() {
    const formList: FormKey[] = ['signup', 'profile', 'fitgoals', 'workoutprefs']
    const [formIdx, setFormIdx] = useState<number>(0);
    const toastId = useRef<string | number | null>(null)
    const { isSubmitted, isLocked } = useFormContext(formList[formIdx])
    const router = useRouter();
    
    const nextForm = () => {
        const currentIndex = formIdx
        const nextIndex = currentIndex + 1
        const progress = nextIndex / formList.length
        const toastContent = (
            <ToastProgress
                title="Completing Signup"
                desc={`Steps ${nextIndex} out of ${formList.length} completed`}
            />
        )

        if (toastId.current === null) {
            toastId.current = toast.loading(toastContent, {
                progress,
                progressClassName: 'bg-[#66FFC7]',
            })
        } else {
            toast.update(toastId.current, {
                render: toastContent,
                progress,
                progressClassName: 'bg-[#66FFC7]',
            })
        }

        setFormIdx(nextIndex)
    }

    const handleFormCompletion = () => {
        if (toastId.current !== null) {
            toast.dismiss(toastId.current);
        }
    };

    const formConfig: FormConfig = {
        'signup': {
            title: "Sign Up",
            description: "Create an account to be a scholar of fitness magic!",
            formComponent: <SignupForm formId="signup" nextForm={nextForm} />,
            footer: (
                <span className="flex flex-col lg:flex-row lg:space-x-2 text-sm">
                    <p className="text-gray-400">Already have an account?</p>
                    <Link className="highlight" href={"login"}>Login here.</Link>
                </span>
            ),
        },
        'profile': {
            title: "User Profile",
            description: "A few more things before we start...",
            formComponent: <UserProfileForm formId="profile" nextForm={nextForm} />,
            footer: null,
        },
        'fitgoals': {
            title: "Fitness Goals",
            description: "Choose at least one.",
            formComponent: <FitnessGoalsForm formId="fitgoals" nextForm={nextForm} />,
            footer: null,
        },
        'workoutprefs': {
            title: "Workout Preferences",
            description: "Tailor your fitness journey by sharing your preferences!",
            formComponent: <WorkoutPreferencesForm formId="workoutprefs" nextForm={handleFormCompletion} />,
            footer: null,
        },
    }

    const { title, description, formComponent, footer } = formConfig[formList[formIdx]];


    const Content = (): React.ReactNode => (
        <div className={clsx("flex flex-col space-y-4 w-full p-[10%] lg:p-[15%]", { "select-none": isSubmitted })}>
            <div className="flex flex-col space-y-2">
                <p className={clsx("title-primary", { "text-2xl": title.length > 15 })}>{title}</p>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
            {formComponent}
            {footer}
        </div>
    );

    return (
        <>
            <div className="hidden lg:container-center">
                <Book className="relative">
                    <BookHalf
                        side="left"
                        centerImg="logo"
                        key={"first"}
                        formRef={formList[formIdx]}
                        className="z-10"
                    />
                    <BookHalf side="right" className="drop-shadow-2xl z-20">
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
