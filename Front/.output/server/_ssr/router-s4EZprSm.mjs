import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$11 } from "./evaluacion._id-DrV9jYEd.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-s4EZprSm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CD3wwetR.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$9 = () => import("./routes-Bjdcsxkm.mjs");
var Route$9 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "SAFE — Reclutamiento y selección con IA" },
		{
			name: "description",
			content: "SAFE centraliza postulantes, automatiza evaluaciones con IA y n8n, y entrega rankings para que RRHH decida con datos."
		},
		{
			property: "og:title",
			content: "SAFE — Reclutamiento y selección con IA"
		},
		{
			property: "og:description",
			content: "Plataforma de reclutamiento inteligente: análisis de CV, evaluaciones y ranking automático."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./dashboard-BELsSMLO.mjs");
var Route$8 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Mi panel | SAFE postulante" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./evaluaciones-BpAILvNW.mjs");
var Route$7 = createFileRoute("/evaluaciones")({
	head: () => ({ meta: [{ title: "Mis evaluaciones | SAFE postulante" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./login-Bi1PA0zF.mjs");
var Route$6 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Iniciar sesion | SAFE" },
		{
			name: "description",
			content: "Accede a SAFE con tu cuenta de postulante o de Recursos Humanos para seguir tu proceso de seleccion."
		},
		{
			property: "og:title",
			content: "Iniciar sesion | SAFE"
		},
		{
			property: "og:description",
			content: "Acceso de postulantes y equipo de RRHH a la plataforma SAFE."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./perfil-PQVNcPPu.mjs");
var Route$5 = createFileRoute("/perfil")({
	head: () => ({ meta: [{ title: "Mi perfil | SAFE postulante" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./puestos-C4uSxHea.mjs");
var Route$4 = createFileRoute("/puestos")({
	head: () => ({ meta: [{ title: "Puestos | SAFE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./registro-CUc1NLro.mjs");
var Route$3 = createFileRoute("/registro")({
	head: () => ({ meta: [{ title: "Registro de postulante | SAFE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./rrhh-oyeDdhBU.mjs");
var Route$2 = createFileRoute("/rrhh/")({
	head: () => ({ meta: [{ title: "Panel RRHH | SAFE" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./evaluaciones-Bows-Knw.mjs");
var Route$1 = createFileRoute("/rrhh/evaluaciones")({
	head: () => ({ meta: [{ title: "Gestion de evaluaciones | SAFE RRHH" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./ranking-BVGWX32K.mjs");
var Route = createFileRoute("/rrhh/ranking")({
	head: () => ({ meta: [{ title: "Ranking de candidatos | SAFE RRHH" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var DashboardRoute = Route$8.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$10
});
var EvaluacionesRoute = Route$7.update({
	id: "/evaluaciones",
	path: "/evaluaciones",
	getParentRoute: () => Route$10
});
var LoginRoute = Route$6.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$10
});
var PerfilRoute = Route$5.update({
	id: "/perfil",
	path: "/perfil",
	getParentRoute: () => Route$10
});
var PuestosRoute = Route$4.update({
	id: "/puestos",
	path: "/puestos",
	getParentRoute: () => Route$10
});
var RegistroRoute = Route$3.update({
	id: "/registro",
	path: "/registro",
	getParentRoute: () => Route$10
});
var EvaluacionIdRoute = Route$11.update({
	id: "/evaluacion/$id",
	path: "/evaluacion/$id",
	getParentRoute: () => Route$10
});
var RrhhIndexRoute = Route$2.update({
	id: "/rrhh/",
	path: "/rrhh/",
	getParentRoute: () => Route$10
});
var rootRouteChildren = {
	IndexRoute,
	DashboardRoute,
	EvaluacionesRoute,
	LoginRoute,
	PerfilRoute,
	PuestosRoute,
	RegistroRoute,
	EvaluacionIdRoute,
	RrhhEvaluacionesRoute: Route$1.update({
		id: "/rrhh/evaluaciones",
		path: "/rrhh/evaluaciones",
		getParentRoute: () => Route$10
	}),
	RrhhRankingRoute: Route.update({
		id: "/rrhh/ranking",
		path: "/rrhh/ranking",
		getParentRoute: () => Route$10
	}),
	RrhhIndexRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
