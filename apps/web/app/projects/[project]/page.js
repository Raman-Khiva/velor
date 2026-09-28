"use client";
import { useGetProjectsQuery } from "@/features/projects/projectsApi";
import staticProjects from "@/db/projects.json";
import Link from "next/link";
import { ProjectOverview } from "@workspace/ui/components/project-overview";
import { PhaseCard } from "@workspace/ui/components/phase-card";
import { useParams } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight, LayoutGrid, LayoutList, ListChecks } from "lucide-react";

export default function Page() {
  const { data, isLoading } = useGetProjectsQuery();
  const params = useParams();
  let { project } = params;

  const projects = data?.projects || staticProjects;
  const projectIdx = isNaN(project) ? 0 : Number(project);
  const curProject = projects[projectIdx] || projects[0];

  if (!curProject && isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-12">
        <h2 className="text-zinc-400 font-medium">Loading Project Overview...</h2>
      </div>
    );
  }

  const phases = curProject?.phases || [];
  const totalProgress = phases.length > 0
    ? Math.round(phases.reduce((acc, phase) => acc + (phase.progress || 0), 0) / phases.length)
    : 0;

  return (
    <div className="w-full px-4 md:px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col items-center gap-8">
        <ProjectOverview
          title={curProject?.name}
          description={curProject?.description}
          techStack={curProject?.techStack}
          startDate={curProject?.startDate}
          targetDate={curProject?.targetDate}
          owner={curProject?.owner}
          status={curProject?.status || "In Progress"}
          type={curProject?.type}
          progress={totalProgress}
          projectIndex={projectIdx}
        />

        <div className="w-full max-w-5xl bg-[#121215] border border-zinc-800 rounded-xl p-6 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ListChecks className="size-5 text-blue-500" />
                Project Phases Summary
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                High-level status of the {phases.length} phase(s) in this project
              </p>
            </div>
            <Link href={`/projects/${projectIdx}/progress`}>
              <Button variant="outline" className="border-zinc-700 text-zinc-200 hover:bg-zinc-800 gap-2">
                Open Detailed Progress Timeline
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {phases.map((phase, index) => (
              <PhaseCard
                key={index}
                projectIndex={projectIdx}
                phase={phase}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
