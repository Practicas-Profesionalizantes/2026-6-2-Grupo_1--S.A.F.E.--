import { n as __toESM } from "../_runtime.mjs";
import { i as safeApi } from "./api-BbuOh5eW.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./reveal-DMFXkxUi.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as CalendarClock, s as Timer, w as CirclePlay } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DTieWA-t.mjs";
import { t as EstadoBadge } from "./pieces-BdOoTccH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evaluaciones-BpAILvNW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MisEvaluaciones() {
	const [evaluaciones, setEvaluaciones] = (0, import_react.useState)([]);
	const [mensaje, setMensaje] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		safeApi.misEvaluaciones().then((response) => setEvaluaciones(response.data ?? [])).catch((error) => setMensaje(error instanceof Error ? error.message : "No se pudieron cargar evaluaciones"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Mis evaluaciones",
		subtitulo: "Pruebas asignadas por Recursos Humanos",
		usuario: "Postulante",
		rol: "POSTULANTE",
		children: [mensaje ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-5 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive",
			children: mensaje
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: evaluaciones.length ? evaluaciones.map((ev, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * 80,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lift surface-panel flex h-full flex-col rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: ev.nombreEvaluacion
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstadoBadge, { estado: ev.estado })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: ev.tipoEvaluacion
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4 text-primary" }),
									ev.fecha,
									" · ",
									ev.horaInicio,
									" a ",
									ev.horaFin
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-4 text-primary" }),
									"Intento ",
									ev.intento
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-5 flex-1" }),
						ev.estado === "DISPONIBLE" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/evaluacion/$id",
							params: { id: String(ev.id) },
							className: "inline-flex items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-4" }), " Rendir ahora"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center justify-center rounded-lg border border-border bg-surface-2/60 px-4 py-2.5 text-sm text-muted-foreground",
							children: ev.estado === "FINALIZADA" ? "Evaluacion finalizada" : "Fuera del horario habilitado"
						})
					]
				})
			}, ev.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No tenes evaluaciones asignadas."
			})
		})]
	});
}
//#endregion
export { MisEvaluaciones as component };
