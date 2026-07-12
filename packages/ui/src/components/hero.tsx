import React from "react"
import { Button } from "@workspace/ui/components/button"
import Image from "next/image"

export const Hero = () => {
  return (
    <main className="fixed top-0 bottom-0 flex w-full flex-col items-center justify-center">
      <div className="max-w-5xl space-y-4">
        <h1 className="text-center text-6xl font-medium tracking-tight sm:text-4xl md:text-7xl">
          Manage Your Workflow{" "}
          <span className="text-indigo-700">With Ease</span>
        </h1>
        <p className="px-20 text-center text-xl text-muted-foreground">
          Flowtic is the ultimate platform for seamless collaboration and
          productivity. Streamline your tasks and unleash your team's full
          potential.
        </p>
      </div>
      <div className="flex items-center gap-4 pt-4">
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </div>
      <div className="relative top-32 w-full max-w-6xl px-4">
        <div className="overflow-hidden rounded-2xl border bg-background/50 shadow-2xl ring-1 ring-border/50">
          <Image
            src="/dashboard.png"
            alt="Dashboard Preview"
            width={1200}
            height={800}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </main>
  )
}
