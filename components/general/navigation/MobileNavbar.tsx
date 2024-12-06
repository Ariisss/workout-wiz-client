"use client"
import Link from 'next/link';
import React from 'react'
import {
    LayoutDashboard,
    ChartNoAxesColumn,
    Dumbbell,
    ScrollText,
    Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type MobileNavbarProps = {}

export default function MobileNavbar({ }: MobileNavbarProps) {
    const pathname = usePathname()
    const navItems = [
        { label: <LayoutDashboard id="icon" />, link: '/dashboard' },
        { label: <ChartNoAxesColumn id="icon" />, link: '/progress' },
        {
            label:
                <div
                    className='bg-background-darkest w-[80px] h-[80px] rounded-full translate-y-[-20%] flex items-center justify-center'
                >
                    <div id="cont" className=' rounded-full w-[70%] h-[70%] border-2 border-primary-light' style={{ boxShadow: '0px 0px 8px #3CFBB5' }}>
                        <p className='flex justify-center items-center h-full -rotate-45 text-white'><Dumbbell /></p>
                    </div>
                </div>, link: '/logs'
        },
        { label: <ScrollText id="icon" />, link: '/plans' },
        { label: <Settings id="icon" />, link: '/settings' },
    ]

    return (
        <div className='w-screen h-[60px] relative translate-y-[2px]'
            style={{ boxShadow: '0px 0px 24px rgba(0,0,0,0.5)' }}>
            <div className='absolute-center w-[80px] h-[80px] rounded-full bg-black translate-y-[-70%] z-[-2]'
                style={{ boxShadow: '0px 0px 8px rgba(0,0,0,0.5)' }}>
            </div>
            <div className='bg-background-darkest rounded-t-[16px] h-full w-full flex flex-row z-5'>
                <div className='w-full flex flex-row justify-between px-[6px]'>
                    {navItems.map((item, idx) => (
                        <Link
                            href={item.link}
                            className={clsx(
                                'flex justify-center items-center w-full',
                                'text-muted-foreground',
                                '[&_#cont]:bg-[#0B291E]',
                                {
                                    'text-primary-light [&_#cont]:bg-[#031900]': pathname == item.link,
                                }
                            )}
                            key={idx + "1"}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}