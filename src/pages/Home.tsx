import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Play, ArrowRight, ShieldCheck, Truck, Sparkles, Leaf,
  CheckCircle2, Heart, Brain, Zap, Package, Clock, Star,
  Plus, Minus, ChevronDown, X, Flame,
} from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { fruits, whyChoose, plans, stats, howItWorksSteps, heroImages, faqs, type Fruit } from "@/data/mock";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: ShieldCheck, pill: Sparkles, zap: Zap, brain: Brain, heart: Heart, leaf: Leaf,
};

const badgeColors = [
  "bg-green-100 text-brand-green",
  "bg-yellow-100 text-brand-yellow",
  "bg-light-green-100 text-brand-light",
  "bg-red-100 text-brand-red",
  "bg-green-100 text-brand-green",
  "bg-yellow-100 text-brand-yellow",
];

const featureTileColors = [
  "bg-green-100 text-brand-green",
  "bg-yellow-100 text-brand-yellow",
  "bg-red-100 text-brand-red",
  "bg-light-green-100 text-brand-light",
  "bg-green-100 text-brand-green",
  "bg-yellow-100 text-brand-yellow",
];

const statColors = ["text-brand-green", "text-brand-yellow", "text-brand-red", "text-brand-light"];

const trustBadges = [
  { icon: Sparkles, label: "100% Fresh & Natural" },
  { icon: ShieldCheck, label: "Hygienically Packed" },
  { icon: Truck, label: "Daily Office Delivery" },
  { icon: Leaf, label: "No Cutting Required" },
  { icon: Package, label: "Seasonal Rotation" },
  { icon: Clock, label: "Morning Delivery" },
];

// const comparison = [
//   { feature: "Freshness", fruitboost: true, traditional: false },
//   { feature: "Daily delivery", fruitboost: true, traditional: false },
//   { feature: "Soaked almonds", fruitboost: true, traditional: false },
//   { feature: "Hygienic packaging", fruitboost: true, traditional: false },
//   { feature: "Pause anytime", fruitboost: true, traditional: false },
//   { feature: "No cutting needed", fruitboost: true, traditional: false },
//   { feature: "Seasonal rotation", fruitboost: true, traditional: true },
//   { feature: "Requires washing", fruitboost: false, traditional: true },
//   { feature: "Limited variety", fruitboost: false, traditional: true },
// ];

/* ─── Animated Counter ────────────────────────────────────── */
function AnimatedCounter({ value, suffix, color }: { value: string; suffix: string; color: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState("0");
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const target = parseInt(value, 10);
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(String(Math.round(target * eased)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <p ref={ref} className={`font-bold text-3xl sm:text-4xl ${color}`}>
      {display}<span className="text-brand-red">{suffix}</span>
    </p>
  );
}

/* ─── Nutrition Explorer ───────────────────────────────────── */
function NutritionExplorer({ fruits }: { fruits: Fruit[] }) {
  const [active, setActive] = useState(0);
  const f = fruits[active];

  return (
    <div className="space-y-6">
      
      {/* ─── FRUIT SELECTOR PILLS BAR ─────────────────────────── */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 snap-x hide-scrollbar justify-start sm:justify-center">
        {fruits.map((fruit, i) => (
          <button
            key={fruit.id}
            onClick={() => setActive(i)}
            className={`group shrink-0 inline-flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-xs font-black transition-all cursor-pointer snap-center ${
              active === i
                ? "bg-[#6DBE45] text-white shadow-[0_6px_20px_rgba(109,190,69,0.35)] scale-105"
                : "bg-white text-slate-700 border border-[#ECECEC] hover:bg-slate-50 hover:border-slate-300"
            }`}
          >
            <span className="text-base leading-none">{fruit.emoji}</span>
            <span>{fruit.name}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                active === i ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {fruit.calories} cal
            </span>
          </button>
        ))}
      </div>

      {/* ─── NUTRITION DISPLAY SHOWCASE CARD ──────────────────── */}
      <motion.div
        key={f.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-[28px] border border-[#ECECEC] bg-gradient-to-br from-[#EAF8DF]/40 via-white to-[#FFF8EA]/50 p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
      >
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-center">
          
          {/* Left Column: Fruit Image & Badges */}
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-full bg-[#6DBE45]/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <img
                src={f.image}
                alt={f.name}
                className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-[24px] object-cover shadow-md border-2 border-white transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute -top-2 -left-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-md text-2xl border border-slate-100">
                {f.emoji}
              </span>
              <span className="absolute -bottom-2 -right-2 inline-flex items-center gap-1 rounded-full bg-[#FFB84D] px-3 py-1 text-xs font-black text-slate-900 shadow-md">
                <Flame className="h-3.5 w-3.5 fill-slate-900" />
                {f.calories} Calories
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-black text-slate-900">{f.name}</h3>
              <span className="text-xs font-bold text-[#1B7A1A]">100% Farm Fresh Portion</span>
            </div>
          </div>

          {/* Right Column: Nutrition Details & Benefits */}
          <div className="space-y-6">
            
            {/* Header Tag */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF8DF] px-3 py-0.5 text-[10px] font-black text-[#1B7A1A] border border-[#6DBE45]/30">
                <Sparkles className="h-3 w-3 text-[#6DBE45]" /> Daily Wellness Breakdown
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Nutritional Profile & Benefits
              </h3>
            </div>

            {/* Nutrition KPI Tiles */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Nutrition Facts (Per Serving):</p>
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
                {f.nutrition.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[#ECECEC] bg-white p-3.5 text-center shadow-2xs transition-transform hover:-translate-y-0.5"
                  >
                    <p className="text-xl sm:text-2xl font-black text-[#1B7A1A] tracking-tight">{item.value}</p>
                    <p className="text-[11px] font-extrabold text-slate-500 uppercase mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits List */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Key Health Benefits:</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {f.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2.5 rounded-xl bg-white p-3 border border-[#ECECEC] text-xs font-bold text-slate-800 shadow-2xs"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#6DBE45] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Soaked Almond Pair Callout */}
            <div className="rounded-2xl border border-[#6DBE45]/30 bg-[#EAF8DF]/60 p-3.5 flex items-center gap-3 text-xs font-extrabold text-[#1B7A1A]">
              <span className="text-lg leading-none">🌰</span>
              <div>
                <p className="font-black text-slate-900">Includes 5 Daily Organic Soaked Almonds</p>
                <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Paired with fresh {f.name} for optimal digestion, brain health & sustained workday focus.</p>
              </div>
            </div>

          </div>

        </div>
      </motion.div>

    </div>
  );
}
/* ─── FAQ Accordion ────────────────────────────────────────── */
function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto mt-10 max-w-2xl space-y-3">
      {faqs.slice(0, 6).map((f, i) => (
        <div key={f.id} className={`overflow-hidden rounded-2xl border transition-all ${open === i ? "border-green-200 shadow-card" : "border-slate-100"}`}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span className="text-sm font-semibold text-slate-900">{f.question}</span>
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all ${open === i ? "bg-brand-green text-white rotate-180" : "bg-green-100 text-brand-green"}`}>
              <ChevronDown className="h-4 w-4" />
            </span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-slate-500">{f.answer}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ─── Tilt Card ────────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 100);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 100);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className={`perspective ${className}`}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-white via-[#f8fff6] to-[#ebfde4]">

        {/* RIGHT SIDE HERO IMAGE (Background Layer) */}
        <div className="absolute inset-y-0 right-0 z-0 w-full lg:w-[65%]">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 0, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 h-full w-full">
            <img
              src={heroImages.box}
              alt="FruitBoost daily box"
              className="h-full w-full object-contain object-right-bottom sm:object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 25%, black 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%, black 100%)"
              }}
            />
          </motion.div>

          {/* Floating Leaves */}
          {/* <motion.div animate={{ y: [0, -15, 0], rotate: [0, 15, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[15%] top-[30%] z-20 opacity-70">
            <Leaf className="h-10 w-10 text-green-500 drop-shadow-lg" />
          </motion.div>
          <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute right-[10%] bottom-[20%] z-20 opacity-60">
            <Leaf className="h-12 w-12 text-green-400 drop-shadow-lg" />
          </motion.div> */}

          {/* Floating Info Badge */}
          {/* <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-[15%] top-[20%] z-30 flex flex-col items-center justify-center rounded-[2rem] border border-white/60 bg-white/70 p-4 text-center shadow-xl backdrop-blur-md"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Today's Box</p>
            <p className="mt-1 text-lg font-black text-brand-green leading-none">6 Fruits</p>
            <p className="text-[10px] font-semibold text-slate-400 mt-1">+ Soaked Almonds</p>
          </motion.div> */}
        </div>

        {/* Existing background effects */}
        <div className="pointer-events-none absolute inset-0 pattern-dot opacity-40 mix-blend-multiply" />
        <div className="pointer-events-none absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-green-200/40 blur-[100px]" />

        {/* Main Content Grid */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container-x relative z-10 grid items-center gap-10 px-4 pb-0 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pb-0 lg:pt-16 min-h-[90vh]">
          {/* Left copy */}
          <div className="pb-10 lg:pb-20 relative z-20">
            <Reveal>
              <span className="badge gap-1.5 border border-green-200 bg-green-50/50 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
                </span>
                Fresh. Daily. To your desk.
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="h1 mt-5 max-w-[520px]">
                Fresh Fruits Delivered{" "}
                <span className="text-brand-gradient">Daily</span> To Your Office
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="body mt-5 max-w-[480px] text-base leading-relaxed">
                Hand-picked seasonal fruits, soaked almonds and daily office delivery —
                packed hygienically to keep your team energetic and focused all day long.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/register" className="btn-green !px-7 !py-3.5 !text-[15px] shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all">
                  Order Now <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#video" className="btn-outline-yellow !px-7 !py-3.5 !text-[15px] bg-white/50 backdrop-blur-md transition-all hover:bg-white">
                  <Play className="h-4 w-4" /> Watch Video
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {trustBadges.map((b, i) => (
                  <div key={b.label} className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/60 backdrop-blur-md px-3 py-2.5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-sm">
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${badgeColors[i]}`}>
                      <b.icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[11px] font-semibold leading-tight text-slate-600">{b.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Empty Right Column just to keep grid spacing on Desktop */}
          <div className="hidden lg:block h-full min-h-[500px] w-full pointer-events-none" />
        </motion.div>

        {/* fruit marquee strip */}
        {/* <div className="mt-12 overflow-hidden border-y border-slate-100 bg-slate-50/80 py-3">
          <div className="flex w-max animate-marquee gap-10">
            {[...fruits, ...fruits].map((f, i) => (
              <span key={i} className="flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                <span className="text-lg">{f.emoji}</span> {f.name}
                <span className="ml-8 text-slate-200">•</span>
              </span>
            ))}
          </div>
        </div> */}
      </section>

      {/* ─── STATS ────────────────────────────────────────── */}
      <section className="section bg-section">
        <div className="container-x px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="card p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-float">
                  <AnimatedCounter value={s.value} suffix={s.suffix} color={statColors[i]} />
                  <p className="mt-1.5 text-xs font-semibold text-slate-500">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INSIDE ───────────────────────────────── */}
      <section className="section">
        <div className="container-x px-4 sm:px-6">
          <SectionHeading
            tag="Today's selection"
            title="What's Inside Today's Box"
            subtitle="A rotating seasonal mix — hand-picked, hygienically packed and delivered fresh every morning."
          />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {fruits.map((f, i) => (
              <Reveal key={f.id} delay={(i % 4) * 0.06}>
                <div className="group card-hover overflow-hidden">
                  <div className="relative h-36 overflow-hidden sm:h-44">
                    <img
                      src={f.image}
                      alt={f.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                    <span className="absolute left-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-lg shadow-xs backdrop-blur">
                      {f.emoji}
                    </span>
                    <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-brand-red backdrop-blur">
                      {f.calories} cal
                    </span>
                  </div>
                  <div className="p-3.5">
                    <h3 className="text-sm font-bold text-slate-900">{f.name}</h3>
                    <p className="mt-0.5 text-xs text-slate-400">{f.benefits[0]}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* box showcase */}
          <Reveal delay={0.2}>
            <div className="mt-10 overflow-hidden rounded-3xl border border-yellow-100 bg-gradient-to-r from-yellow-50 via-green-50 to-white">
              <div className="grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <span className="section-tag-yellow">Inside every box</span>
                  <h3 className="h2 mt-4">Freshly cut, ready to eat</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    No washing, no cutting, no prep. Your FruitBoost box arrives at your desk every
                    morning with everything portioned, cleaned, and ready to enjoy.
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {["Seasonal fruits — 6 to 8 varieties daily", "5 soaked almonds included every day", "Hygienic packaging — no touching by hand", "Delivered before 10 AM, Mon to Sat"].map((t, i) => (
                      <li key={t} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 ${i % 2 === 0 ? "text-brand-green" : "text-brand-yellow"}`} /> {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <Link to="/register" className="btn-light-green">Subscribe now <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 rounded-2xl bg-yellow-100/50 blur-2xl" />
                  <img
                    src={heroImages.boxPremium}
                    alt="FruitBoost premium box"
                    className="relative w-full rounded-2xl border border-slate-100 object-cover shadow-card"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── NUTRITION EXPLORER ──────────────────────────── */}
      {/* <section className="section bg-section">
        <div className="container-x px-4 sm:px-6">
          <SectionHeading tag="Nutrition" tagColor="light" title="Explore What You're Eating" subtitle="Click any fruit to see its full nutrition profile, benefits, and calorie count." />
          <Reveal delay={0.1}>
            <div className="mt-10">
              <NutritionExplorer fruits={fruits} />
            </div>
          </Reveal>
        </div>
      </section> */}

      {/* ─── NUTRITION EXPLORER ──────────────────────────── */}

      <section className="section bg-gradient-to-b from-[#f9fcf8] via-white to-[#f6fff8]">

        <div className="container-x px-4 sm:px-6">

          <SectionHeading
            tag="Nutrition"
            tagColor="light"
            title="Explore What You're Eating"
            subtitle="Discover calories, nutrition facts, and health benefits of your favorite fruits."
          />

          <Reveal delay={0.1}>
            <div className="mt-14">
              <NutritionExplorer fruits={fruits} />
            </div>
          </Reveal>

        </div>

      </section>

      {/* ─── VIDEO ───────────────────────────────────────── */}
      <section id="video" className="section">
        <div className="container-x px-4 sm:px-6">
          <SectionHeading tag="See it in action" tagColor="yellow" title="Watch How FruitBoost Works" subtitle="From order to desk delivery — a 90-second look at your new daily wellness habit." />
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card">
              <div className="relative aspect-video w-full">
                <img src={heroImages.fruitsSpread} alt="FruitBoost video" className="h-full w-full object-cover" />
                <div className="absolute inset-0 grid place-items-center bg-slate-950/35">
                  <button className="group grid h-16 w-16 place-items-center rounded-full bg-brand-yellow shadow-floatY transition-all hover:scale-110 hover:bg-brand-red">
                    <Play className="ml-0.5 h-7 w-7 fill-white text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── WHY CHOOSE ───────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-gradient-to-b from-[#f4fbf4] to-white py-8 sm:py-12">
        {/* Organic background elements */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full pattern-dot opacity-20 mix-blend-multiply" />
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-green-200/30 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 bottom-20 h-80 w-80 rounded-full bg-yellow-200/20 blur-[100px]" />
        <div className="pointer-events-none absolute left-[10%] top-[10%] text-4xl opacity-10 transform -rotate-12 blur-[1px]">🍃</div>
        <div className="pointer-events-none absolute right-[10%] bottom-[20%] text-5xl opacity-10 transform rotate-45 blur-[2px]">🌿</div>

        <div className="container-x relative z-10 px-4 sm:px-6">
          <SectionHeading tag="Why us" title="Why Choose FruitBoost" subtitle="Six reasons working professionals trust us with their daily wellness." />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((c, i) => {
              const Icon = iconMap[c.icon] ?? Sparkles;
              const gradients = [
                "from-green-400 to-green-600",
                "from-yellow-400 to-orange-500",
                "from-lime-400 to-green-500",
                "from-emerald-400 to-teal-500",
                "from-orange-400 to-red-500",
                "from-teal-400 to-green-500"
              ];
              const accent = gradients[i % gradients.length];
              return (
                <Reveal key={c.title} delay={(i % 3) * 0.1}>
                  <div className="group relative overflow-hidden rounded-[24px] bg-white/70 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-white/50 hover:border-green-300/50">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-20 blur-2xl" />
                    <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                      <Icon className="h-7 w-7 drop-shadow-md" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-slate-900 tracking-tight">{c.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-500">{c.desc}</p>
                    <div className="absolute bottom-4 right-4 text-3xl opacity-5 transition-opacity duration-300 group-hover:opacity-20 transform rotate-12">
                      {["🍏", "🍊", "🍋", "🫐", "🍓", "🥝"][i % 6]}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section className="section relative overflow-hidden bg-white py-8 sm:py-12">
        <div className="container-x relative z-10 px-4 sm:px-6">
          <SectionHeading tag="Simple process" tagColor="red" title="How It Works" subtitle="From sign-up to your first box in under five minutes." />
          
          <div className="mt-20 relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-green-100 via-green-300 to-green-100" />
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {howItWorksSteps.slice(0, 4).map((s, i) => (
                <Reveal key={s.id} delay={(i % 4) * 0.1}>
                  <div className="group relative flex flex-col items-center text-center">
                    {/* Step Circle */}
                    <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-white shadow-xl transition-transform duration-500 group-hover:scale-110 z-10 border border-green-50">
                      <div className={`absolute inset-2 rounded-full bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${i === 0 ? "from-green-400 to-green-600" : i === 1 ? "from-yellow-400 to-orange-500" : i === 2 ? "from-lime-400 to-green-500" : "from-emerald-400 to-teal-500"}`} />
                      <span className={`text-4xl font-black bg-gradient-to-br bg-clip-text text-transparent drop-shadow-sm ${i === 0 ? "from-green-500 to-green-700" : i === 1 ? "from-yellow-500 to-orange-600" : i === 2 ? "from-lime-500 to-green-600" : "from-emerald-500 to-teal-600"}`}>
                        0{s.id}
                      </span>
                    </div>
                    
                    {/* Arrow between steps (desktop) */}
                    {i < 3 && (
                      <div className="hidden lg:block absolute top-[50px] -right-8 z-0 opacity-40">
                        <ArrowRight className="h-6 w-6 text-green-400" />
                      </div>
                    )}
                    
                    {/* Card Content */}
                    <div className="mt-8 rounded-2xl bg-white/60 backdrop-blur-md p-6 shadow-sm border border-slate-100 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 w-full">
                      <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          
          <Reveal delay={0.4}>
            <div className="mt-16 text-center">
              <Link to="/how-it-works" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-brand-green hover:shadow-lg hover:-translate-y-0.5">
                See full process <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── COMPARISON ───────────────────────────────────── */}
      {/* <section className="section bg-section">
        <div className="container-x px-4 sm:px-6">
          <SectionHeading tag="The difference" tagColor="yellow" title="FruitBoost vs. Traditional Snacking" subtitle="See why thousands of professionals have made the switch." />
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card">
              <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50">
                <div className="px-5 py-4 text-sm font-bold text-slate-500">Feature</div>
                <div className="px-5 py-4 text-center text-sm font-bold text-brand-green">FruitBoost</div>
                <div className="px-5 py-4 text-center text-sm font-bold text-slate-400">Traditional</div>
              </div>
              {comparison.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-3 items-center ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                  <div className="px-5 py-3.5 text-sm text-slate-600">{row.feature}</div>
                  <div className="px-5 py-3.5 text-center">
                    {row.fruitboost ? (
                      <CheckCircle2 className="mx-auto h-5 w-5 text-brand-green" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-slate-300" />
                    )}
                  </div>
                  <div className="px-5 py-3.5 text-center">
                    {row.traditional ? (
                      <CheckCircle2 className="mx-auto h-5 w-5 text-slate-400" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-slate-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section> */}

      {/* ─── PLANS ────────────────────────────────────────── */}
      {/* <section className="section">
        <div className="container-x px-4 sm:px-6">
          <SectionHeading tag="Pricing" title="Simple, Honest Pricing" subtitle="No hidden fees. No lock-in. Just fresh fruit delivered daily." />
          <div className="mx-auto mt-10 grid max-w-3xl gap-5 lg:grid-cols-2">
            {plans.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div className={`relative flex h-full flex-col rounded-3xl border-2 p-8 transition-all hover:-translate-y-1 ${p.highlighted
                  ? "border-brand-yellow bg-slate-900 text-white shadow-floatY"
                  : "border-slate-100 bg-white shadow-card"
                  }`}>
                  {p.highlighted && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-red px-5 py-1.5 text-xs font-bold text-white shadow-xs">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className={`grid h-10 w-10 place-items-center rounded-xl text-lg ${p.highlighted ? "bg-white/10" : "bg-green-100"}`}>
                      {p.id === "weekly" ? "📅" : "📦"}
                    </span>
                    <div>
                      <h3 className={`font-bold text-lg ${p.highlighted ? "text-white" : "text-slate-900"}`}>{p.name}</h3>
                      <p className={`text-xs ${p.highlighted ? "text-white/50" : "text-slate-400"}`}>{p.deliveryDays}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-end gap-1">
                    <span className={`font-bold text-5xl tracking-tight ${p.highlighted ? "text-brand-yellow" : "text-brand-green"}`}>₹{p.price}</span>
                    <span className={`mb-2 text-sm ${p.highlighted ? "text-white/50" : "text-slate-400"}`}>{p.period}</span>
                  </div>
                  <p className={`mt-1 text-sm ${p.highlighted ? "text-white/60" : "text-slate-500"}`}>{p.tagline}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.features.map((f, fi) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${p.highlighted ? "text-brand-yellow" : fi % 2 === 0 ? "text-brand-green" : "text-brand-light"}`} />
                        <span className={p.highlighted ? "text-white/85" : "text-slate-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition-all ${p.highlighted
                      ? "bg-brand-yellow text-white hover:brightness-95"
                      : "bg-brand-green text-white hover:bg-green-700"
                      }`}
                  >
                    Subscribe <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25}>
            <p className="mt-6 text-center text-sm text-slate-400">
              Need a custom plan for your entire office?{" "}
              <Link to="/contact" className="font-semibold text-brand-red hover:underline">
                Contact us →
              </Link>
            </p>
          </Reveal>
        </div>
      </section> */}

      {/* ─── FAQ ──────────────────────────────────────────── */}
      {/* <section className="section bg-section">
        <div className="container-x px-4 sm:px-6">
          <SectionHeading tag="FAQ" tagColor="light" title="Frequently Asked Questions" subtitle="Everything you need to know before subscribing." />
          <FaqAccordion />
          <Reveal delay={0.2}>
            <div className="mt-8 text-center">
              <Link to="/faq" className="btn-outline">View all FAQs <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section> */}

      <CTASection />
    </motion.div>
  );
}
