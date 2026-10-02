import { n as __toESM } from "../_runtime.mjs";
import { i as safeApi, r as normalizeRole } from "./api-BbuOh5eW.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./reveal-DMFXkxUi.mjs";
import { g as MapPin, h as Pencil, m as Plus, o as Trash2, r as UsersRound } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DTieWA-t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/puestos-C4uSxHea.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var formInicial = {
	nombrePuesto: "",
	tipo: "",
	requisitos: ""
};
function Puestos() {
	const [rolVista, setRolVista] = (0, import_react.useState)("POSTULANTE");
	const [puestos, setPuestos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [guardando, setGuardando] = (0, import_react.useState)(false);
	const [mensaje, setMensaje] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)(formInicial);
	const esRRHH = rolVista === "RRHH";
	const titulo = esRRHH ? "Gestion de puestos" : "Puestos disponibles";
	const subtitulo = esRRHH ? "Crea y administra las vacantes publicadas" : "Vacantes abiertas para tu perfil";
	const requisitosFormateados = (0, import_react.useMemo)(() => form.requisitos.split(",").map((r) => r.trim()).filter(Boolean), [form.requisitos]);
	async function cargar() {
		setLoading(true);
		try {
			const [puestosResponse, meResponse] = await Promise.all([safeApi.puestos(), safeApi.me()]);
			const rolNormalizado = normalizeRole(meResponse.user.rol);
			setRolVista(rolNormalizado === "ADMIN" || rolNormalizado === "RRHH" ? "RRHH" : "POSTULANTE");
			setPuestos(puestosResponse.data ?? []);
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudieron cargar los puestos");
		} finally {
			setLoading(false);
		}
	}
	async function postular(idPuesto) {
		setMensaje("");
		try {
			const response = await safeApi.postularse(idPuesto);
			setMensaje(response.message ?? "Postulacion realizada. Revisar analisis en n8n.");
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudo realizar la postulacion");
		}
	}
	async function guardarPuesto(event) {
		event.preventDefault();
		setMensaje("");
		setGuardando(true);
		const payload = {
			nombrePuesto: form.nombrePuesto.trim(),
			tipo: form.tipo.trim(),
			requisitos: form.requisitos.trim()
		};
		try {
			if (form.id) {
				await safeApi.actualizarPuesto(form.id, payload);
				setMensaje("Puesto actualizado correctamente.");
			} else {
				await safeApi.crearPuesto(payload);
				setMensaje("Puesto creado correctamente.");
			}
			setForm(formInicial);
			await cargar();
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudo guardar el puesto");
		} finally {
			setGuardando(false);
		}
	}
	async function eliminarPuesto(id) {
		setMensaje("");
		try {
			await safeApi.eliminarPuesto(id);
			setMensaje("Puesto eliminado correctamente.");
			await cargar();
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudo eliminar el puesto");
		}
	}
	function editarPuesto(puesto) {
		setForm({
			id: puesto.id,
			nombrePuesto: puesto.nombrePuesto,
			tipo: puesto.tipo,
			requisitos: puesto.requisitos
		});
	}
	(0, import_react.useEffect)(() => {
		cargar();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo,
		subtitulo,
		usuario: esRRHH ? "Recursos Humanos" : "Postulante",
		rol: rolVista,
		children: [
			mensaje ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 rounded-xl border border-primary/25 bg-primary/8 p-4 text-sm text-muted-foreground",
				children: mensaje
			}) : null,
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Cargando puestos..."
			}) : null,
			esRRHH ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-[420px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: guardarPuesto,
					className: "surface-panel rounded-2xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold",
								children: form.id ? "Editar puesto" : "Crear puesto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Publica una vacante disponible para postulantes."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-sm font-medium",
									children: ["Nombre del puesto", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.nombrePuesto,
										onChange: (event) => setForm((actual) => ({
											...actual,
											nombrePuesto: event.target.value
										})),
										required: true,
										className: "mt-2 h-11 w-full rounded-lg border border-input bg-surface-2/70 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60",
										placeholder: "Ej: Operario de deposito"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-sm font-medium",
									children: ["Tipo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.tipo,
										onChange: (event) => setForm((actual) => ({
											...actual,
											tipo: event.target.value
										})),
										required: true,
										className: "mt-2 h-11 w-full rounded-lg border border-input bg-surface-2/70 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60",
										placeholder: "Ej: Full-time, presencial"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block text-sm font-medium",
									children: ["Requisitos", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: form.requisitos,
										onChange: (event) => setForm((actual) => ({
											...actual,
											requisitos: event.target.value
										})),
										required: true,
										rows: 5,
										className: "mt-2 w-full resize-none rounded-lg border border-input bg-surface-2/70 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring/60",
										placeholder: "Separalos por coma para verlos como etiquetas"
									})]
								})
							]
						}),
						requisitosFormateados.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: requisitosFormateados.map((requisito) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-lg border border-border bg-surface-2/60 px-2.5 py-1 text-xs text-muted-foreground",
								children: requisito
							}, requisito))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: guardando,
								className: "rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60",
								children: guardando ? "Guardando..." : form.id ? "Guardar cambios" : "Crear puesto"
							}), form.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setForm(formInicial),
								className: "rounded-lg border border-border bg-surface-2/70 px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40",
								children: "Cancelar"
							}) : null]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4",
					children: puestos.map((puesto, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 50,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "surface-panel rounded-2xl p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 md:flex-row md:items-start md:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold",
									children: puesto.nombrePuesto
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: puesto.tipo
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => editarPuesto(puesto),
										className: "grid size-10 place-items-center rounded-lg border border-border bg-surface-2/70 text-muted-foreground transition-colors hover:text-foreground",
										title: "Editar puesto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => eliminarPuesto(puesto.id),
										className: "grid size-10 place-items-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive transition-colors hover:bg-destructive/15",
										title: "Eliminar puesto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: puesto.requisitos.split(",").map((r) => r.trim()).filter(Boolean).map((requisito) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-lg border border-border bg-surface-2/60 px-2.5 py-1 text-xs text-muted-foreground",
									children: requisito
								}, requisito))
							})]
						})
					}, puesto.id))
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: puestos.map((p, i) => {
					const requisitos = p.requisitos?.split(",").map((r) => r.trim()).filter(Boolean) ?? [];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lift surface-panel h-full rounded-2xl p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg font-semibold",
										children: p.nombrePuesto
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: p.tipo
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary",
										children: ["#", p.id]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex flex-wrap gap-2",
									children: (requisitos.length ? requisitos : [p.requisitos]).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-lg border border-border bg-surface-2/60 px-2.5 py-1 text-xs text-muted-foreground",
										children: r
									}, r))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex items-center justify-between gap-4 border-t border-border/70 pt-4 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), " SAFE"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { className: "size-4" }), " Postulaciones"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => postular(p.id),
											className: "rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5",
											children: "Postularme"
										})
									]
								})
							]
						})
					}, p.id);
				})
			})
		]
	});
}
//#endregion
export { Puestos as component };
