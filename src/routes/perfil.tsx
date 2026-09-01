import { createFileRoute } from "@tanstack/react-router";
import { FileUp, Save, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { Panel, ScoreBar } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import { postulantes } from "@/lib/safe-data";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Mi perfil | SAFE postulante" },
      {
        name: "description",
        content:
          "Actualizá tus datos personales, tu experiencia y el CV que la IA analiza para calcular tu compatibilidad.",
      },
      { property: "og:title", content: "Mi perfil | SAFE postulante" },
      { property: "og:description", content: "Datos personales, experiencia y CV analizado por IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Perfil,
});

const yo = postulantes[0]!;

function Perfil() {
  return (
    <AppShell
      titulo="Mi perfil"
      subtitulo="Datos que ve Recursos Humanos"
      usuario={yo.nombre}
      rol="POSTULANTE"
    >
      <div className="grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Panel titulo="Datos personales">
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              {[
                ["Nombre completo", yo.nombre],
                ["DNI", yo.dni],
                ["Correo electrónico", yo.email],
                ["Teléfono", "+54 9 11 5555-1234"],
                ["Localidad", "Buenos Aires, Argentina"],
                ["Disponibilidad", "Full time"],
              ].map(([k, v]) => (
                <label key={k} className="block">
                  <span className="text-muted-foreground">{k}</span>
                  <input
                    defaultValue={v}
                    className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none transition-shadow duration-300 focus:ring-2 focus:ring-ring/60 focus:shadow-[var(--shadow-glow)]"
                  />
                </label>
              ))}
            </div>

            <label className="mt-4 block text-sm">
              <span className="text-muted-foreground">Experiencia profesional</span>
              <textarea
                rows={4}
                defaultValue={yo.experiencia}
                className="mt-1.5 w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
              />
            </label>

            <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5">
              <Save className="size-4" /> Guardar cambios
            </button>
          </Panel>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={80}>
            <Panel titulo="Curriculum Vitae">
              <div className="rounded-xl border border-dashed border-primary/35 bg-primary/6 p-6 text-center">
                <FileUp className="mx-auto size-7 text-primary" />
                <p className="mt-3 text-sm font-medium">cv-juan-perez.pdf</p>
                <p className="text-xs text-muted-foreground">Analizado por IA el 05/08/2026</p>
                <button className="mt-4 rounded-lg border border-border bg-surface-2/60 px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">
                  Reemplazar archivo
                </button>
              </div>
              <div className="mt-5">
                <p className="text-sm text-muted-foreground">Score de compatibilidad IA</p>
                <div className="mt-2">
                  <ScoreBar value={yo.scoreIA} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{yo.observacionIA}</p>
              </div>
            </Panel>
          </Reveal>

          <Reveal delay={140}>
            <Panel titulo="Seguridad">
              <div className="flex items-start gap-3 text-sm">
                <ShieldCheck className="mt-0.5 size-5 text-success" />
                <p className="text-muted-foreground">
                  Tus datos se usan únicamente dentro del proceso de selección y se almacenan de forma cifrada.
                </p>
              </div>
              <button className="mt-4 w-full rounded-lg border border-border bg-surface-2/60 px-4 py-2.5 text-sm transition-colors hover:border-primary/40 hover:text-primary">
                Cambiar contraseña
              </button>
            </Panel>
          </Reveal>
        </div>
      </div>
    </AppShell>
  );
}
