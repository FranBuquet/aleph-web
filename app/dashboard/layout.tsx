import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold">Aleph</span>
        <nav className="flex gap-5 text-sm text-gray-400">
          <Link href="/dashboard" className="hover:text-white transition">Inicio</Link>
          <Link href="/dashboard/nutricion" className="hover:text-white transition">Nutrición</Link>
          <Link href="/dashboard/entrenamiento" className="hover:text-white transition">Entrenamiento</Link>
          <Link href="/dashboard/rutina" className="hover:text-white transition">Rutina</Link>
          <Link href="/dashboard/perfil" className="hover:text-white transition">Perfil</Link>
          <form action="/api/logout" method="POST">
            <button type="submit" className="hover:text-white transition cursor-pointer">Salir</button>
          </form>
        </nav>
      </header>
      <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
