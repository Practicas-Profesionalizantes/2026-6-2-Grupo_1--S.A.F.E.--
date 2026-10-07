import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Check, FileUp, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/safe/reveal";
import { cn } from "@/lib/utils";
import { login, registrar, rolDestino } from "@/lib/api";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Registro de postulante | SAFE" },
      {
        name: "description",
        content:
          "Creá tu cuenta en SAFE en tres pasos: datos de acceso, perfil profesional y confirmación de la información.",
      },
      { property: "og:title", content: "Registro de postulante | SAFE" },
      { property: "og:description", content: "Alta de postulante en tres pasos dentro de SAFE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Registro,
});

const pasos = ["Cuenta", "Perfil profesional", "Confirmación"];

function Campo({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none transition-shadow duration-300 placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/60 focus:shadow-[var(--shadow-glow)]"
      />
    </label>
  );
}

function Registro() {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(0);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    password: "",
    repetirPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field: keyof typeof form) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setForm((actual) => ({ ...actual, [field]: event.target.value }));
    };
  }

  async function confirmar() {
    setError("");

    if (!form.nombre || !form.apellido || !form.dni || !form.email || !form.password) {
      setError("Completa los datos de cuenta para registrarte.");
      setPaso(0);
      return;
    }

    if (form.password !== form.repetirPassword) {
      setError("Las contrasenas no coinciden.");
      setPaso(0);
      return;
    }

    setLoading(true);
    try {
      await registrar({
        dni: form.dni,
        nombre: `${form.nombre} ${form.apellido}`.trim(),
        email: form.email,
        password: form.password,
      });
      const user = await login(form.email, form.password);
      await navigate({ to: rolDestino(user.rol) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo registrar el usuario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="halo min-h-screen bg-background">
      <div className="relative z-10 mx-auto max-w-3xl px-5 py-14">
        <Link to="/" className="inline-flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] glow-shadow">
            <ShieldCheck className="size-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-semibold">SAFE</span>
        </Link>

        <Reveal>
          <h1 className="mt-8 text-3xl font-semibold md:text-4xl">Creá tu cuenta de postulante</h1>
          <p className="mt-2 text-muted-foreground">
            Tu información queda guardada para todas tus futuras postulaciones.
          </p>
        </Reveal>

        <div className="mt-8 flex items-center gap-3">
          {pasos.map((p, i) => (
            <div key={p} className="flex flex-1 items-center gap-3">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all duration-300",
                  i <= paso
                    ? "border-primary/40 bg-primary/12 text-primary shadow-[var(--shadow-soft)]"
                    : "border-border text-muted-foreground",
                )}
              >
                <span className="grid size-5 place-items-center rounded-full bg-primary/20 text-xs">
                  {i < paso ? <Check className="size-3" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{p}</span>
              </div>
              {i < pasos.length - 1 ? (
                <div className="h-px flex-1 bg-border">
                  <div
                    className={cn(
                      "h-px bg-[image:var(--gradient-primary)] transition-all duration-500",
                      i < paso ? "w-full" : "w-0",
                    )}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="surface-panel mt-8 rounded-2xl p-6 md:p-8">
            {paso === 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Campo label="Nombre" placeholder="Juan" value={form.nombre} onChange={updateField("nombre")} />
                <Campo label="Apellido" placeholder="Perez" value={form.apellido} onChange={updateField("apellido")} />
                <Campo label="DNI" placeholder="40221998" value={form.dni} onChange={updateField("dni")} />
                <Campo label="Email" placeholder="juan@mail.com" type="email" value={form.email} onChange={updateField("email")} />
                <Campo label="Contrasena" placeholder="********" type="password" value={form.password} onChange={updateField("password")} />
                <Campo label="Repetir contrasena" placeholder="********" type="password" value={form.repetirPassword} onChange={updateField("repetirPassword")} />
              </div>
            ) : null}

            {paso === 1 ? (
              <div className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Campo label="Teléfono" placeholder="+54 11 5555 5555" />
                  <Campo label="Dirección" placeholder="Av. Siempre Viva 742" />
                  <Campo label="Fecha de nacimiento" placeholder="dd/mm/aaaa" />
                  <Campo label="LinkedIn" placeholder="linkedin.com/in/usuario" />
                  <Campo label="Estudios" placeholder="Tec. en Programación" />
                  <Campo label="Disponibilidad" placeholder="Full time" />
                </div>
                <label className="block">
                  <span className="text-sm text-muted-foreground">Experiencia laboral</span>
                  <textarea
                    rows={4}
                    placeholder="Describí tus últimas experiencias laborales..."
                    className="mt-1.5 w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none transition-shadow duration-300 placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/60 focus:shadow-[var(--shadow-glow)]"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  {["CV en PDF", "Apto médico (opcional)"].map((doc) => (
                    <div
                      key={doc}
                      className="lift flex items-center gap-3 rounded-xl border border-dashed border-border bg-surface-2/40 p-5 text-sm text-muted-foreground"
                    >
                      <FileUp className="size-5 text-primary" />
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {paso === 2 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Revisá la información antes de confirmar. Podrás editarla desde tu perfil.
                </p>
                <dl className="divide-y divide-border/70 rounded-xl border border-border bg-surface-2/40">
                  {[
                    ["Nombre completo", "Juan Pérez"],
                    ["DNI", "40.221.998"],
                    ["Email", "juan.perez@mail.com"],
                    ["Estudios", "Tec. en Programación"],
                    ["Experiencia", "2 años en desarrollo backend"],
                    ["CV", "juan_perez_cv.pdf"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            {error ? (
              <p className="mt-6 rounded-lg border border-destructive/35 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={() => setPaso((p) => Math.max(0, p - 1))}
                disabled={paso === 0}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 disabled:opacity-40"
              >
                Volver
              </button>
              {paso < 2 ? (
                <button
                  onClick={() => setPaso((p) => Math.min(2, p + 1))}
                  className="rounded-lg bg-[image:var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Continuar
                </button>
              ) : (
                <button
                  onClick={confirmar}
                  disabled={loading}
                  className="rounded-lg bg-[image:var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {loading ? "Registrando..." : "Confirmar e ingresar"}
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
