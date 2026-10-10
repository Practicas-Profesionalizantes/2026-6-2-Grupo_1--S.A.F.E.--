import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BrainCircuit, BriefcaseBusiness, CheckCircle2, Clock, Users } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel, ScoreBar, StatCard } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import { getStoredUser, listarPostulacionesAdmin } from "@/lib/api";
import type { PostulacionApi, Usuario } from "@/lib/api";

export const Route = createFileRoute("/rrhh/")({
  head: () => ({
    meta: [
      { title: "Panel RRHH | SAFE" },
      {
        name: "description",
        content: "Resumen real de postulaciones y resultados del analizador IA para Recursos Humanos.",
      },
      { property: "og:title", content: "Panel RRHH | SAFE" },
      {
        property: "og:description",
        content: "Seguimiento de postulaciones, CVs analizados y pendientes de n8n.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PanelRRHH,
});

function scoreValue(score?: number) {
  return Math.max(0, Math.min(100, Number(score ?? 0)));
}

function fechaVisible(value?: string) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function PanelRRHH() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [postulaciones, setPostulaciones] = useState<PostulacionApi[]>([]);
  const [mensaje, setMensaje] = useState("");

  async function cargarPostulaciones() {
    try {
      setPostulaciones(await listarPostulacionesAdmin());
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudieron cargar las postulaciones");
    }
  }

  useEffect(() => {
    setUsuario(getStoredUser());
    void cargarPostulaciones();
  }, []);

  const analizadas = postulaciones.filter((postulacion) => postulacion.scoreIa != null).length;
  const pendientesIa = postulaciones.length - analizadas;
  const conCv = postulaciones.filter((postulacion) => Boolean(postulacion.cvUrl)).length;
  const promedioScore = useMemo(() => {
    const scores = postulaciones
      .map((postulacion) => postulacion.scoreIa)
      .filter((score): score is number => score != null);

    if (scores.length === 0) return null;
    return Math.round(scores.reduce((total, score) => total + Number(score), 0) / scores.length);
  }, [postulaciones]);

  const recientes = postulaciones.slice(0, 5);

  return (
    <AppShell
      titulo="Panel de Recursos Humanos"
      subtitulo="Resumen real de postulaciones, CVs y analisis IA"
      usuario={usuario?.nombre ?? "RRHH"}
      rol="RRHH"
    >
      {mensaje ? (
        <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {mensaje}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Postulaciones", valor: String(postulaciones.length), delta: "Total registradas", icon: Users },
          { label: "CVs cargados", valor: String(conCv), delta: "Disponibles para revisar", icon: BriefcaseBusiness },
          { label: "Analizadas por IA", valor: String(analizadas), delta: "Con score recibido", icon: BrainCircuit },
          {
            label: "Pendientes IA",
            valor: String(pendientesIa),
            delta: pendientesIa === 0 ? "Sin pendientes" : "Esperando respuesta n8n",
            icon: Clock,
          },
        ].map((stat, index) => (
          <Reveal key={stat.label} delay={index * 60}>
            <StatCard {...stat} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <Reveal>
          <Panel
            titulo="Ultimas postulaciones"
            accion={
              <Link
                to="/rrhh/postulaciones"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Ver todas <ArrowRight className="size-4" />
              </Link>
            }
          >
            {recientes.length === 0 ? (
              <p className="text-sm text-muted-foreground">Todavia no hay postulaciones registradas.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pb-3 font-medium">Postulante</th>
                      <th className="pb-3 font-medium">Puesto</th>
                      <th className="pb-3 font-medium">Fecha</th>
                      <th className="pb-3 font-medium">IA</th>
                      <th className="pb-3 font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recientes.map((postulacion) => (
                      <tr key={`${postulacion.idPostulante}-${postulacion.idPuesto}`} className="border-t border-border/60">
                        <td className="py-3">
                          <p className="font-medium text-foreground">
                            {postulacion.nombrePostulante ?? `Postulante ${postulacion.idPostulante}`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {postulacion.emailPostulante ?? postulacion.dniPostulante ?? "Sin contacto"}
                          </p>
                        </td>
                        <td className="py-3 text-muted-foreground">{postulacion.nombrePuesto}</td>
                        <td className="py-3 text-muted-foreground">{fechaVisible(postulacion.fechaPostulacion)}</td>
                        <td className="py-3">
                          {postulacion.scoreIa != null ? (
                            <ScoreBar value={scoreValue(postulacion.scoreIa)} />
                          ) : (
                            <span className="text-xs text-muted-foreground">Pendiente</span>
                          )}
                        </td>
                        <td className="py-3">
                          <EstadoBadge estado={postulacion.estado ?? "PENDIENTE"} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={80}>
            <Panel titulo="Estado del analizador IA">
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="text-muted-foreground">Promedio score IA</span>
                  <span className="font-semibold">{promedioScore != null ? `${promedioScore}%` : "Sin datos"}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="text-muted-foreground">Resultados recibidos</span>
                  <span className="font-semibold">{analizadas}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="text-muted-foreground">Pendientes</span>
                  <span className="font-semibold">{pendientesIa}</span>
                </div>
                <div className="rounded-xl border border-primary/25 bg-primary/8 p-4">
                  <p className="flex items-center gap-2 font-medium text-primary">
                    <CheckCircle2 className="size-4" /> Fuente de datos real
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Este panel toma las postulaciones desde el backend y muestra el resultado guardado por n8n.
                  </p>
                </div>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={140}>
            <Panel titulo="Accesos de RRHH">
              <div className="grid gap-3 text-sm">
                <Link
                  to="/rrhh/postulaciones"
                  className="flex items-center justify-between rounded-xl border border-border bg-surface-2/45 p-4 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Ver postulaciones y analisis IA <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/rrhh/puestos"
                  className="flex items-center justify-between rounded-xl border border-border bg-surface-2/45 p-4 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Gestionar puestos <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/rrhh/evaluaciones"
                  className="flex items-center justify-between rounded-xl border border-border bg-surface-2/45 p-4 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Gestionar evaluaciones <ArrowRight className="size-4" />
                </Link>
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </AppShell>
  );
}
