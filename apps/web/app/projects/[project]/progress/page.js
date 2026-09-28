"use client";

import { useGetProjectsQuery } from "@/features/projects/projectsApi";
import staticProjects from "@/db/projects.json";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ProjectPhases } from "@workspace/ui/components/project-phases";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft, CheckCircle2, CircleDashed, Layers, ListTodo } from "lucide-react";
import { Progress } from "@workspace/ui/components/progress";

export default function ProgressPage() {
  const { data, isLoading } = useGetProjectsQuery();
  const params = useParams();
  let { project } = params;

  const projects = data?.projects || staticProjects;
  const projectIdx = isNaN(project) ? 0 : Number(project);
  const curProject = projects[projectIdx] || projects[0];

  if (!curProject && isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-12">
        <h2 className="text-zinc-400 font-medium">Loading Progress Timeline...</h2>
      </div>
    );
  }

  const phases = curProject?.phases || [];

  // Calculate total tasks and completed tasks
  let totalTasks = 0;
  let completedTasks = 0;

  phases.forEach((phase) => {
    if (phase.milestones) {
      phase.milestones.forEach((ms) => {
        if (ms.tasks) {
          ms.tasks.forEach((t) => {
            totalTasks++;
            if (t.done) completedTasks++;
          });
        }
      });
    }
  });

  const overallProgress = phases.length > 0
    ? Math.round(phases.reduce((acc, p) => acc + (p.progress || 0), 0) / phases.length)
    : 0;

  return (
    <div className="w-full px-4 md:px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href={`/projects/${projectIdx}`}>
              <Button variant="outline" size="icon" className="h-9 w-9 border-zinc-800 text-zinc-300 hover:bg-zinc-800">
                <ArrowLeft className="size-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {curProject?.name} &bull; Progress & Timeline
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                Detailed view of project phases, milestones, and task completion
              </p>
            </div>
          </div>
          <Link href={`/projects/${projectIdx}`}>
            <Button variant="secondary" className="text-xs bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
              Back to Overview
            </Button>
          </Link>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#121215] border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
              <Layers className="size-6" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 uppercase font-semibold tracking-wider">Overall Progress</span>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{overallProgress}%</h3>
            </div>
          </div>

          <div className="bg-[#121215] border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
              <ListTodo className="size-6" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 uppercase font-semibold tracking-wider">Phases</span>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{phases.length}</h3>
            </div>
          </div>

          <div className="bg-[#121215] border border-zinc-800 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 uppercase font-semibold tracking-wider">Completed Tasks</span>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{completedTasks} / {totalTasks || '—'}</h3>
            </div>
          </div>
        </div>

        {/* Overall Progress bar */}
        <div className="bg-[#121215] border border-zinc-800 rounded-xl p-5 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400 font-medium">Progress Bar</span>
            <span className="text-blue-400 font-bold">{overallProgress}% Completed</span>
          </div>
          <Progress value={overallProgress} className="h-3 bg-zinc-800" />
        </div>

        {/* Phases list */}
        <div className="flex flex-col gap-5 mt-2">
          <h3 className="text-lg font-bold text-white tracking-tight">Project Phases</h3>
          <ProjectPhases phases={phases} />
        </div>
      </div>
    </div>
  );
}
