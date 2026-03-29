// src/app/(admin)/clients/page.tsx

import Link from "next/link";

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit: string;
  nextVisit: string | null;
  preferredStylist: string;
  tier: "VIP" | "Regular" | "New";
  tags: string[];
};

const clients: Client[] = [
  {
    id: "CLT-001",
    name: "Amara Moyo",
    email: "amara@gmail.com",
    phone: "+27 82 555 0101",
    initials: "AM",
    totalVisits: 24,
    totalSpent: 18600,
    lastVisit: "20 Mar 2025",
    nextVisit: "15 Apr 2025",
    preferredStylist: "Nomsa Khumalo",
    tier: "VIP",
    tags: ["Braids", "Colour"],
  },
  {
    id: "CLT-002",
    name: "Siyanda Nkosi",
    email: "siyanda@gmail.com",
    phone: "+27 73 555 0201",
    initials: "SN",
    totalVisits: 18,
    totalSpent: 12400,
    lastVisit: "18 Mar 2025",
    nextVisit: "10 Apr 2025",
    preferredStylist: "Priya Naidoo",
    tier: "VIP",
    tags: ["Silk Press", "Keratin"],
  },
  {
    id: "CLT-003",
    name: "Thandi Mokoena",
    email: "thandi@gmail.com",
    phone: "+27 73 555 0202",
    initials: "TM",
    totalVisits: 11,
    totalSpent: 8750,
    lastVisit: "14 Mar 2025",
    nextVisit: null,
    preferredStylist: "Nomsa Khumalo",
    tier: "Regular",
    tags: ["Full Colour", "Highlights"],
  },
  {
    id: "CLT-004",
    name: "Leila Benali",
    email: "leila@gmail.com",
    phone: "+27 73 555 0203",
    initials: "LB",
    totalVisits: 3,
    totalSpent: 1200,
    lastVisit: "10 Mar 2025",
    nextVisit: "25 Mar 2025",
    preferredStylist: "Fatima Hassan",
    tier: "New",
    tags: ["Brows"],
  },
  {
    id: "CLT-005",
    name: "Zanele Dlamini",
    email: "zanele@gmail.com",
    phone: "+27 73 555 0204",
    initials: "ZD",
    totalVisits: 31,
    totalSpent: 27800,
    lastVisit: "22 Mar 2025",
    nextVisit: "5 Apr 2025",
    preferredStylist: "Nomsa Khumalo",
    tier: "VIP",
    tags: ["Box Braids", "Silk Press"],
  },
  {
    id: "CLT-006",
    name: "Rania Fouad",
    email: "rania@gmail.com",
    phone: "+27 73 555 0205",
    initials: "RF",
    totalVisits: 7,
    totalSpent: 5400,
    lastVisit: "5 Mar 2025",
    nextVisit: null,
    preferredStylist: "Priya Naidoo",
    tier: "Regular",
    tags: ["Keratin", "Treatment"],
  },
  {
    id: "CLT-007",
    name: "Aisha Mahomed",
    email: "aisha@gmail.com",
    phone: "+27 73 555 0206",
    initials: "AM",
    totalVisits: 9,
    totalSpent: 6900,
    lastVisit: "1 Mar 2025",
    nextVisit: "26 Mar 2025",
    preferredStylist: "Fatima Hassan",
    tier: "Regular",
    tags: ["Highlights", "Relaxer"],
  },
  {
    id: "CLT-008",
    name: "Bontle Sithole",
    email: "bontle@gmail.com",
    phone: "+27 73 555 0207",
    initials: "BS",
    totalVisits: 2,
    totalSpent: 850,
    lastVisit: "25 Feb 2025",
    nextVisit: null,
    preferredStylist: "Fatima Hassan",
    tier: "New",
    tags: ["Relaxer"],
  },
];

const tierStyles = {
  VIP:     "text-amber-400 border-amber-400/30 bg-amber-400/8",
  Regular: "text-purple-400 border-purple-400/30 bg-purple-400/8",
  New:     "text-teal-400 border-teal-400/30 bg-teal-400/8",
};

const summaryStats = [
  { label: "Total Clients",   value: clients.length.toString() },
  { label: "VIP Members",    value: clients.filter((c) => c.tier === "VIP").length.toString() },
  { label: "New This Month", value: clients.filter((c) => c.tier === "New").length.toString() },
  {
    label: "Total Revenue",
    value: `R ${clients.reduce((s, c) => s + c.totalSpent, 0).toLocaleString("en-ZA")}`,
  },
];

export default function ClientsPage() {
  return (
    <>
      {/* Page heading */}
      <div className="mb-8">
        <p className="text-purple-400/50 text-xs tracking-[0.35em] uppercase mb-2">
          Client Management
        </p>
        <h1
          className="text-4xl font-light text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Client <span className="text-purple-300">Directory</span>
        </h1>
        <div className="mt-3 h-px w-12 bg-amber-400/50" />
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryStats.map((s, i) => (
          <div
            key={i}
            className="bg-white/[0.02] border border-purple-800/20 rounded-xl p-5 hover:border-purple-500/30 transition-colors"
          >
            <p className="text-purple-300/40 text-[10px] uppercase tracking-[0.2em] mb-2">
              {s.label}
            </p>
            <p className="text-2xl font-light text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search + filter bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search clients…"
            className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl pl-9 pr-4 py-2.5
                       text-white placeholder-white/20 text-sm
                       focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>

        {(["All", "VIP", "Regular", "New"] as const).map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded-full text-xs tracking-wider border transition-all
              ${t === "All"
                ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                : "border-purple-800/30 text-purple-400/40 hover:border-purple-600/40 hover:text-purple-300"
              }`}
          >
            {t}
          </button>
        ))}

        <button className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 text-white text-xs tracking-wider hover:from-purple-600 hover:to-purple-500 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Client
        </button>
      </div>

      {/* Client cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white/[0.02] border border-purple-800/20 rounded-2xl p-5 hover:border-purple-500/20 transition-all duration-300 group"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-900 to-purple-600 border border-purple-500/30 flex items-center justify-center text-white/80 text-sm font-light shrink-0">
                  {client.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-light">{client.name}</p>
                  <p className="text-purple-300/40 text-xs mt-0.5">{client.email}</p>
                </div>
              </div>
              {/* Tier badge */}
              <span className={`text-[10px] px-2.5 py-1 rounded-full border tracking-wider uppercase ${tierStyles[client.tier]}`}>
                {client.tier}
              </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white/[0.02] rounded-lg p-3 text-center">
                <p className="text-white text-base font-light">{client.totalVisits}</p>
                <p className="text-purple-300/30 text-[10px] uppercase tracking-wider mt-0.5">Visits</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-3 text-center">
                <p className="text-white text-base font-light">
                  R {(client.totalSpent / 1000).toFixed(1)}k
                </p>
                <p className="text-purple-300/30 text-[10px] uppercase tracking-wider mt-0.5">Spent</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-3 text-center">
                <p className="text-white text-base font-light truncate text-xs pt-1">
                  {client.preferredStylist.split(" ")[0]}
                </p>
                <p className="text-purple-300/30 text-[10px] uppercase tracking-wider mt-0.5">Stylist</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {client.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full border border-purple-800/30 text-purple-400/50 bg-purple-500/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-purple-800/20 flex items-center justify-between">
              <div>
                <p className="text-purple-300/30 text-[10px] uppercase tracking-wider">Last visit</p>
                <p className="text-white/60 text-xs mt-0.5">{client.lastVisit}</p>
              </div>
              {client.nextVisit ? (
                <div className="text-right">
                  <p className="text-purple-300/30 text-[10px] uppercase tracking-wider">Next visit</p>
                  <p className="text-amber-400/70 text-xs mt-0.5">{client.nextVisit}</p>
                </div>
              ) : (
                <button className="text-[10px] text-purple-400/50 hover:text-purple-300 border border-purple-800/30 hover:border-purple-600/40 px-3 py-1.5 rounded-lg transition-all tracking-wider">
                  Book Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}