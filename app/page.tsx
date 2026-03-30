// src/app/page.tsx
import Link from "next/link";

const services = [
  {
    name: "Silk Press & Style",
    desc: "Transformative straightening for natural hair with lasting results.",
    price: "From R 450",
    duration: "90 min",
    icon: "M12 3C7.5 3 5 6.5 5 9c0 2 1 3.5 2 4.5V18h10v-4.5c1-1 2-2.5 2-4.5 0-3.5-2.5-6-7-6z",
  },
  {
    name: "Balayage & Colour",
    desc: "Hand-painted highlights crafted for your unique tone and texture.",
    price: "From R 780",
    duration: "2 hr",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
  },
  {
    name: "Box Braids",
    desc: "Protective styling with precision installation in all sizes.",
    price: "From R 1,200",
    duration: "3–4 hr",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0",
  },
  {
    name: "Keratin Treatment",
    desc: "Frizz-free smoothing that lasts up to three months.",
    price: "From R 1,500",
    duration: "2.5 hr",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
];

const testimonials = [
  {
    name: "Zanele D.",
    text: "I have been coming to Luxé for over a year and I would never go anywhere else. The atmosphere is unmatched and Nomsa truly understands my hair.",
    service: "Box Braids",
    initials: "ZD",
  },
  {
    name: "Priyanka M.",
    text: "My balayage looks absolutely stunning. Priya took the time to understand exactly what I wanted and delivered beyond expectations.",
    service: "Balayage",
    initials: "PM",
  },
  {
    name: "Aisha F.",
    text: "The keratin treatment changed my life. I walk out every time feeling like royalty. This is genuinely the most luxurious salon in Joburg.",
    service: "Keratin Treatment",
    initials: "AF",
  },
];

// Gallery items — using placeholder gradients since we have no real images.
// Replace bg classes with next/image when you have real photos.
const galleryItems = [
  { span: "col-span-2 row-span-2", gradient: "from-purple-900 via-purple-800 to-indigo-900",  label: "Knotless Braids" },
  { span: "col-span-1 row-span-1", gradient: "from-amber-900 via-purple-900 to-purple-800",   label: "Silk Press" },
  { span: "col-span-1 row-span-1", gradient: "from-purple-800 via-pink-900 to-purple-900",    label: "Balayage" },
  { span: "col-span-1 row-span-2", gradient: "from-indigo-900 via-purple-900 to-violet-900",  label: "Full Colour" },
  { span: "col-span-2 row-span-1", gradient: "from-purple-900 via-amber-900 to-purple-800",   label: "Box Braids" },
  { span: "col-span-1 row-span-1", gradient: "from-violet-900 via-purple-800 to-indigo-800",  label: "Highlights" },
  { span: "col-span-1 row-span-1", gradient: "from-purple-800 via-purple-900 to-amber-900",   label: "Locs" },
];

const teamMembers = [
  { name: "Nomsa Khumalo",  role: "Senior Stylist",       initials: "NK", speciality: "Natural Hair & Braids" },
  { name: "Priya Naidoo",   role: "Colour Specialist",    initials: "PN", speciality: "Balayage & Keratin"   },
  { name: "Fatima Hassan",  role: "Beauty Therapist",     initials: "FH", speciality: "Brows & Treatments"   },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d0a1a] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ─── NAVBAR ─────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-20 bg-[#0d0a1a]/80 backdrop-blur-xl border-b border-purple-800/20">
        <div>
          <span className="text-3xl font-light tracking-widest text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            LUXÉ
          </span>
          <span className="text-amber-400/70 text-[10px] tracking-[0.4em] uppercase ml-1">Salon</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-purple-300/50">
          {["Services", "Gallery", "Team", "Testimonials"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors tracking-wide">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-purple-300/60 hover:text-white transition-colors tracking-wide px-4 py-2">
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-sm px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 text-white hover:from-purple-600 hover:to-purple-500 transition-all tracking-wide"
          >
            Book Now
          </Link>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/30 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-700/20 blur-[100px]" />
          <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-amber-900/10 blur-[80px]" />
        </div>

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(167,139,250,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/60" />
            <span className="text-amber-400/70 text-xs tracking-[0.5em] uppercase">Est. 2024 · Johannesburg</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>

          {/* Main heading */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] tracking-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Where Beauty
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-amber-200">
              Meets Art
            </span>
          </h1>

          <p className="text-purple-200/40 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto leading-relaxed mb-12">
            Premium hair care, colour, and beauty services crafted for the modern woman in the heart of Johannesburg.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 text-white text-sm tracking-[0.1em] uppercase hover:from-purple-600 hover:to-purple-500 transition-all"
            >
              Book an Appointment
            </Link>
            <a
              href="#services"
              className="w-full sm:w-auto px-10 py-4 rounded-xl border border-purple-800/40 text-purple-300/60 text-sm tracking-[0.1em] uppercase hover:border-purple-600/60 hover:text-purple-200 transition-all"
            >
              View Services
            </a>
          </div>

          {/* Scroll hint */}
          <div className="flex flex-col items-center gap-2 mt-20 opacity-30">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-purple-400" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-purple-400">Scroll</span>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─────────────────────────────────────── */}
      <section className="border-y border-purple-800/20 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "500+", label: "Happy Clients"      },
            { value: "4.9",  label: "Average Rating"     },
            { value: "12+",  label: "Services Offered"   },
            { value: "3",    label: "Expert Stylists"    },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {stat.value}
              </p>
              <p className="text-purple-300/40 text-xs uppercase tracking-[0.2em] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────── */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="mb-16 text-center">
            <p className="text-purple-400/50 text-xs tracking-[0.4em] uppercase mb-4">What We Offer</p>
            <h2 className="text-5xl md:text-6xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Our <span className="text-purple-300">Services</span>
            </h2>
            <div className="mt-4 h-px w-12 bg-amber-400/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service, i) => (
              <div
                key={i}
                className="group relative bg-white/[0.02] border border-purple-800/20 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors pointer-events-none" />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                      </svg>
                    </div>
                    <span className="text-amber-400/70 text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {service.price}
                    </span>
                  </div>

                  <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {service.name}
                  </h3>
                  <p className="text-purple-300/40 text-sm leading-relaxed mb-6">{service.desc}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-400/30 text-xs">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {service.duration}
                    </div>
                    <Link
                      href="/register"
                      className="text-xs text-purple-400/50 hover:text-purple-200 tracking-widest uppercase transition-colors flex items-center gap-1 group/link"
                    >
                      Book
                      <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 text-sm text-purple-400/50 hover:text-purple-200 uppercase tracking-[0.2em] transition-colors"
            >
              View all services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TEAM ────────────────────────────────────────────── */}
      <section id="team" className="py-28 px-6 border-t border-purple-800/20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-purple-400/50 text-xs tracking-[0.4em] uppercase mb-4">The Artists</p>
            <h2 className="text-5xl md:text-6xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Meet Our <span className="text-purple-300">Team</span>
            </h2>
            <div className="mt-4 h-px w-12 bg-amber-400/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="group bg-white/[0.02] border border-purple-800/20 rounded-2xl p-8 text-center hover:border-purple-500/25 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-900 to-purple-600 border-2 border-purple-500/20 flex items-center justify-center text-2xl font-light text-white/80 mx-auto mb-5 group-hover:border-purple-400/40 transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {member.initials}
                </div>

                <h3 className="text-white text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {member.name}
                </h3>
                <p className="text-purple-400/50 text-xs tracking-[0.2em] uppercase mt-1 mb-3">{member.role}</p>

                {/* Divider */}
                <div className="h-px w-8 bg-amber-400/30 mx-auto mb-3" />

                <p className="text-purple-300/30 text-xs">{member.speciality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────── */}
      <section id="testimonials" className="py-28 px-6 border-t border-purple-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-purple-400/50 text-xs tracking-[0.4em] uppercase mb-4">Client Love</p>
            <h2 className="text-5xl md:text-6xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              What They <span className="text-purple-300">Say</span>
            </h2>
            <div className="mt-4 h-px w-12 bg-amber-400/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/[0.02] border border-purple-800/20 rounded-2xl p-7 hover:border-purple-500/20 transition-all"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-purple-200/50 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-purple-800/20">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-900 to-purple-700 border border-purple-500/20 flex items-center justify-center text-xs text-white/70"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">{t.name}</p>
                    <p className="text-purple-400/30 text-[10px] uppercase tracking-wider">{t.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─────────────────────────────────────────── */}
      <section id="gallery" className="py-28 px-6 border-t border-purple-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-purple-400/50 text-xs tracking-[0.4em] uppercase mb-4">Our Work</p>
            <h2 className="text-5xl md:text-6xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              The <span className="text-purple-300">Gallery</span>
            </h2>
            <div className="mt-4 h-px w-12 bg-amber-400/50 mx-auto" />
            <p className="text-purple-300/30 text-sm mt-4 max-w-sm mx-auto">
              A glimpse into the transformations we create every day at Luxé.
            </p>
          </div>

          {/*
            Gallery grid — 4 cols × 3 rows.
            Replace the gradient divs with next/image when you have real photos:
              <Image src="/gallery/1.jpg" alt="Knotless Braids" fill className="object-cover" />
          */}
          <div className="grid grid-cols-4 grid-rows-3 gap-3 h-[600px]">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`${item.span} relative rounded-2xl overflow-hidden group cursor-pointer`}
              >
                {/* Gradient placeholder — swap for real images */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80`} />

                {/* Decorative pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Label overlay on hover */}
                <div className="absolute inset-0 bg-[#0d0a1a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white/80 text-sm tracking-wider"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Always-visible subtle label at bottom */}
                <div className="absolute bottom-3 left-4">
                  <span className="text-white/30 text-xs tracking-wider">{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-purple-400/25 text-xs tracking-[0.3em] uppercase mt-6">
            Add your photos by replacing the gradient placeholders with next/image components
          </p>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────── */}
      <section className="py-28 px-6 border-t border-purple-800/20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full rounded-full bg-purple-900/20 blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-purple-400/50 text-xs tracking-[0.4em] uppercase mb-4">Ready?</p>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Book Your Next
            <br />
            <span className="text-purple-300">Transformation</span>
          </h2>
          <p className="text-purple-300/30 text-sm mb-10 leading-relaxed">
            Join over 500 clients who trust Luxé Salon for their hair and beauty needs. First-time clients receive a complimentary consultation.
          </p>
          <Link
            href="/register"
            className="inline-block px-12 py-4 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 text-white text-sm tracking-[0.15em] uppercase hover:from-purple-600 hover:to-purple-500 transition-all"
          >
            Create an Account
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-purple-800/20 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <span className="text-3xl font-light text-white tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  LUXÉ
                </span>
                <span className="text-amber-400/70 text-[10px] tracking-[0.4em] uppercase ml-1">Salon</span>
              </div>
              <p className="text-purple-300/30 text-sm leading-relaxed max-w-xs">
                Premium hair care and beauty services in the heart of Johannesburg. Where every client leaves feeling extraordinary.
              </p>
              <div className="flex gap-3 mt-6">
                {/* Instagram */}
                <a href="#" className="w-9 h-9 rounded-full border border-purple-800/30 flex items-center justify-center text-purple-400/40 hover:border-purple-600/50 hover:text-purple-300 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" className="w-9 h-9 rounded-full border border-purple-800/30 flex items-center justify-center text-purple-400/40 hover:border-purple-600/50 hover:text-purple-300 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="#" className="w-9 h-9 rounded-full border border-purple-800/30 flex items-center justify-center text-purple-400/40 hover:border-purple-600/50 hover:text-purple-300 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="text-purple-300/40 text-[10px] uppercase tracking-[0.25em] mb-4">Quick Links</p>
              <ul className="space-y-3">
                {["Services", "Book Appointment", "Our Team", "Gallery", "Sign In"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-purple-300/30 text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-purple-300/40 text-[10px] uppercase tracking-[0.25em] mb-4">Visit Us</p>
              <ul className="space-y-3 text-purple-300/30 text-sm">
                <li>123 Sandton Drive</li>
                <li>Sandton, Johannesburg</li>
                <li className="pt-2">Mon – Fri: 09:00 – 18:00</li>
                <li>Saturday: 09:00 – 14:00</li>
                <li className="pt-2 hover:text-white transition-colors cursor-pointer">
                  hello@luxesalon.co.za
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  +27 11 555 0100
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-purple-800/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-purple-400/20 text-[10px] tracking-[0.3em] uppercase">
              © 2025 Luxé Salon · All rights reserved
            </p>
            <div className="flex gap-6 text-purple-400/20 text-[10px] uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-purple-300/50 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-300/50 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}