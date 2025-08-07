"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignUpButton, SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        <span className="font-bold text-lg tracking-tight">FocusFlow</span>
        <Authenticated>
          <UserButton afterSignOutUrl="/" />
        </Authenticated>
      </header>
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 gap-12">
        <Unauthenticated>
          <LandingHero />
        </Unauthenticated>
        <Authenticated>
          {/* Authenticated area will be implemented in the next step */}
          <div className="text-center text-xl font-semibold mt-12">Welcome to FocusFlow!</div>
        </Authenticated>
      </main>
    </>
  );
}

function LandingHero() {
  return (
    <section className="w-full max-w-2xl flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-extrabold tracking-tight text-center">FocusFlow</h1>
        <p className="text-xl text-muted-foreground text-center max-w-md">
          Organize your work, stay in flow.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
        <FeatureCard title="Real-time sync" desc="Your tasks update instantly across all devices." />
        <FeatureCard title="Smart categories" desc="Organize tasks by Work, Personal, and more." />
        <FeatureCard title="Dark mode" desc="Beautiful and easy on the eyes, day or night." />
      </div>
      <div className="flex gap-4 mt-4">
        <SignUpButton mode="modal">
          <Button variant="default" size="lg">Sign up</Button>
        </SignUpButton>
        <SignInButton mode="modal">
          <Button variant="outline" size="lg">Sign in</Button>
        </SignInButton>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="w-full max-w-xs flex-1 bg-card/80 dark:bg-card/70">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}
