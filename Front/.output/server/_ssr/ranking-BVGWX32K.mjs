import { n as __toESM } from "../_runtime.mjs";
import { i as safeApi } from "./api-BbuOh5eW.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./reveal-DMFXkxUi.mjs";
import { a as Trophy } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DTieWA-t.mjs";
import { n as Panel, r as ScoreBar } from "./pieces-BdOoTccH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ranking-BVGWX32K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Ranking() {
	const [ranking, setRanking] = (0, import_react.useState)([]);
	const [mensaje, setMensaje] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		safeApi.ranking().then((response) => setRanking(response.data ?? [])).catch((error) => setMensaje(error instanceof Error ? error.message : "No se pudo cargar el ranking"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Ranking de candidatos",
		subtitulo: "Generado a partir de evaluaciones y analisis de IA",
		usuario: "RRHH",
		rol: "RRHH",
		children: [mensaje ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-5 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive",
			children: mensaje
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				className: "xl:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					titulo: "Posiciones",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: ranking.length ? ranking.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "lift flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface-2/45 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid size-10 shrink-0 place-items-center rounded-xl font-display font-semibold ${i === 0 ? "bg-[image:var(--gradient-primary)] text-primary-foreground glow-shadow" : "border border-border bg-surface text-muted-foreground"}`,
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-40 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-medium",
										children: ["Postulante #", r.idPostulante]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Ranking backend"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, { value: Number(r.promedioFinal ?? 0) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Promedio final"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-2xl font-semibold gradient-text",
										children: r.promedioFinal
									})]
								})
							]
						}, r.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted-foreground",
							children: "Todavia no hay datos de ranking."
						})
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 100,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					titulo: "Criterios del ranking",
					className: "h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3 text-sm text-muted-foreground",
						children: [
							"Score IA del CV",
							"Puntajes de evaluaciones",
							"Compatibilidad con el puesto",
							"Experiencia laboral",
							"Resultado de entrevistas"
						].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "mt-0.5 size-4 shrink-0 text-primary" }), c]
						}, c))
					})
				})
			})]
		})]
	});
}
//#endregion
export { Ranking as component };
