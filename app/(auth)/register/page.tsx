"use client";

import { useState } from "react";
import Link from "next/link";

const roles = [
  {
    id: "client",
    label: "Client",
    description: "Book appointments & manage visits",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    id: "stylist",
    label: "Stylist",
    description: "Manage schedule & clients",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    id: "admin",
    label: "Admin",
    description: "Full dashboard & team access",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "client",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field:any, value:any) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleNext = () => {
    // e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
      } else {
        window.location.href = "/login?registered=true";
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const strengthScore = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strengthScore];
  const strengthColor = ["", "bg-red-500", "bg-amber-500", "bg-purple-400", "bg-emerald-400"][strengthScore];

  return (
    <div className="min-h-screen bg-[#0d0a1a] flex">
      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center px-16">
        <div className="absolute inset-0 bg-[#0d0a1a]" />

        {/* Ambient blobs */}
        <div className="absolute top-[-5%] right-[-5%] w-[65%] h-[65%] rounded-full bg-purple-800/15 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute top-[50%] right-[30%] w-[35%] h-[35%] rounded-full bg-amber-900/10 blur-2xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(167,139,250,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent" />

        {/* Decorative content */}
        <div className="relative z-10 text-center">
          <h1
            className="text-7xl font-light text-white mb-2 leading-none tracking-widest"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            LUXÉ
          </h1>
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
            <span className="text-amber-400/80 text-xs tracking-[0.5em] uppercase">Salon</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>

          <p className="text-purple-200/30 text-sm tracking-[0.15em] max-w-xs mx-auto leading-relaxed font-light">
            Join our community of beauty professionals and clients across Johannesburg.
          </p>

          {/* Step indicators on left panel */}
          <div className="mt-16 flex flex-col items-center gap-6">
            {[
              { n: 1, label: "Personal details" },
              { n: 2, label: "Account security" },
            ].map(({ n, label }) => (
              <div key={n} className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-light border transition-all duration-500
                  ${step >= n
                    ? "border-purple-400/60 bg-purple-500/20 text-purple-300"
                    : "border-purple-800/30 bg-transparent text-purple-600/40"
                  }`}
                >
                  {step > n ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : n}
                </div>
                <span className={`text-sm tracking-wider transition-colors duration-300 ${step >= n ? "text-purple-300/60" : "text-purple-600/30"}`}>
                  {label}
                </span>
              </div>
            ))}
            <div className={`w-px h-8 -mt-2 -mb-2 transition-all duration-700 ${step >= 2 ? "bg-purple-500/40" : "bg-purple-800/20"}`} style={{ order: -1, marginTop: "0.5rem", marginBottom: "0.5rem" }} />
          </div>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 bg-[#100d20]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <h1
              className="text-5xl font-light text-white tracking-widest"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              LUXÉ
            </h1>
            <p className="text-amber-400/70 text-xs tracking-[0.4em] uppercase mt-1">Salon</p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <p className="text-purple-400/60 text-xs tracking-[0.35em] uppercase mb-3">
              Step {step} of 2
            </p>
            <h2
              className="text-4xl font-light text-white leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {step === 1 ? (
                <>Create your <span className="text-purple-300">profile</span></>
              ) : (
                <>Secure your <span className="text-purple-300">account</span></>
              )}
            </h2>
            <div className="mt-4 flex gap-2">
              <div className={`h-px flex-1 transition-all duration-500 ${step >= 1 ? "bg-purple-500/50" : "bg-purple-800/20"}`} />
              <div className={`h-px flex-1 transition-all duration-500 ${step >= 2 ? "bg-purple-500/50" : "bg-purple-800/20"}`} />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-5">
              {/* Full name */}
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-purple-300/50 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                  placeholder="Amara Moyo"
                  className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3.5
                             text-white placeholder-white/20 text-sm
                             focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.05]
                             hover:border-purple-700/40 transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-purple-300/50 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3.5
                             text-white placeholder-white/20 text-sm
                             focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.05]
                             hover:border-purple-700/40 transition-all duration-300"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-purple-300/50 mb-2">
                  Phone number <span className="text-purple-500/30 normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+27 82 000 0000"
                  className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3.5
                             text-white placeholder-white/20 text-sm
                             focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.05]
                             hover:border-purple-700/40 transition-all duration-300"
                />
              </div>

              {/* Role selector */}
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-purple-300/50 mb-3">
                  I am joining as
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => update("role", r.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all duration-300
                        ${form.role === r.id
                          ? "border-purple-500/50 bg-purple-500/10 text-purple-300"
                          : "border-purple-800/20 bg-white/[0.02] text-purple-400/40 hover:border-purple-700/30 hover:text-purple-400/60"
                        }`}
                    >
                      <span className={form.role === r.id ? "text-purple-300" : "text-purple-600/40"}>
                        {r.icon}
                      </span>
                      <span className="text-xs tracking-wide font-light">{r.label}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-purple-400/30 text-center">
                  {roles.find((r) => r.id === form.role)?.description}
                </p>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="relative w-full py-4 rounded-xl font-light text-sm tracking-[0.15em] uppercase
                             bg-gradient-to-r from-purple-700 to-purple-600 text-white/90 overflow-hidden
                             hover:from-purple-600 hover:to-purple-500 transition-all duration-300 group"
                >
                  Continue
                  <div className="absolute inset-0 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Password */}
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-purple-300/50 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    required
                    placeholder="Min. 8 characters"
                    className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3.5 pr-12
                               text-white placeholder-white/20 text-sm
                               focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.05]
                               hover:border-purple-700/40 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/40 hover:text-purple-300/60 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Strength meter */}
                {form.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                            i <= strengthScore ? strengthColor : "bg-purple-800/20"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-purple-400/40">{strengthLabel}</p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-purple-300/50 mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    required
                    placeholder="Repeat your password"
                    className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3.5 pr-12
                               text-white placeholder-white/20 text-sm
                               focus:outline-none focus:bg-white/[0.05]
                               hover:border-purple-700/40 transition-all duration-300
                               ${form.confirmPassword && form.password !== form.confirmPassword
                                 ? "border-red-500/40 focus:border-red-500/60"
                                 : form.confirmPassword && form.password === form.confirmPassword
                                 ? "border-emerald-500/40 focus:border-emerald-500/60"
                                 : "border-purple-800/30 focus:border-purple-500/60"
                               }`}
                  />
                  {form.confirmPassword && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2">
                      {form.password === form.confirmPassword ? (
                        <svg className="w-4 h-4 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-red-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* Summary card */}
              <div className="rounded-xl border border-purple-800/20 bg-white/[0.02] px-4 py-3 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 flex-shrink-0">
                  <span className="text-sm font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {form.name.charAt(0).toUpperCase() || "?"}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-white/70 text-sm truncate">{form.name || "Your name"}</p>
                  <p className="text-purple-400/40 text-xs truncate">{form.email || "your@email.com"}</p>
                </div>
                <span className="ml-auto text-[10px] tracking-widest uppercase text-purple-400/40 border border-purple-800/20 px-2 py-0.5 rounded-full">
                  {form.role}
                </span>
              </div>

              {/* Terms */}
              <p className="text-purple-400/30 text-xs text-center leading-relaxed">
                By creating an account you agree to our{" "}
                <Link href="/terms" className="text-purple-400/50 hover:text-purple-300/70 underline underline-offset-2">
                  Terms
                </Link>{" "}
                &{" "}
                <Link href="/privacy" className="text-purple-400/50 hover:text-purple-300/70 underline underline-offset-2">
                  Privacy Policy
                </Link>
              </p>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => { setStep(1); setError(""); }}
                  className="px-5 py-4 rounded-xl border border-purple-800/30 text-purple-400/50
                             hover:border-purple-700/40 hover:text-purple-300/60
                             text-sm tracking-wider transition-all duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative flex-1 py-4 rounded-xl font-light text-sm tracking-[0.15em] uppercase
                             bg-gradient-to-r from-purple-700 to-purple-600 text-white/90 overflow-hidden
                             hover:from-purple-600 hover:to-purple-500
                             disabled:opacity-60 disabled:cursor-not-allowed
                             transition-all duration-300 group"
                >
                  <span className={`transition-opacity duration-200 ${isLoading ? "opacity-0" : "opacity-100"}`}>
                    Create Account
                  </span>
                  {isLoading && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 text-white/80" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    </span>
                  )}
                  <div className="absolute inset-0 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[200%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </button>
              </div>
            </form>
          )}

          {/* Sign in link */}
          <p className="text-center text-purple-300/40 text-sm mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-300/70 hover:text-purple-200 transition-colors underline underline-offset-4 decoration-purple-500/30 hover:decoration-purple-400/60"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-8 text-center text-purple-400/20 text-[10px] tracking-[0.3em] uppercase">
            © 2025 Luxé Salon · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}