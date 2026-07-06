"use client"
import { useEffect } from "react"
import { useGetProjectsQuery } from "@/features/projects/projectsApi"
import { useRouter } from "next/navigation"
import testProject from "@/db/testProject"
import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

//import { AddProjectModal } from "@workspace/ui/components/add-project-model"
import { AppSidebar } from "@workspace/ui/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { Separator } from "@workspace/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

export default function Page() {
  const router = useRouter()
  const [openModal, osetOpenModal] = useState(false)
  const { data, isLoading } = useGetProjectsQuery()
  useEffect(() => {
    if (data) {
      console.warn("this is query data")
      console.log("data", data)
    }
  }, [data, isLoading])
  if (isLoading || !data) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h2>loading Projects</h2>
      </div>
    )
  }

  const projects = data.projects || []
  console.warn("data from query", data)
  console.warn("projects from query", projects)
  return (
    <div className="grid grid-cols-3 gap-5 pt-0 pr-16 pb-20 pl-10 lg:grid-cols-4">
      <div className="col-span-3 flex items-center justify-between pt-8 pb-4 lg:col-span-4">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
        </div>
        <div className="flex items-center gap-5">
          <Button className="rounded-sm" onClick={() => router.push("/generator")}>
            New Project
          </Button>
        </div>
      </div>
      {projects.map((project, i) => (
        <Card
          size="sm"
          className="mx-auto flex w-full max-w-sm flex-col justify-between"
          key={i}
        >
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.type}</CardDescription>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {project.startDate} - {project.targetDate}
            </p>
            <p>{project.owner}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <Link href={`/projects/${i}`}>Open</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
