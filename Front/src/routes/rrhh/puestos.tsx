import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { Panel } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import {
  actualizarPuesto,
  crearPuesto,
  eliminarPuesto,
  getStoredUser,
  listarPuestosAdmin,
} from "@/lib/api";
import type { PuestoApi, Usuario } from "@/lib/api";

export const Route = createFileRoute("/rrhh/puestos")({
  head: () => ({
    meta: [
      { title: "Gestion de puestos | SAFE RRHH" },
      {
        name: "description",
        content: "Crear, editar, eliminar y listar puestos disponibles desde el panel de RRHH.",
      },
    ],
  }),
  component: PuestosRRHH,
});

const emptyForm = {
  nombrePuesto: "",
  tipo: "",
  requisitos: "",
};

function PuestosRRHH() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [puestos, setPuestos] = useState<PuestoApi[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [mensaje, setMensaje] = useState("");

  async function cargarPuestos() {
    try {
      setPuestos(await listarPuestosAdmin());
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudieron cargar los puestos");
    }
  }

  useEffect(() => {
    setUsuario(getStoredUser());
    void cargarPuestos();
  }, []);

  function editar(puesto: PuestoApi) {
    setEditandoId(puesto.id);
    setForm({
      nombrePuesto: puesto.nombrePuesto,
      tipo: puesto.tipo,
      requisitos: puesto.requisitos,
    });
  }

  async function guardar() {
    setMensaje("");

    try {
      if (editandoId) {
        await actualizarPuesto(editandoId, form);
        setMensaje("Puesto actualizado correctamente");
      } else {
        await crearPuesto(form);
        setMensaje("Puesto creado correctamente");
      }

      setEditandoId(null);
      setForm(emptyForm);
      await cargarPuestos();
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo guardar el puesto");
    }
  }

  async function borrar(id: number) {
    setMensaje("");

    try {
      await eliminarPuesto(id);
      await cargarPuestos();
      setMensaje("Puesto eliminado correctamente");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo eliminar el puesto");
    }
  }

  return (
    <AppShell
      titulo="Puestos"
      subtitulo="Crear, editar, eliminar y listar vacantes"
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
          <Panel titulo="Listado de puestos">
            <ul className="space-y-3">
              {puestos.map((puesto) => (
                <li
                  key={puesto.id}
                  className="lift rounded-xl border border-border bg-surface-2/45 p-4 md:flex md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-medium">{puesto.nombrePuesto}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {puesto.tipo} · {puesto.requisitos}
                    </p>
                  </div>
                  <div className="mt-3 flex gap-2 md:mt-0">
                    <button
                      onClick={() => editar(puesto)}
                      className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      title="Editar puesto"
                    >
                      <Save className="size-4" />
                    </button>
                    <button
                      onClick={() => void borrar(puesto.id)}
                      className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
                      title="Eliminar puesto"
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
          <Panel titulo={editandoId ? "Editar puesto" : "Nuevo puesto"} className="h-full">
            <div className="space-y-4 text-sm">
              <label className="block">
                <span className="text-muted-foreground">Nombre</span>
                <input
                  value={form.nombrePuesto}
                  onChange={(event) => setForm((actual) => ({ ...actual, nombrePuesto: event.target.value }))}
                  className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
                />
              </label>
              <label className="block">
                <span className="text-muted-foreground">Tipo</span>
                <input
                  value={form.tipo}
                  onChange={(event) => setForm((actual) => ({ ...actual, tipo: event.target.value }))}
                  className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 outline-none focus:ring-2 focus:ring-ring/60"
                />
              </label>
              <label className="block">
                <span className="text-muted-foreground">Requisitos</span>
                <textarea
                  rows={5}
                  value={form.requisitos}
                  onChange={(event) => setForm((actual) => ({ ...actual, requisitos: event.target.value }))}
                  className="mt-1.5 w-full rounded-lg border border-input bg-surface-2/60 p-3 outline-none focus:ring-2 focus:ring-ring/60"
                />
              </label>
              <button
                onClick={() => void guardar()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Plus className="size-4" /> {editandoId ? "Guardar cambios" : "Crear puesto"}
              </button>
            </div>
          </Panel>
        </Reveal>
      </div>
    </AppShell>
  );
}
