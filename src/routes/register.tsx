import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Plane, Briefcase, Coffee, Target } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Sign up — Fluent" },
      { name: "description", content: "Start your year to English fluency." },
    ],
  }),
  component: RegisterPage,
});

const goals = [
  { id: "travel", label: "Travel", desc: "Order, navigate, explore.", icon: Plane },
  { id: "work", label: "Work", desc: "Meetings, emails, calls.", icon: Briefcase },
  { id: "interview", label: "Interview", desc: "Land your next role.", icon: Target },
  { id: "daily", label: "Daily life", desc: "Chat, shop, hang out.", icon: Coffee },
];

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <Link to="/dashboard" className="inline-flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <span className="text-primary-foreground font-bold">F</span>
            </div>
            <span className="font-display font-bold text-xl">Fluent</span>
          </Link>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            {[0, 1].map((i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
            ))}
            <span className="text-xs text-muted-foreground ml-2">Step {step + 1} of 2</span>
          </div>

          {step === 0 && (
            <>
              <h1 className="font-display text-3xl font-bold">Create your account</h1>
              <p className="text-muted-foreground mt-2">Begin your year to fluency.</p>
              <form
                className="mt-8 space-y-4"
                onSubmit={(e) => { e.preventDefault(); setStep(1); }}
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" placeholder="Alex Chen" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="At least 8 characters" required />
                </div>
                <Button type="submit" className="w-full h-11 bg-gradient-primary text-primary-foreground shadow-glow">
                  Continue
                </Button>
              </form>
              <p className="mt-6 text-sm text-center text-muted-foreground">
                Have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="font-display text-3xl font-bold">What's your goal?</h1>
              <p className="text-muted-foreground mt-2">We'll tailor lessons around it.</p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {goals.map((g) => {
                  const Icon = g.icon;
                  const active = goal === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={`relative text-left rounded-2xl border-2 p-4 transition-all ${
                        active
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      {active && (
                        <span className="absolute top-3 right-3 h-5 w-5 rounded-full bg-primary grid place-items-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </span>
                      )}
                      <Icon className="h-6 w-6 text-primary" />
                      <div className="font-semibold mt-3">{g.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{g.desc}</div>
                    </button>
                  );
                })}
              </div>
              <Button
                disabled={!goal}
                onClick={() => navigate({ to: "/dashboard" })}
                className="w-full h-11 mt-6 bg-gradient-primary text-primary-foreground shadow-glow disabled:opacity-50"
              >
                Start learning
              </Button>
              <button
                onClick={() => setStep(0)}
                className="w-full text-sm text-muted-foreground mt-3 hover:text-foreground"
              >
                ← Back
              </button>
            </>
          )}
        </div>
      </div>

      <div className="relative bg-gradient-hero flex items-center justify-center overflow-hidden order-1 lg:order-2 p-10 min-h-[40vh] lg:min-h-screen">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative text-primary-foreground text-center max-w-md">
          <div className="text-7xl animate-float">🎯</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mt-6">1 year. Real fluency.</h2>
          <p className="mt-4 opacity-90">15 minutes a day with AI feedback. That's all it takes.</p>
        </div>
      </div>
    </div>
  );
}
