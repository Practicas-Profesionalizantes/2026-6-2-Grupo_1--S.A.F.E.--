import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrainCircuit, BriefcaseBusiness, CheckCircle2, Plus, Trash2, Users, Workflow, XCircle } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel, ScoreBar, StatCard } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import type { Postulante } from "@/lib/safe-data";
import { actividadReciente, correccionesIA, embudo, postulantes } from "@/lib/safe-data";
import { crearPuesto, eliminarPuesto, getStoredUser, listarPuestosAdmin } from "@/lib/api";
import type { PuestoApi, Usuario } from "@/lib/api";

export const Route = createFileRoute("/rrhh/")({
  head: () => ({
    meta: [
      { title: "Panel RRHH | SAFE" },
      {
        name: "description",
        content:
          "Panel de Recursos Humanos: postulantes, score IA de cada CV, decisiones del proceso y actividad automatizada.",
      },
      { property: "og:title", content: "Panel RRHH | SAFE" },
      {
        property: "og:description",
        content: "Gestión de postulantes con score IA, estados del proceso y automatizaciones n8n.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PanelRRHH,
});

function PanelRRHH() {
  const [seleccionado, setSeleccionado] = useState<Postulante>(postulantes[0]!);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [puestos, setPuestos] = useState<PuestoApi[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [puestoForm, setPuestoForm] = useState({
    nombrePuesto: "",
    tipo: "",
    requisitos: "",
  });

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

  async function guardarPuesto() {
    setMensaje("");
    try {
      await crearPuesto(puestoForm);
      setPuestoForm({ nombrePuesto: "", tipo: "", requisitos: "" });
      await cargarPuestos();
      setMensaje("Puesto creado correctamente");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo crear el puesto");
    }
  }

  async function borrarPuesto(id: number) {
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
      titulo="Panel de Recursos Humanos"
      subtitulo="Seguimiento de candidatos y automatizaciones"
      usuario={usuario?.nombre ?? "RRHH"}
      rol="RRHH"
    >
      {mensaje ? (
        <div className="mb-5 rounded-xl border border-primary/25 bg-primary/8 px-4 py-3 text-sm text-primary">
          {mensaje}
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Postulaciones", valor: "248", delta: "+18 esta semana", icon: Users },
          { label: "CVs analizados por IA", valor: "236", delta: "95% de cobertura", icon: BrainCircuit },
          { label: "En evaluación", valor: "126", delta: "42 con horario asignado", icon: CheckCircle2 },
          { label: "Flujos n8n ejecutados", valor: "1.204", delta: "0 errores en 24 h", icon: Workflow },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 60}>
            <StatCard {...s} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Panel titulo="Gestion de puestos">
            <ul className="space-y-3">
              {puestos.map((puesto) => (
                <li
                  key={puesto.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface-2/45 p-4"
                >
                  <div>
                    <p className="font-medium">{puesto.nombrePuesto}</p>
                    <p className="text-sm text-muted-foreground">
                      {puesto.tipo} · {puesto.requisitos}
                    </p>
                  </div>
                  <button
                    onClick={() => void borrarPuesto(puesto.id)}
                    className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
                    title="Eliminar puesto"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal delay={80}>
          <Panel titulo="Nuevo puesto">
            <div className="space-y-3 text-sm">
              <input
                value={puestoForm.nombrePuesto}
                onChange={(event) => setPuestoForm((actual) => ({ ...actual, nombrePuesto: event.target.value }))}
                placeholder="Nombre del puesto"
                className="h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
              />
              <input
                value={puestoForm.tipo}
                onChange={(event) => setPuestoForm((actual) => ({ ...actual, tipo: event.target.value }))}
                placeholder="Tipo"
                className="h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
              />
              <textarea
                value={puestoForm.requisitos}
                onChange={(event) => setPuestoForm((actual) => ({ ...actual, requisitos: event.target.value }))}
                rows={3}
                placeholder="Requisitos separados por coma"
                className="w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
              />
              <button
                onClick={() => void guardarPuesto()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Plus className="size-4" /> Crear puesto
              </button>
            </div>
          </Panel>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Panel titulo="Postulantes">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Postulante</th>
                    <th className="pb-3 font-medium">Puesto</th>
                    <th className="pb-3 font-medium">Score IA</th>
                    <th className="pb-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {postulantes.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => setSeleccionado(p)}
                      className={`cursor-pointer border-t border-border/60 transition-colors ${
                        seleccionado.id === p.id ? "bg-primary/10" : "hover:bg-surface-2/60"
                      }`}
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 place-items-center rounded-full bg-surface-2 text-xs font-semibold text-primary ring-1 ring-primary/25">
                            {p.avatar}
                          </span>
                          <div>
                            <p className="font-medium text-foreground">{p.nombre}</p>
                            <p className="text-xs text-muted-foreground">DNI {p.dni}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">{p.puesto}</td>
                      <td className="py-3">
                        <ScoreBar value={p.scoreIA} />
                      </td>
                      <td className="py-3">
                        <EstadoBadge estado={p.estado} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={100}>
          <Panel titulo="Detalle del postulante" className="h-full">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] font-semibold text-primary-foreground">
                {seleccionado.avatar}
              </span>
              <div>
                <p className="font-semibold">{seleccionado.nombre}</p>
                <p className="text-sm text-muted-foreground">{seleccionado.email}</p>
              </div>
            </div>

            <dl className="mt-5 space-y-2 text-sm">
              {[
                ["Puesto", seleccionado.puesto],
                ["Experiencia", seleccionado.experiencia],
                ["Estado", seleccionado.estado],
                ["CV", "Descargar PDF"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-border/60 pb-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-xl border border-primary/25 bg-primary/8 p-4">
              <p className="flex items-center gap-2 text-sm font-medium text-primary">
                <BrainCircuit className="size-4" /> Observación de la IA
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{seleccionado.observacionIA}</p>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">Decisión inicial de RRHH</p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-success/35 bg-success/12 px-4 py-2.5 text-sm font-medium text-success transition-transform duration-300 hover:-translate-y-0.5">
                <CheckCircle2 className="size-4" /> Cumple
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-destructive/35 bg-destructive/12 px-4 py-2.5 text-sm font-medium text-destructive transition-transform duration-300 hover:-translate-y-0.5">
                <XCircle className="size-4" /> No cumple
              </button>
            </div>
          </Panel>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Panel titulo="Corrección automática de evaluaciones">
            <ul className="space-y-4">
              {correccionesIA.map((c) => (
                <li key={c.pregunta} className="rounded-xl border border-border bg-surface-2/40 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-medium">{c.pregunta}</p>
                    <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                      {c.puntaje}/{c.peso} pts
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <span className="text-foreground">Esperada:</span> {c.respuestaEsperada}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="text-foreground">Postulante:</span> {c.respuestaPostulante}
                  </p>
                  <p className="mt-3 border-l-2 border-accent/60 pl-3 text-sm italic text-muted-foreground">
                    {c.justificacion}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={80}>
            <Panel titulo="Embudo de selección">
              <ul className="space-y-4">
                {embudo.map((e) => (
                  <li key={e.etapa}>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{e.etapa}</span>
                      <span className="tabular-nums">{e.valor}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-[image:var(--gradient-primary)]"
                        style={{ width: `${(e.valor / embudo[0]!.valor) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          <Reveal delay={140}>
            <Panel titulo="Actividad reciente">
              <ol className="relative space-y-4 border-l border-border pl-4">
                {actividadReciente.map((a) => (
                  <li key={a.texto} className="relative">
                    <span className="absolute -left-[21px] top-1.5 size-2 rounded-full bg-primary shadow-[var(--shadow-glow)]" />
                    <p className="text-sm">{a.texto}</p>
                    <p className="text-xs text-muted-foreground">{a.hora}</p>
                  </li>
                ))}
              </ol>
            </Panel>
          </Reveal>
        </div>
      </div>
    </AppShell>
  );
}
