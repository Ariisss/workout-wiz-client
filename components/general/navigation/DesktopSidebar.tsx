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
import { useAuth } from "@/components/context/AuthProvider";
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
    const { logout } = useAuth()
    const pathname = usePathname()

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-background-darkest w-full flex-1 max-w-7xl mx-auto overflow-hidden",
                "h-screen",
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className={clsx("justify-between gap-12 border-r-transparent border-r-2", {
                    "border-background": !open,
                    "border-primary": open
                })}
                >
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <SidebarLink
                            link={{
                                label: "Workout Wizard",
                                href: "#",
                                icon: <div className="bg-white rounded-full h-7 w-7 flex-shrink-0" />
                            }}
                        />
                        <div className="mt-10 flex flex-col gap-[16px] px-1">
                            {links.map((link, idx) => {
                                const iconClass = cn(
                                    '[&_#label]:text-primary-light [&_#icon]:text-primary-light')
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
                    <div className="px-1 overflow-y-auto overflow-x-hidden">
                        <SidebarLink
                            link={{
                                label: "Logout",
                                href: "#",
                                icon: <LogOut className="text-white h-5 w-5 flex-shrink-0" />
                            }}
                            onClick={logout}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    );
}