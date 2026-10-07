import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { Panel, ScoreBar } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import { ranking } from "@/lib/safe-data";

export const Route = createFileRoute("/rrhh/ranking")({
  head: () => ({
    meta: [
      { title: "Ranking de candidatos | SAFE RRHH" },
      {
        name: "description",
        content:
          "Ranking automático de postulantes según score de CV, resultados de evaluaciones y compatibilidad con el puesto.",
      },
      { property: "og:title", content: "Ranking de candidatos | SAFE RRHH" },
      { property: "og:description", content: "Ranking automático asistido por IA para apoyar a RRHH." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ranking,
});

function Ranking() {
  return (
    <AppShell
      titulo="Ranking de candidatos"
      subtitulo="Generado a partir de evaluaciones y análisis de IA"
      usuario="Ana Torres"
      rol="RRHH"
    >
      <div className="grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Panel titulo="Posiciones">
            <ul className="space-y-3">
              {ranking.map((r, i) => (
                <li
                  key={r.posicion}
                  className="lift flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface-2/45 p-4"
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-xl font-display font-semibold ${
                      i === 0
                        ? "bg-[image:var(--gradient-primary)] text-primary-foreground glow-shadow"
                        : "border border-border bg-surface text-muted-foreground"
                    }`}
                  >
                    {r.posicion}
                  </span>
                  <div className="min-w-40 flex-1">
                    <p className="font-medium">{r.postulante}</p>
                    <p className="text-sm text-muted-foreground">{r.puesto}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Score CV</p>
                    <ScoreBar value={r.scoreCV} />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Puntaje final</p>
                    <p className="font-display text-2xl font-semibold gradient-text">{r.puntaje}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal delay={100}>
          <Panel titulo="Criterios del ranking" className="h-full">
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Score IA del CV",
                "Puntajes obtenidos en evaluaciones",
                "Compatibilidad con el puesto",
                "Experiencia laboral",
                "Resultado de entrevistas",
              ].map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <Trophy className="mt-0.5 size-4 shrink-0 text-primary" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-accent/25 bg-accent/8 p-4 text-sm text-muted-foreground">
              La IA asiste el proceso, pero la decisión final de contratación es siempre de Recursos
              Humanos.
            </p>
          </Panel>
        </Reveal>
      </div>
    </AppShell>
  );
}
