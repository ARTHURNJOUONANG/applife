"use client";

import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { useClientPathname } from "@/hooks/use-client-pathname";
import { pathsMatch, toAppPath } from "@/lib/navigation";
import { AppLogo } from "@/components/layout/app-logo";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard/", label: "Tableau de bord", icon: "≡ƒÅá" },
  { href: "/dashboard/tasks/", label: "T├óches", icon: "Γ£à" },
  { href: "/dashboard/calendar/", label: "Agenda", icon: "≡ƒôà" },
  { href: "/dashboard/goals/", label: "Objectifs", icon: "≡ƒÄ»" },
  { href: "/dashboard/mood/", label: "Bien-├¬tre", icon: "≡ƒÆÜ" },
  { href: "/dashboard/focus/", label: "Focus", icon: "ΓÅ▒∩╕Å" },
  { href: "/dashboard/ai/", label: "IA", icon: "Γ£¿" },
];

export function Sidebar() {
  const pathname = useClientPathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="theme-sidebar animate-slide-in-left flex h-screen w-64 shrink-0 flex-col border-r p-4 backdrop-blur-md">
      <div className="mb-8 flex justify-center px-2">
        <AppLogo size={52} />
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item, index) => {
          const active = pathsMatch(pathname, item.href);
          return (
            <a
              key={item.href}
              href={toAppPath(item.href)}
              style={{ animationDelay: `${index * 0.05}s` }}
              className={`nav-link animate-list-item flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                active
                  ? "nav-link-active bg-emerald-600/20 text-emerald-500"
                  : "theme-muted hover:bg-emerald-600/10 hover:theme-text"
              }`}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="theme-sidebar-footer mt-4 border-t pt-4">
        <Button variant="ghost" className="mb-2 w-full" onClick={toggleTheme}>
          {theme === "dark" ? "ΓÿÇ∩╕Å Mode clair" : "≡ƒîÖ Mode sombre"}
        </Button>
        <p className="truncate px-2 text-sm font-medium theme-text">{user?.name}</p>
        <p className="truncate px-2 text-xs theme-muted">{user?.email}</p>
        <Button variant="ghost" className="mt-3 w-full" onClick={logout}>
          D├⌐connexion
        </Button>
      </div>
    </aside>
  );
}
