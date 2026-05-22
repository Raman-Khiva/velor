"use client";
import { useGetProjectsQuery } from "@/features/projects/projectsApi";
import Link from "next/link";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { ProjectOverview } from "@workspace/ui/components/project-overview";
import { LayoutGrid, LayoutList } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@workspace/ui/components/field";
import { PhaseCard } from "@workspace/ui/components/phase-card";
import { useParams } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { AppSidebar } from "@workspace/ui/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";

import { useState } from "react";

export default function Page() {
  const { data, isLoading } = useGetProjectsQuery();
  const params = useParams();
  let { project } = params;
  if (isLoading || !data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h2>loading Project</h2>
      </div>
    );
  }
  const projects = data.projects || [];
  const curProject = projects[project];
  const phases = curProject?.phases || [];
  return (
    <div>
      <div className="flex flex-col items-center gap-6 py-4">
        <ProjectOverview
          owner={curProject?.owner}
          targetDate={curProject?.targetDate}
          description={curProject?.description}
        />
        <div className="flex justify-between w-full max-w-5xl px-1">
          <h4>Project phases</h4>
          <div className="flex gap-3">
            <LayoutList className="text-blue-600 font-semibold cursor-pointer" />
            <LayoutGrid className="cursor-pointer" />
          </div>
        </div>
        {phases.map((phase, index) => (
          <PhaseCard
            key={index}
            projectIndex={project}
            phase={phase}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
