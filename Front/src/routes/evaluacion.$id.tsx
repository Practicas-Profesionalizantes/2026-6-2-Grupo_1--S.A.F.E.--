import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Send, Timer } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { Panel } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import {
  getStoredUser,
  guardarRespuestasEvaluacion,
  listarEvaluacionesAsignadas,
  listarPreguntasParaRendir,
} from "@/lib/api";
import type { EvaluacionAsignadaApi, PreguntaApi, Usuario } from "@/lib/api";

export const Route = createFileRoute("/evaluacion/$id")({
  head: () => ({
    meta: [
      { title: "Rendir evaluacion | SAFE" },
      {
        name: "description",
        content:
          "Pantalla de rendicion de evaluacion con preguntas reales y envio a correccion IA.",
      },
      { property: "og:title", content: "Rendir evaluacion | SAFE" },
      { property: "og:description", content: "Rendicion de evaluacion con envio a correccion IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RendirEvaluacion,
});

function RendirEvaluacion() {
  const { id } = Route.useParams();
  const idAsignacion = Number(id);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [evaluacion, setEvaluacion] = useState<EvaluacionAsignadaApi | null>(null);
  const [preguntas, setPreguntas] = useState<PreguntaApi[]>([]);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState<number | null>(null);
  const [avisoTiempo, setAvisoTiempo] = useState("");
  const envioAutomaticoEjecutado = useRef(false);

  async function cargarDatos() {
    setCargando(true);
    setMensaje("");
    try {
      const [asignaciones, preguntasData] = await Promise.all([
        listarEvaluacionesAsignadas(),
        listarPreguntasParaRendir(idAsignacion),
      ]);
      setEvaluacion(asignaciones.find((item) => item.id === idAsignacion) ?? null);
      setPreguntas(preguntasData);
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo cargar la evaluacion");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    setUsuario(getStoredUser());
    void cargarDatos();
  }, [idAsignacion]);

  const respondidas = useMemo(
    () => preguntas.filter((pregunta) => respuestas[pregunta.id]?.trim()).length,
    [preguntas, respuestas],
  );
  const progreso = preguntas.length ? Math.round((respondidas / preguntas.length) * 100) : 0;
  const tiempoAgotado = tiempoRestante !== null && tiempoRestante <= 0;

  useEffect(() => {
    if (!evaluacion?.fecha || !evaluacion.horaFin || enviado || cargando) {
      return;
    }

    function actualizarTiempo() {
      const restante = calcularMilisegundosRestantes(evaluacion);
      if (restante === null) {
        return;
      }

      setTiempoRestante(restante);

      if (restante > 0 && restante <= 5 * 60 * 1000) {
        setAvisoTiempo("Quedan menos de 5 minutos. La evaluacion se enviara automaticamente al finalizar.");
      }

      if (restante <= 0 && !envioAutomaticoEjecutado.current && !enviando) {
        envioAutomaticoEjecutado.current = true;
        setAvisoTiempo("El horario finalizo. Enviando la evaluacion automaticamente...");
        void enviarEvaluacion({ automatico: true });
      }
    }

    actualizarTiempo();
    const intervalId = window.setInterval(actualizarTiempo, 1000);
    return () => window.clearInterval(intervalId);
  }, [cargando, enviado, enviando, evaluacion, preguntas, respuestas]);

  async function enviarEvaluacion(options: { automatico?: boolean } = {}) {
    const automatico = Boolean(options.automatico);
    setMensaje("");

    if (!preguntas.length) {
      setMensaje("La evaluacion no tiene preguntas cargadas");
      return;
    }

    if (!automatico && respondidas < preguntas.length) {
      setMensaje("Responde todas las preguntas antes de enviar");
      return;
    }

    const respuestasPayload = preguntas
      .map((pregunta) => ({
        idPregunta: pregunta.id,
        respuesta: (respuestas[pregunta.id] ?? "").trim(),
      }))
      .filter((respuesta) => respuesta.respuesta);

    setEnviando(true);
    try {
      await guardarRespuestasEvaluacion(idAsignacion, respuestasPayload, automatico);
      setEnviado(true);
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo enviar la evaluacion");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AppShell
      titulo={evaluacion?.nombreEvaluacion ?? "Evaluacion"}
      subtitulo={
        evaluacion
          ? `${evaluacion.tipoEvaluacion} · habilitada de ${evaluacion.horaInicio ?? "--:--"} a ${
              evaluacion.horaFin ?? "--:--"
            }`
          : "Rendicion de evaluacion"
      }
      usuario={usuario?.nombre ?? "Postulante"}
      rol="POSTULANTE"
    >
      {mensaje ? (
        <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {mensaje}
        </div>
      ) : null}
      {avisoTiempo && !enviado ? (
        <div className="mb-5 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">
          {avisoTiempo}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Panel titulo="Preguntas">
            {cargando ? (
              <p className="text-sm text-muted-foreground">Cargando preguntas...</p>
            ) : enviado ? (
              <div className="rounded-xl border border-success/30 bg-success/10 p-6 text-center">
                <CheckCircle2 className="mx-auto size-8 text-success" />
                <p className="mt-3 font-semibold">Evaluacion enviada</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  La correccion automatica con IA se esta procesando. RRHH va a poder ver el resultado cuando n8n
                  devuelva el callback.
                </p>
                <Link
                  to="/dashboard"
                  className="mt-5 inline-flex rounded-lg border border-border bg-surface-2/60 px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Volver a mi panel
                </Link>
              </div>
            ) : !preguntas.length ? (
              <p className="rounded-xl border border-border bg-surface-2/40 p-5 text-sm text-muted-foreground">
                Esta evaluacion todavia no tiene preguntas cargadas.
              </p>
            ) : (
              <ol className="space-y-6">
                {preguntas.map((pregunta, idx) => (
                  <li key={pregunta.id} className="rounded-xl border border-border bg-surface-2/40 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="font-medium">
                        {idx + 1}. {pregunta.pregunta}
                      </p>
                      <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                        {pregunta.tipo} · {pregunta.peso ?? 1} pts
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={respuestas[pregunta.id] ?? ""}
                      disabled={tiempoAgotado || enviando}
                      onChange={(event) =>
                        setRespuestas((actual) => ({ ...actual, [pregunta.id]: event.target.value }))
                      }
                      placeholder="Escribi tu respuesta..."
                      className="mt-3 w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
                    />
                  </li>
                ))}
              </ol>
            )}
          </Panel>
        </Reveal>

        <Reveal delay={100}>
          <Panel titulo="Estado de la prueba" className="h-full">
            <div className="flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/8 p-4">
              <Timer className="size-5 text-primary" />
              <div>
                <p className="font-display text-2xl font-semibold tabular-nums">
                  {tiempoRestante === null ? `${evaluacion?.duracion ?? 0}:00` : formatearTiempo(tiempoRestante)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {tiempoRestante === null ? "Duracion estimada" : "Tiempo restante"}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progreso</span>
                <span className="tabular-nums">{progreso}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all duration-500"
                  style={{ width: `${progreso}%` }}
                />
              </div>
            </div>

            <dl className="mt-5 space-y-2 text-sm">
              {[
                ["Preguntas", `${preguntas.length}`],
                ["Respondidas", `${respondidas}`],
                ["Puntaje minimo", `${evaluacion?.puntajeMin ?? 0}`],
                ["Correccion", "Automatica con IA"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-border/60 pb-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <button
              onClick={() => void enviarEvaluacion()}
              disabled={enviado || enviando || cargando || !preguntas.length || tiempoAgotado}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            >
              <Send className="size-4" /> {enviando ? "Enviando..." : "Enviar evaluacion"}
            </button>
          </Panel>
        </Reveal>
      </div>
    </AppShell>
  );
}

function calcularMilisegundosRestantes(evaluacion: EvaluacionAsignadaApi) {
  if (!evaluacion.fecha || !evaluacion.horaFin) {
    return null;
  }

  const fin = new Date(`${evaluacion.fecha}T${evaluacion.horaFin}`);
  return fin.getTime() - Date.now();
}

function formatearTiempo(ms: number) {
  const totalSegundos = Math.max(0, Math.floor(ms / 1000));
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  if (horas > 0) {
    return `${horas}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
  }

  return `${minutos}:${String(segundos).padStart(2, "0")}`;
}
