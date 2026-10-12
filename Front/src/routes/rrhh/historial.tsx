import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BrainCircuit, CalendarClock, ClipboardList, History, RefreshCw, Search } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel, ScoreBar } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import {
  getStoredUser,
  listarPostulantesAdmin,
  obtenerHistorialPostulante,
} from "@/lib/api";
import type { HistorialPostulanteApi, PostulanteApi, Usuario } from "@/lib/api";

export const Route = createFileRoute("/rrhh/historial")({
  head: () => ({
    meta: [
      { title: "Historial del postulante | SAFE RRHH" },
      {
        name: "description",
        content: "Vista integral del recorrido de cada postulante dentro del proceso de seleccion.",
      },
    ],
  }),
  component: HistorialRRHH,
});

function fechaVisible(value?: string) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function score(value?: number) {
  return Math.max(0, Math.min(100, Number(value ?? 0)));
}

function HistorialRRHH() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [postulantes, setPostulantes] = useState<PostulanteApi[]>([]);
  const [idPostulante, setIdPostulante] = useState("");
  const [historial, setHistorial] = useState<HistorialPostulanteApi | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function cargarPostulantes() {
    try {
      const data = await listarPostulantesAdmin();
      setPostulantes(data);
      if (!idPostulante && data.length) {
        setIdPostulante(String(data[0].id));
        await cargarHistorial(data[0].id);
      }
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudieron cargar los postulantes");
    }
  }

  async function cargarHistorial(id: number) {
    setMensaje("");
    try {
      setHistorial((await obtenerHistorialPostulante(id)) ?? null);
    } catch (err) {
      setHistorial(null);
      setMensaje(err instanceof Error ? err.message : "No se pudo cargar el historial");
    }
  }

  useEffect(() => {
    setUsuario(getStoredUser());
    void cargarPostulantes();
  }, []);

  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return postulantes;
    return postulantes.filter((postulante) =>
      [postulante.nombre, postulante.email, postulante.dni]
        .some((campo) => campo?.toLowerCase().includes(termino)),
    );
  }, [busqueda, postulantes]);

  return (
    <AppShell
      titulo="Historial"
      subtitulo="Recorrido completo del postulante en SAFE"
      usuario={usuario?.nombre ?? "RRHH"}
      rol="RRHH"
    >
      {mensaje ? (
        <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {mensaje}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <Reveal>
          <Panel titulo="Postulantes">
            <div className="relative mb-4">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Buscar postulante"
                className="h-11 w-full rounded-lg border border-input bg-surface-2/70 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
              />
            </div>
            <div className="space-y-2">
              {filtrados.map((postulante) => (
                <button
                  key={postulante.id}
                  onClick={() => {
                    setIdPostulante(String(postulante.id));
                    void cargarHistorial(postulante.id);
                  }}
                  className={`w-full rounded-xl border p-3 text-left text-sm transition-colors ${
                    idPostulante === String(postulante.id)
                      ? "border-primary/35 bg-primary/10"
                      : "border-border bg-surface-2/45 hover:border-primary/25"
                  }`}
                >
                  <p className="font-medium">{postulante.nombre ?? `Postulante ${postulante.id}`}</p>
                  <p className="text-xs text-muted-foreground">{postulante.email ?? postulante.dni}</p>
                </button>
              ))}
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={100}>
          <Panel
            titulo={historial?.postulante.nombre ?? "Detalle del postulante"}
            accion={
              idPostulante ? (
                <button
                  onClick={() => void cargarHistorial(Number(idPostulante))}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <RefreshCw className="size-4" /> Actualizar
                </button>
              ) : null
            }
          >
            {historial ? (
              <div className="space-y-6">
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-border bg-surface-2/45 p-4">
                    <p className="text-sm text-muted-foreground">Postulaciones</p>
                    <p className="mt-1 font-display text-3xl font-semibold gradient-text">
                      {historial.postulaciones.length}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-surface-2/45 p-4">
                    <p className="text-sm text-muted-foreground">Evaluaciones</p>
                    <p className="mt-1 font-display text-3xl font-semibold gradient-text">
                      {historial.evaluaciones.length}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-surface-2/45 p-4">
                    <p className="text-sm text-muted-foreground">Entrevistas</p>
                    <p className="mt-1 font-display text-3xl font-semibold gradient-text">
                      {historial.entrevistas.length}
                    </p>
                  </div>
                </div>

                <section>
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <History className="size-4 text-primary" /> Postulaciones
                  </h2>
                  <div className="space-y-3">
                    {historial.postulaciones.map((postulacion) => (
                      <div
                        key={`${postulacion.idPostulante}-${postulacion.idPuesto}`}
                        className="rounded-xl border border-border bg-surface-2/45 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-medium">{postulacion.nombrePuesto}</p>
                            <p className="text-sm text-muted-foreground">
                              {fechaVisible(postulacion.fechaPostulacion)}
                            </p>
                          </div>
                          <EstadoBadge estado={postulacion.estado} />
                        </div>
                        <div className="mt-3 max-w-sm">
                          <ScoreBar value={score(postulacion.scoreIa)} />
                        </div>
                        {postulacion.observacionesIa ? (
                          <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
                            {postulacion.observacionesIa}
                          </p>
                        ) : null}
                      </div>
                    ))}
                    {!historial.postulaciones.length ? (
                      <p className="rounded-xl border border-border bg-surface-2/45 p-4 text-sm text-muted-foreground">
                        No registra postulaciones.
                      </p>
                    ) : null}
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <ClipboardList className="size-4 text-primary" /> Evaluaciones
                  </h2>
                  <div className="space-y-3">
                    {historial.evaluaciones.map((evaluacion) => (
                      <div key={evaluacion.id} className="rounded-xl border border-border bg-surface-2/45 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-medium">{evaluacion.nombreEvaluacion}</p>
                            <p className="text-sm text-muted-foreground">
                              {evaluacion.fecha ?? "Sin fecha"} · {evaluacion.horaInicio?.slice(0, 5)} a{" "}
                              {evaluacion.horaFin?.slice(0, 5)}
                            </p>
                          </div>
                          <EstadoBadge estado={evaluacion.estado} />
                        </div>
                        {evaluacion.observaciones ? (
                          <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
                            {evaluacion.observaciones}
                          </p>
                        ) : null}
                      </div>
                    ))}
                    {!historial.evaluaciones.length ? (
                      <p className="rounded-xl border border-border bg-surface-2/45 p-4 text-sm text-muted-foreground">
                        No registra evaluaciones.
                      </p>
                    ) : null}
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <CalendarClock className="size-4 text-primary" /> Entrevistas
                  </h2>
                  <div className="space-y-3">
                    {historial.entrevistas.map((entrevista) => (
                      <div key={entrevista.id} className="rounded-xl border border-border bg-surface-2/45 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-medium">{entrevista.nombrePuesto ?? "Entrevista general"}</p>
                            <p className="text-sm text-muted-foreground">
                              {fechaVisible(entrevista.fecha)} · {entrevista.hora?.slice(0, 5)} ·{" "}
                              {entrevista.modalidad}
                            </p>
                          </div>
                          <EstadoBadge estado={entrevista.estado} />
                        </div>
                        {entrevista.resultado ? (
                          <p className="mt-3 whitespace-pre-wrap rounded-lg border border-primary/25 bg-primary/8 p-3 text-sm text-muted-foreground">
                            <BrainCircuit className="mr-1 inline size-4 text-primary" />
                            {entrevista.resultado}
                          </p>
                        ) : null}
                      </div>
                    ))}
                    {!historial.entrevistas.length ? (
                      <p className="rounded-xl border border-border bg-surface-2/45 p-4 text-sm text-muted-foreground">
                        No registra entrevistas.
                      </p>
                    ) : null}
                  </div>
                </section>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Selecciona un postulante para ver su historial.</p>
            )}
          </Panel>
        </Reveal>
      </div>
    </AppShell>
  );
}
