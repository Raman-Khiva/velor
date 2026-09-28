import React from "react"
import { Button } from "@workspace/ui/components/button"
import { ProjectCard } from "@workspace/ui/components/project-card"
import { 
  ArrowRight, 
  Sparkles, 
  GitBranch, 
  Zap, 
  Shield, 
  Smartphone, 
  Cpu, 
  Database,
  CheckCircle2,
  Clock,
  Activity
} from "lucide-react"

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Subtle background glow accents */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl opacity-30 max-w-7xl w-full h-[500px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-blue-500/20 rounded-full" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide backdrop-blur-sm shadow-sm transition-all hover:border-primary/40">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              <span>Velor 2.0 Engine • Automated Project Engine</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
              Automate your project status.{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 bg-clip-text text-transparent">
                Track real-time progress.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-normal">
              Velor seamlessly synchronizes code commits, pull requests, and architecture phases into unified project cards — keeping your team updated from <strong>Pending</strong> to <strong>Going</strong> to <strong>Completed</strong> without manual overhead.
            </p>

            {/* Call to action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button size="lg" className="rounded-full px-7 font-medium shadow-md shadow-primary/20 hover:shadow-lg transition-all group" asChild>
                <a href="/dashboard">
                  Start Building Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-7 font-medium border-border/80 hover:bg-accent" asChild>
                <a href="/projects">
                  Explore Projects
                </a>
              </Button>
            </div>

            {/* Tech badges / feature highlights */}
            <div className="pt-6 border-t border-border/50 grid grid-cols-3 gap-3 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-indigo-500/10 text-indigo-500">
                  <GitBranch className="w-3.5 h-3.5" />
                </div>
                <span>GitHub Webhooks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-blue-500/10 text-blue-500">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span>Real-Time Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-emerald-500/10 text-emerald-500">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span>Zero Overhead</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Vertical Project Cards (Open Router Inspired Pipeline) */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-center">
            
            {/* Visual background card glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-blue-500/5 to-emerald-500/5 rounded-3xl blur-2xl -z-10" />

            {/* Vertical Stack Container */}
            <div className="relative w-full max-w-md space-y-4 py-2">
              
              {/* Connecting Pipeline Line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-amber-400 via-blue-500 to-emerald-500 opacity-40 z-0 hidden sm:block" />

              {/* CARD 1: PENDING */}
              <div className="relative z-10 transition-transform hover:-translate-y-0.5 duration-200">
                <div className="absolute -left-2.5 top-5 w-5 h-5 rounded-full bg-amber-500/20 border-2 border-amber-500 items-center justify-center hidden sm:flex z-20">
                  <Clock className="w-2.5 h-2.5 text-amber-500" />
                </div>
                <ProjectCard
                  title="Mobile App Redesign"
                  type="UI/UX Architecture"
                  description="Upcoming cross-platform app overhaul with dark mode design system and smooth gesture navigation."
                  status="pending"
                  progress={15}
                  date="28 Sep, 26"
                  icon={Smartphone}
                  className="border-amber-500/20 shadow-amber-500/5 bg-background/95 backdrop-blur-sm"
                />
              </div>

              {/* CARD 2: GOING (In Progress) */}
              <div className="relative z-10 transition-transform hover:-translate-y-0.5 duration-200 sm:ml-4">
                <div className="absolute -left-6 top-5 w-5 h-5 rounded-full bg-blue-500/20 border-2 border-blue-500 items-center justify-center hidden sm:flex z-20">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                </div>
                <ProjectCard
                  title="Velor AI & Webhook Engine"
                  type="Backend Core"
                  description="Automated commit parser & GitHub webhook integration updating milestone metrics dynamically."
                  status="going"
                  progress={68}
                  date="26 Sep, 26"
                  icon={Cpu}
                  className="border-blue-500/30 shadow-blue-500/10 bg-background/95 backdrop-blur-sm ring-1 ring-blue-500/20"
                />
              </div>

              {/* CARD 3: COMPLETED */}
              <div className="relative z-10 transition-transform hover:-translate-y-0.5 duration-200">
                <div className="absolute -left-2.5 top-5 w-5 h-5 rounded-full bg-emerald-500/20 border-2 border-emerald-500 items-center justify-center hidden sm:flex z-20">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                </div>
                <ProjectCard
                  title="Database Schema & OAuth"
                  type="Infra & Auth"
                  description="Multi-tenant Prisma model, Clerk authentication integration, and security layer deployment."
                  status="completed"
                  progress={100}
                  date="24 Sep, 26"
                  icon={Database}
                  className="border-emerald-500/20 shadow-emerald-500/5 bg-background/95 backdrop-blur-sm"
                />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

