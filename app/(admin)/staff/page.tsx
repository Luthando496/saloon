// src/app/(admin)/staff/page.tsx

type StaffMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  specialities: string[];
  rating: number;
  totalClients: number;
  appointmentsThisMonth: number;
  revenueThisMonth: number;
  status: "Available" | "With Client" | "On Leave" | "Off Duty";
  joinedAt: string;
  schedule: { day: string; hours: string }[];
};

const staff: StaffMember[] = [
  {
    id: "STF-001",
    name: "Nomsa Khumalo",
    initials: "NK",
    role: "Senior Stylist",
    email: "nomsa@luxesalon.co.za",
    phone: "+27 82 555 0102",
    specialities: ["Natural Hair", "Box Braids", "Silk Press", "Locs"],
    rating: 4.9,
    totalClients: 147,
    appointmentsThisMonth: 38,
    revenueThisMonth: 24600,
    status: "Available",
    joinedAt: "Jan 2024",
    schedule: [
      { day: "Mon – Fri", hours: "09:00 – 17:00" },
      { day: "Saturday",  hours: "09:00 – 14:00" },
    ],
  },
  {
    id: "STF-002",
    name: "Priya Naidoo",
    initials: "PN",
    role: "Colour Specialist",
    email: "priya@luxesalon.co.za",
    phone: "+27 82 555 0103",
    specialities: ["Balayage", "Full Colour", "Highlights", "Keratin"],
    rating: 4.7,
    totalClients: 112,
    appointmentsThisMonth: 29,
    revenueThisMonth: 31200,
    status: "With Client",
    joinedAt: "Jan 2024",
    schedule: [
      { day: "Mon, Tue, Wed", hours: "10:00 – 18:00" },
      { day: "Fri – Sat",     hours: "10:00 – 17:00" },
    ],
  },
  {
    id: "STF-003",
    name: "Fatima Hassan",
    initials: "FH",
    role: "Beauty Therapist",
    email: "fatima@luxesalon.co.za",
    phone: "+27 82 555 0104",
    specialities: ["Eyebrow Sculpt", "Waxing", "Relaxer", "Wash & Blow Dry"],
    rating: 4.8,
    totalClients: 98,
    appointmentsThisMonth: 44,
    revenueThisMonth: 18900,
    status: "Available",
    joinedAt: "Feb 2024",
    schedule: [
      { day: "Mon – Thu", hours: "08:00 – 16:00" },
      { day: "Friday",    hours: "08:00 – 14:00" },
    ],
  },
  {
    id: "STF-004",
    name: "Grace Molefe",
    initials: "GM",
    role: "Junior Stylist",
    email: "grace@luxesalon.co.za",
    phone: "+27 82 555 0105",
    specialities: ["Wash & Blow Dry", "Natural Hair", "Braids"],
    rating: 4.5,
    totalClients: 54,
    appointmentsThisMonth: 21,
    revenueThisMonth: 9800,
    status: "On Leave",
    joinedAt: "Jun 2024",
    schedule: [
      { day: "Tue – Sat", hours: "09:00 – 17:00" },
    ],
  },
];

const statusStyles: Record<StaffMember["status"], string> = {
  "Available":    "text-emerald-400 border-emerald-400/25 bg-emerald-400/8",
  "With Client":  "text-amber-400   border-amber-400/25   bg-amber-400/8",
  "On Leave":     "text-red-400     border-red-400/25     bg-red-400/8",
  "Off Duty":     "text-purple-400  border-purple-400/25  bg-purple-400/8",
};

const statusDot: Record<StaffMember["status"], string> = {
  "Available":   "bg-emerald-400",
  "With Client": "bg-amber-400",
  "On Leave":    "bg-red-400",
  "Off Duty":    "bg-purple-400/50",
};

export default function StaffPage() {
  const totalRevenue = staff.reduce((s, m) => s + m.revenueThisMonth, 0);

  return (
    <>
      {/* Page heading */}
      <div className="mb-8">
        <p className="text-purple-400/50 text-xs tracking-[0.35em] uppercase mb-2">
          Team Management
        </p>
        <h1
          className="text-4xl font-light text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Stylists &amp; <span className="text-purple-300">Staff</span>
        </h1>
        <div className="mt-3 h-px w-12 bg-amber-400/50" />
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Team Members",  value: staff.length.toString() },
          { label: "Available Now", value: staff.filter((s) => s.status === "Available").length.toString() },
          { label: "Appts This Month", value: staff.reduce((s, m) => s + m.appointmentsThisMonth, 0).toString() },
          { label: "Monthly Revenue",  value: `R ${totalRevenue.toLocaleString("en-ZA")}` },
        ].map((s, i) => (
          <div key={i} className="bg-white/[0.02] border border-purple-800/20 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
            <p className="text-purple-300/40 text-[10px] uppercase tracking-[0.2em] mb-2">{s.label}</p>
            <p className="text-2xl font-light text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative max-w-xs w-full">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search staff…"
            className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 text-white text-xs tracking-wider hover:from-purple-600 hover:to-purple-500 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Staff Member
        </button>
      </div>

      {/* Staff cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {staff.map((member) => (
          <div
            key={member.id}
            className="bg-white/[0.02] border border-purple-800/20 rounded-2xl p-6 hover:border-purple-500/20 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-5">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-900 to-purple-600 border border-purple-500/30 flex items-center justify-center text-white/80 text-lg font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {member.initials}
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0d0a1a] ${statusDot[member.status]}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-white text-base font-light">{member.name}</h3>
                    <p className="text-purple-300/50 text-xs tracking-wider mt-0.5">{member.role}</p>
                  </div>
                  <span className={`shrink-0 text-[10px] px-2.5 py-1 rounded-full border tracking-wider uppercase ${statusStyles[member.status]}`}>
                    {member.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  {/* Star rating */}
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-amber-400 text-xs">{member.rating}</span>
                  </div>
                  <span className="text-purple-800/60 text-xs">·</span>
                  <span className="text-purple-300/40 text-xs">Since {member.joinedAt}</span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "Clients",     value: member.totalClients.toString() },
                { label: "This Month",  value: member.appointmentsThisMonth.toString() + " appts" },
                { label: "Revenue",     value: `R ${(member.revenueThisMonth / 1000).toFixed(1)}k` },
              ].map((stat, i) => (
                <div key={i} className="bg-white/[0.02] rounded-xl p-3 text-center">
                  <p className="text-white text-sm font-light">{stat.value}</p>
                  <p className="text-purple-300/30 text-[10px] uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Specialities */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {member.specialities.map((s) => (
                <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-purple-800/30 text-purple-400/50 bg-purple-500/5">
                  {s}
                </span>
              ))}
            </div>

            {/* Schedule + contact */}
            <div className="pt-4 border-t border-purple-800/20 grid grid-cols-2 gap-4">
              <div>
                <p className="text-purple-300/30 text-[10px] uppercase tracking-wider mb-2">Schedule</p>
                {member.schedule.map((s, i) => (
                  <p key={i} className="text-white/50 text-xs leading-5">
                    <span className="text-purple-300/50">{s.day}:</span> {s.hours}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-purple-300/30 text-[10px] uppercase tracking-wider mb-2">Contact</p>
                <p className="text-white/50 text-xs leading-5 truncate">{member.email}</p>
                <p className="text-white/50 text-xs leading-5">{member.phone}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 text-xs tracking-wider text-purple-400/50 border border-purple-800/30 rounded-lg hover:border-purple-600/40 hover:text-purple-300 transition-all">
                View Profile
              </button>
              <button className="flex-1 py-2 text-xs tracking-wider text-purple-400/50 border border-purple-800/30 rounded-lg hover:border-purple-600/40 hover:text-purple-300 transition-all">
                Edit Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}