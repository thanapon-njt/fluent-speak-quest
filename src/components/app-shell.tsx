import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Map,
  MessageCircle,
  RefreshCw,
  User,
  Settings as SettingsIcon,
  Flame,
  Zap,
} from "lucide-react";
import { user } from "@/data/mock";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/map", label: "Chapters", icon: Map },
  { to: "/conversations", label: "Speak", icon: MessageCircle },
  { to: "/review", label: "Review", icon: RefreshCw },
  { to: "/profile", label: "Profile", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar p-5 sticky top-0 h-screen">
        <Link to="/dashboard" className="flex items-center gap-2 mb-8">
          <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <span className="text-primary-foreground font-bold">F</span>
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-none">Fluent</div>
            <div className="text-xs text-muted-foreground mt-0.5">English coach</div>
          </div>
        </Link>

        <nav className="flex flex-col gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium mt-1 ${
              isActive("/settings")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
            }`}
          >
            <SettingsIcon className="h-4 w-4" />
            Settings
          </Link>
        </nav>

        <div className="mt-auto rounded-2xl bg-gradient-primary p-4 text-primary-foreground shadow-glow">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Flame className="h-4 w-4" /> {user.streak}-day streak
          </div>
          <div className="text-xs opacity-90 mt-1">Keep the fire alive — speak 5 min today.</div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-background sticky top-0 z-30">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center">
              <span className="text-primary-foreground text-sm font-bold">F</span>
            </div>
            <span className="font-display font-bold">Fluent</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20 text-accent-foreground font-semibold">
              <Zap className="h-3.5 w-3.5" /> {user.xp}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/15 text-orange-600 font-semibold">
              <Flame className="h-3.5 w-3.5" /> {user.streak}
            </span>
          </div>
        </header>

        <main className="flex-1 pb-20 md:pb-0">{children ?? <Outlet />}</main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur border-t border-border">
          <div className="grid grid-cols-5">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
