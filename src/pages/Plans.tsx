import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  Sparkles,
  Calendar,
  Utensils,
  Building2,
  RefreshCw,
  PauseCircle,
  Apple,
  Star,
  Users,
  Truck,
  Zap,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  PackageCheck,
  CheckCircle2,
  Box,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

// Features configuration for Weekly & Monthly plans including 400 gm Fruitbox Tiffin
const planFeatures = [
  { text: "400 gm Hygienic Fruitbox Tiffin", icon: <PackageCheck className="h-3.5 w-3.5 text-[#1B7A1A]" />, highlight: true },
  { text: "6+ fresh seasonal fruits", icon: <Apple className="h-3.5 w-3.5 text-[#1B7A1A]" /> },
  { text: "Daily organic soaked almonds", icon: <Sparkles className="h-3.5 w-3.5 text-[#1B7A1A]" /> },
  { text: "Washed & ready to eat", icon: <Utensils className="h-3.5 w-3.5 text-[#1B7A1A]" /> },
  { text: "Direct desk / reception delivery", icon: <Building2 className="h-3.5 w-3.5 text-[#1B7A1A]" /> },
  { text: "Pause or skip anytime", icon: <PauseCircle className="h-3.5 w-3.5 text-[#1B7A1A]" /> },
  { text: "Delivery: Mon – Fri (Business Days)", icon: <Calendar className="h-3.5 w-3.5 text-[#1B7A1A]" /> },
  { text: "Renew or upgrade anytime", icon: <RefreshCw className="h-3.5 w-3.5 text-[#1B7A1A]" /> },
];

const sliderImages = [
  {
    url: "/images/Image1.jpeg",
    title: "400 gm Signature Fruitbox Tiffin",
    tag: "Weekly & Monthly Favorite",
    desc: "Generous 400g portion loaded with 6+ freshly sliced seasonal fruits and organic soaked almonds.",
  },
  {
    url: "/images/image2.jpeg",
    title: "Corporate Team Experience",
    tag: "Best for Office Floors",
    desc: "Hygienically sealed individual 400g boxes delivered directly to reception before 9:30 AM.",
  },
  {
    url: "/images/image3.png",
    title: "100% Farm Fresh Selection",
    tag: "Quality Guaranteed",
    desc: "Every fruit box undergoes multi-stage quality checks to ensure crispness and high nutrition.",
  },
  {
    url: "/images/after30days.png",
    title: "Energy & Wellness Transformation",
    tag: "30-Day Healthy Habit",
    desc: "Noticeable workplace productivity, sustained focus, and elevated energy across your entire team.",
  },
];

export default function Plans() {
  const [billingCycle, setBillingCycle] = useState<"weekly" | "monthly">("monthly");
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#FCFBF7] text-slate-900 min-h-screen overflow-hidden"
    >
      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative pt-8 pb-8 sm:pt-14 sm:pb-10 text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6DBE45]/20 bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A]">
              <Sparkles className="h-3.5 w-3.5 text-[#6DBE45]" /> Daily Fresh Fruit Subscription
            </span>

            <h1 className="mt-3 text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Fuel Your Workday With <span className="text-[#1B7A1A]">400g Fresh Fruit Tiffins</span>
            </h1>

            <p className="mt-2.5 max-w-2xl mx-auto text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
              Hygienic 400g fruit boxes + daily soaked almonds delivered directly to your office desk every morning.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="mt-6 flex items-center justify-center">
              <div className="inline-flex items-center gap-1 rounded-2xl bg-white p-1 border border-slate-200 shadow-2xs">
                <button
                  onClick={() => setBillingCycle("weekly")}
                  className={`rounded-xl px-4 py-2 text-xs font-black transition-all cursor-pointer ${
                    billingCycle === "weekly"
                      ? "bg-[#6DBE45] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Weekly Plan (5 Days)
                </button>
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`rounded-xl px-4 py-2 text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    billingCycle === "monthly"
                      ? "bg-[#6DBE45] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>Monthly Plan (22 Days)</span>
                  <span className="rounded-full bg-[#FFB84D] px-2 py-0.5 text-[9px] font-black text-slate-900 uppercase">
                    Save Money
                  </span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PRICING CARDS SECTION ───────────────────────────────────────── */}
      <section className="pb-12 sm:pb-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">

            {/* ─── WEEKLY PLAN CARD ────────────────────────────────────── */}
            <Reveal delay={0.05}>
              <div
                className={`h-full flex flex-col justify-between rounded-[28px] border bg-white p-6 sm:p-8 transition-all duration-300 ${
                  billingCycle === "weekly"
                    ? "border-[#6DBE45] shadow-[0_12px_40px_rgba(109,190,69,0.15)] ring-2 ring-[#6DBE45]/20"
                    : "border-[#ECECEC] hover:border-slate-300 shadow-2xs"
                }`}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                      Starter Trial
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      5 Business Days
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-4">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Weekly Plan</h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">Try fresh daily fruits for 1 week</p>
                  </div>

                  {/* Price */}
                  <div className="mt-5 border-b border-slate-100 pb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">₹599</span>
                      <span className="text-xs font-bold text-slate-400">/ 5 days</span>
                    </div>
                    <p className="text-[11px] font-bold text-[#1B7A1A] mt-1">₹119 per 400g fruitbox tiffin</p>
                  </div>

                  {/* Feature Bullets */}
                  <div className="mt-5 space-y-2.5">
                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Plan Includes:</p>
                    {planFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-semibold ${
                          feat.highlight
                            ? "bg-[#EAF8DF] border border-[#6DBE45]/30 text-[#1B7A1A] font-black"
                            : "bg-[#FCFBF7] border border-slate-200/80 text-slate-700"
                        }`}
                      >
                        <CheckCircle2 className={`h-4 w-4 shrink-0 ${feat.highlight ? "text-[#1B7A1A]" : "text-[#6DBE45]"}`} />
                        <span>{feat.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <Link
                    to="/checkout?plan=weekly"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#6DBE45] bg-white text-xs font-black text-[#1B7A1A] transition-all hover:bg-[#6DBE45] hover:text-white active:scale-95 shadow-2xs"
                  >
                    <span>Subscribe Weekly Plan</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* ─── MONTHLY PLAN CARD (RECOMMENDED HERO CARD) ───────────── */}
            <Reveal delay={0.1}>
              <div
                className={`h-full flex flex-col justify-between rounded-[28px] border bg-gradient-to-b from-white via-[#F6FCF5] to-white p-6 sm:p-8 transition-all duration-300 relative overflow-hidden ${
                  billingCycle === "monthly"
                    ? "border-[#6DBE45] shadow-[0_16px_50px_rgba(109,190,69,0.22)] ring-2 ring-[#6DBE45]/30"
                    : "border-[#6DBE45]/40 hover:border-[#6DBE45] shadow-xs"
                }`}
              >
                {/* Glowing Top Ribbon */}
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#6DBE45] via-[#FFB84D] to-[#6DBE45]" />

                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#6DBE45] px-3 py-1 text-xs font-black text-white shadow-xs">
                      <Sparkles className="h-3 w-3 text-[#FFB84D]" /> Most Popular
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FFB84D]/20 px-2.5 py-0.5 text-[10px] font-black text-amber-900 border border-[#FFB84D]/40">
                      Best Value • Save ₹319
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-4">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Monthly Plan</h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">Best choice for daily workplace wellness</p>
                  </div>

                  {/* Price */}
                  <div className="mt-5 border-b border-[#6DBE45]/20 pb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-[#1B7A1A] tracking-tight">₹2,299</span>
                      <span className="text-xs font-bold text-slate-500">/ 22 days</span>
                    </div>
                    <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#EAF8DF] px-3 py-0.5 text-[11px] font-black text-[#1B7A1A] border border-[#6DBE45]/30">
                      <Zap className="h-3 w-3 text-[#6DBE45]" />
                      <span>Only ₹104 per 400g fruitbox tiffin</span>
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="mt-5 space-y-2.5">
                    <p className="text-[11px] font-black uppercase tracking-wider text-[#1B7A1A]">Monthly Includes:</p>
                    {planFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-semibold ${
                          feat.highlight
                            ? "bg-[#EAF8DF] border border-[#6DBE45]/40 text-[#1B7A1A] font-black shadow-2xs"
                            : "bg-white border border-slate-200/80 text-slate-800"
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#6DBE45] shrink-0" />
                        <span>{feat.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <Link
                    to="/checkout?plan=monthly"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#6DBE45] text-xs font-black text-white shadow-[0_6px_20px_rgba(109,190,69,0.35)] transition-all hover:bg-[#5da73a] active:scale-95 cursor-pointer"
                  >
                    <span>Start Monthly Plan (Recommended)</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ─── INSIDE THE 400G TIFFIN BOX SHOWCASE SLIDER ───────────────────── */}
      <section className="py-10 sm:py-14 bg-white border-y border-[#ECECEC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A]">
              <Box className="h-3.5 w-3.5 text-[#6DBE45]" /> Inside The 400g Tiffin
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
              400g Hygienic Fruitbox Tiffin
            </h2>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-500">
              Each tiffin is hand-selected, washed, sliced, and vacuum-sealed for fresh office delivery.
            </p>
          </Reveal>

          {/* Interactive Slider Container */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[24px] border border-[#ECECEC] bg-[#FCFBF7] shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                
                {/* Image Display */}
                <div className="lg:col-span-7 relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeSlide}
                      src={sliderImages[activeSlide].url}
                      alt={sliderImages[activeSlide].title}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Floating Tag */}
                  <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black text-slate-900 backdrop-blur-md shadow-xs">
                    {sliderImages[activeSlide].tag}
                  </div>
                </div>

                {/* Slider Details & Controls */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full bg-white">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#1B7A1A]">
                      Feature {activeSlide + 1} of {sliderImages.length}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1 tracking-tight">
                      {sliderImages[activeSlide].title}
                    </h3>
                    <p className="mt-2 text-xs font-semibold text-slate-600 leading-relaxed">
                      {sliderImages[activeSlide].desc}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex gap-1.5">
                      {sliderImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlide(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            activeSlide === idx
                              ? "w-6 bg-[#6DBE45]"
                              : "w-2 bg-slate-200 hover:bg-slate-300"
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={prevSlide}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 active:scale-95 cursor-pointer"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 active:scale-95 cursor-pointer"
                        aria-label="Next Slide"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── TRUST STATISTICS BAR ─────────────────────────────────────── */}
      <section className="py-10 sm:py-12 bg-[#FCFBF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              
              <div className="p-5 rounded-[22px] bg-white border border-[#ECECEC] shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EAF8DF] text-[#1B7A1A] mx-auto mb-2 font-black">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">1,000+</h4>
                <p className="text-xs font-bold text-[#1B7A1A] mt-0.5">Active Subscribers</p>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Daily workplace fruit habit</p>
              </div>

              <div className="p-5 rounded-[22px] bg-white border border-[#ECECEC] shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mx-auto mb-2 font-black">
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">4.9 / 5.0</h4>
                <p className="text-xs font-bold text-amber-700 mt-0.5">Subscriber Rating</p>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Rated for freshness & hygiene</p>
              </div>

              <div className="p-5 rounded-[22px] bg-white border border-[#ECECEC] shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EAF8DF] text-[#1B7A1A] mx-auto mb-2 font-black">
                  <Truck className="h-5 w-5" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">Mon – Fri</h4>
                <p className="text-xs font-bold text-[#1B7A1A] mt-0.5">Morning Desk Delivery</p>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Delivered before 9:30 AM</p>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

    </motion.div>
  );
}
