"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    name: "Staff",
    href: "/staff",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    name: "Clients",
    href: "/clients",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    name: "Services",
    href: "/services",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 shrink-0 flex flex-col border-r border-purple-800/30 bg-[#100d20]/50 backdrop-blur-xl min-h-screen sticky top-0">
      {/* Logo */}
      <div className="p-8">
        <h1
          className="text-4xl font-light text-white tracking-widest"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          LUXÉ
        </h1>
        <p className="text-amber-400/70 text-[10px] tracking-[0.4em] uppercase mt-1">
          Admin
        </p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 space-y-1 mt-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all duration-200
                ${active
                  ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                  : "text-purple-300/50 hover:bg-white/[0.02] hover:text-purple-300 border border-transparent"
                }`}
            >
              <svg
                className="w-5 h-5 shrink-0 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="tracking-wide font-light">{item.name}</span>

              {/* Active indicator dot */}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400/80" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-6 border-t border-purple-800/30">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 text-purple-400/40 hover:text-red-400/80 transition-colors text-sm w-full"
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="tracking-wide font-light">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}