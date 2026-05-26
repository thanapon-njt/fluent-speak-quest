import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { user } from "@/data/mock";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Fluent" },
      { name: "description", content: "Adjust voice speed, notifications, and preferences." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [speed, setSpeed] = useState([1]);
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-10 space-y-5">
      <div>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Tune your experience.</p>
      </div>

      <Card title="AI tutor voice">
        <div className="space-y-4">
          <Row label="Voice speed" hint={`${speed[0].toFixed(2)}x`}>
            <Slider value={speed} onValueChange={setSpeed} min={0.5} max={1.5} step={0.05} />
          </Row>
          <Row label="Accent">
            <Select defaultValue="us">
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="us">American</SelectItem>
                <SelectItem value="uk">British</SelectItem>
                <SelectItem value="au">Australian</SelectItem>
                <SelectItem value="in">Indian</SelectItem>
              </SelectContent>
            </Select>
          </Row>
        </div>
      </Card>

      <Card title="Speaking difficulty">
        <Row label="Default level">
          <Select defaultValue="medium">
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </Row>
      </Card>

      <Card title="Notifications">
        <Row label="Daily reminder"><Switch defaultChecked /></Row>
        <Row label="Streak alerts"><Switch defaultChecked /></Row>
        <Row label="Weekly summary"><Switch /></Row>
      </Card>

      <Card title="Account">
        <div className="space-y-3">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={user.name} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="alex@example.com" className="mt-1.5" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-5 pt-5 border-t border-border">
          <Link to="/login" className="text-sm text-destructive font-semibold hover:underline">Log out</Link>
          <Button className="bg-gradient-primary text-primary-foreground">Save changes</Button>
        </div>
      </Card>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-soft">
      <h2 className="font-display font-bold text-lg mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-sm">
        <div className="font-medium">{label}</div>
        {hint && <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>}
      </div>
      <div className="flex-1 max-w-[60%] flex justify-end">{children}</div>
    </div>
  );
}
