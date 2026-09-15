import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, Sparkles, Truck, Apple } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import FoundersMessage from "@/components/FoundersMessage";
import { heroImages } from "@/data/mock";

const timeline = [
  { icon: Apple, title: "Fresh Purchase", desc: "Hand-picked seasonal produce from trusted farms every morning.", color: "from-green-400 to-green-600" },
  { icon: ShieldCheck, title: "Quality Check", desc: "Every fruit passes a 5-point freshness and ripeness inspection.", color: "from-lime-400 to-green-500" },
  { icon: Sparkles, title: "Packing", desc: "Hygienically packed in eco-friendly, ventilated boxes.", color: "from-yellow-400 to-orange-500" },
  { icon: Truck, title: "Delivery", desc: "Delivered to your office desk before the workday begins.", color: "from-orange-400 to-red-500" },
];

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f9fcf8] via-white to-[#f6fff8] pt-24 pb-20 lg:pt-32 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 pattern-dot opacity-30 mix-blend-multiply" />
        <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-200/40 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-yellow-200/30 blur-[100px]" />
        
        {/* Floating background elements */}
        <div className="pointer-events-none absolute left-[5%] top-[20%] text-5xl opacity-10 transform -rotate-12 blur-[1px]">🍃</div>
        <div className="pointer-events-none absolute right-[10%] bottom-[20%] text-4xl opacity-15 transform rotate-45 blur-[0.5px]">🌿</div>

        <div className="container-x relative z-10 grid items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-green-200/60 bg-green-50/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-green backdrop-blur-md">
                Our story
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[4rem] leading-[1.1]" style={{ fontFamily: "Sora, Inter, sans-serif" }}>
                We bring <span className="bg-gradient-to-r from-brand-green to-brand-yellow bg-clip-text text-transparent drop-shadow-sm">freshness</span> to the modern workplace
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate-600 font-medium">
                FruitBoost was born from a simple observation: the people building the future were fueling themselves with the worst snacks. We decided to fix that — one fresh box at a time.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="relative mx-auto max-w-md lg:max-w-none lg:w-[90%] lg:ml-auto">
              <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-green-200/50 via-yellow-100/50 to-white/10 blur-3xl" />
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                <img src={heroImages.boxPremium} alt="FruitBoost premium box" className="h-[450px] w-full rounded-[1.5rem] object-cover shadow-inner" />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-6 top-10 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/40 bg-white/80 text-4xl shadow-xl backdrop-blur-xl">
                🍓
              </motion.div>
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }} className="absolute -left-6 bottom-16 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/40 bg-white/80 text-3xl shadow-lg backdrop-blur-xl">
                🌰
              </motion.div>
              
              {/* Glass Info Badge */}
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5.5, repeat: Infinity, delay: 0.2, ease: "easeInOut" }} className="absolute -left-10 top-1/2 -translate-y-1/2 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-xl sm:-left-16">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Certified</p>
                  <p className="font-bold text-slate-900">100% Organic</p>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── OUR STORY ────────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-white py-8 sm:py-12">
        <div className="container-x grid gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-8 rounded-[3rem] bg-green-100/40 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                <img src={heroImages.box} alt="FruitBoost office delivery" className="h-[500px] w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute bottom-6 left-6 rounded-2xl border border-white/30 bg-white/80 px-6 py-4 shadow-lg backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-green">Since 2023</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">50,000+ boxes delivered</p>
                </div>
              </div>
            </div>
          </Reveal>
          
          <div className="relative">
            <Reveal>
              <div className="absolute -left-10 top-0 text-8xl text-green-500/10 font-serif leading-none select-none">"</div>
              <div className="relative z-10 rounded-[2rem] border border-white/50 bg-[#f9fcf8]/80 p-10 shadow-xl backdrop-blur-xl">
                <span className="inline-block rounded-full bg-brand-yellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-yellow">
                  Why We Started
                </span>
                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  The FruitBoost Story
                </h2>
                
                <div className="mt-8 flex gap-6">
                  {/* Vertical Accent Line */}
                  <div className="w-1 shrink-0 rounded-full bg-gradient-to-b from-brand-green to-brand-yellow/20" />
                  
                  <div className="space-y-4 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                    <p>
                      Life today is busy. Between work, responsibilities, travel, and daily routines, finding time to eat healthy can be difficult.
                    </p>
                    <p>
                      Even something as simple as eating fresh fruit takes effort — buying it, washing it, cutting it, and making time to eat it. When convenience matters, it’s easy to reach for biscuits, chips, fast food, or other quick options instead.
                    </p>
                    <p className="text-slate-900 font-bold bg-green-50/80 p-4 rounded-2xl border border-green-200/60">
                      But we believe that <strong className="text-brand-green">health should never be the thing we compromise on because we’re busy.</strong>
                    </p>
                    <p>
                      Life isn’t just about earning more or working harder. Our health is what allows us to enjoy everything we work for. That’s why we created <strong className="text-slate-900 font-black">FruitBoost</strong> — to make healthy eating simple, convenient, and part of your everyday routine.
                    </p>
                    <p>
                      Fresh fruits and soaked almonds, thoughtfully packed and ready to eat, delivered to you every morning.
                    </p>
                    <p className="text-brand-green text-base font-black pt-1">
                      Because eating healthy shouldn’t be difficult. It should be easy.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ─────────────────────────────── */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-white to-[#f9fcf8] py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-yellow-100/40 blur-[100px]" />
        <div className="container-x relative z-10 grid gap-8 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="group relative overflow-hidden rounded-[24px] border border-white/60 bg-white/60 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-300/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-5 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-10 blur-2xl" />
              
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <Target className="h-7 w-7 drop-shadow-md" />
              </div>
              
              <h3 className="mt-8 text-2xl font-bold text-slate-900 tracking-tight">Our Mission</h3>
              <p className="mt-4 text-[16px] leading-[1.8] text-slate-500 font-medium">
                To make healthy, fresh nutrition effortless for every working professional — replacing processed office snacks with daily fruit that genuinely fuels focus, energy, and wellbeing.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={0.08}>
            <div className="group relative overflow-hidden rounded-[24px] border border-white/60 bg-white/60 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-300/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-5 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-10 blur-2xl" />
              
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Eye className="h-7 w-7 drop-shadow-md" />
              </div>
              
              <h3 className="mt-8 text-2xl font-bold text-slate-900 tracking-tight">Our Vision</h3>
              <p className="mt-4 text-[16px] leading-[1.8] text-slate-500 font-medium">
                A future where every office desk in the country has access to fresh, hygienic, affordable fruit every single day — making healthy the default, not the exception.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOUNDERS MESSAGE ─────────────────────────────── */}
      <FoundersMessage />

      {/* ─── PROCESS TIMELINE ─────────────────────────────── */}
      <section className="section relative overflow-hidden bg-white py-32">
        <div className="container-x relative z-10 px-4 sm:px-6">
          <div className="text-center">
            <SectionHeading tag="Our process" title="From farm to your desk" subtitle="Every box follows the same four-step journey, every single day." tagColor="green" />
          </div>
          
          <div className="mt-24 relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-green-100 via-green-300 to-green-100" />
            
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {timeline.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.1}>
                  <div className="group relative flex flex-col items-center text-center">
                    {/* Step Circle */}
                    <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-white shadow-xl transition-transform duration-500 group-hover:scale-110 z-10 border border-slate-50">
                      <div className={`absolute inset-2 rounded-full bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300 ${t.color}`} />
                      <span className={`absolute top-1 right-1 text-2xl font-black opacity-10 select-none`}>
                        0{i + 1}
                      </span>
                      <t.icon className={`h-10 w-10 text-slate-700 transition-colors group-hover:text-brand-green`} /> 
                    </div>
                    
                    {/* Card Content */}
                    <div className="mt-8 w-full rounded-2xl border border-slate-100 bg-white/60 p-6 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                      <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-500">{t.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>



      <CTASection />
    </motion.div>
  );
}
