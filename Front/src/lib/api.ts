export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:8080";

const TOKEN_KEY = "safe_token";
const USER_KEY = "safe_user";

export type Rol = "POSTULANTE" | "RRHH" | "ADMIN";

export type Usuario = {
  id: number;
  dni: string;
  nombre: string;
  email: string;
  rol: string;
};

export type ApiEnvelope<T> = {
  status?: string;
  message?: string;
  data?: T;
  user?: T;
};

export type PuestoApi = {
  id: number;
  nombrePuesto: string;
  tipo: string;
  requisitos: string;
};

export type PostulanteApi = {
  id: number;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
  estadoCivil?: string;
  experienciaLaboral?: string;
  estudios?: string;
  infoMedica?: string;
  cvUrl?: string;
  aptoMedicoUrl?: string;
  nombre?: string;
  email?: string;
  dni?: string;
};

export type PostulacionApi = {
  idPostulante: number;
  idPuesto: number;
  nombrePuesto: string;
  fechaPostulacion?: string;
  estado: string;
  scoreIa?: number;
  observacionesIa?: string;
};

export type EvaluacionApi = {
  id: number;
  nombre: string;
  tipo: string;
  descripcion?: string;
  duracion?: number;
  puntajeMin?: number;
  puntajeMax?: number;
  online?: boolean;
  idPuesto?: number;
  estado?: string;
};

export type EvaluacionAsignadaApi = {
  id: number;
  idEvaluacion: number;
  nombreEvaluacion: string;
  tipoEvaluacion: string;
  idPostulante: number;
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;
  estado: string;
  intento?: number;
  fechaAsignacion?: string;
  observaciones?: string;
};

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: boolean;
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getToken() {
  return isBrowser() ? localStorage.getItem(TOKEN_KEY) : null;
}

export function setSession(token: string, user: Usuario) {
  if (!isBrowser()) return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  if (!isBrowser()) return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser(): Usuario | null {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Usuario;
  } catch {
    clearSession();
    return null;
  }
}

export function normalizarRol(rol?: string): Rol {
  const value = (rol ?? "POSTULANTE").toUpperCase();
  if (value === "ADMIN") return "ADMIN";
  if (value === "RRHH") return "RRHH";
  return "POSTULANTE";
}

export function rolDestino(rol?: string) {
  return normalizarRol(rol) === "POSTULANTE" ? "/dashboard" : "/rrhh";
}

export function archivoUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  const token = getToken();
  const isFormData = options.body instanceof FormData;

  if (!isFormData && options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth !== false && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: isFormData ? options.body : options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "message" in payload
        ? String((payload as { message?: string }).message)
        : "No se pudo completar la operacion";
    throw new Error(message);
  }

  return payload as T;
}

export async function login(email: string, password: string) {
  const token = await apiRequest<string>("/usuario/login", {
    method: "POST",
    auth: false,
    body: { email, password },
  });

  if (!token) {
    throw new Error("Email o contrasena incorrectos");
  }

  if (isBrowser()) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  const me = await apiRequest<ApiEnvelope<Usuario>>("/usuario/me");
  const user = me.user;
  if (!user) {
    throw new Error("No se pudo obtener el usuario autenticado");
  }

  setSession(token, user);
  return user;
}

export async function registrar(data: {
  dni: string;
  nombre: string;
  email: string;
  password: string;
}) {
  return apiRequest<ApiEnvelope<Usuario>>("/usuario/register", {
    method: "POST",
    auth: false,
    body: data,
  });
}

export async function listarPuestos() {
  const response = await apiRequest<ApiEnvelope<PuestoApi[]>>("/puestos", { auth: false });
  return response.data ?? [];
}

export async function listarPuestosAdmin() {
  const response = await apiRequest<ApiEnvelope<PuestoApi[]>>("/admin/puestos");
  return response.data ?? [];
}

export async function crearPuesto(data: Omit<PuestoApi, "id">) {
  const response = await apiRequest<ApiEnvelope<PuestoApi>>("/admin/puestos", {
    method: "POST",
    body: data,
  });
  return response.data;
}

export async function actualizarPuesto(id: number, data: Omit<PuestoApi, "id">) {
  const response = await apiRequest<ApiEnvelope<PuestoApi>>(`/admin/puestos/${id}`, {
    method: "PUT",
    body: data,
  });
  return response.data;
}

export async function eliminarPuesto(id: number) {
  return apiRequest<ApiEnvelope<unknown>>(`/admin/puestos/${id}`, {
    method: "DELETE",
  });
}

export async function obtenerPerfil() {
  return apiRequest<PostulanteApi>("/postulante/perfil");
}

export async function listarPostulantesAdmin() {
  const response = await apiRequest<ApiEnvelope<PostulanteApi[]>>("/admin/postulantes");
  return response.data ?? [];
}

export async function guardarPerfil(data: Partial<PostulanteApi>, existePerfil: boolean) {
  return apiRequest<PostulanteApi>("/postulante/perfil", {
    method: existePerfil ? "PUT" : "POST",
    body: data,
  });
}

export async function subirCv(archivo: File) {
  const formData = new FormData();
  formData.append("archivo", archivo);
  return apiRequest<PostulanteApi>("/postulante/perfil/cv", {
    method: "POST",
    body: formData,
  });
}

export async function postularse(idPuesto: number) {
  return apiRequest<ApiEnvelope<PostulacionApi>>(`/postulante/postulaciones/${idPuesto}`, {
    method: "POST",
  });
}

export async function listarMisPostulaciones() {
  const response = await apiRequest<ApiEnvelope<PostulacionApi[]>>("/postulante/postulaciones");
  return response.data ?? [];
}

export async function listarEvaluaciones() {
  const response = await apiRequest<ApiEnvelope<EvaluacionApi[]>>("/admin/evaluaciones");
  return response.data ?? [];
}

export async function crearEvaluacion(data: Omit<EvaluacionApi, "id">) {
  const response = await apiRequest<ApiEnvelope<EvaluacionApi>>("/admin/evaluaciones", {
    method: "POST",
    body: data,
  });
  return response.data;
}

export async function actualizarEvaluacion(id: number, data: Omit<EvaluacionApi, "id">) {
  const response = await apiRequest<ApiEnvelope<EvaluacionApi>>(`/admin/evaluaciones/${id}`, {
    method: "PUT",
    body: data,
  });
  return response.data;
}

export async function eliminarEvaluacion(id: number) {
  return apiRequest<ApiEnvelope<unknown>>(`/admin/evaluaciones/${id}`, {
    method: "DELETE",
  });
}

export async function listarEvaluacionesAsignadas() {
  const response = await apiRequest<ApiEnvelope<EvaluacionAsignadaApi[]>>(
    "/postulante/evaluaciones/asignadas",
  );
  return response.data ?? [];
}

export async function listarTodasAsignaciones() {
  const response = await apiRequest<ApiEnvelope<EvaluacionAsignadaApi[]>>(
    "/admin/evaluaciones/asignaciones",
  );
  return response.data ?? [];
}

export async function asignarEvaluacion(data: {
  idEvaluacion: number;
  idPostulante: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  observaciones?: string;
}) {
  const response = await apiRequest<ApiEnvelope<EvaluacionAsignadaApi>>(
    "/admin/evaluaciones/asignaciones",
    {
      method: "POST",
      body: data,
    },
  );
  return response.data;
}
