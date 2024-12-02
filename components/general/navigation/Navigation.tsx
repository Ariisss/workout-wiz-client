"use client"
import MobileNavbar from './MobileNavbar'
import DesktopSidebar from './DesktopSidebar'
import React from 'react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { publicRoutes } from '@/components/context/AuthProvider'

type Props = {
    children: React.ReactNode
}

export default function NavLayout({ children }: Props) {
    const pathname = usePathname()
    return (
        <div className='flex flex-col md:flex-row h-full font-sans'>
            <div className='h-full'>
                {children}
            </div>
            <div className={clsx(
                "w-screen md:w-fit h-fit",
                { "hidden": (publicRoutes.includes(pathname)) }
            )}>
                <div className='md:hidden p-0 m-0'>
                    <MobileNavbar />
                </div>
                <div className='hidden md:flex'>
                    <DesktopSidebar />
                </div>
            </div>
        </div>
    )
}