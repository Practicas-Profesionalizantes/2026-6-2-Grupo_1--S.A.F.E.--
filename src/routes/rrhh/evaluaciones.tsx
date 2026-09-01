import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Pencil, Plus, Trash2 } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import { evaluaciones, postulantes } from "@/lib/safe-data";

export const Route = createFileRoute("/rrhh/evaluaciones")({
  head: () => ({
    meta: [
      { title: "Gestión de evaluaciones | SAFE RRHH" },
      {
        name: "description",
        content:
          "Creá, editá y asigná evaluaciones con fecha y horario habilitado para cada postulante del proceso.",
      },
      { property: "og:title", content: "Gestión de evaluaciones | SAFE RRHH" },
      { property: "og:description", content: "CRUD de evaluaciones y asignación con fecha y horario." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EvaluacionesRRHH,
});

function EvaluacionesRRHH() {
  return (
    <AppShell
      titulo="Evaluaciones"
      subtitulo="Administración y asignación de pruebas"
      usuario="Ana Torres"
      rol="RRHH"
    >
      <div className="grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Panel
            titulo="Listado de evaluaciones"
            accion={
              <button className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5">
                <Plus className="size-4" /> Nueva
              </button>
            }
          >
            <ul className="space-y-3">
              {evaluaciones.map((ev) => (
                <li
                  key={ev.id}
                  className="lift rounded-xl border border-border bg-surface-2/45 p-4 md:flex md:items-center md:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{ev.nombre}</p>
                      <EstadoBadge estado={ev.estado} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {ev.puesto} · {ev.tipo} · {ev.duracion} min · {ev.preguntas} preguntas · mín.{" "}
                      {ev.puntajeMin}
                    </p>
                  </div>
                  <div className="mt-3 flex gap-2 md:mt-0">
                    <button className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
                      <Pencil className="size-4" />
                    </button>
                    <button className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal delay={100}>
          <Panel titulo="Asignar evaluación" className="h-full">
            <div className="space-y-4 text-sm">
              <label className="block">
                <span className="text-muted-foreground">Postulante</span>
                <select className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60">
                  {postulantes.map((p) => (
                    <option key={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-muted-foreground">Evaluación</span>
                <select className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60">
                  {evaluaciones.map((e) => (
                    <option key={e.id}>{e.nombre}</option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Fecha", "22/08/2026"],
                  ["Inicio", "10:00"],
                  ["Fin", "11:30"],
                ].map(([k, v]) => (
                  <label key={k} className="block">
                    <span className="text-muted-foreground">{k}</span>
                    <input
                      defaultValue={v}
                      className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
                    />
                  </label>
                ))}
              </div>
              <label className="block">
                <span className="text-muted-foreground">Observaciones (opcional)</span>
                <textarea
                  rows={3}
                  className="mt-1.5 w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
                />
              </label>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5">
                <CalendarClock className="size-4" /> Asignar y notificar
              </button>
              <p className="text-xs text-muted-foreground">
                Al asignar, n8n envía el correo con la fecha y el horario habilitado.
              </p>
            </div>
          </Panel>
        </Reveal>
      </div>
    </AppShell>
  );
}
