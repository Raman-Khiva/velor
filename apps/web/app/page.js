'use client'
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart2, LayoutDashboard, MessageSquare, Play, Settings, Shield, Sparkles, Users, Zap } from "lucide-react"
import { SignInButton, SignUpButton, UserButton,useUser } from "@clerk/nextjs"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import {Hero} from "@workspace/ui/components/hero"


export default function Home() {
  const {isSignedUp,isSignedIn,isLoaded} = useUser();
  if(!isLoaded){
    return(<div>
      please wait
    </div>)}

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <span className="text-2xl font-extrabold tracking-widest">Velor</span>
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
            {!isSignedIn && (<><SignInButton mode="modal">
              <Button variant="ghost" className="hidden sm:inline-flex rounded-full px-6">Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="bg-muted text-foreground hover:bg-muted/80 rounded-full px-6 border border-border/50">Get started</Button>
            </SignUpButton>
            </>)}
            <div className="hidden sm:block">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>
      <Hero/>
      </div>
)}