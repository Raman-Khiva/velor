"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { ProjectCard } from "@workspace/ui/components/project-card"
import projectsData from "@/db/projects.json"

function formatDate(dateStr) {
  if (!dateStr) return ""
  const cleanStr = dateStr.split("T")[0]
  const parts = cleanStr.split("-")
  if (parts.length === 3) {
    const year = parts[0].slice(-2)
    const monthIdx = parseInt(parts[1], 10) - 1
    const day = parts[2].padStart(2, "0")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${day} ${monthNames[monthIdx]}, ${year}`
    }
  }
  return dateStr
}

function getProjectDateRange(project) {
  const start = formatDate(project.startDate)
  const target = formatDate(project.targetDate)
  if (start && target) {
    return `${start} - ${target}`
  }
  return target || start
}

function calculateProjectProgress(project) {
  if (!project.phases || project.phases.length === 0) return 0;
  const totalProgress = project.phases.reduce((acc, phase) => acc + (phase.progress || 0), 0);
  return Math.round(totalProgress / project.phases.length);
}

export default function Page() {
  const router = useRouter()
  const projects = projectsData || []

  return (
    <div className="grid grid-cols-1 gap-5 pt-0 pr-16 pb-20 pl-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div className="col-span-full flex items-center justify-between pt-8 pb-4">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of active software development projects and phases
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Button className="rounded-sm" onClick={() => router.push("/generator")}>
            New Project
          </Button>
        </div>
      </div>
      {projects.map((project, i) => (
        <Link key={project.id || i} href={`/projects/${i}`} className="block transition-transform hover:scale-[1.02]">
          <ProjectCard
            title={project.name}
            description={project.description}
            date={getProjectDateRange(project)}
            type={project.type}
            progress={calculateProjectProgress(project)}
          />
        </Link>
      ))}
    </div>
  )
}
