import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileUp, Save, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/safe/app-shell";
import { Panel, ScoreBar } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import { archivoUrl, getStoredUser, guardarPerfil, obtenerPerfil, subirCv } from "@/lib/api";
import type { PostulanteApi, Usuario } from "@/lib/api";

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

function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [perfil, setPerfil] = useState<PostulanteApi | null>(null);
  const [form, setForm] = useState<Partial<PostulanteApi>>({});
  const [existePerfil, setExistePerfil] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    setUsuario(getStoredUser());
    obtenerPerfil()
      .then((data) => {
        setPerfil(data);
        setForm(data);
        setExistePerfil(true);
      })
      .catch(() => {
        setExistePerfil(false);
      });
  }, []);

  function updateField(field: keyof PostulanteApi, value: string) {
    setForm((actual) => ({ ...actual, [field]: value }));
  }

  async function guardar() {
    setMensaje("");
    try {
      const data = await guardarPerfil(form, existePerfil);
      setPerfil(data);
      setForm(data);
      setExistePerfil(true);
      setMensaje("Perfil guardado correctamente");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo guardar el perfil");
    }
  }

  async function cargarCv(file?: File) {
    if (!file) return;

    setMensaje("");
    try {
      const data = await subirCv(file);
      setPerfil(data);
      setForm(data);
      setExistePerfil(true);
      setMensaje("CV cargado correctamente");
    } catch (err) {
      setMensaje(err instanceof Error ? err.message : "No se pudo cargar el CV");
    }
  }

  return (
    <AppShell
      titulo="Mi perfil"
      subtitulo="Datos que ve Recursos Humanos"
      usuario={usuario?.nombre ?? perfil?.nombre ?? "Postulante"}
      rol="POSTULANTE"
    >
      {mensaje ? (
        <div className="mb-5 rounded-xl border border-primary/25 bg-primary/8 px-4 py-3 text-sm text-primary">
          {mensaje}
        </div>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Panel titulo="Datos personales">
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              {[
                ["Nombre completo", usuario?.nombre ?? perfil?.nombre ?? ""],
                ["DNI", usuario?.dni ?? perfil?.dni ?? ""],
                ["Correo electronico", usuario?.email ?? perfil?.email ?? ""],
                ["Telefono", form.telefono ?? ""],
                ["Direccion", form.direccion ?? ""],
                ["Fecha de nacimiento", form.fechaNacimiento ?? ""],
                ["Estudios", form.estudios ?? ""],
              ].map(([k, v]) => (
                <label key={k} className="block">
                  <span className="text-muted-foreground">{k}</span>
                  <input
                    defaultValue={v}
                    onChange={(event) => {
                      if (k === "Telefono") updateField("telefono", event.target.value);
                      if (k === "Direccion") updateField("direccion", event.target.value);
                      if (k === "Fecha de nacimiento") updateField("fechaNacimiento", event.target.value);
                      if (k === "Estudios") updateField("estudios", event.target.value);
                    }}
                    className="mt-1.5 h-11 w-full rounded-lg border border-input bg-surface-2/60 px-3 text-sm outline-none transition-shadow duration-300 focus:ring-2 focus:ring-ring/60 focus:shadow-[var(--shadow-glow)]"
                  />
                </label>
              ))}
            </div>

            <label className="mt-4 block text-sm">
              <span className="text-muted-foreground">Experiencia profesional</span>
              <textarea
                rows={4}
                value={form.experienciaLaboral ?? ""}
                onChange={(event) => updateField("experienciaLaboral", event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-surface-2/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring/60"
              />
            </label>

            <button
              onClick={() => void guardar()}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Save className="size-4" /> Guardar cambios
            </button>
          </Panel>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={80}>
            <Panel titulo="Curriculum Vitae">
              <div className="rounded-xl border border-dashed border-primary/35 bg-primary/6 p-6 text-center">
                <FileUp className="mx-auto size-7 text-primary" />
                <p className="mt-3 text-sm font-medium">
                  {perfil?.cvUrl ? "CV cargado" : "Subi tu CV en PDF"}
                </p>
                {perfil?.cvUrl ? (
                  <a
                    href={archivoUrl(perfil.cvUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-xs text-primary hover:underline"
                  >
                    Ver archivo
                  </a>
                ) : (
                  <p className="text-xs text-muted-foreground">Debe ser un PDF con texto seleccionable.</p>
                )}
                <label className="mt-4 inline-block cursor-pointer rounded-lg border border-border bg-surface-2/60 px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">
                  {perfil?.cvUrl ? "Reemplazar archivo" : "Cargar archivo"}
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    className="hidden"
                    onChange={(event) => void cargarCv(event.target.files?.[0])}
                  />
                </label>
              </div>
              <div className="mt-5">
                <p className="text-sm text-muted-foreground">Score de compatibilidad IA</p>
                <div className="mt-2">
                  <ScoreBar value={perfil?.cvUrl ? 100 : 40} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {perfil?.cvUrl
                    ? "El CV queda disponible para el analizador de IA cuando te postules."
                    : "Todavia falta cargar el CV para completar el perfil."}
                </p>
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
