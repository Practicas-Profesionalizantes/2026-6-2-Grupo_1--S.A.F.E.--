import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarClock, CheckCircle2, RefreshCw, Save, Trash2 } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import {
  actualizarEntrevista,
  cambiarEstadoEntrevista,
  crearEntrevista,
  eliminarEntrevista,
  getStoredUser,
  listarEntrevistas,
  listarPostulantesAdmin,
  listarPuestosAdmin,
} from "@/lib/api";
import type { EntrevistaApi, PostulanteApi, PuestoApi, Usuario } from "@/lib/api";

export const Route = createFileRoute("/rrhh/entrevistas")({
  head: () => ({
    meta: [
      { title: "Entrevistas | SAFE RRHH" },
      {
        name: "description",
        content: "Programacion y seguimiento de entrevistas del proceso de seleccion.",
      },
    ],
  }),
  component: EntrevistasRRHH,
});

const emptyForm = {
  idPostulante: "",
  idPuesto: "",
  fecha: "",
  hora: "",
  modalidad: "PRESENCIAL",
  ubicacion: "",
  estado: "PROGRAMADA",
  observaciones: "",
  resultado: "",
};

function fechaVisible(value?: string) {
  if (!value) return "Sin fecha";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function EntrevistasRRHH() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [entrevistas, setEntrevistas] = useState<EntrevistaApi[]>([]);
  const [postulantes, setPostulantes] = useState<PostulanteApi[]>([]);
  const [puestos, setPuestos] = useState<PuestoApi[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);

  async function cargarDatos() {
    setCargando(true);
    setMensaje("");

    try {
      const [entrevistasData, postulantesData, puestosData] = await Promise.all([
        listarEntrevistas(),
        listarPostulantesAdmin(),
        listarPuestosAdmin(),
      ]);
      setEntrevistas(entrevistasData);
      setPostulantes(postulantesData);
      setPuestos(puestosData);
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudieron cargar las entrevistas");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    setUsuario(getStoredUser());
    void cargarDatos();
  }, []);

  const proximas = useMemo(
    () => entrevistas.filter((item) => item.estado !== "REALIZADA" && item.estado !== "CANCELADA"),
    [entrevistas],
  );

  function editar(entrevista: EntrevistaApi) {
    setEditandoId(entrevista.id);
    setForm({
      idPostulante: String(entrevista.idPostulante),
      idPuesto: entrevista.idPuesto ? String(entrevista.idPuesto) : "",
      fecha: entrevista.fecha,
      hora: entrevista.hora?.slice(0, 5) ?? "",
      modalidad: entrevista.modalidad ?? "PRESENCIAL",
      ubicacion: entrevista.ubicacion ?? "",
      estado: entrevista.estado ?? "PROGRAMADA",
      observaciones: entrevista.observaciones ?? "",
      resultado: entrevista.resultado ?? "",
    });
  }

  async function guardar() {
    setMensaje("");
    const payload = {
      idPostulante: Number(form.idPostulante),
      idPuesto: form.idPuesto ? Number(form.idPuesto) : undefined,
      fecha: form.fecha,
      hora: form.hora,
      modalidad: form.modalidad,
      ubicacion: form.ubicacion,
      estado: form.estado,
      observaciones: form.observaciones,
      resultado: form.resultado,
    };

    try {
      if (editandoId) {
        await actualizarEntrevista(editandoId, payload);
        setMensaje("Entrevista actualizada correctamente");
      } else {
        await crearEntrevista(payload);
        setMensaje("Entrevista programada correctamente");
      }
      setEditandoId(null);
      setForm(emptyForm);
      await cargarDatos();
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo guardar la entrevista");
    }
  }

  async function marcarRealizada(entrevista: EntrevistaApi) {
    setMensaje("");
    try {
      await cambiarEstadoEntrevista(entrevista.id, {
        estado: "REALIZADA",
        resultado: entrevista.resultado ?? "Entrevista realizada.",
      });
      await cargarDatos();
      setMensaje("Entrevista marcada como realizada");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo actualizar la entrevista");
    }
  }

  async function borrar(id: number) {
    setMensaje("");
    try {
      await eliminarEntrevista(id);
      await cargarDatos();
      setMensaje("Entrevista eliminada correctamente");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo eliminar la entrevista");
    }
  }

  return (
    <AppShell
      titulo="Entrevistas"
      subtitulo="Agenda y seguimiento manual de entrevistas"
      usuario={usuario?.nombre ?? "RRHH"}
      rol="RRHH"
    >
      {mensaje ? (
        <div className="mb-5 rounded-xl border border-primary/25 bg-primary/8 px-4 py-3 text-sm text-primary">
          {mensaje}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
        <Reveal>
          <Panel
            titulo="Agenda"
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
              <p className="text-sm text-muted-foreground">Cargando entrevistas...</p>
            ) : entrevistas.length ? (
              <div className="space-y-3">
                {entrevistas.map((entrevista) => (
                  <div
                    key={entrevista.id}
                    className="lift rounded-xl border border-border bg-surface-2/45 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">
                          {entrevista.nombrePostulante ?? `Postulante ${entrevista.idPostulante}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {entrevista.nombrePuesto ?? "Sin puesto vinculado"} · {fechaVisible(entrevista.fecha)} ·{" "}
                          {entrevista.hora?.slice(0, 5)} hs
                        </p>
                      </div>
                      <EstadoBadge estado={entrevista.estado} />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {entrevista.modalidad} · {entrevista.ubicacion || "Sin ubicacion/link"}
                    </p>
                    {entrevista.resultado ? (
                      <p className="mt-3 rounded-lg border border-success/25 bg-success/10 p-3 text-sm text-success">
                        {entrevista.resultado}
                      </p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => editar(entrevista)}
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        <Save className="size-4" /> Editar
                      </button>
                      <button
                        onClick={() => void marcarRealizada(entrevista)}
                        className="inline-flex items-center gap-2 rounded-lg border border-success/35 px-3 py-2 text-sm text-success transition-colors hover:bg-success/10"
                      >
                        <CheckCircle2 className="size-4" /> Realizada
                      </button>
                      <button
                        onClick={() => void borrar(entrevista.id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-destructive/35 px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <Trash2 className="size-4" /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-border bg-surface-2/45 p-4 text-sm text-muted-foreground">
                Todavia no hay entrevistas programadas.
              </p>
            )}
          </Panel>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-6">
            <Panel titulo={editandoId ? "Editar entrevista" : "Programar entrevista"}>
              <div className="space-y-3 text-sm">
                <select
                  value={form.idPostulante}
                  onChange={(event) => setForm((actual) => ({ ...actual, idPostulante: event.target.value }))}
                  className="h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
                >
                  <option value="">Seleccionar postulante</option>
                  {postulantes.map((postulante) => (
                    <option key={postulante.id} value={postulante.id}>
                      {postulante.nombre ?? postulante.email ?? `Postulante ${postulante.id}`}
                    </option>
                  ))}
                </select>
                <select
                  value={form.idPuesto}
                  onChange={(event) => setForm((actual) => ({ ...actual, idPuesto: event.target.value }))}
                  className="h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
                >
                  <option value="">Sin puesto vinculado</option>
                  {puestos.map((puesto) => (
                    <option key={puesto.id} value={puesto.id}>
                      {puesto.nombrePuesto}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={form.fecha}
                    onChange={(event) => setForm((actual) => ({ ...actual, fecha: event.target.value }))}
                    className="h-11 rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
                  />
                  <input
                    type="time"
                    value={form.hora}
                    onChange={(event) => setForm((actual) => ({ ...actual, hora: event.target.value }))}
                    className="h-11 rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={form.modalidad}
                    onChange={(event) => setForm((actual) => ({ ...actual, modalidad: event.target.value }))}
                    className="h-11 rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
                  >
                    <option value="PRESENCIAL">Presencial</option>
                    <option value="VIRTUAL">Virtual</option>
                    <option value="TELEFONICA">Telefonica</option>
                  </select>
                  <select
                    value={form.estado}
                    onChange={(event) => setForm((actual) => ({ ...actual, estado: event.target.value }))}
                    className="h-11 rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
                  >
                    <option value="PROGRAMADA">Programada</option>
                    <option value="REALIZADA">Realizada</option>
                    <option value="CANCELADA">Cancelada</option>
                    <option value="REPROGRAMADA">Reprogramada</option>
                  </select>
                </div>
                <input
                  value={form.ubicacion}
                  onChange={(event) => setForm((actual) => ({ ...actual, ubicacion: event.target.value }))}
                  placeholder="Ubicacion o link"
                  className="h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
                />
                <textarea
                  rows={3}
                  value={form.observaciones}
                  onChange={(event) => setForm((actual) => ({ ...actual, observaciones: event.target.value }))}
                  placeholder="Observaciones previas"
                  className="w-full rounded-lg border border-input bg-surface-2/60 p-3 outline-none focus:ring-2 focus:ring-ring/60"
                />
                <textarea
                  rows={3}
                  value={form.resultado}
                  onChange={(event) => setForm((actual) => ({ ...actual, resultado: event.target.value }))}
                  placeholder="Resultado o feedback de la entrevista"
                  className="w-full rounded-lg border border-input bg-surface-2/60 p-3 outline-none focus:ring-2 focus:ring-ring/60"
                />
                <button
                  onClick={() => void guardar()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <CalendarClock className="size-4" /> {editandoId ? "Guardar cambios" : "Programar"}
                </button>
              </div>
            </Panel>

            <Panel titulo="Proximas">
              <p className="font-display text-3xl font-semibold gradient-text">{proximas.length}</p>
              <p className="mt-1 text-sm text-muted-foreground">Entrevistas pendientes o reprogramadas.</p>
            </Panel>
          </div>
        </Reveal>
      </div>
    </AppShell>
  );
}
