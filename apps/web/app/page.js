'use client'

import Image from "next/image"
import Link from "next/link"
import { 
  ArrowRight, 
  BarChart2, 
  CheckCircle2, 
  GitBranch, 
  GitPullRequest, 
  Layers, 
  LayoutDashboard, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Zap,
  Clock,
  Cpu,
  Database
} from "lucide-react"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Hero } from "@workspace/ui/components/hero"

export default function Home() {
  const { isSignedUp, isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground font-sans">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="text-sm font-medium text-muted-foreground">Loading Velor...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <span className="text-white font-extrabold text-lg">V</span>
            </div>
            <span className="text-xl font-black tracking-wider">Velor</span>
            <Badge variant="outline" className="text-[10px] uppercase tracking-widest hidden sm:inline-flex">
              Engine 2.0
            </Badge>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#hero" className="transition-colors hover:text-foreground">Overview</Link>
            <Link href="#features" className="transition-colors hover:text-foreground">Features</Link>
            <Link href="#workflow" className="transition-colors hover:text-foreground">Workflow</Link>
            <Link href="#metrics" className="transition-colors hover:text-foreground">Metrics</Link>
            <Link href="/projects" className="transition-colors hover:text-foreground">Projects</Link>
          </nav>

          {/* Auth Controls */}
          <div className="flex items-center gap-4">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="hidden sm:inline-flex rounded-full px-5 text-sm font-medium">
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="rounded-full px-5 text-sm font-medium shadow-sm">
                    Get started
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-full text-xs" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Section 1: Hero (OpenRouter Left Text, Right 3 Vertical Status Cards) */}
        <div id="hero">
          <Hero />
        </div>

        {/* Section 2: Features Grid */}
        <section id="features" className="py-20 bg-muted/30 border-y border-border/40">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <Badge variant="outline" className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-500 border-indigo-500/20 bg-indigo-500/5">
                Core Capabilities
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Built for Autonomous Engineering Teams
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Eliminate manual project updates. Velor automatically parses git activity into structured progress milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl border border-border/60 bg-background/80 shadow-sm transition-all hover:shadow-md hover:border-primary/30 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                    <GitBranch className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Automated Git Sync</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Connect your GitHub repositories. Commits and pull requests trigger automated milestone status transitions seamlessly.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40 text-xs font-semibold text-indigo-500 flex items-center gap-1">
                  <span>Zero Manual Entry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl border border-border/60 bg-background/80 shadow-sm transition-all hover:shadow-md hover:border-primary/30 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-5">
                    <BarChart2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Real-Time Timelines</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Track project progress percentages dynamically. Know exactly what is Pending, Going, and Completed in real time.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40 text-xs font-semibold text-blue-500 flex items-center gap-1">
                  <span>Live Calculation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl border border-border/60 bg-background/80 shadow-sm transition-all hover:shadow-md hover:border-primary/30 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-5">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI Task Insights</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Generative summaries analyze code context to produce clear technical updates for stakeholders automatically.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40 text-xs font-semibold text-purple-500 flex items-center gap-1">
                  <span>Smart Summaries</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl border border-border/60 bg-background/80 shadow-sm transition-all hover:shadow-md hover:border-primary/30 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-5">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Multi-Tenant Engine</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Enterprise-ready architecture powered by Prisma DB, isolated team permissions, and encrypted webhook delivery.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40 text-xs font-semibold text-emerald-500 flex items-center gap-1">
                  <span>Secure & Scalable</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Workflow Pipeline (Status Transition) */}
        <section id="workflow" className="py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <Badge variant="outline" className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-500 border-blue-500/20 bg-blue-500/5">
                Status Pipeline
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                How Projects Move from Pending to Completed
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Three automated stages that keep your roadmap synchronized with production code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Process Step 1 */}
              <div className="relative p-8 rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    STAGE 01
                  </span>
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Pending / Backlog</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Project scope and phase milestones are established. Tasks wait in backlog status until initial commits or sprint triggers occur.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Initial Scope Defined</span>
                </div>
              </div>

              {/* Process Step 2 */}
              <div className="relative p-8 rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-transparent space-y-4 shadow-lg shadow-blue-500/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    STAGE 02
                  </span>
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">Going / Active Sync</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Engineers push code. GitHub webhooks stream PR activity into Velor, automatically recalculating active phase progress in real time.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <GitPullRequest className="w-3.5 h-3.5" />
                  <span>Webhook Event Streaming</span>
                </div>
              </div>

              {/* Process Step 3 */}
              <div className="relative p-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 to-transparent space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    STAGE 03
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Completed / Live</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All phase milestones hit 100% completion. Verification webhooks deploy updates and archive completed project history cleanly.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Phase Verified & Sealed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Metrics & Platform Stats */}
        <section id="metrics" className="py-20 bg-muted/30 border-t border-border/40">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-6 rounded-2xl border border-border/60 bg-background/50">
                <p className="text-4xl font-extrabold text-foreground tracking-tight mb-2">99.9%</p>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sync Accuracy</p>
              </div>
              <div className="p-6 rounded-2xl border border-border/60 bg-background/50">
                <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight mb-2">0 hrs</p>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Manual Progress Reports</p>
              </div>
              <div className="p-6 rounded-2xl border border-border/60 bg-background/50">
                <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight mb-2">100+</p>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projects Tracked</p>
              </div>
              <div className="p-6 rounded-2xl border border-border/60 bg-background/50">
                <p className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight mb-2">&lt; 50ms</p>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Webhook Latency</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: CTA Banner */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-r from-indigo-900/20 via-background to-blue-900/20 p-10 md:p-16 text-center space-y-6 shadow-2xl backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/5 mask-gradient -z-10" />
              
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                Ready to Automate Your Project Status?
              </h2>
              
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                Join modern development teams using Velor to connect repository commits directly to clear visual project status cards.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button size="lg" className="rounded-full px-8 font-semibold shadow-lg shadow-indigo-500/25" asChild>
                  <Link href="/dashboard">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 font-semibold" asChild>
                  <Link href="/projects">
                    View Live Projects
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/95 py-12 text-sm text-muted-foreground">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
              V
            </div>
            <span className="font-extrabold text-foreground tracking-wider">Velor Platform</span>
            <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Velor Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium">
            <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#workflow" className="hover:text-foreground transition-colors">Status Engine</Link>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}