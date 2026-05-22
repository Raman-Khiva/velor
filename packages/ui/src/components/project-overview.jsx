import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
export function ProjectOverview({ description, techStack, targetDate, owner }) {
  return (
    <Card className="w-full py-10 max-w-5xl mb-10 max-h-xl bg-[#18181b77]">
      <div className="flex justify-between">
        <CardContent className="max-w-4xl w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <h3>Project Overview</h3>
              <Badge
                variant="secondary"
                className="text-blue-800 border-1 border-blue-700 font-semibold bg-blue-700/20"
              >
                Active
              </Badge>
            </div>
            <p className="font-medium text-gray-400 text-start">
              {description || (
                <>
                  This is a high-level overview of the project, including key
                  milestones, timelines, and overall progress. It provides a
                  snapshot of the project's status and helps stakeholders
                  understand the current state of affairs.
                </>
              )}
            </p>
          </CardHeader>
          <CardFooter className="mt-8 flex items-center gap-8">
            <div className="flex flex-col gap-1">
              <h6 className="text-xs font-bold leading-tighter">TECH STACK</h6>
              <Badge variant="secondary" className="text-[15px] rounded-sm">
                Next.js
              </Badge>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="text-xs font-bold leading-tighter">OWNER</h6>
              <p className="font-medium ">{owner || <span>OLD OWNER</span>}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="text-xs font-bold leading-tighter">TARGET DATE</h6>
              <p className="font-medium">
                {targetDate || <span>Mar 30,2025</span>}
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  );
}
