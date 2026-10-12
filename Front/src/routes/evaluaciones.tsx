import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarClock, PlayCircle, Timer } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import { getStoredUser, listarEvaluacionesAsignadas } from "@/lib/api";
import type { EvaluacionAsignadaApi, Usuario } from "@/lib/api";

export const Route = createFileRoute("/evaluaciones")({
  head: () => ({
    meta: [
      { title: "Mis evaluaciones | SAFE postulante" },
      {
        name: "description",
        content:
          "Consulta las evaluaciones asignadas, su fecha y horario habilitado, y rendi las que esten disponibles.",
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
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionAsignadaApi[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  async function cargarEvaluaciones() {
    setCargando(true);
    setMensaje("");
    try {
      setEvaluaciones(await listarEvaluacionesAsignadas());
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudieron cargar las evaluaciones");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    setUsuario(getStoredUser());
    void cargarEvaluaciones();
  }, []);

  const contenido = useMemo(() => {
    if (cargando) {
      return (
        <div className="rounded-xl border border-border bg-surface-2/40 p-5 text-sm text-muted-foreground">
          Cargando evaluaciones...
        </div>
      );
    }

    if (!evaluaciones.length) {
      return (
        <div className="rounded-xl border border-border bg-surface-2/40 p-5 text-sm text-muted-foreground">
          Todavia no tenes evaluaciones asignadas.
        </div>
      );
    }

    return (
      <div className="grid gap-6 lg:grid-cols-3">
        {evaluaciones.map((ev, i) => {
          const disponible = puedeRendir(ev);
          return (
            <Reveal key={ev.id} delay={i * 80}>
              <div className="lift surface-panel flex h-full flex-col rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium">{ev.nombreEvaluacion}</p>
                  <EstadoBadge estado={ev.estado} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{ev.tipoEvaluacion}</p>

                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarClock className="size-4 text-primary" />
                    {ev.fecha ?? "Sin fecha"} · {ev.horaInicio ?? "--:--"} a {ev.horaFin ?? "--:--"}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Timer className="size-4 text-primary" />
                    {ev.duracion ?? 0} min · puntaje minimo {ev.puntajeMin ?? 0}
                  </div>
                </dl>

                {ev.observaciones ? (
                  <p className="mt-4 rounded-lg border border-border/70 bg-surface-2/45 p-3 text-sm text-muted-foreground">
                    {ev.observaciones}
                  </p>
                ) : null}

                <div className="mt-5 flex-1" />
                {disponible ? (
                  <Link
                    to="/evaluacion/$id"
                    params={{ id: String(ev.id) }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <PlayCircle className="size-4" /> Rendir ahora
                  </Link>
                ) : (
                  <span className="inline-flex items-center justify-center rounded-lg border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-muted-foreground">
                    {textoEstado(ev)}
                  </span>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    );
  }, [cargando, evaluaciones]);

  return (
    <AppShell
      titulo="Mis evaluaciones"
      subtitulo="Pruebas asignadas por Recursos Humanos"
      usuario={usuario?.nombre ?? "Postulante"}
      rol="POSTULANTE"
    >
      {mensaje ? (
        <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {mensaje}
        </div>
      ) : null}
      {contenido}
    </AppShell>
  );
}

function puedeRendir(ev: EvaluacionAsignadaApi) {
  if (["RESPONDIDA", "FINALIZADA", "ANALIZADA_IA", "VENCIDA"].includes(ev.estado.toUpperCase())) {
    return false;
  }

  if (!ev.fecha || !ev.horaInicio || !ev.horaFin) {
    return false;
  }

  const ahora = new Date();
  const hoy = ahora.toISOString().slice(0, 10);
  const horaActual = ahora.toTimeString().slice(0, 5);
  return ev.fecha === hoy && horaActual >= ev.horaInicio.slice(0, 5) && horaActual <= ev.horaFin.slice(0, 5);
}

function textoEstado(ev: EvaluacionAsignadaApi) {
  const estado = ev.estado.toUpperCase();
  if (estado === "RESPONDIDA") return "Evaluacion enviada";
  if (estado === "FINALIZADA" || estado === "ANALIZADA_IA") return "Evaluacion finalizada";
  if (estado === "VENCIDA") return "Horario vencido";
  return "Fuera del horario habilitado";
}
