import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Users2 } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { Reveal } from "@/components/safe/reveal";
import { puestos } from "@/lib/safe-data";

export const Route = createFileRoute("/puestos")({
  head: () => ({
    meta: [
      { title: "Puestos disponibles | SAFE" },
      {
        name: "description",
        content: "Explorá las vacantes publicadas en SAFE y postulate con tu perfil profesional cargado.",
      },
      { property: "og:title", content: "Puestos disponibles | SAFE" },
      { property: "og:description", content: "Vacantes publicadas y requisitos de cada búsqueda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Puestos,
});

function Puestos() {
  return (
    <AppShell
      titulo="Puestos disponibles"
      subtitulo="Vacantes abiertas para tu perfil"
      usuario="Juan Pérez"
      rol="POSTULANTE"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {puestos.map((p, i) => (
          <Reveal key={p.id} delay={i * 70}>
            <article className="lift surface-panel h-full rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{p.nombre}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.area} · {p.tipo}
                  </p>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                  {p.vacantes} vacante{p.vacantes > 1 ? "s" : ""}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.requisitos.map((r) => (
                  <span
                    key={r}
                    className="rounded-lg border border-border bg-surface-2/60 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {r}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/70 pt-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" /> {p.modalidad}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users2 className="size-4" /> 32 postulados
                </span>
                <button className="rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2 font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5">
                  Postularme
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </AppShell>
  );
}
