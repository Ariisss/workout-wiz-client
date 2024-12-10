import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { User, Bolt, KeyRound } from "lucide-react"
import { DashboardCard, ValueContent } from '@/components/dashboard/DashboardCard'
import React from 'react'
import UserProfile from "@/components/settings/UserProfile"
import WorkoutPrefs from "@/components/settings/WorkoutPrefs"
import FitGoals from "@/components/settings/FitGoals"
import PasswordForm from "@/components/settings/Password"

type Props = {}

export default function Settings({ }: Props) {
    const tabsTriggerClass = "w-full data-[state=active]:text-primary-light rounded-lg h-[3rem] gap-4"

    return (
        <div className='h-fit lg:h-screen w-full flex flex-col gap-8 py-8 pl-8 md:pl-16 pr-8'>
            <div>
                <ValueContent main={`Settings`} sub={"Customize your preferences"} />
            </div>
            <Tabs defaultValue="profile" className="h-full flex flex-col lg:flex-row w-full space-y-4 gap-8 pb-20 lg:pb-0">
                <TabsList className="w-full lg:w-[200px] h-fit lg:h-full flex flex-row lg:flex-col gap-2 bg-background-darkest p-2 rounded-lg border-2 lg:justify-start border-background">
                    <TabsTrigger value="profile" className={tabsTriggerClass}>
                        <User className="h-5 w-5" />
                        <p className="w-full text-left hidden md:block">Profile</p>
                    </TabsTrigger>
                    <TabsTrigger value="workoutprefs" className={tabsTriggerClass}>
                        <Bolt className="h-5 w-5" />
                        <p className="w-full text-left hidden md:block">Preferences</p>
                    </TabsTrigger>
                    <TabsTrigger value="password" className={tabsTriggerClass}>
                        <KeyRound className="h-5 w-5" />
                        <p className="w-full text-left hidden md:block">Password</p>
                    </TabsTrigger>
                </TabsList>
                <div className="h-full w-full">
                    <TabsContent value="profile" className="h-full w-fit -mt-4">
                        <DashboardCard title="Profile" desc="Manage your profile information." className="-mt-2">
                            <UserProfile formId={"userProfile"} />
                        </DashboardCard>
                    </TabsContent>
                    <TabsContent value="workoutprefs" className="h-full -mt-4">
                        <div className="flex flex-col lg:flex-row gap-4 h-full w-full ">
                            <DashboardCard
                                title="Workout Preferences"
                                desc="Tailor your fitness journey by sharing your preferences."
                                className="w-full"
                            >
                                <WorkoutPrefs formId={"workoutPrefs"} />
                            </DashboardCard>
                            <DashboardCard
                                title="Fitness Goals"
                                desc="Select your primary fitness objectives"
                                className="w-full"
                            >
                                <FitGoals formId={"fitgoalsForm"} />
                            </DashboardCard>
                        </div>
                    </TabsContent>
                    <TabsContent value="password" className="h-full w-full lg:w-fit -mt-4">
                        <DashboardCard
                            title="Password"
                            desc="Change your password or reset it if forgotten."
                            className="w-full"
                        >
                            <PasswordForm formId="pass" />
                        </DashboardCard>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}