import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, CheckCircle2, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

export default function CTASection() {
  const featureBadges = [
    "100% Farm Fresh",
    "Daily Office Delivery",
    "Hygienically Sealed",
  ];

  return (
    <section className="relative w-full overflow-hidden py-6 sm:py-8 bg-gradient-to-b from-[#FCFBF7] to-[#13361E]">
      {/* Background Fruit Image */}
      <img
        src="/images/download.jpg"
        alt="Fresh fruits background"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Subtle Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="container-x relative z-10 w-full px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] border border-white/30 bg-gradient-to-r from-black/60 via-[#1B7A1A]/80 to-black/70 backdrop-blur-xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.25)] text-white">
            
            {/* Ambient Accent Glows */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#6DBE45]/25 blur-2xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left Column: Heading & Badges */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#A8E063] border border-white/20 backdrop-blur-md">
                  <Sparkles className="h-3 w-3 text-[#A8E063]" /> Daily Health Habit
                </div>

                <h2 className="mt-2 text-xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  Ready to <span className="text-[#A8E063]">Boost Your Health?</span>
                </h2>

                <p className="mt-1 text-xs sm:text-sm font-medium text-white/90 max-w-lg">
                  Join thousands of working professionals enjoying fresh 400g fruitbox tiffins delivered every morning.
                </p>

                {/* Feature Badges */}
                <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2">
                  {featureBadges.map((badge) => (
                    <div
                      key={badge}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-white border border-white/20 backdrop-blur-md shadow-2xs"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#A8E063]" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Compact Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#6DBE45] px-6 text-xs font-black text-white shadow-lg transition-all hover:bg-[#5da73a] active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <span>Order Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="https://wa.me/917218935073"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/15 backdrop-blur-md px-5 text-xs font-black text-white shadow-2xs transition-all hover:bg-white/30 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 text-[#A8E063]" />
                  <span>WhatsApp Support</span>
                </a>
              </div>

            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
