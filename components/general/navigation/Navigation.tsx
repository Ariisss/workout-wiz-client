"use client"
import MobileNavbar from './MobileNavbar'
import DesktopSidebar from './DesktopSidebar'
import React from 'react'
import clsx from 'clsx'
import { useAuth } from '@/components/context/AuthProvider'

type Props = {
    children: React.ReactNode
}

export default function NavLayout({ children }: Props) {
    const { user } = useAuth()
    return (
        <div className='flex flex-col lg:flex-row'>
            <div className={clsx(
                "w-fit bg-black ",
                { "hidden": !user }
            )}>
                <div className='lg:hidden'>
                    <MobileNavbar />
                </div>
                <div className='hidden lg:flex'>
                    <DesktopSidebar />
                </div>
            </div>
            {children}
        </div>
    )
}