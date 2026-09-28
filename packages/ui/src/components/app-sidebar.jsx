"use client";

import * as React from "react";
import { FolderOpen, Home } from "lucide-react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@workspace/ui/components/nav-main";
import { NavProjects } from "@workspace/ui/components/nav-projects";
import { NavUser } from "@workspace/ui/components/nav-user";
import { TeamSwitcher } from "@workspace/ui/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar";

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
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "All Projects",
      url: "/projects",
      icon: FolderOpen,
      isActive: true,
      items: [],
    },
    {
      title: "NebulaChat",
      url: "/projects/0",
      icon: Frame,
      items: [],
    },
    {
      title: "AI Project Planner",
      url: "/projects/1",
      icon: Bot,
      items: [],
    },
    {
      title: "Velor E-Commerce Storefront",
      url: "/projects/2",
      icon: PieChart,
      items: [],
    },
  ],
  projects: [
    {
      name: "NebulaChat",
      url: "/projects/0",
      icon: Frame,
    },
    {
      name: "AI Project Planner",
      url: "/projects/1",
      icon: Bot,
    },
    {
      name: "Velor E-Commerce",
      url: "/projects/2",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }) {
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
  );
}
