import { n as __toESM } from "../_runtime.mjs";
import { i as safeApi } from "./api-BbuOh5eW.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./reveal-DMFXkxUi.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as CalendarClock, O as BriefcaseBusiness, S as ClipboardList, c as Star, s as Timer } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DTieWA-t.mjs";
import { i as StatCard, n as Panel, r as ScoreBar, t as EstadoBadge } from "./pieces-BdOoTccH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BELsSMLO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPostulante() {
	const [perfil, setPerfil] = (0, import_react.useState)(null);
	const [postulaciones, setPostulaciones] = (0, import_react.useState)([]);
	const [evaluaciones, setEvaluaciones] = (0, import_react.useState)([]);
	const [puestos, setPuestos] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		Promise.allSettled([
			safeApi.perfil().then(setPerfil),
			safeApi.postulaciones().then((r) => setPostulaciones(r.data ?? [])),
			safeApi.misEvaluaciones().then((r) => setEvaluaciones(r.data ?? [])),
			safeApi.puestos().then((r) => setPuestos(r.data ?? []))
		]);
	}, []);
	const score = postulaciones.find((p) => p.scoreIa != null)?.scoreIa ?? 0;
	const usuario = perfil?.nombre || "Postulante";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: `Hola, ${usuario.split(" ")[0]}`,
		subtitulo: "Estado de tus procesos de seleccion",
		usuario,
		rol: "POSTULANTE",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					{
						label: "Postulaciones",
						valor: String(postulaciones.length),
						delta: "Procesos activos",
						icon: BriefcaseBusiness
					},
					{
						label: "Evaluaciones asignadas",
						valor: String(evaluaciones.length),
						delta: "Segun RRHH",
						icon: ClipboardList
					},
					{
						label: "Score IA de tu CV",
						valor: score ? `${score}%` : "--",
						delta: "Resultado n8n",
						icon: Star
					},
					{
						label: "Proxima instancia",
						valor: evaluaciones[0]?.fecha ?? "--",
						delta: evaluaciones[0]?.nombreEvaluacion ?? "Sin asignar",
						icon: CalendarClock
					}
				].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 60,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { ...s })
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 xl:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "xl:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						titulo: "Evaluaciones asignadas",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: evaluaciones.length ? evaluaciones.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "lift rounded-xl border border-border bg-surface-2/50 p-4 md:flex md:items-center md:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: ev.nombreEvaluacion
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstadoBadge, { estado: ev.estado })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										ev.tipoEvaluacion,
										" · ",
										ev.fecha,
										" · ",
										ev.horaInicio,
										" a ",
										ev.horaFin
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center gap-3 md:mt-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-4" }),
											" intento ",
											ev.intento
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/evaluaciones",
										className: "rounded-lg border border-primary/35 px-3 py-1.5 text-sm text-primary",
										children: "Ver"
									})]
								})]
							}, ev.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted-foreground",
								children: "No tenes evaluaciones asignadas."
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 100,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						titulo: "Mi perfil profesional",
						className: "h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Completitud del perfil"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, { value: perfil?.cvUrl ? 80 : 45 })
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
									className: "space-y-2",
									children: [
										["CV", perfil?.cvUrl || "Sin cargar"],
										["Experiencia", perfil?.experienciaLaboral || "Sin cargar"],
										["Estudios", perfil?.estudios || "Sin cargar"]
									].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between gap-3 border-b border-border/60 pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-muted-foreground",
											children: k
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "text-right",
											children: v
										})]
									}, k))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/perfil",
									className: "inline-flex w-full items-center justify-center rounded-lg border border-border bg-surface-2/70 px-4 py-2.5 font-medium hover:border-primary/40",
									children: "Actualizar perfil"
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 xl:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					titulo: "Mis postulaciones",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-4",
						children: postulaciones.length ? postulaciones.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-border bg-surface-2/40 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: p.nombrePuesto
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstadoBadge, { estado: p.estado })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: ["Score IA: ", p.scoreIa ?? "pendiente"]
								}),
								p.observacionesIa ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: p.observacionesIa
								}) : null
							]
						}, `${p.idPostulante}-${p.idPuesto}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted-foreground",
							children: "Todavia no tenes postulaciones."
						})
					})
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 100,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						titulo: "Puestos disponibles",
						accion: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/puestos",
							className: "text-sm text-primary hover:underline",
							children: "Ver todos"
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: puestos.slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-xl border border-border bg-surface-2/40 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: p.nombrePuesto
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: p.tipo
								})]
							}, p.id))
						})
					})
				})]
			})
		]
	});
}
//#endregion
export { DashboardPostulante as component };
