import { createFileRoute, Link } from "@tanstack/react-router";
import { BriefcaseBusiness, CalendarClock, ClipboardList, Star, Timer } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel, ScoreBar, StatCard } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import { evaluacionesAsignadas, misPostulaciones, puestos } from "@/lib/safe-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Mi panel | SAFE postulante" },
      {
        name: "description",
        content:
          "Seguí tus postulaciones, evaluaciones asignadas y resultados dentro del proceso de selección de SAFE.",
      },
      { property: "og:title", content: "Mi panel | SAFE postulante" },
      {
        property: "og:description",
        content: "Postulaciones, evaluaciones asignadas y resultados del proceso de selección.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPostulante,
});

function DashboardPostulante() {
  return (
    <AppShell
      titulo="Hola, Juan"
      subtitulo="Estado de tus procesos de selección"
      usuario="Juan Pérez"
      rol="POSTULANTE"
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Postulaciones activas", valor: "2", delta: "+1 esta semana", icon: BriefcaseBusiness },
          { label: "Evaluaciones asignadas", valor: "3", delta: "1 disponible hoy", icon: ClipboardList },
          { label: "Score IA de tu CV", valor: "85%", delta: "Perfil competitivo", icon: Star },
          { label: "Próxima instancia", valor: "22/08", delta: "Test Técnico Java", icon: CalendarClock },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 60}>
            <StatCard {...s} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Panel titulo="Evaluaciones asignadas">
            <ul className="space-y-3">
              {evaluacionesAsignadas.map((ev) => (
                <li
                  key={ev.id}
                  className="lift rounded-xl border border-border bg-surface-2/50 p-4 md:flex md:items-center md:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{ev.nombre}</p>
                      <EstadoBadge estado={ev.estado} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {ev.tipo} · {ev.fecha} · {ev.horaInicio} a {ev.horaFin} · puntaje mínimo{" "}
                      {ev.puntajeMin}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-3 md:mt-0">
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Timer className="size-4" />
                      {ev.duracion} min
                    </span>
                    <button
                      disabled={ev.estado !== "DISPONIBLE"}
                      className="rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
                    >
                      {ev.estado === "FINALIZADA" ? "Ver resultado" : "Iniciar"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal delay={100}>
          <Panel titulo="Mi perfil profesional" className="h-full">
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Completitud del perfil</p>
                <div className="mt-2">
                  <ScoreBar value={82} />
                </div>
              </div>
              <dl className="space-y-2">
                {[
                  ["CV", "juan_perez_cv.pdf"],
                  ["Apto médico", "Cargado"],
                  ["Experiencia", "2 años backend"],
                  ["Disponibilidad", "Full time"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                to="/registro"
                className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-surface-2/70 px-4 py-2.5 font-medium transition-colors hover:border-primary/40"
              >
                Actualizar perfil
              </Link>
            </div>
          </Panel>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Reveal>
          <Panel titulo="Mis postulaciones">
            <ul className="space-y-4">
              {misPostulaciones.map((p) => (
                <li key={p.id} className="rounded-xl border border-border bg-surface-2/40 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{p.puesto}</p>
                    <EstadoBadge estado={p.estado} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">Postulado el {p.fecha}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-[image:var(--gradient-primary)]"
                      style={{ width: `${p.progreso}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal delay={100}>
          <Panel
            titulo="Puestos recomendados"
            accion={
              <Link to="/puestos" className="text-sm text-primary hover:underline">
                Ver todos
              </Link>
            }
          >
            <ul className="space-y-3">
              {puestos.slice(0, 3).map((p) => (
                <li
                  key={p.id}
                  className="lift flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-2/40 p-4"
                >
                  <div>
                    <p className="font-medium">{p.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {p.area} · {p.modalidad}
                    </p>
                  </div>
                  <button className="rounded-lg border border-primary/35 px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary/10">
                    Postularme
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </AppShell>
  );
}
