"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { aiApi, tasksApi } from "@/lib/api/services";
import { toAppPath } from "@/lib/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import type { AiSuggestion, Task } from "@/types/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>([]);

  useEffect(() => {
    tasksApi.list().then(setTasks).catch(() => setTasks([]));
    aiApi.suggestions().then(setSuggestions).catch(() => setSuggestions([]));
  }, []);

  const highPriority = tasks.filter((t) => t.priority === "high" && t.status !== "done").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;

  return (
    <div>
      <PageHeader
        title={`Bonjour, ${user?.name ?? "utilisateur"} ≡ƒæï`}
        description="Vue d'ensemble de votre journ├⌐e"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { title: "T├óches actives", value: tasks.length, color: "text-emerald-400", delay: "0.05s" },
          { title: "Priorit├⌐ haute", value: highPriority, color: "text-amber-400", delay: "0.1s" },
          { title: "En cours", value: inProgress, color: "text-sky-400", delay: "0.15s" },
        ].map((stat) => (
          <Card
            key={stat.title}
            title={stat.title}
            className="animate-scale-in !p-4"
            style={{ animationDelay: stat.delay } as CSSProperties}
          >
            <p className={`text-3xl font-bold transition-transform duration-300 hover:scale-110 ${stat.color}`}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Acc├¿s rapide">
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { href: "/dashboard/tasks/", label: "G├⌐rer mes t├óches" },
              { href: "/dashboard/mood/", label: "Enregistrer mon humeur" },
              { href: "/dashboard/calendar/", label: "Voir mon agenda" },
              { href: "/dashboard/ai/", label: "Suggestions IA" },
            ].map((link, index) => (
              <a
                key={link.href}
                href={toAppPath(link.href)}
                style={{ animationDelay: `${index * 0.08}s` }}
                className="animate-list-item rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 transition-all duration-300 hover:translate-x-1 hover:border-emerald-700 hover:bg-emerald-950/30 hover:text-white hover:shadow-lg hover:shadow-emerald-900/20"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Card>

        <Card title="Suggestions IA du jour">
          {suggestions.length === 0 ? (
            <p className="text-sm text-slate-400">
              Aucune suggestion pour le moment. Le backend IA sera connect├⌐ prochainement.
            </p>
          ) : (
            <ul className="space-y-3">
              {suggestions.map((s) => (
                <li key={s.id} className="rounded-lg border border-slate-800 p-3 text-sm text-slate-300">
                  {s.content}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
