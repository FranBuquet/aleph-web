import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NavMenu } from "./NavMenu";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="relative border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold">Aleph</span>
        <NavMenu />
      </header>
      <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
