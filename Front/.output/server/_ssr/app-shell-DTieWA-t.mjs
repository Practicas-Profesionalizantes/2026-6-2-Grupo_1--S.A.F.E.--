import { n as __toESM } from "../_runtime.mjs";
import { i as safeApi, n as getToken, r as normalizeRole, t as clearToken } from "./api-BbuOh5eW.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as useScrolled, n as ScrollProgress, r as cn } from "./reveal-DMFXkxUi.mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Bell, O as BriefcaseBusiness, S as ClipboardList, a as Trophy, b as LayoutDashboard, f as Search, i as UserRound, n as Users, u as ShieldCheck, v as LogOut } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-DTieWA-t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var navPostulante = [
	{
		to: "/dashboard",
		label: "Mi panel",
		icon: LayoutDashboard
	},
	{
		to: "/puestos",
		label: "Puestos",
		icon: BriefcaseBusiness
	},
	{
		to: "/evaluaciones",
		label: "Mis evaluaciones",
		icon: ClipboardList
	},
	{
		to: "/perfil",
		label: "Mi perfil",
		icon: UserRound
	}
];
var navRRHH = [
	{
		to: "/rrhh",
		label: "Postulantes",
		icon: Users
	},
	{
		to: "/puestos",
		label: "Puestos",
		icon: BriefcaseBusiness
	},
	{
		to: "/rrhh/evaluaciones",
		label: "Evaluaciones",
		icon: ClipboardList
	},
	{
		to: "/rrhh/ranking",
		label: "Ranking IA",
		icon: Trophy
	}
];
function AppShell({ children, titulo, subtitulo, usuario, rol }) {
	const scrolled = useScrolled();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [usuarioSesion, setUsuarioSesion] = (0, import_react.useState)(usuario);
	const [rolSesion, setRolSesion] = (0, import_react.useState)(rol);
	const [validando, setValidando] = (0, import_react.useState)(true);
	const items = rolSesion === "RRHH" ? navRRHH : navPostulante;
	const iniciales = usuarioSesion.split(" ").map((w) => w[0]).join("").slice(0, 2);
	(0, import_react.useEffect)(() => {
		let activo = true;
		async function validarAcceso() {
			if (!getToken()) {
				await navigate({ to: "/login" });
				return;
			}
			try {
				const response = await safeApi.me();
				if (!activo) return;
				const rolNormalizado = normalizeRole(response.user.rol);
				const esRRHH = rolNormalizado === "ADMIN" || rolNormalizado === "RRHH";
				const rolReal = esRRHH ? "RRHH" : "POSTULANTE";
				setUsuarioSesion(response.user.nombre);
				setRolSesion(rolReal);
				if (rol === "RRHH" && !esRRHH) {
					await navigate({ to: "/dashboard" });
					return;
				}
				if (rol === "POSTULANTE" && esRRHH && pathname !== "/puestos") {
					await navigate({ to: "/rrhh" });
					return;
				}
			} catch {
				clearToken();
				await navigate({ to: "/login" });
				return;
			} finally {
				if (activo) setValidando(false);
			}
		}
		validarAcceso();
		return () => {
			activo = false;
		};
	}, [
		navigate,
		pathname,
		rol
	]);
	function cerrarSesion() {
		clearToken();
		navigate({ to: "/login" });
	}
	if (validando) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-5 text-sm text-muted-foreground",
		children: "Validando acceso..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3 px-6 py-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] glow-shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-primary-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-semibold tracking-tight",
						children: "SAFE"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-1 flex-col gap-1 px-3",
					children: items.map((item) => {
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300", active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[var(--shadow-soft)] ring-1 ring-primary/30" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "m-3 rounded-xl border border-sidebar-border bg-surface-2/60 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted-foreground",
							children: "Automatización n8n"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-foreground",
							children: "12 flujos activos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 h-1.5 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-4/5 rounded-full bg-[image:var(--gradient-primary)]" })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:pl-64",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: cn("sticky top-0 z-20 border-b border-border/70 backdrop-blur-xl transition-all duration-500", scrolled ? "topbar-shadow bg-surface/85 border-primary/25" : "bg-background/70 shadow-none"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex flex-wrap items-center gap-4 px-5 py-4 md:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-xl font-semibold md:text-2xl",
								children: titulo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: subtitulo
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative hidden items-center md:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Buscar postulante, puesto...",
								className: "h-10 w-64 rounded-lg border border-input bg-surface-2/70 pl-9 pr-3 text-sm outline-none transition-shadow duration-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/60 focus:shadow-[var(--shadow-glow)]"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "relative grid size-10 place-items-center rounded-lg border border-border bg-surface-2/70 text-muted-foreground transition-colors hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-2.5 top-2.5 size-2 rounded-full bg-accent" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-lg border border-border bg-surface-2/70 px-3 py-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-xs font-semibold text-primary-foreground",
								children: iniciales
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden leading-tight sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: usuarioSesion
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: rolSesion
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: cerrarSesion,
							className: "grid size-10 place-items-center rounded-lg border border-border bg-surface-2/70 text-muted-foreground transition-colors hover:text-foreground",
							title: "Cerrar sesion",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "px-5 py-8 md:px-8",
				children
			})]
		})]
	});
}
//#endregion
export { AppShell as t };
