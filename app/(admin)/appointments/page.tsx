// src/app/(admin)/dashboard/page.tsx
// The sidebar and header come from (admin)/layout.tsx automatically.
// This file only contains the dashboard content itself.

import Link from "next/link";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Appointment } from "@/models";

// Reusable status badge styles
const statusStyles: Record<string, string> = {
  completed:  "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  confirmed:  "text-amber-400   border-amber-400/20   bg-amber-400/5",
  pending:    "text-purple-400  border-purple-400/20  bg-purple-400/5",
  cancelled:  "text-red-400     border-red-400/20     bg-red-400/5",
};

export default async function DashboardPage() {
  const session = await auth();

  await connectDB();

  // Today's date range
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // Fetch today's appointments with client + service populated
  const appointments = await Appointment.find({
    scheduledAt: { $gte: todayStart, $lte: todayEnd },
  })
    .populate("clientId", "name")
    .populate("serviceId", "name price")
    .populate({ path: "staffId", populate: { path: "userId", select: "name" } })
    .sort({ scheduledAt: 1 })
    .lean();

  // Aggregate stats
  const totalRevenue = appointments
    .filter((a) => a.status === "completed")
    .reduce((sum, a) => sum + (a.amountPaid ?? 0), 0);

  const stats = [
    {
      label: "Today's Revenue",
      value: `R ${totalRevenue.toLocaleString("en-ZA")}`,
      sub: "completed appointments",
      positive: true,
    },
    {
      label: "Appointments",
      value: appointments.length.toString(),
      sub: "scheduled today",
      positive: true,
    },
    {
      label: "Pending",
      value: appointments.filter((a) => a.status === "pending").length.toString(),
      sub: "awaiting confirmation",
      positive: false,
    },
  ];

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/[0.02] border border-purple-800/20 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />
            <p className="text-purple-300/50 text-xs tracking-[0.2em] uppercase mb-2">
              {stat.label}
            </p>
            <h3 className="text-3xl font-light text-white mb-1">{stat.value}</h3>
            <p className="text-purple-300/30 text-xs">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Today's appointments table */}
      <div className="bg-white/[0.02] border border-purple-800/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-purple-800/20 flex items-center justify-between">
          <h3
            className="text-xl font-light text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Today's Schedule
          </h3>
          <Link
            href="/appointments"
            className="text-xs text-purple-400/60 hover:text-purple-300 uppercase tracking-widest transition-colors"
          >
            View All
          </Link>
        </div>

        {appointments.length === 0 ? (
          <div className="p-12 text-center text-purple-300/30 text-sm tracking-wider">
            No appointments scheduled for today.
          </div>
        ) : (
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
                {appointments.map((apt) => {
                  const time = new Date(apt.scheduledAt).toLocaleTimeString("en-ZA", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  const client  = (apt.clientId  as any)?.name  ?? "—";
                  const service = (apt.serviceId as any)?.name  ?? "—";
                  const stylist = (apt.staffId   as any)?.userId?.name ?? "—";
                  const status  = apt.status ?? "pending";

                  return (
                    <tr
                      key={apt._id?.toString()}
                      className="border-b border-purple-800/10 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-purple-300/80">{time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{client}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-purple-200/50">{service}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{stylist}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-full border ${
                            statusStyles[status] ?? statusStyles.pending
                          }`}
                        >
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