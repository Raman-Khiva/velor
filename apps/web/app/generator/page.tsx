'use client'
import * as React from "react"
import {
    Sparkles,
    Code2,
    Layers,
    Cpu,
    Zap,
    Globe,
    ArrowRight,
    CheckCircle2,
    Circle,
    ChevronRight,
    Terminal,
    GitBranch,
    Package,
    Database,
    Clock,
    BarChart3,
    Users,
    Star,
} from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Progress } from "@workspace/ui/components/progress"
import { Separator } from "@workspace/ui/components/separator"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@workspace/ui/components/resizable"
// ── types ─────────────────────────────────────────────────────────────
interface Task {
    title: string
    type: string
    purpose: string
    commands: string[]
    done: boolean
}

interface Milestone {
    title: string
    description: string
    progress: number
    status: "pending" | "active" | "done"
    tasks: Task[]
}

interface Phase {
    name: string
    description: string
    status: "pending" | "active" | "done"
    progress: number
    milestones: Milestone[]
}

interface GeneratedProject {
    name: string
    description: string
    type: string
    status: string
    startDate: string
    targetDate: string
    owner: string
    techStack: string[]
    phases: Phase[]
}

// ── mock data ─────────────────────────────────────────────────────────
const MOCK_PROJECT: GeneratedProject = {
    name: "Python Learning Hub",
    description: "An online platform for learning and practicing Python programming",
    type: "SaaS Application",
    status: "planning",
    startDate: "3/1/2024",
    targetDate: "9/30/2024",
    owner: "John Doe",
    techStack: ["Python", "Django", "JavaScript", "React"],
    phases: [
        {
            name: "Phase 1: Project Setup",
            description: "Setting up the project structure and environment",
            status: "active",
            progress: 0,
            milestones: [
                {
                    title: "Environment Setup",
                    description: "Setting up the development environment",
                    progress: 0,
                    status: "active",
                    tasks: [
                        {
                            title: "Install Python and required packages",
                            type: "setup",
                            purpose: "To start developing the application",
                            commands: ["pip install django", "pip install react"],
                            done: false,
                        },
                        {
                            title: "Set up the database",
                            type: "configuration",
                            purpose: "To store user data and application settings",
                            commands: ["python manage.py migrate"],
                            done: false,
                        },
                    ],
                },
                {
                    title: "Project Structure",
                    description: "Defining the project structure and organization",
                    progress: 0,
                    status: "pending",
                    tasks: [
                        {
                            title: "Create a new Django app",
                            type: "setup",
                            purpose: "To organize the application code",
                            commands: ["python manage.py startapp learning_hub"],
                            done: false,
                        },
                    ],
                },
            ],
        },
        {
            name: "Phase 2: Core Development",
            description: "Building the core features of the application",
            status: "pending",
            progress: 0,
            milestones: [
                {
                    title: "User Authentication",
                    description: "Implementing user authentication and authorization",
                    progress: 0,
                    status: "pending",
                    tasks: [
                        {
                            title: "Implement user registration",
                            type: "implementation",
                            purpose: "To allow users to create accounts",
                            commands: [],
                            done: false,
                        },
                        {
                            title: "Implement user login",
                            type: "implementation",
                            purpose: "To allow users to access their accounts",
                            commands: [],
                            done: false,
                        },
                    ],
                },
            ],
        },
    ],
}

const QUICK_PROMPTS = [
    "What are the latest trends in AI?",
    "How does machine learning work?",
    "Explain quantum computing",
    "Best practices for React development",
    "Tell me about TypeScript benefits",
    "How to optimize database queries",
]

const FEATURE_HIGHLIGHTS = [
    {
        icon: Cpu,
        title: "AI-Powered Planning",
        description: "Intelligent project structure generation from a single prompt",
    },
    {
        icon: Layers,
        title: "Full Stack Support",
        description: "Supports any tech stack — frontend, backend, mobile, or cloud",
    },
    {
        icon: GitBranch,
        title: "Phase Breakdown",
        description: "Automatically splits work into milestones and actionable tasks",
    },
    {
        icon: Zap,
        title: "Instant Scaffolding",
        description: "Ready-to-run commands for every setup step",
    },
]

const STATS = [
    { icon: Users, value: "12k+", label: "Projects generated" },
    { icon: Star, value: "4.9", label: "Average rating" },
    { icon: Clock, value: "<3s", label: "Generation time" },
    { icon: BarChart3, value: "98%", label: "Task accuracy" },
]

// ── sub-components ────────────────────────────────────────────────────

function TechBadge({ label }: { label: string }) {
    return (
        <Badge variant="secondary" className="text-xs font-medium">
            {label}
        </Badge>
    )
}

function TaskRow({ task }: { task: Task }) {
    return (
        <div className="flex items-start gap-3 py-3">
            <div className="mt-0.5 shrink-0">
                {task.done ? (
                    <CheckCircle2 className="size-4 text-primary" />
                ) : (
                    <Circle className="size-4 text-muted-foreground" />
                )}
            </div>
            <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium leading-snug">{task.title}</span>
                    <Badge variant="outline" className="text-xs uppercase tracking-wide">
                        {task.type}
                    </Badge>
                </div>
                {task.purpose && (
                    <p className="text-xs text-muted-foreground">{task.purpose}</p>
                )}
                {task.commands.length > 0 && (
                    <div className="mt-2 rounded-md bg-muted/60 px-3 py-2 font-mono text-xs text-foreground">
                        {task.commands.map((cmd, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-muted-foreground select-none">$</span>
                                <span>{cmd}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
    return (
        <Card className="gap-0 overflow-hidden py-0">
            <CardHeader className="border-b bg-muted/30 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-sm font-medium">{milestone.title}</CardTitle>
                    <Badge
                        variant="outline"
                        className={cn(
                            "text-xs",
                            milestone.status === "active" && "border-primary/40 bg-primary/5 text-primary",
                            milestone.status === "done" && "border-green-500/40 bg-green-500/5 text-green-600 dark:text-green-400"
                        )}
                    >
                        {milestone.status === "active" ? `${milestone.progress}%` : milestone.status}
                    </Badge>
                </div>
                {milestone.description && (
                    <CardDescription className="text-xs">{milestone.description}</CardDescription>
                )}
            </CardHeader>
            <CardContent className="px-4 py-0">
                <p className="mb-1 mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Tasks
                </p>
                <div className="divide-y">
                    {milestone.tasks.map((task, i) => (
                        <TaskRow key={i} task={task} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function PhaseSection({ phase }: { phase: Phase }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{phase.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Badge
                        variant={phase.status === "active" ? "default" : "outline"}
                        className="text-xs"
                    >
                        {phase.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{phase.progress}%</span>
                </div>
            </div>
            {phase.description && (
                <p className="text-xs text-muted-foreground">{phase.description}</p>
            )}
            <Progress value={phase.progress} className="h-1.5" />
            <div className="space-y-3 pt-1">
                {phase.milestones.map((m, i) => (
                    <MilestoneCard key={i} milestone={m} />
                ))}
            </div>
        </div>
    )
}

function ProjectPanel({ project }: { project: GeneratedProject }) {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-background shadow-sm">
            {/* Header */}
            <div className="border-b px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold tracking-tight">{project.name}</h2>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 capitalize">
                        {project.status}
                    </Badge>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Details */}
                <div className="border-b px-5 py-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Details
                    </p>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <dt className="text-muted-foreground">Type</dt>
                        <dd className="font-medium">{project.type}</dd>
                        <dt className="text-muted-foreground">Status</dt>
                        <dd className="font-medium capitalize">{project.status}</dd>
                        <dt className="text-muted-foreground">Start Date</dt>
                        <dd className="font-medium">{project.startDate}</dd>
                        <dt className="text-muted-foreground">Target Date</dt>
                        <dd className="font-medium">{project.targetDate}</dd>
                        <dt className="text-muted-foreground">Owner</dt>
                        <dd className="font-medium">{project.owner}</dd>
                    </dl>
                </div>

                {/* Tech Stack */}
                <div className="border-b px-5 py-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((t) => (
                            <TechBadge key={t} label={t} />
                        ))}
                    </div>
                </div>

                {/* Phases */}
                <div className="px-5 py-4">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Development Phases
                    </p>
                    <div className="space-y-6">
                        {project.phases.map((phase, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <Separator />}
                                <PhaseSection phase={phase} />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ── empty state ────────────────────────────────────────────────────────

function EmptyState() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-8 px-6 py-12">
            {/* Hero icon cluster */}
            <div className="relative flex items-center justify-center">
                <div className="absolute size-32 rounded-full bg-primary/5" />
                <div className="absolute size-20 rounded-full bg-primary/10" />
                <div className="relative flex size-14 items-center justify-center rounded-2xl border bg-background shadow-md">
                    <Sparkles className="size-7 text-primary" />
                </div>
                {/* Floating accent icons */}
                <div className="absolute -top-3 -right-3 flex size-8 items-center justify-center rounded-lg border bg-background shadow-sm">
                    <Code2 className="size-4 text-muted-foreground" />
                </div>
                <div className="absolute -bottom-3 -left-3 flex size-8 items-center justify-center rounded-lg border bg-background shadow-sm">
                    <Globe className="size-4 text-muted-foreground" />
                </div>
            </div>

            {/* Headline */}
            <div className="max-w-xs space-y-2 text-center">
                <h3 className="text-lg font-semibold tracking-tight">
                    Your project lives here
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    Describe what you want to build and AI will generate a complete project plan — phases, milestones, and ready-to-run commands.
                </p>
            </div>

            {/* Feature grid */}
            <div className="grid w-full max-w-sm grid-cols-2 gap-3">
                {FEATURE_HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                    <div
                        key={title}
                        className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3"
                    >
                        <div className="flex size-7 items-center justify-center rounded-md bg-background border shadow-xs">
                            <Icon className="size-3.5 text-foreground" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold leading-snug">{title}</p>
                            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats row */}
            <div className="flex w-full max-w-sm items-center justify-between rounded-xl border bg-muted/20 px-4 py-3">
                {STATS.map(({ icon: Icon, value, label }, i) => (
                    <React.Fragment key={label}>
                        {i > 0 && <div className="h-8 w-px bg-border" />}
                        <div className="flex flex-col items-center gap-0.5">
                            <Icon className="mb-0.5 size-3.5 text-muted-foreground" />
                            <span className="text-sm font-bold tabular-nums">{value}</span>
                            <span className="text-[10px] text-muted-foreground">{label}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* CTA nudge */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ArrowRight className="size-3 shrink-0" />
                <span>Try: <em className="not-italic font-medium text-foreground">"A python learning platform"</em></span>
            </div>
        </div>
    )
}

// ── main page ─────────────────────────────────────────────────────────

export default function ProjectGeneratorPage() {
    const [input, setInput] = React.useState("")
    const [project, setProject] = React.useState<GeneratedProject | null>(null)
    const [generating, setGenerating] = React.useState(false)
    const [streamText, setStreamText] = React.useState("")
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    const simulate = React.useCallback(() => {
        if (!input.trim()) return
        setGenerating(true)
        setStreamText("")

        const full = JSON.stringify(MOCK_PROJECT, null, 2)
        let i = 0
        const id = setInterval(() => {
            i += 12
            setStreamText(full.slice(0, i))
            if (i >= full.length) {
                clearInterval(id)
                setGenerating(false)
                setProject(MOCK_PROJECT)
                setStreamText("")
            }
        }, 16)
    }, [input])

    const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            simulate()
        }
    }

    const reset = () => {
        setProject(null)
        setInput("")
        setStreamText("")
    }

    return (
        <div className="flex h-screen flex-col bg-background text-foreground">
            {/* Top bar */}
            <header className="flex items-center justify-between border-b px-5 py-3">
                <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
                        <Sparkles className="size-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-semibold">ProjectAI</span>
                </div>
                <div className="flex items-center gap-2">
                    {project && (
                        <Button variant="ghost" size="sm" onClick={reset}>
                            New project
                        </Button>
                    )}
                    <Button size="sm">Add Project</Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* @ts-ignore */}
                <ResizablePanelGroup direction="horizontal" className="h-full w-full">
                    {/* ── Left panel: chat / stream ─────────────────────────────── */}
                    <ResizablePanel defaultSize={project ? 50 : 100} minSize={30}>
                        <div className="flex h-full flex-col overflow-hidden">
                    {/* Messages area */}
                    <div className="flex-1 overflow-y-auto">
                        {!project && !generating ? (
                            /* Before state — rich empty */
                            <div className="flex h-full flex-col items-center justify-center px-6 py-8">
                                {/* Hero */}
                                <div className="mb-8 flex flex-col items-center gap-3 text-center">
                                    <div className="relative">
                                        <div className="absolute -inset-4 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-xl" />
                                        <div className="relative flex size-16 items-center justify-center rounded-2xl border bg-background shadow-lg">
                                            <Sparkles className="size-8 text-primary" />
                                        </div>
                                    </div>
                                    <h1 className="mt-2 text-2xl font-bold tracking-tight">
                                        Hi! How can I help you today?
                                    </h1>
                                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                                        Describe any project — a SaaS app, API service, mobile app, or data pipeline — and I'll generate a full structured plan instantly.
                                    </p>
                                </div>

                                {/* Feature cards */}
                                <div className="mb-8 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                                    {FEATURE_HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                                        <div
                                            key={title}
                                            className="flex flex-col gap-2.5 rounded-xl border bg-card p-4 shadow-xs transition-colors hover:bg-accent/40"
                                        >
                                            <div className="flex size-8 items-center justify-center rounded-lg border bg-background shadow-xs">
                                                <Icon className="size-4 text-foreground" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold">{title}</p>
                                                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="mb-8 flex w-full max-w-lg items-center justify-around rounded-2xl border bg-muted/30 px-6 py-4">
                                    {STATS.map(({ icon: Icon, value, label }, i) => (
                                        <React.Fragment key={label}>
                                            {i > 0 && <div className="h-10 w-px bg-border" />}
                                            <div className="flex flex-col items-center gap-1">
                                                <Icon className="size-4 text-muted-foreground" />
                                                <span className="text-lg font-bold tabular-nums">{value}</span>
                                                <span className="text-xs text-muted-foreground">{label}</span>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>

                                {/* Example prompts */}
                                <div className="w-full max-w-2xl">
                                    <p className="mb-2 text-center text-xs font-medium text-muted-foreground">
                                        Try one of these examples
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {["A Python learning platform", "E-commerce store with React", "REST API with Node.js", "Mobile fitness tracker app"].map((p) => (
                                            <button
                                                key={p}
                                                onClick={() => {
                                                    setInput(p)
                                                    textareaRef.current?.focus()
                                                }}
                                                className="flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs text-foreground shadow-xs transition-colors hover:bg-accent"
                                            >
                                                <ChevronRight className="size-3 text-muted-foreground" />
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : generating ? (
                            /* Streaming state */
                            <div className="p-6">
                                <div className="mb-3 flex items-center gap-2">
                                    <div className="flex size-6 items-center justify-center rounded-full bg-primary">
                                        <Sparkles className="size-3 text-primary-foreground" />
                                    </div>
                                    <span className="text-sm font-medium">Generating project plan…</span>
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <span
                                                key={i}
                                                className="inline-block size-1.5 animate-pulse rounded-full bg-muted-foreground"
                                                style={{ animationDelay: `${i * 150}ms` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="overflow-hidden rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                                    <pre className="whitespace-pre-wrap break-all">{streamText}<span className="animate-pulse">▋</span></pre>
                                </div>
                            </div>
                        ) : (
                            /* After — show prompt + success message */
                            <div className="space-y-4 p-6">
                                {/* User message */}
                                <div className="flex justify-end">
                                    <div className="max-w-sm rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                                        {input || "A python learning platform"}
                                    </div>
                                </div>
                                {/* AI response summary */}
                                <div className="flex gap-3">
                                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary">
                                        <Sparkles className="size-3.5 text-primary-foreground" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="rounded-2xl rounded-tl-sm border bg-card px-4 py-3 text-sm shadow-xs">
                                            <p className="mb-2 font-medium">Project plan generated!</p>
                                            <p className="text-muted-foreground">
                                                I've created a complete project plan for <strong>{project?.name}</strong>. It includes{" "}
                                                {project?.phases.length} development phases with{" "}
                                                {project?.phases.reduce((acc, p) => acc + p.milestones.length, 0)} milestones and step-by-step setup commands.
                                            </p>
                                        </div>
                                        {/* Quick stats */}
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { icon: Layers, label: `${project?.phases.length} Phases` },
                                                { icon: Package, label: `${project?.phases.reduce((a, p) => a + p.milestones.length, 0)} Milestones` },
                                                { icon: Terminal, label: "Commands included" },
                                                { icon: Database, label: project?.type ?? "" },
                                            ].map(({ icon: Icon, label }) => (
                                                <Badge key={label} variant="secondary" className="gap-1.5">
                                                    <Icon className="size-3" />
                                                    {label}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick prompts bar */}
                    <div className="border-t px-4 pt-3">
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {QUICK_PROMPTS.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setInput(p)}
                                    className="shrink-0 rounded-full border bg-background px-3 py-1 text-xs text-foreground transition-colors hover:bg-accent"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input area */}
                    <div className="border-t bg-background p-4">
                        <div className="relative rounded-xl border bg-background shadow-xs focus-within:ring-2 focus-within:ring-ring/50">
                            <Textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="Describe your project idea…"
                                className="min-h-[52px] resize-none rounded-xl border-0 bg-transparent py-3.5 pr-14 text-sm shadow-none focus-visible:ring-0"
                                rows={1}
                            />
                            <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
                                <Button
                                    size="icon"
                                    className="size-8 rounded-lg"
                                    onClick={simulate}
                                    disabled={generating || !input.trim()}
                                >
                                    <ArrowRight className="size-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="mt-2 text-center text-xs text-muted-foreground">
                            Press <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">Enter</kbd> to generate · <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">Shift+Enter</kbd> for new line
                        </p>
                        </div>
                        </div>
                    </ResizablePanel>

                    {/* ── Right panel: project output ───────────────────────────── */}
                    {project && (
                        <>
                            <ResizableHandle withHandle />
                            <ResizablePanel defaultSize={50} minSize={30}>
                                <div className="flex h-full flex-col overflow-hidden">
                                    <ProjectPanel project={project} />
                                </div>
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
            </div>
        </div>
    )
}
