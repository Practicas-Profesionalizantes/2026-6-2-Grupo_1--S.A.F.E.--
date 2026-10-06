import { n as __toESM } from "../_runtime.mjs";
import { i as safeApi } from "./api-BbuOh5eW.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./reveal-DMFXkxUi.mjs";
import { D as CalendarClock, S as ClipboardList, h as Pencil, m as Plus, o as Trash2 } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DTieWA-t.mjs";
import { n as Panel, t as EstadoBadge } from "./pieces-BdOoTccH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evaluaciones-Bows-Knw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var evaluacionInicial = {
	nombre: "",
	tipo: "TECNICA",
	descripcion: "",
	duracion: 60,
	puntajeMin: 60,
	puntajeMax: 100,
	online: true,
	idPuesto: "",
	estado: "ACTIVA"
};
var preguntaInicial = {
	pregunta: "",
	tipo: "DESARROLLO",
	respuestaCorrecta: "",
	peso: 1
};
function EvaluacionesRRHH() {
	const [evaluaciones, setEvaluaciones] = (0, import_react.useState)([]);
	const [asignaciones, setAsignaciones] = (0, import_react.useState)([]);
	const [postulantes, setPostulantes] = (0, import_react.useState)([]);
	const [puestos, setPuestos] = (0, import_react.useState)([]);
	const [preguntas, setPreguntas] = (0, import_react.useState)([]);
	const [evaluacionSeleccionada, setEvaluacionSeleccionada] = (0, import_react.useState)(null);
	const [mensaje, setMensaje] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [guardando, setGuardando] = (0, import_react.useState)(false);
	const [evaluacionForm, setEvaluacionForm] = (0, import_react.useState)(evaluacionInicial);
	const [preguntaForm, setPreguntaForm] = (0, import_react.useState)(preguntaInicial);
	const [asignacion, setAsignacion] = (0, import_react.useState)({
		idEvaluacion: "",
		idPostulante: "",
		fecha: "",
		horaInicio: "10:00",
		horaFin: "11:00",
		observaciones: ""
	});
	const evaluacionActiva = (0, import_react.useMemo)(() => evaluaciones.find((evaluacion) => evaluacion.id === evaluacionSeleccionada), [evaluaciones, evaluacionSeleccionada]);
	async function cargar() {
		setLoading(true);
		try {
			const [evs, posts, puestosResponse, asignacionesResponse] = await Promise.all([
				safeApi.evaluaciones(),
				safeApi.adminPostulantes(),
				safeApi.puestos(),
				safeApi.asignaciones()
			]);
			const listaEvaluaciones = evs.data ?? [];
			setEvaluaciones(listaEvaluaciones);
			setPostulantes(posts.data ?? []);
			setPuestos(puestosResponse.data ?? []);
			setAsignaciones(asignacionesResponse.data ?? []);
			setEvaluacionSeleccionada((actual) => actual ?? listaEvaluaciones[0]?.id ?? null);
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudieron cargar datos");
		} finally {
			setLoading(false);
		}
	}
	async function cargarPreguntas(idEvaluacion) {
		if (!idEvaluacion) {
			setPreguntas([]);
			return;
		}
		try {
			const response = await safeApi.preguntas(idEvaluacion);
			setPreguntas(response.data ?? []);
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudieron cargar las preguntas");
		}
	}
	(0, import_react.useEffect)(() => {
		cargar();
	}, []);
	(0, import_react.useEffect)(() => {
		cargarPreguntas(evaluacionSeleccionada);
	}, [evaluacionSeleccionada]);
	function payloadEvaluacion() {
		return {
			nombre: evaluacionForm.nombre.trim(),
			tipo: evaluacionForm.tipo.trim(),
			descripcion: evaluacionForm.descripcion.trim(),
			duracion: Number(evaluacionForm.duracion),
			puntajeMin: Number(evaluacionForm.puntajeMin),
			puntajeMax: Number(evaluacionForm.puntajeMax),
			online: evaluacionForm.online,
			idPuesto: evaluacionForm.idPuesto ? Number(evaluacionForm.idPuesto) : null,
			estado: evaluacionForm.estado
		};
	}
	function payloadPregunta() {
		return {
			pregunta: preguntaForm.pregunta.trim(),
			tipo: preguntaForm.tipo.trim(),
			respuestaCorrecta: preguntaForm.respuestaCorrecta.trim(),
			peso: Number(preguntaForm.peso)
		};
	}
	async function guardarEvaluacion(event) {
		event.preventDefault();
		setMensaje("");
		setGuardando(true);
		try {
			if (evaluacionForm.id) {
				await safeApi.actualizarEvaluacion(evaluacionForm.id, payloadEvaluacion());
				setMensaje("Evaluacion actualizada correctamente");
			} else {
				await safeApi.crearEvaluacion(payloadEvaluacion());
				setMensaje("Evaluacion creada correctamente");
			}
			setEvaluacionForm(evaluacionInicial);
			await cargar();
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudo guardar la evaluacion");
		} finally {
			setGuardando(false);
		}
	}
	async function eliminarEvaluacion(id) {
		setMensaje("");
		try {
			await safeApi.eliminarEvaluacion(id);
			setMensaje("Evaluacion eliminada correctamente");
			setEvaluacionSeleccionada((actual) => actual === id ? null : actual);
			await cargar();
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudo eliminar la evaluacion");
		}
	}
	async function asignar(event) {
		event.preventDefault();
		setMensaje("");
		try {
			await safeApi.asignarEvaluacion({
				idEvaluacion: Number(asignacion.idEvaluacion),
				idPostulante: Number(asignacion.idPostulante),
				fecha: asignacion.fecha,
				horaInicio: asignacion.horaInicio,
				horaFin: asignacion.horaFin,
				observaciones: asignacion.observaciones
			});
			setMensaje("Evaluacion asignada correctamente");
			setAsignacion({
				idEvaluacion: "",
				idPostulante: "",
				fecha: "",
				horaInicio: "10:00",
				horaFin: "11:00",
				observaciones: ""
			});
			await cargar();
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudo asignar la evaluacion");
		}
	}
	async function cambiarEstadoAsignacion(id, estado) {
		setMensaje("");
		try {
			await safeApi.cambiarEstadoAsignacion(id, estado);
			setMensaje("Estado de asignacion actualizado");
			await cargar();
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudo actualizar el estado");
		}
	}
	async function guardarPregunta(event) {
		event.preventDefault();
		if (!evaluacionSeleccionada) {
			setMensaje("Selecciona una evaluacion para agregar preguntas");
			return;
		}
		setMensaje("");
		try {
			if (preguntaForm.id) {
				await safeApi.actualizarPregunta(preguntaForm.id, payloadPregunta());
				setMensaje("Pregunta actualizada correctamente");
			} else {
				await safeApi.crearPregunta(evaluacionSeleccionada, payloadPregunta());
				setMensaje("Pregunta creada correctamente");
			}
			setPreguntaForm(preguntaInicial);
			await cargarPreguntas(evaluacionSeleccionada);
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudo guardar la pregunta");
		}
	}
	async function eliminarPregunta(id) {
		setMensaje("");
		try {
			await safeApi.eliminarPregunta(id);
			setMensaje("Pregunta eliminada correctamente");
			await cargarPreguntas(evaluacionSeleccionada);
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudo eliminar la pregunta");
		}
	}
	function editarEvaluacion(ev) {
		setEvaluacionForm({
			id: ev.id,
			nombre: ev.nombre,
			tipo: ev.tipo,
			descripcion: ev.descripcion ?? "",
			duracion: ev.duracion,
			puntajeMin: ev.puntajeMin,
			puntajeMax: ev.puntajeMax,
			online: ev.online,
			idPuesto: ev.idPuesto ? String(ev.idPuesto) : "",
			estado: ev.estado
		});
	}
	function editarPregunta(pregunta) {
		setPreguntaForm({
			id: pregunta.id,
			pregunta: pregunta.pregunta,
			tipo: pregunta.tipo ?? "",
			respuestaCorrecta: pregunta.respuestaCorrecta ?? "",
			peso: pregunta.peso
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Evaluaciones",
		subtitulo: "Administracion, preguntas y asignacion de pruebas",
		usuario: "RRHH",
		rol: "RRHH",
		children: [
			mensaje ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 rounded-xl border border-primary/25 bg-primary/8 p-4 text-sm text-muted-foreground",
				children: mensaje
			}) : null,
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 text-sm text-muted-foreground",
				children: "Cargando evaluaciones..."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					titulo: "Listado de evaluaciones",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: evaluaciones.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "lift rounded-xl border border-border bg-surface-2/45 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 md:flex-row md:items-start md:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setEvaluacionSeleccionada(ev.id),
									className: "min-w-0 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-medium",
													children: ev.nombre || "Sin nombre"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstadoBadge, { estado: ev.estado }),
												evaluacionSeleccionada === ev.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary",
													children: "seleccionada"
												}) : null
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-sm text-muted-foreground",
											children: [
												ev.tipo || "Sin tipo",
												" - ",
												ev.duracion ?? 0,
												" min - min. ",
												ev.puntajeMin ?? 0,
												" - max. ",
												ev.puntajeMax ?? 0
											]
										}),
										ev.descripcion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: ev.descripcion
										}) : null
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => editarEvaluacion(ev),
										className: "grid size-10 place-items-center rounded-lg border border-border bg-surface-2/70 text-muted-foreground transition-colors hover:text-foreground",
										title: "Editar evaluacion",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => eliminarEvaluacion(ev.id),
										className: "grid size-10 place-items-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive transition-colors hover:bg-destructive/15",
										title: "Eliminar evaluacion",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								})]
							})
						}, ev.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					titulo: evaluacionForm.id ? "Editar evaluacion" : "Nueva evaluacion",
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: guardarEvaluacion,
						className: "grid gap-3 text-sm md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Nombre",
								value: evaluacionForm.nombre,
								onChange: (v) => setEvaluacionForm({
									...evaluacionForm,
									nombre: v
								}),
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								label: "Tipo",
								value: evaluacionForm.tipo,
								onChange: (v) => setEvaluacionForm({
									...evaluacionForm,
									tipo: v
								}),
								options: [
									"TECNICA",
									"PSICOLOGICA",
									"MEDICA",
									"ENTREVISTA"
								].map((tipo) => ({
									value: tipo,
									label: tipo
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Duracion",
								value: String(evaluacionForm.duracion),
								onChange: (v) => setEvaluacionForm({
									...evaluacionForm,
									duracion: Number(v)
								}),
								type: "number",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								label: "Estado",
								value: evaluacionForm.estado,
								onChange: (v) => setEvaluacionForm({
									...evaluacionForm,
									estado: v
								}),
								options: ["ACTIVA", "INACTIVA"].map((estado) => ({
									value: estado,
									label: estado
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Puntaje minimo",
								value: String(evaluacionForm.puntajeMin),
								onChange: (v) => setEvaluacionForm({
									...evaluacionForm,
									puntajeMin: Number(v)
								}),
								type: "number",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Puntaje maximo",
								value: String(evaluacionForm.puntajeMax),
								onChange: (v) => setEvaluacionForm({
									...evaluacionForm,
									puntajeMax: Number(v)
								}),
								type: "number",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								label: "Puesto asociado",
								value: evaluacionForm.idPuesto,
								onChange: (v) => setEvaluacionForm({
									...evaluacionForm,
									idPuesto: v
								}),
								options: puestos.map((puesto) => ({
									value: String(puesto.id),
									label: puesto.nombrePuesto || `Puesto #${puesto.id}`
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 rounded-lg border border-border bg-surface-2/45 px-3 py-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: evaluacionForm.online,
									onChange: (event) => setEvaluacionForm({
										...evaluacionForm,
										online: event.target.checked
									})
								}), "Online"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Descripcion"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: evaluacionForm.descripcion,
									onChange: (event) => setEvaluacionForm({
										...evaluacionForm,
										descripcion: event.target.value
									}),
									rows: 3,
									className: "mt-1.5 w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3 md:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									disabled: guardando,
									className: "inline-flex items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
										" ",
										guardando ? "Guardando..." : evaluacionForm.id ? "Guardar cambios" : "Crear"
									]
								}), evaluacionForm.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEvaluacionForm(evaluacionInicial),
									className: "rounded-lg border border-border bg-surface-2/70 px-4 py-2.5 font-medium",
									children: "Cancelar"
								}) : null]
							})
						]
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: 100,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						titulo: "Asignar evaluacion",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: asignar,
							className: "space-y-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									label: "Postulante",
									value: asignacion.idPostulante,
									onChange: (v) => setAsignacion({
										...asignacion,
										idPostulante: v
									}),
									options: postulantes.map((p) => ({
										value: String(p.id),
										label: `${p.nombre ?? p.email ?? "Postulante"} #${p.id}`
									})),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									label: "Evaluacion",
									value: asignacion.idEvaluacion,
									onChange: (v) => setAsignacion({
										...asignacion,
										idEvaluacion: v
									}),
									options: evaluaciones.map((e) => ({
										value: String(e.id),
										label: e.nombre || `Evaluacion #${e.id}`
									})),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Fecha",
									value: asignacion.fecha,
									onChange: (v) => setAsignacion({
										...asignacion,
										fecha: v
									}),
									type: "date",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										label: "Inicio",
										value: asignacion.horaInicio,
										onChange: (v) => setAsignacion({
											...asignacion,
											horaInicio: v
										}),
										type: "time",
										required: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										label: "Fin",
										value: asignacion.horaFin,
										onChange: (v) => setAsignacion({
											...asignacion,
											horaFin: v
										}),
										type: "time",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Observaciones"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: asignacion.observaciones,
										onChange: (event) => setAsignacion({
											...asignacion,
											observaciones: event.target.value
										}),
										rows: 3,
										className: "mt-1.5 w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 font-semibold text-primary-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4" }), " Asignar"]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						titulo: "Asignaciones",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: asignaciones.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-xl border border-border bg-surface-2/45 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: item.nombreEvaluacion || "Sin nombre"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: [
											"Postulante #",
											item.idPostulante,
											" - ",
											item.fecha,
											" - ",
											item.horaInicio,
											" a ",
											item.horaFin
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstadoBadge, { estado: item.estado })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									label: "Cambiar estado",
									value: item.estado,
									onChange: (estado) => cambiarEstadoAsignacion(item.id, estado),
									options: [
										"ASIGNADA",
										"EN_CURSO",
										"FINALIZADA",
										"CANCELADA"
									].map((estado) => ({
										value: estado,
										label: estado
									}))
								})]
							}, item.id))
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 160,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					titulo: `Preguntas${evaluacionActiva ? ` - ${evaluacionActiva.nombre || "Sin nombre"}` : ""}`,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 xl:grid-cols-[0.8fr_1.2fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: guardarPregunta,
							className: "space-y-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									label: "Evaluacion",
									value: evaluacionSeleccionada ? String(evaluacionSeleccionada) : "",
									onChange: (value) => setEvaluacionSeleccionada(value ? Number(value) : null),
									options: evaluaciones.map((ev) => ({
										value: String(ev.id),
										label: ev.nombre || `Evaluacion #${ev.id}`
									})),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Tipo",
									value: preguntaForm.tipo,
									onChange: (v) => setPreguntaForm({
										...preguntaForm,
										tipo: v
									}),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Peso",
									value: String(preguntaForm.peso),
									onChange: (v) => setPreguntaForm({
										...preguntaForm,
										peso: Number(v)
									}),
									type: "number",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Pregunta"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: preguntaForm.pregunta,
										onChange: (event) => setPreguntaForm({
											...preguntaForm,
											pregunta: event.target.value
										}),
										required: true,
										rows: 4,
										className: "mt-1.5 w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Respuesta correcta"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: preguntaForm.respuestaCorrecta,
										onChange: (event) => setPreguntaForm({
											...preguntaForm,
											respuestaCorrecta: event.target.value
										}),
										required: true,
										rows: 4,
										className: "mt-1.5 w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "inline-flex items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 font-semibold text-primary-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4" }),
											" ",
											preguntaForm.id ? "Guardar pregunta" : "Agregar pregunta"
										]
									}), preguntaForm.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setPreguntaForm(preguntaInicial),
										className: "rounded-lg border border-border bg-surface-2/70 px-4 py-2.5 font-medium",
										children: "Cancelar"
									}) : null]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: preguntas.map((pregunta, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-xl border border-border bg-surface-2/45 p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-3 md:flex-row md:items-start md:justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm font-semibold",
											children: [
												index + 1,
												". ",
												pregunta.pregunta || "Sin pregunta"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: [
												pregunta.tipo || "Sin tipo",
												" - peso ",
												pregunta.peso ?? 0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: ["Respuesta: ", pregunta.respuestaCorrecta || "Sin respuesta cargada"]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => editarPregunta(pregunta),
											className: "grid size-10 place-items-center rounded-lg border border-border bg-surface-2/70 text-muted-foreground transition-colors hover:text-foreground",
											title: "Editar pregunta",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => eliminarPregunta(pregunta.id),
											className: "grid size-10 place-items-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive transition-colors hover:bg-destructive/15",
											title: "Eliminar pregunta",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									})]
								})
							}, pregunta.id))
						})]
					})
				})
			})
		]
	});
}
function Input({ label, value, onChange, type = "text", placeholder, required = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			required,
			type,
			value,
			onChange: (event) => onChange(event.target.value),
			placeholder,
			className: "mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
		})]
	});
}
function Select({ label, value, onChange, options, required = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			required,
			value,
			onChange: (event) => onChange(event.target.value),
			className: "mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "Seleccionar"
			}), options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: option.value,
				children: option.label
			}, option.value))]
		})]
	});
}
//#endregion
export { EvaluacionesRRHH as component };
