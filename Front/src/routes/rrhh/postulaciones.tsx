import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BrainCircuit, CheckCircle2, FileText, RefreshCw, Search, XCircle } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel, ScoreBar } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import { archivoUrl, getStoredUser, listarPostulacionesAdmin } from "@/lib/api";
import type { PostulacionApi, Usuario } from "@/lib/api";

export const Route = createFileRoute("/rrhh/postulaciones")({
  head: () => ({
    meta: [
      { title: "Postulaciones | SAFE RRHH" },
      {
        name: "description",
        content: "Listado de postulaciones reales con detalle del postulante y resultado del analizador de CV.",
      },
    ],
  }),
  component: PostulacionesRRHH,
});

function iniciales(nombre?: string) {
  return (nombre ?? "P")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function scoreValue(score?: number) {
  return Math.max(0, Math.min(100, Number(score ?? 0)));
}

function fechaVisible(value?: string) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function PostulacionesRRHH() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [postulaciones, setPostulaciones] = useState<PostulacionApi[]>([]);
  const [seleccionado, setSeleccionado] = useState<PostulacionApi | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);

  async function cargarPostulaciones() {
    setCargando(true);
    setMensaje("");

    try {
      const data = await listarPostulacionesAdmin();
      setPostulaciones(data);
      setSeleccionado((actual) => {
        if (!actual) return data[0] ?? null;
        return data.find(
          (item) => item.idPostulante === actual.idPostulante && item.idPuesto === actual.idPuesto,
        ) ?? data[0] ?? null;
      });
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudieron cargar las postulaciones");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    setUsuario(getStoredUser());
    void cargarPostulaciones();
  }, []);

  const filtradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return postulaciones;

    return postulaciones.filter((postulacion) => {
      const campos = [
        postulacion.nombrePostulante,
        postulacion.emailPostulante,
        postulacion.dniPostulante,
        postulacion.nombrePuesto,
        postulacion.estado,
      ];

      return campos.some((campo) => campo?.toLowerCase().includes(termino));
    });
  }, [busqueda, postulaciones]);

  return (
    <AppShell
      titulo="Postulaciones"
      subtitulo="Detalle de candidatos postulados y resultado del analizador IA"
      usuario={usuario?.nombre ?? "RRHH"}
      rol="RRHH"
    >
      {mensaje ? (
        <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {mensaje}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
        <Reveal>
          <Panel
            titulo="Listado de postulaciones"
            accion={
              <button
                onClick={() => void cargarPostulaciones()}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <RefreshCw className="size-4" /> Actualizar
              </button>
            }
          >
            <div className="relative mb-4">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Buscar por postulante, DNI, email, puesto o estado"
                className="h-11 w-full rounded-lg border border-input bg-surface-2/70 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
              />
            </div>

            {cargando ? (
              <p className="text-sm text-muted-foreground">Cargando postulaciones...</p>
            ) : filtradas.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hay postulaciones para mostrar.</p>
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
                    {filtradas.map((postulacion) => (
                      <tr
                        key={`${postulacion.idPostulante}-${postulacion.idPuesto}`}
                        onClick={() => setSeleccionado(postulacion)}
                        className={`cursor-pointer border-t border-border/60 transition-colors ${
                          seleccionado?.idPostulante === postulacion.idPostulante &&
                          seleccionado?.idPuesto === postulacion.idPuesto
                            ? "bg-primary/10"
                            : "hover:bg-surface-2/60"
                        }`}
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <span className="grid size-9 place-items-center rounded-full bg-surface-2 text-xs font-semibold text-primary ring-1 ring-primary/25">
                              {iniciales(postulacion.nombrePostulante)}
                            </span>
                            <div>
                              <p className="font-medium text-foreground">
                                {postulacion.nombrePostulante ?? `Postulante ${postulacion.idPostulante}`}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {postulacion.emailPostulante ?? postulacion.dniPostulante ?? "Sin contacto"}
                              </p>
                            </div>
                          </div>
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

        <Reveal delay={100}>
          <Panel titulo="Detalle de la postulacion" className="h-full">
            {seleccionado ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] font-semibold text-primary-foreground">
                    {iniciales(seleccionado.nombrePostulante)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {seleccionado.nombrePostulante ?? `Postulante ${seleccionado.idPostulante}`}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {seleccionado.emailPostulante ?? "Sin email registrado"}
                    </p>
                  </div>
                </div>

                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-3 border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">DNI</dt>
                    <dd className="text-right">{seleccionado.dniPostulante ?? "Sin dato"}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">Puesto</dt>
                    <dd className="text-right">{seleccionado.nombrePuesto}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">Fecha</dt>
                    <dd className="text-right">{fechaVisible(seleccionado.fechaPostulacion)}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">Estado</dt>
                    <dd className="text-right">{seleccionado.estado}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">Score IA</dt>
                    <dd className="text-right">{seleccionado.scoreIa ?? "Pendiente"}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">CV</dt>
                    <dd className="text-right">
                      {seleccionado.cvUrl ? (
                        <a
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                          href={archivoUrl(seleccionado.cvUrl)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FileText className="size-4" /> Ver CV
                        </a>
                      ) : (
                        "Sin CV"
                      )}
                    </dd>
                  </div>
                </dl>

                <div className="rounded-xl border border-primary/25 bg-primary/8 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium text-primary">
                    <BrainCircuit className="size-4" /> Resultado del analizador IA
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {seleccionado.observacionesIa ?? "Todavia no hay resultado del analizador de CV."}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Decision interna de RRHH</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-success/35 bg-success/12 px-4 py-2.5 text-sm font-medium text-success transition-transform duration-300 hover:-translate-y-0.5">
                      <CheckCircle2 className="size-4" /> Cumple
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-destructive/35 bg-destructive/12 px-4 py-2.5 text-sm font-medium text-destructive transition-transform duration-300 hover:-translate-y-0.5">
                      <XCircle className="size-4" /> No cumple
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Selecciona una postulacion para ver el detalle.</p>
            )}
          </Panel>
        </Reveal>
      </div>
    </AppShell>
  );
}
