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
        <div className='flex flex-col md:flex-row h-full font-sans gap-8'>
            <div className='flex-1 h-full order-1 md:order-2'>
                {children}
            </div>
            <div className={clsx(
                "flex flex-col md:flex-row",
                "md:w-fit w-full",
                "order-2 md:order-1",
                { "hidden": (publicRoutes.includes(pathname)) }
            )}>
                <div className='md:hidden p-0 m-0 fixed bottom-0 left-0 right-0'>
                    <MobileNavbar />
                </div>
                <div className='hidden md:flex h-full'>
                    <DesktopSidebar />
                </div>
            </div>
        </div>
    )
}