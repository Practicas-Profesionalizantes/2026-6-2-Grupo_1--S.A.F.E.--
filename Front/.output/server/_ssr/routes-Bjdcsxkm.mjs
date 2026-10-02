import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as useScrolled, t as Reveal } from "./reveal-DMFXkxUi.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ClipboardCheck, a as Trophy, j as ArrowRight, k as BrainCircuit, l as Sparkles, t as Workflow, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as embudo } from "./safe-data-DaFgSoAH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bjdcsxkm.js
var import_jsx_runtime = require_jsx_runtime();
var features = [
	{
		icon: BrainCircuit,
		titulo: "Análisis de CV con IA",
		texto: "Cada CV recibe un score de compatibilidad con el puesto y observaciones justificadas."
	},
	{
		icon: ClipboardCheck,
		titulo: "Evaluaciones asignadas",
		texto: "RRHH define fecha, horario y duración. SAFE habilita el acceso solo en esa ventana."
	},
	{
		icon: Sparkles,
		titulo: "Corrección semántica",
		texto: "La IA compara la respuesta esperada con la del postulante y sugiere un puntaje ponderado."
	},
	{
		icon: Workflow,
		titulo: "Automatización n8n",
		texto: "Notificaciones y correos automáticos en cada cambio de estado del proceso."
	},
	{
		icon: Trophy,
		titulo: "Ranking de candidatos",
		texto: "Puntajes, entrevistas y compatibilidad combinados en un ranking siempre actualizado."
	},
	{
		icon: ShieldCheck,
		titulo: "Decisión humana",
		texto: "La IA asiste, nunca decide. La contratación final es responsabilidad de RRHH."
	}
];
function Landing() {
	const scrolled = useScrolled(20);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: `sticky top-0 z-30 border-b transition-all duration-500 ${scrolled ? "topbar-shadow border-primary/25 bg-surface/85 backdrop-blur-xl" : "border-transparent bg-transparent"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] glow-shadow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-primary-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg font-semibold",
								children: "SAFE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Reclutamiento inteligente"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
							children: "Iniciar sesion"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/registro",
							className: "rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5",
							children: "Crear cuenta"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "halo relative overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-20 text-center md:pt-28",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " IA + n8n integrados al proceso de selección"]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 80,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] md:text-6xl",
								children: ["Selección de personal ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gradient-text",
									children: "más rápida y más justa"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 160,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg",
								children: "SAFE centraliza postulantes, analiza CVs, asigna y corrige evaluaciones automáticamente, y genera rankings para que Recursos Humanos decida con información real."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 240,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-9 flex flex-wrap justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/registro",
									className: "group inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5",
									children: ["Crear cuenta de postulante", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform duration-300 group-hover:translate-x-1" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2/60 px-6 py-3 font-medium transition-colors hover:border-primary/40 hover:text-primary",
									children: "Iniciar sesión"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 320,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-16 grid gap-4 sm:grid-cols-4",
								children: embudo.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "surface-panel lift rounded-2xl px-5 py-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-3xl font-semibold gradient-text",
										children: e.valor
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: e.etapa
									})]
								}, e.etapa))
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold md:text-3xl",
					children: "Qué resuelve SAFE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted-foreground",
					children: "Un flujo completo desde la postulación hasta la entrevista final, con trazabilidad de cada acción realizada sobre el candidato."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
					children: features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lift surface-panel h-full rounded-2xl p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-11 place-items-center rounded-xl border border-primary/25 bg-primary/12 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-lg font-semibold",
									children: f.titulo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: f.texto
								})
							]
						})
					}, f.titulo))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-5 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-panel glow-shadow flex flex-col items-start gap-6 rounded-3xl p-8 md:flex-row md:items-center md:justify-between md:p-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold md:text-3xl",
						children: "Acceso seguro por rol"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-muted-foreground",
						children: "Recorré el dashboard del postulante y el panel de Recursos Humanos con datos de ejemplo."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "rounded-xl border border-border bg-surface-2/70 px-5 py-3 text-sm font-medium transition-colors hover:border-primary/40",
							children: "Iniciar sesion"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/registro",
							className: "rounded-xl bg-[image:var(--gradient-primary)] px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5",
							children: "Crear cuenta"
						})]
					})]
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/70 px-5 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto max-w-6xl text-sm text-muted-foreground",
					children: "SAFE — Sistema Inteligente de Reclutamiento y Selección. Prototipo de interfaz."
				})
			})
		]
	});
}
//#endregion
export { Landing as component };
