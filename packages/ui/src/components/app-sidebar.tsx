"use client"

import * as React from "react"

import { NavMain } from "@workspace/ui/components/nav-main"
import { NavProjects } from "@workspace/ui/components/nav-projects"
import { NavUser } from "@workspace/ui/components/nav-user"
import { TeamSwitcher } from "@workspace/ui/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon } from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "All Projects",
      url: "/projects",
      icon: (
        <GalleryVerticalEndIcon />
      ),
      isActive: true,
      items: [],
    },
    {
      title: "NebulaChat",
      url: "/projects/0",
      icon: (
        <FrameIcon />
      ),
      items: [],
    },
    {
      title: "AI Project Planner",
      url: "/projects/1",
      icon: (
        <BotIcon />
      ),
      items: [],
    },
    {
      title: "Velor E-Commerce Storefront",
      url: "/projects/2",
      icon: (
        <PieChartIcon />
      ),
      items: [],
    },
  ],
  projects: [
    {
      name: "NebulaChat",
      url: "/projects/0",
      icon: (
        <FrameIcon />
      ),
    },
    {
      name: "AI Project Planner",
      url: "/projects/1",
      icon: (
        <BotIcon />
      ),
    },
    {
      name: "Velor E-Commerce",
      url: "/projects/2",
      icon: (
        <PieChartIcon />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
