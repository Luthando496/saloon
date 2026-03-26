import Link from "next/link";

// --- MOCK DATA (Replace these with your MongoDB fetches later) ---
const stats = [
  { label: "Today's Revenue", value: "R 8,450", trend: "+12.5%", isPositive: true },
  { label: "Appointments", value: "24", trend: "+4", isPositive: true },
  { label: "Active Clients", value: "142", trend: "-2", isPositive: false },
];

const recentAppointments = [
  { id: "APT-001", client: "Amara Moyo", service: "Balayage & Cut", stylist: "Sarah T.", time: "09:00 AM", status: "Completed" },
  { id: "APT-002", client: "Naledi Smith", service: "Silk Press", stylist: "Jessica M.", time: "11:30 AM", status: "In Progress" },
  { id: "APT-003", client: "Chloe Petersen", service: "Gel Manicure", stylist: "Lisa K.", time: "02:00 PM", status: "Pending" },
  { id: "APT-004", client: "Zoe Ndlovu", service: "Full Glam Makeup", stylist: "Sarah T.", time: "04:15 PM", status: "Pending" },
];

export default async function AdminDashboard() {
  // TODO: Fetch real data from MongoDB here
  // const appointments = await db.appointment.findMany({ ... })

  return (
    <div className="min-h-screen bg-[#0d0a1a] flex">
      {/* ── Sidebar Navigation ── */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-purple-800/30 bg-[#100d20]/50 backdrop-blur-xl">
        <div className="p-8">
          <h1 className="text-4xl font-light text-white tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            LUXÉ
          </h1>
          <p className="text-amber-400/70 text-[10px] tracking-[0.4em] uppercase mt-1">Admin</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { name: "Overview", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z", active: true },
            { name: "Appointments", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", active: false },
            { name: "Stylists & Staff", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", active: false },
            { name: "Clients", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", active: false },
            { name: "Services", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", active: false },
          ].map((item) => (
            <Link
              key={item.name}
              href="#"
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all duration-300
                ${item.active 
                  ? "bg-purple-500/10 text-purple-300 border border-purple-500/20" 
                  : "text-purple-300/50 hover:bg-white/[0.02] hover:text-purple-300"
                }`}
            >
              <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="tracking-wide font-light">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-purple-800/30">
          <button className="flex items-center gap-3 text-purple-400/40 hover:text-red-400/80 transition-colors text-sm w-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="tracking-wide font-light">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-800/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-amber-900/5 blur-[100px] pointer-events-none" />

        {/* Top Header */}
        <header className="h-24 px-8 flex items-center justify-between border-b border-purple-800/20 bg-[#0d0a1a]/80 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Welcome back, Admin
            </h2>
            <p className="text-purple-300/40 text-xs tracking-wider mt-1">Here is what is happening at the salon today.</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-purple-300/50 hover:text-purple-300 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full border border-[#0d0a1a]" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-900 to-purple-600 border border-purple-500/30 flex items-center justify-center text-white/90 text-sm font-light shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 overflow-y-auto z-0">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/[0.02] border border-purple-800/20 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
                <p className="text-purple-300/50 text-xs tracking-[0.2em] uppercase mb-2">{stat.label}</p>
                <div className="flex items-end gap-4">
                  <h3 className="text-3xl font-light text-white">{stat.value}</h3>
                  <span className={`text-xs mb-1 px-2 py-0.5 rounded-full border ${stat.isPositive ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10' : 'text-red-400 border-red-400/20 bg-red-400/10'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Appointments Section */}
          <div className="bg-white/[0.02] border border-purple-800/20 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-purple-800/20 flex items-center justify-between">
              <h3 className="text-xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Today's Schedule
              </h3>
              <Link href="/appointments" className="text-xs text-purple-400/60 hover:text-purple-300 uppercase tracking-widest transition-colors">
                View All
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-900/10 text-purple-300/50 text-[10px] uppercase tracking-[0.2em]">
                    <th className="px-6 py-4 font-light">Time</th>
                    <th className="px-6 py-4 font-light">Client</th>
                    <th className="px-6 py-4 font-light">Service</th>
                    <th className="px-6 py-4 font-light">Stylist</th>
                    <th className="px-6 py-4 font-light">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-light text-white/70">
                  {recentAppointments.map((apt, i) => (
                    <tr key={apt.id} className="border-b border-purple-800/10 hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-purple-300/80">{apt.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{apt.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-purple-200/50">{apt.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{apt.stylist}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full border
                          ${apt.status === 'Completed' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' : 
                            apt.status === 'In Progress' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' : 
                            'text-purple-400 border-purple-400/20 bg-purple-400/5'}`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}