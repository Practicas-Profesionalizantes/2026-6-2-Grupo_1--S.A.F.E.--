globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/api-CXJS53pd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa8-ESm6krgQLFsjOZVRqRWWCXRXa9A\"",
		"mtime": "2026-10-02T03:02:33.395Z",
		"size": 2728,
		"path": "../public/assets/api-CXJS53pd.js"
	},
	"/assets/app-shell-KHlmAL8K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bde-JVxJmDQ0cmUzMO9emgJRgYQszEE\"",
		"mtime": "2026-10-02T03:02:33.397Z",
		"size": 7134,
		"path": "../public/assets/app-shell-KHlmAL8K.js"
	},
	"/assets/arrow-right-CGDa7CA0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-EEbfm/Sb4oC7quCe6k+5Xhx3EEU\"",
		"mtime": "2026-10-02T03:02:33.400Z",
		"size": 155,
		"path": "../public/assets/arrow-right-CGDa7CA0.js"
	},
	"/assets/calendar-clock-sD-Q3Ect.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170-YtMDQ6o50BrJNFvrpfUc5+IrffI\"",
		"mtime": "2026-10-02T03:02:33.402Z",
		"size": 368,
		"path": "../public/assets/calendar-clock-sD-Q3Ect.js"
	},
	"/assets/circle-check-CDQS6Kkl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-hLEwoIuBP55KRKEG3z/t3Ry7mBU\"",
		"mtime": "2026-10-02T03:02:33.428Z",
		"size": 168,
		"path": "../public/assets/circle-check-CDQS6Kkl.js"
	},
	"/assets/dashboard-CqeN3UzV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1507-BVYCcbXAr2sy4SQ6TG+mreNfCSE\"",
		"mtime": "2026-10-02T03:02:33.444Z",
		"size": 5383,
		"path": "../public/assets/dashboard-CqeN3UzV.js"
	},
	"/assets/evaluacion._id-Cms3TTWp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148a-u1M2rR9DskXLgGT3wx111Hq90YY\"",
		"mtime": "2026-10-02T03:02:33.449Z",
		"size": 5258,
		"path": "../public/assets/evaluacion._id-Cms3TTWp.js"
	},
	"/assets/evaluaciones-92gekqVo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"39f9-Bu+9oqFKVQ3lOyQcJu8eojMto7A\"",
		"mtime": "2026-10-02T03:02:33.451Z",
		"size": 14841,
		"path": "../public/assets/evaluaciones-92gekqVo.js"
	},
	"/assets/evaluaciones-DjwLRJPs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"abb-C09xHS2XhU5eZT5VHsWDSHlnEnk\"",
		"mtime": "2026-10-02T03:02:33.452Z",
		"size": 2747,
		"path": "../public/assets/evaluaciones-DjwLRJPs.js"
	},
	"/assets/login-DBGAxmQQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f35-cXUnNVhqQqTY0i28YI0jWGZr520\"",
		"mtime": "2026-10-02T03:02:33.460Z",
		"size": 3893,
		"path": "../public/assets/login-DBGAxmQQ.js"
	},
	"/assets/index-Bw8tgX6t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d43a-5I7IUfHcWmzmywI/p0NHjT+4SRA\"",
		"mtime": "2026-10-02T03:02:33.393Z",
		"size": 382010,
		"path": "../public/assets/index-Bw8tgX6t.js"
	},
	"/assets/perfil-4QzH89BY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"158c-2xQ+mC6gugMX5BUFTUvNu46QkGA\"",
		"mtime": "2026-10-02T03:02:33.462Z",
		"size": 5516,
		"path": "../public/assets/perfil-4QzH89BY.js"
	},
	"/assets/pieces-DUmpwQ0A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a81-sgSoyAiDtcWt55AnoK7LObZQVTs\"",
		"mtime": "2026-10-02T03:02:33.465Z",
		"size": 2689,
		"path": "../public/assets/pieces-DUmpwQ0A.js"
	},
	"/assets/puestos-D8iqhdRO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fdf-OtAffVGP7DZAADBFQ0AgBw7z3pM\"",
		"mtime": "2026-10-02T03:02:33.468Z",
		"size": 8159,
		"path": "../public/assets/puestos-D8iqhdRO.js"
	},
	"/assets/ranking-qYkbdplq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d0-Imn4vLSU7MIlaO4iPCpY1qtqxeI\"",
		"mtime": "2026-10-02T03:02:33.470Z",
		"size": 2512,
		"path": "../public/assets/ranking-qYkbdplq.js"
	},
	"/assets/registro-LirgXYMU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1923-QzMglsNhH1TCKWafR7ybPQIJakY\"",
		"mtime": "2026-10-02T03:02:33.471Z",
		"size": 6435,
		"path": "../public/assets/registro-LirgXYMU.js"
	},
	"/assets/reveal-DgilqWqy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7683-YFigb1DofgLSQjpzuQ1824VRlxE\"",
		"mtime": "2026-10-02T03:02:33.472Z",
		"size": 30339,
		"path": "../public/assets/reveal-DgilqWqy.js"
	},
	"/assets/routes-BKLlnNpZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1da6-KFCSaI2D/pCqpynSZrTxUpclSgw\"",
		"mtime": "2026-10-02T03:02:33.476Z",
		"size": 7590,
		"path": "../public/assets/routes-BKLlnNpZ.js"
	},
	"/assets/rrhh-BtkoE496.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f67-0ImbSPf20fmHr7qD9rxJ4IiRn+Q\"",
		"mtime": "2026-10-02T03:02:33.528Z",
		"size": 3943,
		"path": "../public/assets/rrhh-BtkoE496.js"
	},
	"/assets/safe-data-CDHwipGR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-Kx8aDUbNEWhQweD57l983JrZQEY\"",
		"mtime": "2026-10-02T03:02:33.538Z",
		"size": 620,
		"path": "../public/assets/safe-data-CDHwipGR.js"
	},
	"/assets/timer-DUclyTn1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4-3+Y118qe8jNT7b6fLf3nyxOppxU\"",
		"mtime": "2026-10-02T03:02:33.576Z",
		"size": 228,
		"path": "../public/assets/timer-DUclyTn1.js"
	},
	"/assets/trash-2-BZ4hpiIX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"277-cD7Ycl0EZJE4JaqmLu8tQjWReTk\"",
		"mtime": "2026-10-02T03:02:33.640Z",
		"size": 631,
		"path": "../public/assets/trash-2-BZ4hpiIX.js"
	},
	"/assets/trophy-emRRZb6J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2-zNf5+SDc/Gd6owgH4w415wWrQLQ\"",
		"mtime": "2026-10-02T03:02:33.736Z",
		"size": 466,
		"path": "../public/assets/trophy-emRRZb6J.js"
	},
	"/assets/workflow-DCmWch0a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ea-wUZ4kjafGnxQueOQ5Vvjp2XJlMw\"",
		"mtime": "2026-10-02T03:02:33.738Z",
		"size": 1002,
		"path": "../public/assets/workflow-DCmWch0a.js"
	},
	"/assets/styles-CD3wwetR.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15c1e-MfUJ0+8+QDRYIv7tLQ29LdtCfMA\"",
		"mtime": "2026-10-02T03:02:33.740Z",
		"size": 89118,
		"path": "../public/assets/styles-CD3wwetR.css"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_ndz17N = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_ndz17N
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
