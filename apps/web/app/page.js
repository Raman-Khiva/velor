import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart2, LayoutDashboard, MessageSquare, Play, Settings, Shield, Sparkles, Users, Zap } from "lucide-react"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Flowtic</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="transition-colors hover:text-foreground">Features</Link>
            <Link href="#integrations" className="transition-colors hover:text-foreground">Integrations</Link>
            <Link href="#pricing" className="transition-colors hover:text-foreground">Pricing</Link>
            <Link href="#blog" className="transition-colors hover:text-foreground">Blog</Link>
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-4">
            <SignInButton mode="modal">
              <Button variant="ghost" className="hidden sm:inline-flex rounded-full px-6">Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="bg-muted text-foreground hover:bg-muted/80 rounded-full px-6 border border-border/50">Get started</Button>
            </SignUpButton>
            <div className="hidden sm:block">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 md:pt-32 pb-16">
          {/* Subtle glowing background effect adapted for dark theme */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-background to-background" />

          <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-sm mb-8 transition-all hover:bg-muted/50 cursor-pointer">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="px-2 py-0.5 rounded-full bg-background border border-border/50 text-xs font-semibold">Introducing Dub Partners</span>
              </span>
              <div className="mx-2 h-4 w-[1px] bg-border/50" />
              <Link href="#" className="flex items-center gap-1 font-medium text-foreground hover:underline text-xs">
                Read more <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance mb-6">
              Turn Tasks Into Time Savings
            </h1>
            
            {/* Subheading */}
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 text-balance leading-relaxed">
              Streamline your entire operation with intelligent, no-code AI automation instead of juggling dozens of tools.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <SignUpButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all shadow-[0_0_20px_-3px_rgba(249,115,22,0.3)]">
                  Start for free
                </Button>
              </SignUpButton>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base rounded-full border-border bg-background/50 backdrop-blur-sm">
                Talk to sales
              </Button>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base rounded-full border-border bg-background/50 backdrop-blur-sm">
                  Projects
                </Button>
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-20">
              <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Zap className="h-4 w-4 mr-2" /> Flow Boost
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <BarChart2 className="h-4 w-4 mr-2" /> Automation Metrics
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Users className="h-4 w-4 mr-2" /> AI Collaborators
              </Badge>
            </div>

            {/* Dashboard Mockup (CSS-based) */}
            <div className="relative w-full max-w-5xl mx-auto mb-24">
              {/* Decorative glows behind the mockup */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden ring-1 ring-white/10">
                {/* Mockup Header (Browser-like) */}
                <div className="flex items-center px-4 py-3 border-b border-border/50 bg-muted/20">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-border/80" />
                    <div className="w-3 h-3 rounded-full bg-border/80" />
                    <div className="w-3 h-3 rounded-full bg-border/80" />
                  </div>
                  <div className="mx-auto bg-background/50 rounded-md px-4 py-1 text-xs text-muted-foreground border border-border/50 flex items-center gap-2">
                    <Shield className="h-3 w-3" /> app.flowtic.com
                  </div>
                </div>

                {/* Mockup Layout Container */}
                <div className="flex h-[500px]">
                  {/* Sidebar */}
                  <div className="w-48 sm:w-64 border-r border-border/50 bg-background/50 hidden md:flex flex-col p-4">
                    <div className="flex items-center gap-2 mb-8 px-2 mt-2">
                      <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center">
                        <Zap className="h-3 w-3 text-white" />
                      </div>
                      <span className="font-semibold tracking-tight">Flowtic</span>
                    </div>
                    
                    <div className="space-y-1">
                      {['Overview', 'Workflows', 'Metrics', 'Team', 'Settings'].map((item, i) => (
                        <div key={item} className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-3 ${i === 0 ? 'bg-orange-500/10 text-orange-500' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                          {i === 0 && <LayoutDashboard className="h-4 w-4" />}
                          {i === 1 && <Settings className="h-4 w-4" />}
                          {i === 2 && <BarChart2 className="h-4 w-4" />}
                          {i === 3 && <Users className="h-4 w-4" />}
                          {i === 4 && <Settings className="h-4 w-4" />}
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-hidden">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
                        <p className="text-sm text-muted-foreground mt-1">Here's what's happening today.</p>
                      </div>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white border-0">
                        Create Workflow
                      </Button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      {[
                        { label: 'Active Workflows', value: '125', trend: '+20.1%' },
                        { label: 'Tasks Automated', value: '9,368', trend: '+15.2%' },
                        { label: 'Time Saved (hrs)', value: '3,420', trend: '+12.5%' },
                      ].map((stat, i) => (
                        <div key={i} className="p-5 rounded-xl border border-border/50 bg-background/50 flex flex-col justify-between shadow-sm">
                          <p className="text-sm font-medium text-muted-foreground mb-3">{stat.label}</p>
                          <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
                            <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-md">{stat.trend}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 border border-border/50 rounded-xl bg-background/50 p-5 relative overflow-hidden flex flex-col shadow-sm">
                       <div className="flex items-center justify-between mb-6">
                         <h3 className="text-sm font-semibold text-foreground">Automation Activity</h3>
                         <div className="flex gap-2">
                           {['Daily', 'Weekly', 'Monthly'].map((period, i) => (
                             <Badge key={period} variant={i === 0 ? "secondary" : "outline"} className={`text-xs ${i === 0 ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}>
                               {period}
                             </Badge>
                           ))}
                         </div>
                       </div>
                       
                       {/* Mock Chart Lines */}
                       <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-orange-500/5 to-transparent opacity-50" />
                       <div className="flex-1 flex items-end justify-between gap-1.5 sm:gap-3 px-2 pb-2 z-10 mt-4">
                         {Array.from({ length: 24 }).map((_, i) => {
                           const height1 = Math.max(10, Math.random() * 80);
                           const height2 = Math.max(5, height1 - (Math.random() * 30));
                           return (
                             <div key={i} className="w-full flex gap-0.5 sm:gap-1 items-end h-full">
                               <div 
                                 className="w-full bg-orange-500/80 rounded-t-sm transition-all duration-500 hover:bg-orange-400" 
                                 style={{ height: `${height1}%` }}
                               />
                               <div 
                                 className="w-full bg-blue-500/50 rounded-t-sm transition-all duration-500 hidden sm:block hover:bg-blue-400" 
                                 style={{ height: `${height2}%` }}
                               />
                             </div>
                           )
                         })}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trusted By */}
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center border-t border-border/40 pt-16">
              <p className="text-sm font-medium text-muted-foreground mb-8">
                Best-in-class Workflow Automation for businesses of all sizes.
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-16 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                <div className="flex items-center gap-2 text-xl font-bold text-foreground"><Zap className="h-6 w-6"/> TrendLyft</div>
                <div className="flex items-center gap-2 text-xl font-bold text-foreground"><Settings className="h-6 w-6"/> ZenZap</div>
                <div className="flex items-center gap-2 text-xl font-bold text-foreground"><BarChart2 className="h-6 w-6"/> Pulse</div>
                <div className="flex items-center gap-2 text-xl font-bold text-foreground"><Users className="h-6 w-6"/> LumLabs</div>
                <div className="flex items-center gap-2 text-xl font-bold text-foreground"><MessageSquare className="h-6 w-6"/> Craftgram</div>
                <div className="flex items-center gap-2 text-xl font-bold text-foreground italic"><Play className="h-5 w-5"/> swift</div>
              </div>
            </div>
            
          </div>
        </section>
      </main>
    </div>
  )
}
