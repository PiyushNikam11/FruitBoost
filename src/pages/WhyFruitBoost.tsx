import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Coffee, Cookie, X, Apple, Brain, Heart, Shield, Sparkles, Weight, Target, ArrowRight, CheckCircle2, Check, Ban, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import CTASection from "@/components/CTASection";

const unhealthy = [
  { icon: Coffee, name: "Tea & Coffee Slump", note: "Sugar spike followed by 3 PM crash" },
  { icon: Cookie, name: "Processed Biscuits", note: "Refined carbs & trans fats" },
  { icon: Cookie, name: "Packaged Chips", note: "High sodium, zero nutrition" },
];

const healthy = [
  { icon: Apple, name: "Fresh Seasonal Fruits", note: "Natural hydration & sustained energy" },
  { icon: Sparkles, name: "Daily Soaked Almonds", note: "Brain-healthy fats & protein" },
  { icon: Shield, name: "100% Natural Vitamins", note: "Daily immunity & focus boost" },
];

const benefitGradients = [
  "from-green-400 to-green-600",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-red-600",
  "from-teal-400 to-emerald-600",
  "from-emerald-400 to-green-600",
  "from-orange-400 to-amber-500",
];

const benefits = [
  { icon: Brain, title: "Sharper Focus", desc: "Antioxidants and omega-rich soaked almonds prevent afternoon brain fog." },
  { icon: Heart, title: "Heart Vitality", desc: "Natural fiber and potassium support cardiovascular wellness every day." },
  { icon: Shield, title: "Immunity Shield", desc: "Vitamin C-rich fresh fruits strengthen your natural immune defenses." },
  { icon: Sparkles, title: "Natural Glow", desc: "Hydration and natural vitamins keep skin looking vibrant and healthy." },
  { icon: Weight, title: "Healthy Weight", desc: "Low-calorie, fiber-dense fruit snacking that keeps you satisfied." },
  { icon: Target, title: "Sustained Energy", desc: "Natural fruit sugars deliver steady energy without the sugar crash." },
];

export default function WhyFruitBoost() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      
      {/* ─── HERO SECTION WITH PRODUCT IMAGE ───────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FCFBF7] via-white to-[#EAF8DF]/40 py-8 sm:py-12">
        <div className="container-x relative z-10 px-4 sm:px-6">
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Header Content */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#6DBE45]/20 bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A]">
                  <Sparkles className="h-3.5 w-3.5 text-[#6DBE45]" /> Smart Office Snacking
                </span>

                <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  Replace the Pantry Biscuit Jar With <span className="text-[#1B7A1A]">Fresh Daily Fruits</span>
                </h1>

                <p className="mt-3 text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed max-w-xl">
                  Packaged office snacks quietly drain your energy. Upgrade your daily routine with hygienic, hand-picked fresh fruit boxes delivered straight to your reception desk.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#6DBE45] px-6 py-3 text-xs font-black text-white shadow-[0_6px_20px_rgba(109,190,69,0.35)] transition-all hover:bg-[#5da73a] active:scale-95"
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/plans"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-black text-slate-700 shadow-2xs hover:bg-slate-50"
                  >
                    View Plans
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Product Image Showcase */}
            <Reveal delay={0.1}>
              <div className="relative flex justify-center items-center">
                <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#EAF8DF] to-[#FFF8EA] p-4 border border-[#6DBE45]/20 shadow-md">
                  <img
                    src="/images/plan.png"
                    alt="FrootBoost Fresh Plan"
                    className="h-56 sm:h-72 w-auto object-contain transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/dashboard_fruits_banner.png";
                    }}
                  />
                  <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/90 backdrop-blur-md p-3 border border-white/60 shadow-xs flex items-center justify-between text-xs font-black">
                    <span className="text-[#1B7A1A]">🍎 100% Farm Fresh</span>
                    <span className="text-slate-900">Delivered Every Morning</span>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

        </div>
      </section>

      {/* ─── COMPARISON SECTION WITH IMAGES ───────────────────────── */}
      <section className="section relative overflow-hidden bg-white py-8 sm:py-12">
        <div className="container-x relative z-10 px-4 sm:px-6">
          <SectionHeading tag="The Comparison" title="Pantry Snacks vs FrootBoost Box" subtitle="Same craving, completely different energy outcome for your workday." />
          
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            
            {/* Unhealthy Pantry Card */}
            <Reveal>
              <div className="rounded-[24px] border border-rose-200/80 bg-[#FFF5F5] p-6 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white font-black">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Standard Office Pantry</h3>
                    <p className="text-xs font-bold text-rose-600">Quick Fix • High Crash Risk</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  {unhealthy.map((u) => (
                    <div key={u.name} className="flex items-center gap-3 rounded-xl bg-white p-3 border border-rose-100 text-xs font-bold text-slate-800">
                      <u.icon className="h-4 w-4 text-rose-500 shrink-0" />
                      <div className="flex-1">
                        <p className="font-black text-slate-900">{u.name}</p>
                        <p className="text-[10px] text-slate-400">{u.note}</p>
                      </div>
                      <X className="h-4 w-4 text-rose-500" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* FrootBoost Healthy Card with Image */}
            <Reveal delay={0.1}>
              <div className="rounded-[24px] border border-[#6DBE45]/40 bg-[#EAF8DF]/40 p-6 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6DBE45] text-white font-black">
                      <Apple className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">FrootBoost Daily Box</h3>
                      <p className="text-xs font-bold text-[#1B7A1A]">100% Organic • Sustained Energy</p>
                    </div>
                  </div>

                  <img
                    src="/images/Image1.jpeg"
                    alt="Fruit Box"
                    className="h-12 w-12 object-cover rounded-xl border border-white shadow-2xs"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/dashboard_fruit_box.png";
                    }}
                  />
                </div>

                <div className="mt-4 space-y-2.5">
                  {healthy.map((h) => (
                    <div key={h.name} className="flex items-center gap-3 rounded-xl bg-white p-3 border border-emerald-100 text-xs font-bold text-slate-800">
                      <h.icon className="h-4 w-4 text-[#6DBE45] shrink-0" />
                      <div className="flex-1">
                        <p className="font-black text-slate-900">{h.name}</p>
                        <p className="text-[10px] text-slate-500">{h.note}</p>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-[#6DBE45]" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ─── 6 DAILY BENEFITS GRID ─────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-[#FCFBF7] py-8 sm:py-12">
        <div className="container-x relative z-10 px-4 sm:px-6">
          <SectionHeading tag="Daily Impact" title="Six Benefits, Every Single Day" subtitle="Daily fruits are a high-return investment in your daily focus and long-term vitality." />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.05}>
                <div className="rounded-[22px] border border-[#ECECEC] bg-white p-5 shadow-xs transition-all hover:border-[#6DBE45]/40 hover:-translate-y-1">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${benefitGradients[i]} text-white shadow-2xs`}>
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-black text-slate-900">{b.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEFORE & AFTER COMPARISON CARD WITH IMAGE ──────────────── */}
      <section className="section relative overflow-hidden bg-white py-8 sm:py-12">
        <div className="container-x relative z-10 px-4 sm:px-6">
          <SectionHeading tag="30-Day Result" title="See The 30-Day Transformation" subtitle="What our subscribers report after switching to daily fresh fruit deliveries." />

          <div className="mt-8 grid md:grid-cols-2 gap-6 items-center">
            
            {/* Before Card */}
            <Reveal>
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 pb-3 border-b border-slate-200">
                  <X className="h-4 w-4 text-rose-500" /> Before FrootBoost
                </div>
                <div className="mt-3 space-y-2 text-xs font-bold text-slate-600">
                  <p className="flex items-center gap-2"><span className="text-rose-500">✕</span> Afternoon energy crash around 3 PM</p>
                  <p className="flex items-center gap-2"><span className="text-rose-500">✕</span> Brain fog & difficulty focusing</p>
                  <p className="flex items-center gap-2"><span className="text-rose-500">✕</span> Constant junk food & sugar cravings</p>
                </div>
              </div>
            </Reveal>

            {/* After Card */}
            <Reveal delay={0.1}>
              <div className="rounded-[24px] border border-[#6DBE45]/40 bg-[#EAF8DF]/50 p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#6DBE45]/30">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-[#1B7A1A]">
                    <CheckCircle2 className="h-4 w-4 text-[#6DBE45]" /> After 30 Days of FrootBoost
                  </div>
                  <span className="text-[10px] font-black text-white bg-[#6DBE45] px-2 py-0.5 rounded-full">Proven</span>
                </div>
                <div className="mt-3 space-y-2 text-xs font-bold text-slate-800">
                  <p className="flex items-center gap-2"><span className="text-[#6DBE45]">✓</span> Steady, natural energy all day long</p>
                  <p className="flex items-center gap-2"><span className="text-[#6DBE45]">✓</span> Sharper mental clarity & peak productivity</p>
                  <p className="flex items-center gap-2"><span className="text-[#6DBE45]">✓</span> Healthy daily habits and natural vitality</p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <CTASection />
    </motion.div>
  );
}
