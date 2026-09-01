import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/safe/reveal";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión | SAFE" },
      {
        name: "description",
        content:
          "Accedé a SAFE con tu cuenta de postulante o de Recursos Humanos para seguir tu proceso de selección.",
      },
      { property: "og:title", content: "Iniciar sesión | SAFE" },
      { property: "og:description", content: "Acceso de postulantes y equipo de RRHH a la plataforma SAFE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-5 py-16">
      <div className="halo pointer-events-none absolute inset-0" />
      <Reveal className="relative w-full max-w-md">
        <div className="surface-panel rounded-2xl p-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] glow-shadow">
              <ShieldCheck className="size-5 text-primary-foreground" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">SAFE</span>
          </Link>

          <h1 className="mt-6 font-display text-2xl font-semibold">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ingresá con tus credenciales para continuar el proceso.
          </p>

          <div className="mt-6 space-y-4 text-sm">
            <label className="block">
              <span className="text-muted-foreground">Correo electrónico</span>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="nombre@mail.com"
                  className="h-11 w-full rounded-lg border border-input bg-surface-2/60 pl-9 pr-3 text-sm outline-none transition-shadow duration-300 focus:ring-2 focus:ring-ring/60 focus:shadow-[var(--shadow-glow)]"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-muted-foreground">Contraseña</span>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-input bg-surface-2/60 pl-9 pr-3 text-sm outline-none transition-shadow duration-300 focus:ring-2 focus:ring-ring/60 focus:shadow-[var(--shadow-glow)]"
                />
              </div>
            </label>
          </div>

          <div className="mt-6 grid gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Entrar como postulante <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/rrhh"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-2/60 px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
            >
              Entrar como RRHH
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <Link to="/registro" className="text-primary hover:underline">
              Registrate
            </Link>
          </p>
        </div>
      </Reveal>
    </main>
  );
}
