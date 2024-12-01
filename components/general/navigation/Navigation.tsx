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
        <div className='flex flex-col lg:flex-row h-full'>
            <div className='h-full'>
                {children}
            </div>
            <div className={clsx(
                "w-fit bg-black flex justify-end",
                { "hidden": (publicRoutes.includes(pathname)) }
            )}>
                <div className='lg:hidden'>
                    <MobileNavbar />
                </div>
                <div className='hidden lg:flex'>
                    <DesktopSidebar />
                </div>
            </div>
        </div>
    )
}