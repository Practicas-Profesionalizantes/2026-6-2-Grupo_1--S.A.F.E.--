import { n as __toESM } from "../_runtime.mjs";
import { i as safeApi } from "./api-BbuOh5eW.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./reveal-DMFXkxUi.mjs";
import { T as CircleCheck, k as BrainCircuit, n as Users, t as Workflow } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DTieWA-t.mjs";
import { i as StatCard, n as Panel, r as ScoreBar, t as EstadoBadge } from "./pieces-BdOoTccH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rrhh-oyeDdhBU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PanelRRHH() {
	const [postulaciones, setPostulaciones] = (0, import_react.useState)([]);
	const [seleccionado, setSeleccionado] = (0, import_react.useState)(null);
	const [mensaje, setMensaje] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		safeApi.adminPostulaciones().then((response) => {
			const data = response.data ?? [];
			setPostulaciones(data);
			setSeleccionado(data[0] ?? null);
		}).catch((error) => setMensaje(error instanceof Error ? error.message : "No se pudieron cargar postulaciones"));
	}, []);
	const analizados = (0, import_react.useMemo)(() => postulaciones.filter((p) => p.scoreIa != null).length, [postulaciones]);
	const enEvaluacion = (0, import_react.useMemo)(() => postulaciones.filter((p) => p.estado === "EN_EVALUACION" || p.estado === "En evaluacion").length, [postulaciones]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Panel de Recursos Humanos",
		subtitulo: "Seguimiento de candidatos y automatizaciones",
		usuario: "RRHH",
		rol: "RRHH",
		children: [
			mensaje ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive",
				children: mensaje
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					{
						label: "Postulaciones",
						valor: String(postulaciones.length),
						delta: "Desde backend",
						icon: Users
					},
					{
						label: "CVs analizados por IA",
						valor: String(analizados),
						delta: "Con score IA",
						icon: BrainCircuit
					},
					{
						label: "En evaluacion",
						valor: String(enEvaluacion),
						delta: "Estado actual",
						icon: CircleCheck
					},
					{
						label: "Flujos n8n",
						valor: "--",
						delta: "Ver n8n",
						icon: Workflow
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
						titulo: "Postulaciones",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "text-left text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium",
											children: "Postulante"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium",
											children: "Puesto"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium",
											children: "Score IA"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium",
											children: "Estado"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: postulaciones.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									onClick: () => setSeleccionado(p),
									className: `cursor-pointer border-t border-border/60 transition-colors ${seleccionado?.idPostulante === p.idPostulante && seleccionado?.idPuesto === p.idPuesto ? "bg-primary/10" : "hover:bg-surface-2/60"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3",
											children: ["Postulante #", p.idPostulante]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-muted-foreground",
											children: p.nombrePuesto
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3",
											children: p.scoreIa != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, { value: Number(p.scoreIa) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Pendiente"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstadoBadge, { estado: p.estado })
										})
									]
								}, `${p.idPostulante}-${p.idPuesto}`)) })]
							})
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 100,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						titulo: "Detalle",
						className: "h-full",
						children: seleccionado ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
								className: "space-y-2",
								children: [
									["Postulante", `#${seleccionado.idPostulante}`],
									["Puesto", seleccionado.nombrePuesto],
									["Estado", seleccionado.estado],
									["Score IA", seleccionado.scoreIa ?? "Pendiente"]
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
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-primary/25 bg-primary/8 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-sm font-medium text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-4" }), " Observacion de IA"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: seleccionado.observacionesIa ?? "El analisis todavia no fue devuelto por n8n."
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No hay postulaciones cargadas."
						})
					})
				})]
			})
		]
	});
}
//#endregion
export { PanelRRHH as component };
