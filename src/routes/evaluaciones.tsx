import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, PlayCircle, Timer } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import { evaluacionesAsignadas } from "@/lib/safe-data";

export const Route = createFileRoute("/evaluaciones")({
  head: () => ({
    meta: [
      { title: "Mis evaluaciones | SAFE postulante" },
      {
        name: "description",
        content:
          "Consultá las evaluaciones asignadas, su fecha y horario habilitado, y rendí las que estén disponibles.",
      },
      { property: "og:title", content: "Mis evaluaciones | SAFE postulante" },
      {
        property: "og:description",
        content: "Evaluaciones asignadas con fecha, horario habilitado y estado de cada prueba.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MisEvaluaciones,
});

function MisEvaluaciones() {
  return (
    <AppShell
      titulo="Mis evaluaciones"
      subtitulo="Pruebas asignadas por Recursos Humanos"
      usuario="Juan Pérez"
      rol="POSTULANTE"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {evaluacionesAsignadas.map((ev, i) => (
          <Reveal key={ev.id} delay={i * 80}>
            <div className="lift surface-panel flex h-full flex-col rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium">{ev.nombre}</p>
                <EstadoBadge estado={ev.estado} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{ev.tipo}</p>

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarClock className="size-4 text-primary" />
                  {ev.fecha} · {ev.horaInicio} a {ev.horaFin}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Timer className="size-4 text-primary" />
                  {ev.duracion} min · puntaje mínimo {ev.puntajeMin}
                </div>
              </dl>

              <div className="mt-5 flex-1" />
              {ev.estado === "DISPONIBLE" ? (
                <Link
                  to="/evaluacion/$id"
                  params={{ id: String(ev.id) }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <PlayCircle className="size-4" /> Rendir ahora
                </Link>
              ) : (
                <span className="inline-flex items-center justify-center rounded-lg border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-muted-foreground">
                  {ev.estado === "FINALIZADA" ? "Evaluación finalizada" : "Fuera del horario habilitado"}
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </AppShell>
  );
}
