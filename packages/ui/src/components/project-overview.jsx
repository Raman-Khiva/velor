import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight, Calendar, User, Layers, Cpu } from "lucide-react";

export function ProjectOverview({
  title,
  description,
  techStack = [],
  targetDate,
  startDate,
  owner,
  status = "In Progress",
  type,
  progress = 0,
  projectIndex = 0,
}) {
  const formattedTechStack = Array.isArray(techStack)
    ? techStack
    : typeof techStack === "string"
    ? techStack.split(",").map((s) => s.trim())
    : ["Next.js", "Node.js", "PostgreSQL"];

  return (
    <Card className="w-full max-w-5xl bg-[#121215] border-zinc-800 shadow-xl overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800/80 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold tracking-tight text-white">{title || "Project Overview"}</h2>
              <Badge
                variant="secondary"
                className="text-xs px-2.5 py-0.5 border border-blue-500/30 text-blue-400 bg-blue-500/10 font-semibold rounded-full"
              >
                {status}
              </Badge>
              {type && (
                <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                  {type}
                </Badge>
              )}
            </div>
            <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed mt-2">
              {description ||
                "This is a high-level overview of the project, including key milestones, timelines, and overall progress."}
            </p>
          </div>

          <Link href={`/projects/${projectIndex}/progress`}>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2 font-medium shrink-0">
              View Project Progress
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        {/* Progress bar section */}
        <div className="mb-8 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="size-3.5 text-blue-400" />
              Overall Project Progress
            </span>
            <span className="text-sm font-bold text-blue-400">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2.5 bg-zinc-800" />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="size-3.5 text-zinc-400" />
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {formattedTechStack.map((tech, idx) => (
                <Badge key={idx} variant="secondary" className="bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 border-zinc-700/50 text-xs font-normal">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <User className="size-3.5 text-zinc-400" />
              Project Owner / Team
            </span>
            <p className="text-sm font-medium text-zinc-200 mt-1">{owner || "Development Team"}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="size-3.5 text-zinc-400" />
              Timeline
            </span>
            <p className="text-sm font-medium text-zinc-200 mt-1">
              {startDate ? `${startDate} - ${targetDate || "Ongoing"}` : targetDate || "In Schedule"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
