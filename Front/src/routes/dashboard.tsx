import { createFileRoute, Link } from "@tanstack/react-router";
import { BriefcaseBusiness, CalendarClock, ClipboardList, FileText, RefreshCw, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/safe/app-shell";
import { EstadoBadge, Panel, ScoreBar, StatCard } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import { archivoUrl, getStoredUser, listarEvaluacionesAsignadas, listarMisPostulaciones, listarPuestos, obtenerPerfil } from "@/lib/api";
import type { EvaluacionAsignadaApi, PostulacionApi, PostulanteApi, PuestoApi, Usuario } from "@/lib/api";

export const Route = createFileRoute("/dashboard")({ component: DashboardPostulante });

function fecha(value?: string) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("es-AR");
}

function DashboardPostulante() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [perfil, setPerfil] = useState<PostulanteApi | null>(null);
  const [postulaciones, setPostulaciones] = useState<PostulacionApi[]>([]);
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionAsignadaApi[]>([]);
  const [puestos, setPuestos] = useState<PuestoApi[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  async function cargar() {
    setCargando(true); setError("");
    try {
      const [perfilData, postulacionesData, evaluacionesData, puestosData] = await Promise.all([
        obtenerPerfil(), listarMisPostulaciones(), listarEvaluacionesAsignadas(), listarPuestos(),
      ]);
      setPerfil(perfilData); setPostulaciones(postulacionesData); setEvaluaciones(evaluacionesData); setPuestos(puestosData);
    } catch (err) { setError(err instanceof Error ? err.message : "No se pudieron cargar tus datos"); }
    finally { setCargando(false); }
  }

  useEffect(() => { setUsuario(getStoredUser()); void cargar(); }, []);
  const scores = postulaciones.map((item) => item.scoreIa).filter((score): score is number => score != null);
  const promedio = scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : null;
  const activa = evaluaciones.find((item) => item.estado === "DISPONIBLE" || item.estado === "EN_CURSO");
  const camposPerfil = [perfil?.telefono, perfil?.direccion, perfil?.fechaNacimiento, perfil?.estudios, perfil?.experienciaLaboral, perfil?.cvUrl];
  const nombreVisible = perfil?.nombre ?? usuario?.nombre ?? "Postulante";
  const completitud = Math.round((camposPerfil.filter(Boolean).length / camposPerfil.length) * 100);
  const disponibles = puestos.filter((puesto) => !postulaciones.some((postulacion) => postulacion.idPuesto === puesto.id)).slice(0, 3);

  return <AppShell titulo={`Hola, ${nombreVisible.split(" ")[0]}`} subtitulo="Estado real de tus procesos de selección" usuario={nombreVisible} rol="POSTULANTE">
    <div className="mb-5 flex justify-end"><button onClick={() => void cargar()} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary"><RefreshCw className="size-4" /> Actualizar datos</button></div>
    {error ? <p className="mb-5 rounded-lg border border-destructive/35 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p> : null}
    {cargando ? <p className="rounded-xl border border-border p-5 text-sm text-muted-foreground">Cargando información real...</p> : null}
    {!cargando ? <>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{[
        { label: "Postulaciones", valor: String(postulaciones.length), delta: "Registradas en SAFE", icon: BriefcaseBusiness },
        { label: "Evaluaciones", valor: String(evaluaciones.length), delta: activa ? "Hay una disponible" : "Sin evaluaciones activas", icon: ClipboardList },
        { label: "Score promedio CV", valor: promedio == null ? "Sin datos" : `${promedio}%`, delta: "Resultado guardado", icon: FileText },
        { label: "Próxima evaluación", valor: activa?.fecha ? fecha(activa.fecha) : "Sin fecha", delta: activa?.nombreEvaluacion ?? "No asignada", icon: CalendarClock },
      ].map((stat, index) => <Reveal key={stat.label} delay={index * 60}><StatCard {...stat} /></Reveal>)}</div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3"><Reveal className="xl:col-span-2"><Panel titulo="Evaluaciones asignadas">
        {evaluaciones.length ? <ul className="space-y-3">{evaluaciones.map((ev) => <li key={ev.id} className="lift rounded-xl border border-border bg-surface-2/50 p-4 md:flex md:items-center md:justify-between"><div><div className="flex flex-wrap items-center gap-2"><p className="font-medium">{ev.nombreEvaluacion}</p><EstadoBadge estado={ev.estado} /></div><p className="mt-1 text-sm text-muted-foreground">{ev.tipoEvaluacion} · {fecha(ev.fecha)} · {ev.horaInicio ?? "Sin inicio"} a {ev.horaFin ?? "Sin fin"}</p></div><div className="mt-3 flex items-center gap-3 md:mt-0"><span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><Timer className="size-4" />{ev.duracion ?? "-"} min</span><Link to="/evaluacion/$id" params={{ id: String(ev.id) }} className="rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-semibold text-primary-foreground">{ev.estado === "FINALIZADA" ? "Ver resultado" : "Abrir"}</Link></div></li>)}</ul> : <p className="text-sm text-muted-foreground">Todavía no tenés evaluaciones asignadas.</p>}
      </Panel></Reveal><Reveal delay={100}><Panel titulo="Mi perfil profesional" className="h-full">{perfil ? <div className="space-y-4 text-sm"><div><p className="text-muted-foreground">Completitud del perfil</p><div className="mt-2"><ScoreBar value={completitud} /></div></div><dl className="space-y-2"><div className="flex justify-between border-b border-border/60 pb-2"><dt className="text-muted-foreground">CV</dt><dd>{perfil.cvUrl ? <a className="text-primary hover:underline" href={archivoUrl(perfil.cvUrl)} target="_blank" rel="noreferrer">Ver CV</a> : "No cargado"}</dd></div><div className="flex justify-between gap-3 border-b border-border/60 pb-2"><dt className="text-muted-foreground">Estudios</dt><dd className="max-w-[60%] text-right">{perfil.estudios || "Sin completar"}</dd></div><div className="flex justify-between gap-3 border-b border-border/60 pb-2"><dt className="text-muted-foreground">Experiencia</dt><dd className="max-w-[60%] text-right">{perfil.experienciaLaboral || "Sin completar"}</dd></div></dl><Link to="/perfil" className="inline-flex w-full justify-center rounded-lg border border-border bg-surface-2/70 px-4 py-2.5 font-medium hover:border-primary/40">Actualizar perfil</Link></div> : <p className="text-sm text-muted-foreground">Todavía no completaste tu perfil.</p>}</Panel></Reveal></div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2"><Reveal><Panel titulo="Mis postulaciones">{postulaciones.length ? <ul className="space-y-4">{postulaciones.map((item) => <li key={`${item.idPostulante}-${item.idPuesto}`} className="rounded-xl border border-border bg-surface-2/40 p-4"><div className="flex items-center justify-between gap-3"><p className="font-medium">{item.nombrePuesto}</p><EstadoBadge estado={item.estado} /></div><p className="mt-1 text-sm text-muted-foreground">Postulado el {fecha(item.fechaPostulacion)}</p>{item.scoreIa != null ? <div className="mt-3"><ScoreBar value={item.scoreIa} /></div> : null}</li>)}</ul> : <p className="text-sm text-muted-foreground">Todavía no realizaste postulaciones.</p>}</Panel></Reveal><Reveal delay={100}><Panel titulo="Puestos disponibles"><ul className="space-y-3">{disponibles.length ? disponibles.map((puesto) => <li key={puesto.id} className="lift rounded-xl border border-border bg-surface-2/40 p-4"><p className="font-medium">{puesto.nombrePuesto}</p><p className="mt-1 text-sm text-muted-foreground">{puesto.tipo}</p><Link to="/puestos" className="mt-3 inline-block text-sm text-primary hover:underline">Ver puesto</Link></li>) : <li className="text-sm text-muted-foreground">No hay puestos nuevos para mostrar.</li>}</ul></Panel></Reveal></div>
    </> : null}
  </AppShell>;
}
