import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/safe/app-shell";
import { Panel } from "@/components/safe/pieces";
import { Reveal } from "@/components/safe/reveal";
import { actualizarRolUsuario, getStoredUser, listarUsuariosAdmin, normalizarRol } from "@/lib/api";
import type { Rol, Usuario } from "@/lib/api";

export const Route = createFileRoute("/rrhh/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuarios | SAFE Admin" },
      { name: "description", content: "Gestion segura de usuarios y roles de SAFE." },
    ],
  }),
  component: UsuariosAdmin,
});

const roles: Rol[] = ["POSTULANTE", "RRHH", "ADMIN"];

function UsuariosAdmin() {
  const navigate = useNavigate();
  const [usuarioActual] = useState(() => getStoredUser());
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardandoId, setGuardandoId] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (normalizarRol(usuarioActual?.rol) !== "ADMIN") {
      void navigate({ to: "/rrhh" });
      return;
    }

    void listarUsuariosAdmin()
      .then(setUsuarios)
      .catch((err) => setError(err instanceof Error ? err.message : "No se pudieron cargar los usuarios"))
      .finally(() => setCargando(false));
  }, [navigate, usuarioActual]);

  async function cambiarRol(usuario: Usuario, rol: Rol) {
    const rolActual = normalizarRol(usuario.rol);
    if (rolActual === rol) return;
    setGuardandoId(usuario.id);
    setMensaje("");
    setError("");
    try {
      const actualizado = await actualizarRolUsuario(usuario.id, rol);
      if (actualizado) {
        setUsuarios((actuales) => actuales.map((item) => item.id === actualizado.id ? actualizado : item));
      }
      setMensaje(`Rol de ${usuario.nombre} actualizado correctamente.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar el rol");
    } finally {
      setGuardandoId(null);
    }
  }

  return (
    <AppShell
      titulo="Administrar usuarios"
      subtitulo="Asignacion segura de roles del sistema"
      usuario={usuarioActual?.nombre ?? "Administrador"}
      rol="RRHH"
    >
      {mensaje ? <div className="mb-5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">{mensaje}</div> : null}
      {error ? <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      <Reveal>
        <Panel titulo="Usuarios y roles">
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/8 p-4 text-sm">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <p className="text-muted-foreground">
              Solo los administradores pueden cambiar roles. El sistema impide quitar el ultimo administrador.
            </p>
          </div>

          {cargando ? <p className="text-sm text-muted-foreground">Cargando usuarios...</p> : null}
          {!cargando && !usuarios.length ? <p className="text-sm text-muted-foreground">No hay usuarios para mostrar.</p> : null}
          {!cargando && usuarios.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-sm">
                <thead>
                  <tr className="border-b border-border/70 text-left text-muted-foreground">
                    <th className="px-3 pb-3 font-medium">Usuario</th>
                    <th className="px-3 pb-3 font-medium">DNI</th>
                    <th className="px-3 pb-3 font-medium">Rol actual</th>
                    <th className="px-3 pb-3 text-right font-medium">Cambiar rol</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id} className="border-b border-border/50 last:border-0">
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid size-9 place-items-center rounded-full bg-primary/15 text-primary">
                            <UserCog className="size-4" />
                          </span>
                          <div>
                            <p className="font-medium">{usuario.nombre}</p>
                            <p className="text-xs text-muted-foreground">{usuario.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-muted-foreground">{usuario.dni || "Sin DNI"}</td>
                      <td className="px-3 py-4 font-medium">{normalizarRol(usuario.rol)}</td>
                      <td className="px-3 py-4 text-right">
                        <select
                          value={normalizarRol(usuario.rol)}
                          disabled={guardandoId === usuario.id}
                          onChange={(event) => void cambiarRol(usuario, event.target.value as Rol)}
                          className="h-10 rounded-lg border border-input bg-surface-2 px-3 text-sm outline-none focus:ring-2 focus:ring-ring/60 disabled:opacity-60"
                        >
                          {roles.map((rol) => <option key={rol} value={rol}>{rol}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </Panel>
      </Reveal>
    </AppShell>
  );
}
