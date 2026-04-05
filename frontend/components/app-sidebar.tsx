"use client";

import * as React from "react";
import {
    Calendar,
    Command,
    Home,
    Inbox,
    LogOut,
    MessageCircleQuestion,
    Search,
    Settings2,
    Sparkles,
} from "lucide-react";

import {NavMain} from "@/components/nav-main";
import {NavSecondary} from "@/components/nav-secondary";
import {TeamSwitcher} from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
    teams: [
        {
            name: "User",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Search",
            url: "#",
            icon: Search,
        },
        {
            title: "Ask AI",
            url: "#",
            icon: Sparkles,
        },
        {
            title: "Home",
            url: "/dashboard",
            icon: Home,
            isActive: true,
        },
        {
            title: "Complain",
            url: "/complain",
            icon: Inbox,
            badge: "10",
        },
    ],
    navSecondary: [
        {
            title: "Calendar",
            url: "#",
            icon: Calendar,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
        },
        {
            title: "Help",
            url: "#",
            icon: MessageCircleQuestion,
        },
        {
            title: "Logout",
            url: "#",
            icon: LogOut,
        },
    ],
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
                <NavMain items={data.navMain} />
            </SidebarHeader>
            <SidebarContent>
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
