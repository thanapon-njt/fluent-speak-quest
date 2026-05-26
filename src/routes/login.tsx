import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Sparkles, Trophy } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Fluent" },
      { name: "description", content: "Welcome back. Continue your English fluency journey." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: auth */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/dashboard" className="inline-flex items-center gap-2 mb-10">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <span className="text-primary-foreground font-bold">F</span>
            </div>
            <span className="font-display font-bold text-xl">Fluent</span>
          </Link>

          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Pick up where you left off.</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>
              </div>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full h-11 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95">
              Log in
            </Button>
          </form>

          <div className="relative my-6">
            <div className="h-px bg-border" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">or continue with</span>
            </span>
          </div>

          <button
            onClick={() => navigate({ to: "/dashboard" })}
            className="w-full h-11 rounded-xl border border-border bg-card font-medium flex items-center justify-center gap-3 hover:bg-muted/50 transition"
          >
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.61z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 009 18z"/><path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 013.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>
            Continue with Google
          </button>

          <p className="mt-8 text-sm text-center text-muted-foreground">
            New here?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>

      {/* Right: illustration */}
      <div className="hidden lg:flex relative bg-gradient-hero items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative text-primary-foreground max-w-md p-10">
          <div className="text-7xl animate-float">🦊</div>
          <h2 className="font-display text-4xl font-bold mt-6 leading-tight">Speak English with confidence — every day.</h2>
          <p className="mt-4 opacity-90">Join thousands learning through gamified chapters and AI conversation.</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: Flame, label: "24-day streaks" },
              { icon: Sparkles, label: "AI roleplay" },
              { icon: Trophy, label: "Real progress" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl bg-white/15 backdrop-blur p-4 text-center">
                <Icon className="h-5 w-5 mx-auto" />
                <div className="text-xs mt-2 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
