import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    LayoutDashboard,
    ChartNoAxesColumn,
    Dumbbell,
    ScrollText,
    Settings,
    LogOut,
    Toilet //CHANGE THIS TO ACTUAL ICON LATER PLS
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Props = {}

export default function DesktopSidebar({ }: Props) {
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <LayoutDashboard id="icon" className="text-muted-foreground h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Plans",
            href: "/plans",
            icon: (
                <Dumbbell id="icon" className="text-muted-foreground h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Logs",
            href: "/logs",
            icon: (
                <ScrollText id="icon" className="text-muted-foreground h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Progress",
            href: "/progress",
            icon: (
                <ChartNoAxesColumn id="icon" className="text-muted-foreground h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Settings",
            href: "/settings",
            icon: (
                <Settings id="icon" className="text-muted-foreground h-5 w-5 flex-shrink-0" />
            ),
        }
    ];
    const [open, setOpen] = useState(false);
    const pathname = usePathname()

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-background-darkest w-full flex-1 max-w-7xl mx-auto overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-12">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-10 flex flex-col gap-[16px]">
                            {links.map((link, idx) => {
                                const iconClass = cn(
                                    '[&_#label]:text-primary-light [&_#icon]:text-primary-light',
                                    '[&_#icon]:fill-primary-light')
                                return (
                                    <SidebarLink
                                        key={idx}
                                        link={link}
                                        className={clsx(
                                            (pathname === link.href) && iconClass
                                        )}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Logout",
                                href: "#",
                                icon: <LogoutIcon />
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    );
}

const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Workout Wizard
            </motion.span>
        </Link>
    )
}

const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    )
}

const LogoutIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <LogOut id="logo" className="text-neutral-200 h-5 w-5" />
        </Link>
    )
}