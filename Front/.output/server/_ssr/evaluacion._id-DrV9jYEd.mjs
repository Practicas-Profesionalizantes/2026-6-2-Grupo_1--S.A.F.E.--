import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evaluacion._id-DrV9jYEd.js
var $$splitComponentImporter = () => import("./evaluacion._id-DcHksbq1.mjs");
var Route = createFileRoute("/evaluacion/$id")({
	head: () => ({ meta: [
		{ title: "Rendir evaluación | SAFE" },
		{
			name: "description",
			content: "Pantalla de rendición de evaluación con temporizador, preguntas de opción múltiple y de desarrollo."
		},
		{
			property: "og:title",
			content: "Rendir evaluación | SAFE"
		},
		{
			property: "og:description",
			content: "Rendición de evaluación con temporizador y envío a corrección IA."
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
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
