import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as cn } from "./reveal-DMFXkxUi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pieces-BdOoTccH.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, valor, delta, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lift surface-panel relative overflow-hidden rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-3xl font-semibold",
					children: valor
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-10 place-items-center rounded-xl border border-primary/25 bg-primary/12 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
				})]
			}),
			delta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-success",
				children: delta
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0 bottom-0 h-px bg-[image:var(--gradient-primary)] opacity-60" })
		]
	});
}
function Panel({ titulo, accion, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("surface-panel rounded-2xl", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-3 border-b border-border/70 px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: titulo
			}), accion]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-5",
			children
		})]
	});
}
var estadoStyles = {
	Pendiente: "bg-muted text-muted-foreground border-border",
	PENDIENTE: "bg-muted text-muted-foreground border-border",
	"En evaluación": "bg-primary/15 text-primary border-primary/30",
	DISPONIBLE: "bg-success/15 text-success border-success/30",
	EN_CURSO: "bg-warning/15 text-warning border-warning/30",
	FINALIZADA: "bg-accent/15 text-accent border-accent/30",
	VENCIDA: "bg-destructive/15 text-destructive border-destructive/30",
	Entrevista: "bg-accent/15 text-accent border-accent/30",
	Aprobado: "bg-success/15 text-success border-success/30",
	Rechazado: "bg-destructive/15 text-destructive border-destructive/30",
	Activa: "bg-success/15 text-success border-success/30",
	Borrador: "bg-warning/15 text-warning border-warning/30",
	Archivada: "bg-muted text-muted-foreground border-border"
};
function EstadoBadge({ estado }) {
	const estadoSeguro = estado || "SIN_ESTADO";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", estadoStyles[estadoSeguro] ?? "bg-muted text-muted-foreground border-border"),
		children: estadoSeguro.replaceAll("_", " ")
	});
}
function ScoreBar({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 w-24 overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full rounded-full", value >= 85 ? "bg-success" : value >= 70 ? "bg-primary" : "bg-warning"),
				style: { width: `${value}%` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm tabular-nums text-foreground",
			children: [value, "%"]
		})]
	});
}
//#endregion
export { StatCard as i, Panel as n, ScoreBar as r, EstadoBadge as t };
