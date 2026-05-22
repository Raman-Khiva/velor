"use client";
import { useGetProjectsQuery } from "@/features/projects/projectsApi";
import { useParams } from "next/navigation";
import { Calendar1, History } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardTitle } from "@workspace/ui/components/card";
import { Milestone } from "@workspace/ui/components/milestone";
export default function Page() {
  const { data, isLoading } = useGetProjectsQuery();
  const params = useParams();
  let { project, phase } = params;

  if (isLoading || !data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h2>loading Project</h2>
      </div>
    );
  }
  const projects = data.projects || [];
  project = Number(project);
  phase = Number(phase);
  const curProject = projects[project] || [];
  const curPhase = curProject?.phases[phase] || [];
  return (
    <main className="flex flex-col items-center gap-6 py-4 mx-auto px-auto w-full py-10">
      <header className="w-full max-w-5xl className flex flex-col gap-5">
        <div className="flex  justify-between w-full px-1">
          <div className="flex flex-col ">
            <div className="flex gap-2">
              <h2 className="leading-tighter mb-0 pb-0 tracking-tighter">
                Phase {phase + 1}:&nbsp;&nbsp; {curPhase.name}
              </h2>
            </div>
            <div className="text-text-muted items-center flex gap-5">
              <div className="flex gap-2 items-center">
                <Calendar1 size={16} />
                {"    "}
                <h5 className="text-zinc-400 font-medium"> Mar 2 - Mar 3</h5>
              </div>
              <span className="font-bold text-2xl">·</span>
              <div className="flex items-center text-green-300 gap-2">
                <History size={16} />
                <p className="">4 updates this month</p>
              </div>
            </div>
          </div>

          <div>
            <Button variant="secondary">Edit</Button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card className="px-4 bg-card-primary">
            <CardTitle>milestones</CardTitle>
            <h2>24</h2>
          </Card>
          <Card className="px-4 bg-card-primary">
            <CardTitle>milestones</CardTitle>
            <h2>24</h2>
          </Card>
          <Card className="px-4 bg-card-primary">
            <CardTitle>milestones</CardTitle>
            <h2>24</h2>
          </Card>
          <Card className="px-4 bg-card-primary">
            <CardTitle>milestones</CardTitle>
            <h2>24</h2>
          </Card>
        </div>
        <div>
          <hr />
        </div>
      </header>
      <content className="w-full flex flex-col gap-10 max-w-5xl">
        {curPhase?.milestones?.map((milestone, i) => (
          <Milestone milestone={milestone} key={i} />
        ))}
      </content>
    </main>
  );
}
