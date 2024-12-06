"use client"
import MobileNavbar from './MobileNavbar'
import DesktopSidebar from './DesktopSidebar'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { publicRoutes } from '@/components/context/AuthProvider'
import { motion } from 'motion/react'

type Props = {
    children: React.ReactNode
}

export default function NavLayout({ children }: Props) {
    const pathname = usePathname()
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false); // Hide navbar when scrolling down
            } else {
                setIsVisible(true); // Show navbar when scrolling up
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);


    return (
        <div className='flex flex-col md:flex-row h-full font-sans gap-8 relative'>
            <div className='flex-1 h-fit order-1 md:order-2 pb-4 lg:pb-0' >
                {children}
            </div>
            {!(publicRoutes.includes(pathname)) &&
                <div className={clsx(
                    "flex flex-col md:flex-row z-50",
                    "md:w-fit w-full",
                    "order-2 md:order-1",
                )}>
                    <motion.div
                        className={clsx('md:hidden p-0 m-0 fixed bottom-0 left-0 right-0')}
                        initial={{ y: 0 }}
                        animate={{ y: isVisible ? 0 : 100 }}
                        transition={{ type: "tween", duration: 0.2 }}
                    >
                        <MobileNavbar />
                    </motion.div>
                    <div className='hidden md:flex h-full fixed drop-shadow-2xl'>
                        <DesktopSidebar />
                    </div>
                </div>
            }
        </div>
    )
}