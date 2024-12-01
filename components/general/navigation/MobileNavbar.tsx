import Link from 'next/link';
import React from 'react'

type MobileNavbarProps = {}

export default function MobileNavbar({ }: MobileNavbarProps) {
    const navItems = [
        { label: 'Home', link: '/dashboard' },
        { label: 'Progress', link: '/progress' },
        { label: <>Bruh</>, link: '/logs' }, // GO SUBTRACT COMPOSIT ON THE MIDDLE
        { label: 'Plans', link: '/plans' },
        { label: 'Settings', link: '/settings' },
    ]

    return (
        <div className='w-screen h-[74px] flex items-end'>
            <div className='bg-background rounded-t-[16px] h-[64px] w-full flex flex-row'>
                <div className='w-full flex flex-row justify-between px-[24px]'>
                    {navItems.map((item, idx) => (
                        <Link
                            href={item.link}
                            className='flex justify-center items-center'
                            key={idx + "1"}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}