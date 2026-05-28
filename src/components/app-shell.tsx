import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Map,
  Mic,
  RefreshCw,
  User,
  Settings as SettingsIcon,
  Flame,
  Zap,
} from "lucide-react";
import { user } from "@/data/mock";

const navLeft = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/map", label: "Map", icon: Map },
];
const navRight = [
  { to: "/review", label: "Review", icon: RefreshCw },
  { to: "/profile", label: "Profile", icon: User },
];
const sidebarNav = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/map", label: "Chapters", icon: Map },
  { to: "/conversations", label: "Speak", icon: Mic },
  { to: "/review", label: "Review", icon: RefreshCw },
  { to: "/profile", label: "Profile", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");
  // Hide chrome inside immersive conversation room
  const immersive = /^\/conversations\/[^/]+$/.test(pathname) && !pathname.endsWith("/result");

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
          {sidebarNav.map((item) => {
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

        <div className="mt-auto rounded-2xl bg-gradient-flame p-4 text-flame-foreground shadow-flame relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-5xl opacity-30 animate-flame">🔥</div>
          <div className="relative flex items-center gap-2 text-sm font-bold">
            <Flame className="h-4 w-4 animate-flame" /> {user.streak}-day streak
          </div>
          <div className="relative text-xs opacity-95 mt-1">Keep the fire alive — speak 5 min today.</div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        {!immersive && (
          <header className="md:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-background/95 backdrop-blur sticky top-0 z-30">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center">
                <span className="text-primary-foreground text-sm font-bold">F</span>
              </div>
              <span className="font-display font-bold">Fluent</span>
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/25 text-accent-foreground font-bold text-xs">
                <Zap className="h-3.5 w-3.5" /> {user.xp}
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-flame text-flame-foreground font-bold text-xs shadow-flame">
                <Flame className="h-3.5 w-3.5 animate-flame" /> {user.streak}
              </span>
            </div>
          </header>
        )}

        <main className={`flex-1 ${immersive ? "" : "pb-32 md:pb-0"}`}>{children ?? <Outlet />}</main>

        {/* Mobile bottom nav — elevated Speak CTA in center */}
        {!immersive && (
          <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border pb-[max(env(safe-area-inset-bottom),0px)]">
            <div className="relative grid grid-cols-5 items-end">
              {navLeft.map((item) => (
                <BottomItem key={item.to} item={item} active={isActive(item.to)} />
              ))}

              {/* Center elevated Speak button */}
              <div className="relative flex justify-center">
                <Link
                  to="/conversations"
                  aria-label="Speak"
                  className={`absolute -top-7 h-16 w-16 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center shadow-glow border-4 border-background active:scale-95 transition ${
                    isActive("/conversations") ? "ring-2 ring-primary/40" : ""
                  }`}
                >
                  <Mic className="h-6 w-6" />
                </Link>
                <span className="pt-12 pb-2 text-[10px] font-bold uppercase tracking-wider text-primary">Speak</span>
              </div>

              {navRight.map((item) => (
                <BottomItem key={item.to} item={item} active={isActive(item.to)} />
              ))}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

function BottomItem({
  item,
  active,
}: {
  item: { to: string; label: string; icon: React.ComponentType<{ className?: string }> };
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold transition-colors ${
        active ? "text-primary" : "text-muted-foreground active:text-foreground"
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? "scale-110" : ""} transition-transform`} />
      {item.label}
    </Link>
  );
}
