// src/app/appointments/page.tsx
// Auth is guaranteed by middleware — no need to call auth() here.
// Calling auth() in a page that middleware already protects can cause
// repeated session checks that contribute to the render loop.

import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import { Appointment } from "@/models";
import { redirect } from "next/navigation";

const statusStyles: Record<string, string> = {
  completed: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  confirmed: "text-amber-400   border-amber-400/20   bg-amber-400/5",
  pending:   "text-purple-400  border-purple-400/20  bg-purple-400/5",
  cancelled: "text-red-400     border-red-400/20     bg-red-400/5",
};

export default async function AppointmentsPage() {
   const session = await auth();

  if (!session?.user?.id) redirect("/login");

  await connectDB();

  const appointments = await Appointment.find({
    clientId: session.user.id,
  })
    .populate("serviceId", "name price durationMinutes")
    .populate({ path: "staffId", populate: { path: "userId", select: "name" } })
    .sort({ scheduledAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-[#0d0a1a] px-6 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-purple-400/50 text-xs tracking-[0.35em] uppercase mb-2">
            My Bookings
          </p>
          <h1
            className="text-4xl font-light text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            My <span className="text-purple-300">Appointments</span>
          </h1>
          <div className="mt-3 h-px w-12 bg-amber-400/50" />
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white/2 border border-purple-800/20 rounded-2xl p-16 text-center">
            <p className="text-purple-300/30 text-sm tracking-wider mb-6">
              You have no appointments yet.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 rounded-xl bg-linear-to-r from-purple-700 to-purple-600 text-white text-sm tracking-wider hover:from-purple-600 hover:to-purple-500 transition-all"
            >
              Book Now
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => {
              const date    = new Date(apt.scheduledAt as string);
              const dateStr = date.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
              const timeStr = date.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });
              const service = (apt.serviceId as any);
              const stylist = (apt.staffId   as any)?.userId?.name ?? "—";
              const status  = (apt.status    as string) ?? "pending";

              return (
                <div
                  key={apt._id?.toString()}
                  className="bg-white/2 border border-purple-800/20 rounded-2xl p-6 hover:border-purple-500/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-white text-base font-light mb-1">
                        {service?.name ?? "—"}
                      </h3>
                      <p className="text-purple-300/40 text-xs">
                        with {stylist} · {service?.durationMinutes} min
                      </p>
                    </div>
                    <span className={`text-[10px] px-3 py-1 rounded-full border uppercase tracking-wider ${statusStyles[status] ?? statusStyles.pending}`}>
                      {status}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-purple-800/20 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-purple-300/40 text-xs">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {dateStr} at {timeStr}
                    </div>
                    <span className="text-amber-400/70 text-sm font-light">
                      {(apt as any).amountPaid > 0
                        ? `R ${(apt as any).amountPaid.toLocaleString("en-ZA")}`
                        : service?.price ? `R ${service.price.toLocaleString("en-ZA")}` : "—"
                      }
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}