import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Trophy } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel, ScoreBar } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import {
  getStoredUser,
  listarPostulacionesAdmin,
  listarPostulantesAdmin,
  listarRanking,
} from "@/lib/api";
import type { PostulacionApi, PostulanteApi, RankingApi, Usuario } from "@/lib/api";

export const Route = createFileRoute("/rrhh/ranking")({
  head: () => ({
    meta: [
      { title: "Ranking de candidatos | SAFE RRHH" },
      {
        name: "description",
        content:
          "Ranking automatico de postulantes segun score de CV, resultados de evaluaciones y compatibilidad con el puesto.",
      },
      { property: "og:title", content: "Ranking de candidatos | SAFE RRHH" },
      { property: "og:description", content: "Ranking automatico asistido por IA para apoyar a RRHH." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ranking,
});

function score(value?: number) {
  return Math.max(0, Math.min(100, Number(value ?? 0)));
}

function Ranking() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [ranking, setRanking] = useState<RankingApi[]>([]);
  const [postulantes, setPostulantes] = useState<PostulanteApi[]>([]);
  const [postulaciones, setPostulaciones] = useState<PostulacionApi[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);

  async function cargarDatos() {
    setCargando(true);
    setMensaje("");

    try {
      const [rankingData, postulantesData, postulacionesData] = await Promise.all([
        listarRanking(),
        listarPostulantesAdmin(),
        listarPostulacionesAdmin(),
      ]);
      setRanking(rankingData);
      setPostulantes(postulantesData);
      setPostulaciones(postulacionesData);
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo cargar el ranking");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    setUsuario(getStoredUser());
    void cargarDatos();
  }, []);

  const filas = useMemo(
    () =>
      ranking.map((item, index) => {
        const postulante = postulantes.find((p) => p.id === item.idPostulante);
        const postulacion = postulaciones.find((p) => p.idPostulante === item.idPostulante && p.idPuesto === item.idPuesto);

        return {
          ...item,
          posicion: ranking.slice(0, index).filter((r) => r.idPuesto === item.idPuesto).length + 1,
          nombre: postulante?.nombre ?? postulacion?.nombrePostulante ?? `Postulante ${item.idPostulante}`,
          email: postulante?.email ?? postulacion?.emailPostulante ?? "Sin email",
          puesto: postulacion?.nombrePuesto ?? "Sin puesto vinculado",
          estado: postulacion?.estado ?? "RANKEADO",
          scoreCv: postulacion?.scoreIa,
        };
      }),
    [postulaciones, postulantes, ranking],
  );

  const promedioGeneral = filas.length
    ? Math.round(filas.reduce((total, item) => total + score(item.promedioFinal), 0) / filas.length)
    : 0;

  return (
    <AppShell
      titulo="Ranking de candidatos"
      subtitulo="Ranking calculado automaticamente con CV y evaluaciones"
      usuario={usuario?.nombre ?? "RRHH"}
      rol="RRHH"
    >
      {mensaje ? (
        <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {mensaje}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Panel
            titulo="Posiciones"
            accion={
              <button
                onClick={() => void cargarDatos()}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <RefreshCw className="size-4" /> Actualizar
              </button>
            }
          >
            {cargando ? (
              <p className="text-sm text-muted-foreground">Cargando ranking...</p>
            ) : filas.length ? (
              <ul className="space-y-3">
                {filas.map((item) => (
                  <li
                    key={`${item.idPuesto}-${item.idPostulante}`}
                    className="lift flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface-2/45 p-4"
                  >
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-xl font-display font-semibold ${
                        item.posicion === 1
                          ? "bg-[image:var(--gradient-primary)] text-primary-foreground glow-shadow"
                          : "border border-border bg-surface text-muted-foreground"
                      }`}
                    >
                      {item.posicion}
                    </span>
                    <div className="min-w-44 flex-1">
                      <p className="font-medium">{item.nombre}</p>
                      <p className="text-sm text-muted-foreground">{item.email}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{item.puesto}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Score CV</p>
                      <ScoreBar value={score(item.scoreCv)} />
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">Estado</p>
                      <EstadoBadge estado={item.estado} />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Puntaje final</p>
                      <p className="font-display text-2xl font-semibold gradient-text">
                        {score(item.promedioFinal)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-xl border border-border bg-surface-2/45 p-4 text-sm text-muted-foreground">
                Todavia no hay candidatos que cumplan las condiciones para ingresar al ranking.
              </p>
            )}
          </Panel>
        </Reveal>

        <Reveal delay={100}>
          <Panel titulo="Resumen" className="h-full">
            <div className="grid gap-3 text-sm">
              <div className="rounded-xl border border-border bg-surface-2/45 p-4">
                <p className="text-muted-foreground">Candidatos rankeados</p>
                <p className="mt-1 font-display text-3xl font-semibold gradient-text">{filas.length}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-2/45 p-4">
                <p className="text-muted-foreground">Promedio general</p>
                <p className="mt-1 font-display text-3xl font-semibold gradient-text">{promedioGeneral}</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                "40% score IA del CV",
                "60% promedio de evaluaciones",
                "Calculo independiente por puesto",
              ].map((criterio) => (
                <li key={criterio} className="flex items-start gap-2">
                  <Trophy className="mt-0.5 size-4 shrink-0 text-primary" />
                  {criterio}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </AppShell>
  );
}
