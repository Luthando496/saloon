// src/app/(admin)/dashboard/page.tsx

import Link from "next/link";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Appointment } from "@/models";

const statusStyles: Record<string, string> = {
  completed: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  confirmed: "text-amber-400   border-amber-400/20   bg-amber-400/5",
  pending:   "text-purple-400  border-purple-400/20  bg-purple-400/5",
  cancelled: "text-red-400     border-red-400/20     bg-red-400/5",
};

export default async function DashboardPage() {
  await auth();
  await connectDB();

  // ── Fetch ALL appointments (not filtered by today) ──────────────────
  // Your seed data is from March 2025. Filtering by "today" returns nothing.
  // Once you have real bookings coming in daily, swap this back to a today filter.
  const allAppointments = await Appointment.find({})
    .populate("clientId",  "name")
    .populate("serviceId", "name price")
    .populate({ path: "staffId", populate: { path: "userId", select: "name" } })
    .sort({ scheduledAt: -1 }) // most recent first
    .lean();

  // ── Today range (kept for the label) ────────────────────────────────
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const todayAppointments = allAppointments.filter((a) => {
    const d = new Date(a.scheduledAt as string);
    return d >= todayStart && d <= todayEnd;
  });

  // Use today's if any exist, otherwise fall back to all-time so the UI
  // never looks completely empty during development
  const displayAppointments =
    todayAppointments.length > 0 ? todayAppointments : allAppointments;

  const isShowingAllTime = todayAppointments.length === 0;

  // ── Stats ────────────────────────────────────────────────────────────
  const totalRevenue = allAppointments
    .filter((a) => a.status === "completed")
    .reduce((sum, a) => sum + ((a as any).amountPaid ?? 0), 0);

  const stats = [
    {
      label:    isShowingAllTime ? "Total Revenue" : "Today's Revenue",
      value:    `R ${totalRevenue.toLocaleString("en-ZA")}`,
      sub:      "from completed appointments",
    },
    {
      label:    isShowingAllTime ? "Total Appointments" : "Today's Appointments",
      value:    allAppointments.length.toString(),
      sub:      isShowingAllTime ? "across all time" : "scheduled today",
    },
    {
      label:    "Pending",
      value:    allAppointments.filter((a) => a.status === "pending").length.toString(),
      sub:      "awaiting confirmation",
    },
    {
      label:    "Cancelled",
      value:    allAppointments.filter((a) => a.status === "cancelled").length.toString(),
      sub:      "total cancellations",
    },
  ];

  return (
    <>
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/[0.02] border border-purple-800/20 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors pointer-events-none" />
            <p className="text-purple-300/50 text-xs tracking-[0.2em] uppercase mb-2">{stat.label}</p>
            <h3 className="text-3xl font-light text-white mb-1">{stat.value}</h3>
            <p className="text-purple-300/30 text-xs">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Appointments table */}
      <div className="bg-white/[0.02] border border-purple-800/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-purple-800/20 flex items-center justify-between">
          <div>
            <h3
              className="text-xl font-light text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {isShowingAllTime ? "All Appointments" : "Today's Schedule"}
            </h3>
            {isShowingAllTime && (
              <p className="text-purple-400/30 text-xs mt-0.5 tracking-wider">
                No appointments today — showing all-time data
              </p>
            )}
          </div>
          <Link
            href="/appointments"
            className="text-xs text-purple-400/60 hover:text-purple-300 uppercase tracking-widest transition-colors"
          >
            View All
          </Link>
        </div>

        {displayAppointments.length === 0 ? (
          <div className="p-12 text-center text-purple-300/30 text-sm tracking-wider">
            No appointments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-purple-900/10 text-purple-300/50 text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-6 py-4 font-light">Date & Time</th>
                  <th className="px-6 py-4 font-light">Client</th>
                  <th className="px-6 py-4 font-light">Service</th>
                  <th className="px-6 py-4 font-light">Stylist</th>
                  <th className="px-6 py-4 font-light">Amount</th>
                  <th className="px-6 py-4 font-light">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-white/70">
                {displayAppointments.map((apt) => {
                  const date = new Date(apt.scheduledAt as string);
                  const dateStr = date.toLocaleDateString("en-ZA", {
                    day: "numeric",
                    month: "short",
                    year: isShowingAllTime ? "numeric" : undefined,
                  });
                  const timeStr = date.toLocaleTimeString("en-ZA", {
                    hour:   "2-digit",
                    minute: "2-digit",
                  });

                  const client  = (apt.clientId  as any)?.name       ?? "—";
                  const service = (apt.serviceId as any)?.name       ?? "—";
                  const stylist = (apt.staffId   as any)?.userId?.name ?? "—";
                  const status  = (apt.status    as string) ?? "pending";
                  const amount  = (apt as any).amountPaid ?? 0;

                  return (
                    <tr
                      key={apt._id?.toString()}
                      className="border-b border-purple-800/10 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-purple-300/80">
                        <span>{dateStr}</span>
                        <span className="text-purple-400/40 ml-2 text-xs">{timeStr}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{client}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-purple-200/50">{service}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{stylist}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-amber-400/70">
                        {amount > 0 ? `R ${amount.toLocaleString("en-ZA")}` : "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full border ${statusStyles[status] ?? statusStyles.pending}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}