// src/app/(admin)/services/page.tsx

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: string;
  isActive: boolean;
  bookingsThisMonth: number;
};

const services: Service[] = [
  // Hair
  {
    id: "SVC-001", name: "Silk Press & Style",
    description: "Professional straightening for natural hair. Includes wash, blowout, and press.",
    price: 450, durationMinutes: 90, category: "Hair", isActive: true, bookingsThisMonth: 28,
  },
  {
    id: "SVC-002", name: "Wash & Blow Dry",
    description: "Shampoo, deep condition, and a professional blow-dry finish.",
    price: 280, durationMinutes: 60, category: "Hair", isActive: true, bookingsThisMonth: 41,
  },
  // Colour
  {
    id: "SVC-003", name: "Full Hair Colour",
    description: "All-over colour with developer. Includes toning and conditioning treatment.",
    price: 780, durationMinutes: 120, category: "Colour", isActive: true, bookingsThisMonth: 19,
  },
  {
    id: "SVC-004", name: "Highlights & Balayage",
    description: "Hand-painted or foil highlights for a sun-kissed finish. Includes toning.",
    price: 950, durationMinutes: 150, category: "Colour", isActive: true, bookingsThisMonth: 14,
  },
  // Braids
  {
    id: "SVC-005", name: "Box Braids",
    description: "Individual box braid installation in all sizes. Includes prep wash.",
    price: 1200, durationMinutes: 210, category: "Braids", isActive: true, bookingsThisMonth: 22,
  },
  {
    id: "SVC-006", name: "Knotless Braids",
    description: "Lightweight knotless installation. Less tension on the scalp.",
    price: 1400, durationMinutes: 240, category: "Braids", isActive: true, bookingsThisMonth: 17,
  },
  // Treatments
  {
    id: "SVC-007", name: "Keratin Treatment",
    description: "Brazilian smoothing treatment. Eliminates frizz for up to 3 months.",
    price: 1500, durationMinutes: 150, category: "Treatment", isActive: true, bookingsThisMonth: 9,
  },
  {
    id: "SVC-008", name: "Relaxer Treatment",
    description: "Chemical relaxer with neutralising shampoo and deep conditioning.",
    price: 520, durationMinutes: 90, category: "Treatment", isActive: true, bookingsThisMonth: 11,
  },
  {
    id: "SVC-009", name: "Deep Conditioning",
    description: "Intensive repair mask for dry or damaged hair. Steam treatment included.",
    price: 220, durationMinutes: 45, category: "Treatment", isActive: false, bookingsThisMonth: 0,
  },
  // Brows
  {
    id: "SVC-010", name: "Eyebrow Sculpt",
    description: "Precision threading, waxing, and shaping to define your natural features.",
    price: 150, durationMinutes: 45, category: "Brows", isActive: true, bookingsThisMonth: 33,
  },
];

const categoryIcons: Record<string, string> = {
  Hair:      "M12 3C7.5 3 5 6.5 5 9c0 2 1 3.5 2 4.5V18h10v-4.5c1-1 2-2.5 2-4.5 0-3.5-2.5-6-7-6z",
  Colour:    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  Braids:    "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857",
  Treatment: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
  Brows:     "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
};

const categories = Array.from(new Set(services.map((s) => s.category)));

const summaryStats = [
  { label: "Total Services",   value: services.length.toString() },
  { label: "Active",           value: services.filter((s) => s.isActive).length.toString() },
  { label: "Bookings / Month", value: services.reduce((t, s) => t + s.bookingsThisMonth, 0).toString() },
  {
    label: "Avg. Price",
    value: `R ${Math.round(
      services.filter((s) => s.isActive).reduce((t, s) => t + s.price, 0) /
      services.filter((s) => s.isActive).length
    )}`,
  },
];

function formatDuration(mins: number) {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

export default function ServicesPage() {
  return (
    <>
      {/* Page heading */}
      <div className="mb-8">
        <p className="text-purple-400/50 text-xs tracking-[0.35em] uppercase mb-2">
          Service Management
        </p>
        <h1
          className="text-4xl font-light text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Services &amp; <span className="text-purple-300">Pricing</span>
        </h1>
        <div className="mt-3 h-px w-12 bg-amber-400/50" />
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {summaryStats.map((s, i) => (
          <div key={i} className="bg-white/[0.02] border border-purple-800/20 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
            <p className="text-purple-300/40 text-[10px] uppercase tracking-[0.2em] mb-2">{s.label}</p>
            <p className="text-2xl font-light text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button className="px-4 py-2 rounded-full text-xs tracking-wider border bg-purple-500/10 border-purple-500/30 text-purple-300 whitespace-nowrap">
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full text-xs tracking-wider border border-purple-800/30 text-purple-400/40 hover:border-purple-600/40 hover:text-purple-300 transition-all whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 text-white text-xs tracking-wider hover:from-purple-600 hover:to-purple-500 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Service
        </button>
      </div>

      {/* Services grouped by category */}
      <div className="space-y-10">
        {categories.map((category) => {
          const catServices = services.filter((s) => s.category === category);
          return (
            <div key={category}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={categoryIcons[category] ?? categoryIcons.Treatment} />
                  </svg>
                </div>
                <h2
                  className="text-xl font-light text-white"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {category}
                </h2>
                <div className="flex-1 h-px bg-purple-800/20 ml-2" />
                <span className="text-purple-400/30 text-xs">{catServices.length} service{catServices.length !== 1 ? "s" : ""}</span>
              </div>

              {/* Service rows */}
              <div className="bg-white/[0.02] border border-purple-800/20 rounded-2xl overflow-hidden">
                {catServices.map((service, idx) => (
                  <div
                    key={service.id}
                    className={`flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors
                      ${idx !== catServices.length - 1 ? "border-b border-purple-800/10" : ""}`}
                  >
                    {/* Active toggle indicator */}
                    <div className={`w-1.5 h-8 rounded-full shrink-0 ${service.isActive ? "bg-purple-500/60" : "bg-purple-800/30"}`} />

                    {/* Name + description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-light ${service.isActive ? "text-white" : "text-white/40"}`}>
                          {service.name}
                        </p>
                        {!service.isActive && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-red-400/20 bg-red-400/5 text-red-400/60 tracking-wider">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="text-purple-300/30 text-xs mt-0.5 truncate">{service.description}</p>
                    </div>

                    {/* Duration */}
                    <div className="text-center shrink-0 w-20 hidden md:block">
                      <p className="text-white/60 text-sm">{formatDuration(service.durationMinutes)}</p>
                      <p className="text-purple-300/30 text-[10px] uppercase tracking-wider mt-0.5">Duration</p>
                    </div>

                    {/* Bookings */}
                    <div className="text-center shrink-0 w-20 hidden md:block">
                      <p className="text-white/60 text-sm">{service.bookingsThisMonth}</p>
                      <p className="text-purple-300/30 text-[10px] uppercase tracking-wider mt-0.5">Bookings</p>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0 w-24">
                      <p className="text-amber-400/80 text-base font-light">
                        R {service.price.toLocaleString("en-ZA")}
                      </p>
                      <p className="text-purple-300/30 text-[10px] uppercase tracking-wider mt-0.5">Per session</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        className="p-2 rounded-lg border border-purple-800/30 text-purple-400/40 hover:border-purple-600/40 hover:text-purple-300 transition-all"
                        title="Edit"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <button
                        className="p-2 rounded-lg border border-purple-800/30 text-purple-400/40 hover:border-red-500/40 hover:text-red-400 transition-all"
                        title="Delete"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}