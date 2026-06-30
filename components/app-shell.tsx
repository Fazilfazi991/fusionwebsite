import Link from "next/link";
import { ArrowLeft, BarChart3, ClipboardList, Inbox, ListChecks, LogOut, Megaphone, Settings, UserPlus } from "lucide-react";

const navItems = [
  { href: "/email/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/email/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/email/leads", label: "Leads", icon: UserPlus },
  { href: "/email/review", label: "Review", icon: ClipboardList },
  { href: "/email/queue", label: "Queue", icon: ListChecks },
  { href: "/email/follow-ups", label: "Follow-ups", icon: Inbox },
  { href: "/email/reports", label: "Reports", icon: BarChart3 },
  { href: "/email/settings", label: "Settings", icon: Settings }
];

export function AppShell({
  children,
  logoutAction
}: {
  children: React.ReactNode;
  logoutAction: () => Promise<void>;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <aside className="fixed inset-y-0 left-0 hidden w-[288px] border-r border-white/10 bg-zinc-950 px-5 py-5 text-white shadow-2xl md:block">
        <div className="rounded-lg bg-white px-3 py-3">
          <img src="/fusion-ventures-logo-original.webp" alt="Fusion Ventures" className="h-16 w-full object-contain" />
        </div>
        <div className="mt-8 px-1">
          <p className="text-2xl font-bold leading-tight">Fusion OS</p>
          <p className="mt-1 text-sm font-medium text-zinc-400">Email Automation</p>
        </div>
        <Link href="/dashboard" className="mt-6 flex h-11 items-center gap-3 rounded-lg border border-white/10 px-3 text-sm font-semibold text-zinc-300 hover:bg-white/10 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <nav className="mt-6 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex h-12 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-zinc-300 hover:bg-white/10 hover:text-white">
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="absolute bottom-5 left-4 right-4">
          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] text-sm font-semibold text-zinc-200 hover:bg-white/10 hover:text-white" type="submit">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </aside>
      <div className="md:pl-[288px]">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">Fusion OS</p>
              <p className="text-xs text-zinc-500">Email Automation</p>
            </div>
            <form action={logoutAction}>
              <button className="rounded-md border border-zinc-200 p-2" aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <Link href="/dashboard" className="flex shrink-0 items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-xs font-semibold">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex shrink-0 items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-xs font-semibold">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-[1500px] px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
