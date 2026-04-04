export default function MyAppointments() {
  return (
    <div className="min-h-screen bg-[#0d0a1a] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-light tracking-widest mb-4">My Appointments</h1>
        <p className="text-purple-300 text-xl">Welcome! Your bookings and schedule will appear here soon.</p>
        
        <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-purple-800/30">
          <p className="text-purple-400">This is a safe landing page for clients and stylists.</p>
          <a href="/login" className="text-purple-400 underline mt-4 inline-block">Back to Login (for testing)</a>
        </div>
      </div>
    </div>
  );
}