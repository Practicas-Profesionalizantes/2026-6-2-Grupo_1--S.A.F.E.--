import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrainCircuit, CalendarClock, Plus, Trash2 } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import {
  asignarEvaluacion,
  crearPreguntaEvaluacion,
  crearEvaluacion,
  eliminarEvaluacion,
  eliminarPreguntaEvaluacion,
  getStoredUser,
  listarEvaluaciones,
  listarPreguntasEvaluacion,
  listarPostulantesAdmin,
  listarRespuestasAsignacion,
  listarTodasAsignaciones,
} from "@/lib/api";
import type {
  EvaluacionApi,
  EvaluacionAsignadaApi,
  PostulanteApi,
  PreguntaApi,
  RespuestaEvaluacionApi,
  Usuario,
} from "@/lib/api";

export const Route = createFileRoute("/rrhh/evaluaciones")({
  head: () => ({
    meta: [
      { title: "Gestion de evaluaciones | SAFE RRHH" },
      {
        name: "description",
        content:
          "Crea, edita y asigna evaluaciones con fecha y horario habilitado para cada postulante del proceso.",
      },
      { property: "og:title", content: "Gestion de evaluaciones | SAFE RRHH" },
      { property: "og:description", content: "CRUD de evaluaciones y asignacion con fecha y horario." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EvaluacionesRRHH,
});

function EvaluacionesRRHH() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionApi[]>([]);
  const [postulantes, setPostulantes] = useState<PostulanteApi[]>([]);
  const [preguntas, setPreguntas] = useState<PreguntaApi[]>([]);
  const [asignaciones, setAsignaciones] = useState<EvaluacionAsignadaApi[]>([]);
  const [respuestas, setRespuestas] = useState<RespuestaEvaluacionApi[]>([]);
  const [idEvaluacionPreguntas, setIdEvaluacionPreguntas] = useState("");
  const [idAsignacionResultado, setIdAsignacionResultado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    descripcion: "",
    duracion: "60",
    puntajeMin: "60",
    puntajeMax: "100",
    estado: "ACTIVA",
  });
  const [asignacion, setAsignacion] = useState({
    idPostulante: "",
    idEvaluacion: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    observaciones: "",
  });
  const [preguntaForm, setPreguntaForm] = useState({
    pregunta: "",
    tipo: "DESARROLLO",
    respuestaCorrecta: "",
    peso: "10",
  });

  async function cargarDatos() {
    try {
      const [evaluacionesData, postulantesData, asignacionesData] = await Promise.all([
        listarEvaluaciones(),
        listarPostulantesAdmin(),
        listarTodasAsignaciones(),
      ]);
      setEvaluaciones(evaluacionesData);
      setPostulantes(postulantesData);
      setAsignaciones(asignacionesData);
      if (!idEvaluacionPreguntas && evaluacionesData.length) {
        const idInicial = String(evaluacionesData[0].id);
        setIdEvaluacionPreguntas(idInicial);
        await cargarPreguntas(Number(idInicial));
      }
      if (!idAsignacionResultado && asignacionesData.length) {
        const idInicial = String(asignacionesData[0].id);
        setIdAsignacionResultado(idInicial);
        await cargarRespuestas(Number(idInicial));
      }
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudieron cargar las evaluaciones");
    }
  }

  async function cargarRespuestas(idAsignacion: number) {
    try {
      setRespuestas(await listarRespuestasAsignacion(idAsignacion));
    } catch (err) {
      setRespuestas([]);
      setMensaje(err instanceof Error ? err.message : "No se pudieron cargar las respuestas");
    }
  }

  async function cargarPreguntas(idEvaluacion: number) {
    try {
      setPreguntas(await listarPreguntasEvaluacion(idEvaluacion));
    } catch (err) {
      setPreguntas([]);
      setMensaje(err instanceof Error ? err.message : "No se pudieron cargar las preguntas");
    }
  }

  useEffect(() => {
    setUsuario(getStoredUser());
    void cargarDatos();
  }, []);

  async function guardarEvaluacion() {
    setMensaje("");
    try {
      await crearEvaluacion({
        nombre: form.nombre,
        tipo: form.tipo,
        descripcion: form.descripcion,
        duracion: Number(form.duracion),
        puntajeMin: Number(form.puntajeMin),
        puntajeMax: Number(form.puntajeMax),
        online: true,
        estado: form.estado,
      });
      setForm({
        nombre: "",
        tipo: "",
        descripcion: "",
        duracion: "60",
        puntajeMin: "60",
        puntajeMax: "100",
        estado: "ACTIVA",
      });
      await cargarDatos();
      setMensaje("Evaluacion creada correctamente");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo crear la evaluacion");
    }
  }

  async function borrarEvaluacion(id: number) {
    setMensaje("");
    try {
      await eliminarEvaluacion(id);
      await cargarDatos();
      setMensaje("Evaluacion eliminada correctamente");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo eliminar la evaluacion");
    }
  }

  async function guardarAsignacion() {
    setMensaje("");
    try {
      await asignarEvaluacion({
        idEvaluacion: Number(asignacion.idEvaluacion),
        idPostulante: Number(asignacion.idPostulante),
        fecha: asignacion.fecha,
        horaInicio: asignacion.horaInicio,
        horaFin: asignacion.horaFin,
        observaciones: asignacion.observaciones,
      });
      setAsignacion({
        idPostulante: "",
        idEvaluacion: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        observaciones: "",
      });
      await cargarDatos();
      setMensaje("Evaluacion asignada correctamente");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo asignar la evaluacion");
    }
  }

  async function guardarPregunta() {
    if (!idEvaluacionPreguntas) {
      setMensaje("Selecciona una evaluacion para agregar preguntas");
      return;
    }

    setMensaje("");
    try {
      await crearPreguntaEvaluacion(Number(idEvaluacionPreguntas), {
        pregunta: preguntaForm.pregunta,
        tipo: preguntaForm.tipo,
        respuestaCorrecta: preguntaForm.respuestaCorrecta,
        peso: Number(preguntaForm.peso),
      });
      setPreguntaForm({
        pregunta: "",
        tipo: "DESARROLLO",
        respuestaCorrecta: "",
        peso: "10",
      });
      await cargarPreguntas(Number(idEvaluacionPreguntas));
      setMensaje("Pregunta creada correctamente");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo crear la pregunta");
    }
  }

  async function borrarPregunta(idPregunta: number) {
    setMensaje("");
    try {
      await eliminarPreguntaEvaluacion(idPregunta);
      if (idEvaluacionPreguntas) {
        await cargarPreguntas(Number(idEvaluacionPreguntas));
      }
      setMensaje("Pregunta eliminada correctamente");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo eliminar la pregunta");
    }
  }

  const asignacionResultado = asignaciones.find((item) => String(item.id) === idAsignacionResultado);
  const postulanteResultado = asignacionResultado
    ? postulantes.find((item) => item.id === asignacionResultado.idPostulante)
    : null;

  return (
    <AppShell
      titulo="Evaluaciones"
      subtitulo="Administracion y asignacion de pruebas"
      usuario={usuario?.nombre ?? "RRHH"}
      rol="RRHH"
    >
      {mensaje ? (
        <div className="mb-5 rounded-xl border border-primary/25 bg-primary/8 px-4 py-3 text-sm text-primary">
          {mensaje}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Panel
            titulo="Listado de evaluaciones"
            accion={
              <button
                onClick={() => void guardarEvaluacion()}
                className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Plus className="size-4" /> Crear
              </button>
            }
          >
            <div className="mb-5 grid gap-3 rounded-xl border border-border bg-surface-2/35 p-4 text-sm md:grid-cols-2">
              <input
                value={form.nombre}
                onChange={(event) => setForm((actual) => ({ ...actual, nombre: event.target.value }))}
                placeholder="Nombre"
                className="h-10 rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
              />
              <input
                value={form.tipo}
                onChange={(event) => setForm((actual) => ({ ...actual, tipo: event.target.value }))}
                placeholder="Tipo"
                className="h-10 rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
              />
              <input
                value={form.duracion}
                onChange={(event) => setForm((actual) => ({ ...actual, duracion: event.target.value }))}
                placeholder="Duracion en minutos"
                className="h-10 rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
              />
              <input
                value={form.puntajeMin}
                onChange={(event) => setForm((actual) => ({ ...actual, puntajeMin: event.target.value }))}
                placeholder="Puntaje minimo"
                className="h-10 rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
              />
              <textarea
                value={form.descripcion}
                onChange={(event) => setForm((actual) => ({ ...actual, descripcion: event.target.value }))}
                placeholder="Descripcion"
                className="rounded-lg border border-input bg-surface-2/60 p-3 outline-none focus:ring-2 focus:ring-ring/60 md:col-span-2"
              />
            </div>

            <ul className="space-y-3">
              {evaluaciones.map((ev) => (
                <li
                  key={ev.id}
                  className="lift rounded-xl border border-border bg-surface-2/45 p-4 md:flex md:items-center md:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{ev.nombre}</p>
                      <EstadoBadge estado={ev.estado ?? "ACTIVA"} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {ev.tipo} · {ev.duracion ?? 0} min · min. {ev.puntajeMin ?? 0} · max. {ev.puntajeMax ?? 0}
                    </p>
                  </div>
                  <div className="mt-3 flex gap-2 md:mt-0">
                    <button
                      onClick={() => void borrarEvaluacion(ev.id)}
                      className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-border bg-surface-2/35 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">Preguntas de la evaluacion</p>
                  <p className="text-sm text-muted-foreground">
                    Estas preguntas son las que va a responder el postulante y recibira n8n.
                  </p>
                </div>
                <select
                  value={idEvaluacionPreguntas}
                  onChange={(event) => {
                    setIdEvaluacionPreguntas(event.target.value);
                    if (event.target.value) {
                      void cargarPreguntas(Number(event.target.value));
                    } else {
                      setPreguntas([]);
                    }
                  }}
                  className="h-10 rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
                >
                  <option value="">Seleccionar evaluacion</option>
                  {evaluaciones.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
                <input
                  value={preguntaForm.pregunta}
                  onChange={(event) => setPreguntaForm((actual) => ({ ...actual, pregunta: event.target.value }))}
                  placeholder="Enunciado"
                  className="h-10 rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60 md:col-span-2"
                />
                <select
                  value={preguntaForm.tipo}
                  onChange={(event) => setPreguntaForm((actual) => ({ ...actual, tipo: event.target.value }))}
                  className="h-10 rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
                >
                  <option value="DESARROLLO">Desarrollo</option>
                  <option value="RESPUESTA_CORTA">Respuesta corta</option>
                  <option value="VERDADERO_FALSO">Verdadero/Falso</option>
                  <option value="OPCION_MULTIPLE">Opcion multiple</option>
                </select>
                <input
                  value={preguntaForm.peso}
                  onChange={(event) => setPreguntaForm((actual) => ({ ...actual, peso: event.target.value }))}
                  placeholder="Peso"
                  className="h-10 rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
                />
                <textarea
                  value={preguntaForm.respuestaCorrecta}
                  onChange={(event) =>
                    setPreguntaForm((actual) => ({ ...actual, respuestaCorrecta: event.target.value }))
                  }
                  placeholder="Respuesta esperada para que n8n compare"
                  className="rounded-lg border border-input bg-surface-2/60 p-3 outline-none focus:ring-2 focus:ring-ring/60 md:col-span-4"
                />
              </div>

              <button
                onClick={() => void guardarPregunta()}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-primary/40 px-3.5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                <Plus className="size-4" /> Agregar pregunta
              </button>

              <ul className="mt-4 space-y-2">
                {preguntas.map((pregunta, idx) => (
                  <li
                    key={pregunta.id}
                    className="rounded-lg border border-border bg-surface-2/45 p-3 text-sm md:flex md:items-start md:justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {idx + 1}. {pregunta.pregunta}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {pregunta.tipo} · peso {pregunta.peso ?? 1}
                      </p>
                    </div>
                    <button
                      onClick={() => void borrarPregunta(pregunta.id)}
                      className="mt-2 grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive md:mt-0"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
                {!preguntas.length ? (
                  <li className="rounded-lg border border-border bg-surface-2/45 p-3 text-sm text-muted-foreground">
                    No hay preguntas cargadas para esta evaluacion.
                  </li>
                ) : null}
              </ul>
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-6">
          <Panel titulo="Asignar evaluacion">
            <div className="space-y-4 text-sm">
              <label className="block">
                <span className="text-muted-foreground">Postulante</span>
                <select
                  value={asignacion.idPostulante}
                  onChange={(event) => setAsignacion((actual) => ({ ...actual, idPostulante: event.target.value }))}
                  className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
                >
                  <option value="">Seleccionar</option>
                  {postulantes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre ?? p.email ?? `Postulante ${p.id}`}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-muted-foreground">Evaluacion</span>
                <select
                  value={asignacion.idEvaluacion}
                  onChange={(event) => setAsignacion((actual) => ({ ...actual, idEvaluacion: event.target.value }))}
                  className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
                >
                  <option value="">Seleccionar</option>
                  {evaluaciones.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nombre}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className="block">
                  <span className="text-muted-foreground">Fecha</span>
                  <input
                    type="date"
                    value={asignacion.fecha}
                    onChange={(event) => setAsignacion((actual) => ({ ...actual, fecha: event.target.value }))}
                    className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground">Inicio</span>
                  <input
                    type="time"
                    value={asignacion.horaInicio}
                    onChange={(event) => setAsignacion((actual) => ({ ...actual, horaInicio: event.target.value }))}
                    className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
                  />
                </label>
                <label className="block">
                  <span className="text-muted-foreground">Fin</span>
                  <input
                    type="time"
                    value={asignacion.horaFin}
                    onChange={(event) => setAsignacion((actual) => ({ ...actual, horaFin: event.target.value }))}
                    className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-muted-foreground">Observaciones</span>
                <textarea
                  rows={3}
                  value={asignacion.observaciones}
                  onChange={(event) => setAsignacion((actual) => ({ ...actual, observaciones: event.target.value }))}
                  className="mt-1.5 w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
                />
              </label>
              <button
                onClick={() => void guardarAsignacion()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <CalendarClock className="size-4" /> Asignar y notificar
              </button>
              <p className="text-xs text-muted-foreground">
                Al asignar, n8n puede enviar el correo con la fecha y el horario habilitado.
              </p>
            </div>
          </Panel>

          <Panel titulo="Resultados y respuestas">
            <div className="space-y-4 text-sm">
              <label className="block">
                <span className="text-muted-foreground">Asignacion</span>
                <select
                  value={idAsignacionResultado}
                  onChange={(event) => {
                    setIdAsignacionResultado(event.target.value);
                    if (event.target.value) {
                      void cargarRespuestas(Number(event.target.value));
                    } else {
                      setRespuestas([]);
                    }
                  }}
                  className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
                >
                  <option value="">Seleccionar</option>
                  {asignaciones.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombreEvaluacion} · {postulantes.find((p) => p.id === item.idPostulante)?.nombre ?? `Postulante ${item.idPostulante}`}
                    </option>
                  ))}
                </select>
              </label>

              {asignacionResultado ? (
                <>
                  <div className="rounded-xl border border-border bg-surface-2/45 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">{asignacionResultado.nombreEvaluacion}</p>
                        <p className="text-xs text-muted-foreground">
                          {postulanteResultado?.nombre ?? `Postulante ${asignacionResultado.idPostulante}`} ·{" "}
                          {asignacionResultado.fecha ?? "Sin fecha"}
                        </p>
                      </div>
                      <EstadoBadge estado={asignacionResultado.estado} />
                    </div>
                  </div>

                  <div className="rounded-xl border border-primary/25 bg-primary/8 p-4">
                    <p className="flex items-center gap-2 font-medium text-primary">
                      <BrainCircuit className="size-4" /> Correccion IA
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-muted-foreground">
                      {asignacionResultado.observaciones ??
                        "Todavia no hay resultado de correccion para esta evaluacion."}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {respuestas.map((respuesta, index) => (
                      <div key={respuesta.id} className="rounded-lg border border-border bg-surface-2/45 p-3">
                        <p className="font-medium">
                          {index + 1}. {respuesta.pregunta}
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-muted-foreground">{respuesta.respuesta}</p>
                      </div>
                    ))}
                    {!respuestas.length ? (
                      <p className="rounded-lg border border-border bg-surface-2/45 p-3 text-muted-foreground">
                        El postulante todavia no envio respuestas para esta asignacion.
                      </p>
                    ) : null}
                  </div>
                </>
              ) : (
                <p className="rounded-lg border border-border bg-surface-2/45 p-3 text-muted-foreground">
                  Selecciona una asignacion para ver respuestas y resultado IA.
                </p>
              )}
            </div>
          </Panel>
          </div>
        </Reveal>
      </div>
    </AppShell>
  );
}
