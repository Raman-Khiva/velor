import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Calendar,
  ChevronRight,
  FolderOpen,
  LucideIcon,
  Clock,
  Activity,
  CheckCircle2,
  CircleDashed,
} from "lucide-react"
import { Progress } from "@workspace/ui/components/progress"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

export type ProjectStatus = "pending" | "going" | "in_progress" | "completed" | string

interface ProjectCardProps {
  title: string
  description?: string
  date?: string
  type?: string
  badge?: string
  status?: ProjectStatus
  progress?: number
  icon?: LucideIcon
  className?: string
}

const getStatusBadge = (status?: ProjectStatus) => {
  if (!status) return null

  const s = status.toLowerCase()
  if (s === "pending") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
        <Clock className="w-3 h-3" />
        Pending
      </span>
    )
  }
  if (s === "going" || s === "in_progress" || s === "in progress") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        Going
      </span>
    )
  }
  if (s === "completed" || s === "complete" || s === "done") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
        Completed
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
      <CircleDashed className="w-3 h-3" />
      {status}
    </span>
  )
}

export const ProjectCard = ({
  title,
  description,
  date,
  type,
  badge,
  status,
  progress = 80,
  icon: Icon = FolderOpen,
  className,
}: ProjectCardProps) => {
  return (
    <Card className={cn("h-full justify-between gap-1 bg-background border-border/80 border shadow-sm transition-all hover:shadow-md", className)}>
      <CardHeader className="bg-background pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-md border border-border bg-card p-2 text-foreground/80">
              <Icon
                className="font-bold text-foreground"
                strokeWidth={1.6}
                size={24}
              />
            </div>
            <div>
              <Badge className="text-[10px] tracking-wide uppercase px-2 py-0.5" variant="outline">
                {type || badge || "Webdev"}
              </Badge>
              <CardTitle className="text-base font-semibold leading-snug mt-1">{title}</CardTitle>
            </div>
          </div>
          {status && <div>{getStatusBadge(status)}</div>}
        </div>
      </CardHeader>

      {description && (
        <CardContent className="flex flex-col justify-between py-2">
          <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </CardDescription>
          <div className="py-2.5 space-y-1">
            <div className="flex justify-between items-center text-[11px] text-muted-foreground font-medium">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </CardContent>
      )}

      {date && (
        <CardFooter className="flex items-center justify-between bg-background px-4 py-2 text-xs text-muted-foreground border-t border-border/40">
          <div className="flex items-center gap-1.5">
            <Calendar
              size={14}
              className="text-muted-foreground"
              strokeWidth={2}
            />
            <p className="text-[12px] font-medium text-muted-foreground">
              {date}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 cursor-pointer text-xs font-medium text-foreground hover:text-primary transition-colors">
            Details
            <ChevronRight size={14} />
          </span>
        </CardFooter>
      )}
    </Card>
  )
}

