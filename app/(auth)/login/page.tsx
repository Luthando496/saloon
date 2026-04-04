"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/actions/auth";

type LoginResult = 
  | { error: string }
  | { success: true; role: "admin" | "stylist" | "client" };

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);
  const result = await signIn(formData);

  if ("error" in result && result.error) {
    setError(result.error);
    setIsLoading(false);
    return;
  }

  // Safe role-based redirect
  const redirectPath =
    result.role === "admin"
      ? "/dashboard"
      : result.role === "stylist"
      ? "/stylist/appointments"
      : "/my-appointments";

  window.location.href = redirectPath;
}

  return (
    <div className="min-h-screen bg-[#0d0a1a] flex">
      {/* Left decorative panel - unchanged */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center px-16">
        {/* ... your existing decorative code ... */}
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 relative">
        <div className="absolute inset-0 bg-[#100d20]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo - unchanged */}
          <div className="lg:hidden text-center mb-10">
            {/* ... */}
          </div>

          <div className="mb-10">
            <p className="text-purple-400/60 text-xs tracking-[0.35em] uppercase mb-3">
              Welcome back
            </p>
            <h2
              className="text-4xl font-light text-white leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Sign in to your
              <br />
              <span className="text-purple-300">account</span>
            </h2>
            <div className="mt-4 h-px w-12 bg-amber-400/50" />
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field - unchanged */}
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-purple-300/50 mb-2">
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3.5
                           text-white placeholder-white/20 text-sm
                           focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.05]
                           hover:border-purple-700/40 transition-all duration-300"
              />
            </div>

            {/* Password field - unchanged */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] tracking-[0.2em] uppercase text-purple-300/50">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-purple-400/50 hover:text-purple-300/70 transition-colors tracking-wider"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-purple-800/30 rounded-xl px-4 py-3.5 pr-20
                             text-white placeholder-white/20 text-sm
                             focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.05]
                             hover:border-purple-700/40 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/40 hover:text-purple-300/60 transition-colors text-xs tracking-wider"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit button - unchanged */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-4 rounded-xl font-light text-sm tracking-[0.15em] uppercase
                           bg-gradient-to-r from-purple-700 to-purple-600
                           text-white/90 overflow-hidden
                           hover:from-purple-600 hover:to-purple-500
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all duration-300 group"
              >
                <span className={`transition-opacity duration-200 ${isLoading ? "opacity-0" : "opacity-100"}`}>
                  Sign In
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

          {/* Rest of the form (or / register link) - unchanged */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-purple-800/20" />
            <span className="text-purple-400/30 text-xs tracking-widest">or</span>
            <div className="flex-1 h-px bg-purple-800/20" />
          </div>

          <p className="text-center text-purple-300/40 text-sm">
            New to Luxé?{" "}
            <Link
              href="/register"
              className="text-purple-300/70 hover:text-purple-200 transition-colors underline underline-offset-4 decoration-purple-500/30 hover:decoration-purple-400/60"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-12 text-center text-purple-400/20 text-[10px] tracking-[0.3em] uppercase">
            © 2025 Luxé Salon · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}