import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarClock, Plus, Trash2 } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import {
  asignarEvaluacion,
  crearEvaluacion,
  eliminarEvaluacion,
  getStoredUser,
  listarEvaluaciones,
  listarPostulantesAdmin,
} from "@/lib/api";
import type { EvaluacionApi, PostulanteApi, Usuario } from "@/lib/api";

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

  async function cargarDatos() {
    try {
      const [evaluacionesData, postulantesData] = await Promise.all([
        listarEvaluaciones(),
        listarPostulantesAdmin(),
      ]);
      setEvaluaciones(evaluacionesData);
      setPostulantes(postulantesData);
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudieron cargar las evaluaciones");
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
      setMensaje("Evaluacion asignada correctamente");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo asignar la evaluacion");
    }
  }

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
          </Panel>
        </Reveal>

        <Reveal delay={100}>
          <Panel titulo="Asignar evaluacion" className="h-full">
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
        </Reveal>
      </div>
    </AppShell>
  );
}
