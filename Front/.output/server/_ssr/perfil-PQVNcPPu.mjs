import { n as __toESM } from "../_runtime.mjs";
import { i as safeApi } from "./api-BbuOh5eW.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./reveal-DMFXkxUi.mjs";
import { p as Save, u as ShieldCheck, x as FileUp } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-DTieWA-t.mjs";
import { n as Panel, r as ScoreBar } from "./pieces-BdOoTccH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-PQVNcPPu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyProfile = {
	telefono: "",
	direccion: "",
	fechaNacimiento: "",
	estadoCivil: "",
	experienciaLaboral: "",
	estudios: "",
	infoMedica: "",
	cvUrl: "",
	aptoMedicoUrl: ""
};
function Perfil() {
	const [form, setForm] = (0, import_react.useState)(emptyProfile);
	const [nombre, setNombre] = (0, import_react.useState)("Postulante");
	const [email, setEmail] = (0, import_react.useState)("");
	const [dni, setDni] = (0, import_react.useState)("");
	const [mensaje, setMensaje] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		safeApi.perfil().then((perfil) => {
			setForm({
				telefono: perfil.telefono ?? "",
				direccion: perfil.direccion ?? "",
				fechaNacimiento: perfil.fechaNacimiento ?? "",
				estadoCivil: perfil.estadoCivil ?? "",
				experienciaLaboral: perfil.experienciaLaboral ?? "",
				estudios: perfil.estudios ?? "",
				infoMedica: perfil.infoMedica ?? "",
				cvUrl: perfil.cvUrl ?? "",
				aptoMedicoUrl: perfil.aptoMedicoUrl ?? ""
			});
			setNombre(perfil.nombre || "Postulante");
			setEmail(perfil.email || "");
			setDni(perfil.dni || "");
		}).catch((error) => setMensaje(error instanceof Error ? error.message : "No se pudo cargar el perfil"));
	}, []);
	function update(field, value) {
		setForm((current) => ({
			...current,
			[field]: value
		}));
	}
	async function guardar() {
		setMensaje("");
		try {
			await safeApi.actualizarPerfil(form);
			setMensaje("Perfil actualizado correctamente");
		} catch (error) {
			setMensaje(error instanceof Error ? error.message : "No se pudo guardar el perfil");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		titulo: "Mi perfil",
		subtitulo: "Datos que ve Recursos Humanos",
		usuario: nombre,
		rol: "POSTULANTE",
		children: [mensaje ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-5 rounded-xl border border-primary/25 bg-primary/8 p-4 text-sm text-muted-foreground",
			children: mensaje
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				className: "xl:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					titulo: "Datos personales",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 text-sm sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnly, {
									label: "Nombre completo",
									value: nombre
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnly, {
									label: "DNI",
									value: dni
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadOnly, {
									label: "Correo electronico",
									value: email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Telefono",
									value: form.telefono ?? "",
									onChange: (v) => update("telefono", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Direccion",
									value: form.direccion ?? "",
									onChange: (v) => update("direccion", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Fecha nacimiento",
									value: form.fechaNacimiento ?? "",
									onChange: (v) => update("fechaNacimiento", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Estado civil",
									value: form.estadoCivil ?? "",
									onChange: (v) => update("estadoCivil", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Estudios",
									value: form.estudios ?? "",
									onChange: (v) => update("estudios", v)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							label: "Experiencia profesional",
							value: form.experienciaLaboral ?? "",
							onChange: (v) => update("experienciaLaboral", v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: guardar,
							className: "mt-5 inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Guardar cambios"]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						titulo: "Curriculum Vitae",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-dashed border-primary/35 bg-primary/6 p-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "mx-auto size-7 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm font-medium",
									children: "URL del CV"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.cvUrl ?? "",
									onChange: (event) => update("cvUrl", event.target.value),
									placeholder: "https://.../cv.pdf",
									className: "mt-3 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Completitud del CV"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, { value: form.cvUrl ? 80 : 20 })
							})]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 140,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						titulo: "Seguridad",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-5 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "Tus datos se usan unicamente dentro del proceso de seleccion."
							})]
						})
					})
				})]
			})]
		})]
	});
}
function Campo({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: "mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
		})]
	});
}
function ReadOnly({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			readOnly: true,
			className: "mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm text-muted-foreground"
		})]
	});
}
function TextArea({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-4 block text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			rows: 4,
			value,
			onChange: (event) => onChange(event.target.value),
			className: "mt-1.5 w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
		})]
	});
}
//#endregion
export { Perfil as component };
