// src/app/(admin)/layout.tsx
// Only the header section changes — replace the static avatar with <UserMenu />

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/AdminSidebar";
import UserMenu from "@/components/UserMenu";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/appointments");

  return (
    <div className="min-h-screen bg-[#0d0a1a] flex">
      <AdminSidebar />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-800/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-amber-900/5 blur-[100px] pointer-events-none" />

        {/* Header */}
        <header className="h-24 px-8 flex items-center justify-between border-b border-purple-800/20 bg-[#0d0a1a]/80 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h2
              className="text-2xl font-light text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Welcome back,{" "}
              <span className="text-purple-300">
                {session.user.name?.split(" ")[0]}
              </span>
            </h2>
            <p className="text-purple-300/40 text-xs tracking-wider mt-1">
              Here is what is happening at the salon today.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Notifications bell */}
            <button className="relative text-purple-300/50 hover:text-purple-300 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full border border-[#0d0a1a]" />
            </button>

            {/* ← Replaces the old static avatar div */}
            <UserMenu />
          </div>
        </header>

        <div className="p-8 overflow-y-auto z-0 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}