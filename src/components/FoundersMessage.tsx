import { motion } from "framer-motion";
import { Quote, Sparkles, HeartHandshake, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const founders = [
  {
    name: "Piyush Nikam",
    role: "Co-Founder & CEO",
    image: "/images/FoundersPic/Piyush Nikam.jpeg",
    bio: "Passionate about workplace wellness",
  },
  {
    name: "Tanuja Nikam",
    role: "Co-Founder & COO",
    image: "/images/FoundersPic/Tanuja Nikam.jpeg",
    bio: "Dedicated to nutrition & operations",
  },
];

export default function FoundersMessage() {
  return (
    <section className="relative overflow-hidden bg-[#FCFBF7] py-10 sm:py-16">
      
      {/* Background Subtle Glows */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#6DBE45]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-[#FFB84D]/15 blur-3xl" />

      <div className="container-x relative z-10 px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] border border-[#ECECEC] bg-white p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
          
          <div className="grid lg:grid-cols-[320px_1fr] gap-8 sm:gap-12 items-center">
            
            {/* ─── LEFT: Founders Portrait Showcase ─────────── */}
            <Reveal>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  {founders.map((f) => (
                    <div
                      key={f.name}
                      className="group relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-slate-100 shadow-xs transition-all duration-300 hover:border-[#6DBE45]/50 hover:shadow-md"
                    >
                      <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                        <img
                          src={f.image}
                          alt={f.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/dashboard_fruit_bowl.png";
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent p-3 text-center">
                          <p className="text-xs font-black text-white leading-tight">{f.name}</p>
                          <p className="text-[10px] font-bold text-[#6DBE45] mt-0.5">{f.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Badge Below Photos */}
                <div className="rounded-2xl bg-[#EAF8DF]/60 p-3 border border-[#6DBE45]/20 flex items-center justify-center gap-2 text-[11px] font-black text-[#1B7A1A]">
                  <ShieldCheck className="h-4 w-4 text-[#6DBE45]" />
                  <span>100% Quality & Hygiene Guaranteed</span>
                </div>
              </div>
            </Reveal>

            {/* ─── RIGHT: High-Vibe Letter From Founders ────── */}
            <div className="relative">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A] border border-[#6DBE45]/20">
                  <HeartHandshake className="h-3.5 w-3.5 text-[#6DBE45]" /> Our Story & Mission
                </div>

                <h2 className="mt-3 text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  "Why We Started FrootBoost"
                </h2>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="mt-4 space-y-3 text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                  <p>
                    FrootBoost was born from a simple observation — busy working professionals often skip daily fresh fruits, not because they don't care about wellness, but because they lack the time in demanding work schedules.
                  </p>

                  <p>
                    Our mission is to make healthy habits effortless by delivering freshly cut, hygienically packed fruit boxes directly to office desks every morning. Every box is prepared with handpicked organic fruits, daily soaked almonds, and genuine care.
                  </p>

                  <p className="text-slate-900 font-bold">
                    We aren't just delivering fruit boxes — we're building a healthier, more energized workplace routine across companies.
                  </p>
                </div>
              </Reveal>

              {/* Founder Signatures & Quote */}
              <Reveal delay={0.1}>
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {founders.map((f) => (
                        <img
                          key={f.name}
                          src={f.image}
                          alt={f.name}
                          className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-xs"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-tight">Piyush &amp; Tanuja Nikam</p>
                      <p className="text-[10px] font-extrabold text-[#1B7A1A] uppercase tracking-wider">Founders, FrootBoost</p>
                    </div>
                  </div>

                  {/* Handwritten Signature Styling */}
                  <div className="text-right">
                    <span
                      className="text-2xl sm:text-3xl text-[#1B7A1A] font-black select-none opacity-90"
                      style={{ fontFamily: "'Dancing Script', 'Caveat', cursive, serif" }}
                    >
                      Piyush & Tanuja
                    </span>
                  </div>
                </div>
              </Reveal>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
