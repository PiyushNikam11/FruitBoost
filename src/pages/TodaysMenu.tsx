import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, CheckCircle2, Flame, Calendar, Sparkles, ShieldCheck, Heart, Info } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Reveal } from "@/components/Reveal";
import { fruits } from "@/data/mock";

export default function TodaysMenu() {
  const [selected, setSelected] = useState(fruits[0]);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  const handleRate = (n: number) => {
    setRating(n);
    setRated(true);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl">
        
        {/* ─── PAGE HEADER ─────────────────────────────────────────── */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A] border border-[#6DBE45]/20">
                <Calendar className="h-3.5 w-3.5 text-[#6DBE45]" /> Today's Menu • Aug 03, 2026
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Today's Fresh Box Menu 🍱
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                Explore individual fruit nutrition profiles, benefits, and rate today's delivery.
              </p>
            </div>

            {/* Delivery Info Pill */}
            <div className="flex items-center gap-3 rounded-2xl bg-white p-3.5 border border-[#ECECEC] shadow-xs">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF8DF] text-[#1B7A1A]">
                <Clock className="h-4 w-4 text-[#6DBE45]" />
              </div>
              <div className="text-xs">
                <p className="font-black text-slate-900">Delivered at 9:00 AM</p>
                <p className="text-[11px] font-semibold text-slate-400">Nimbus Labs, Fl 4 Desk</p>
              </div>
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#EAF8DF] px-2.5 py-0.5 text-[10px] font-black text-[#1B7A1A]">
                <CheckCircle2 className="h-3 w-3 text-[#6DBE45]" /> Delivered
              </span>
            </div>
          </div>
        </Reveal>

        {/* ─── SELECTED ITEM COMPACT DETAIL CARD ────────────────────── */}
        <Reveal delay={0.05}>
          <div className="rounded-[24px] border border-[#ECECEC] bg-white p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.02)]">
            
            <div className="grid md:grid-cols-[220px_1fr] gap-6 items-center">
              
              {/* Clean Image Container (Fixed, decent height) */}
              <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#EAF8DF]/60 to-[#FFF8EA] border border-[#6DBE45]/20 h-48 w-full flex items-center justify-center">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="h-full w-full object-cover rounded-[18px] transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/dashboard_fruit_box.png";
                  }}
                />
                <span className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 backdrop-blur-md text-2xl shadow-xs border border-white/60">
                  {selected.emoji}
                </span>
              </div>

              {/* Fruit Info */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{selected.emoji}</span>
                    <h2 className="text-xl font-black text-slate-900">{selected.name}</h2>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-600 border border-rose-100">
                    <Flame className="h-3.5 w-3.5" /> {selected.calories} cal
                  </span>
                </div>

                {/* Health Benefits List */}
                <div className="mt-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Key Health Benefits</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.benefits.map((b) => (
                      <span key={b} className="inline-flex items-center gap-1.5 rounded-xl bg-[#FCFBF7] px-3 py-1.5 text-xs font-extrabold text-slate-800 border border-slate-200/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#6DBE45]" /> {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nutrition Breakdown */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Nutrition Profile</p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {selected.nutrition.map((n) => (
                      <div key={n.label} className="rounded-xl bg-[#FCFBF7] p-2.5 border border-slate-200/80 text-center">
                        <p className="text-[10px] font-black uppercase text-slate-400">{n.label}</p>
                        <p className="text-xs font-black text-slate-900 mt-0.5">{n.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </Reveal>

        {/* ─── CLEAN FRUIT SELECTION GRID ───────────────────────────── */}
        <Reveal delay={0.1}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-black text-slate-900 tracking-tight">
                Included Box Items (8)
              </h2>
              <span className="text-xs font-semibold text-slate-400">Click any fruit to view details</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {fruits.map((f) => {
                const isSelected = selected.id === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelected(f)}
                    className={`group relative flex items-center gap-3 rounded-[20px] border p-3 text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-[#6DBE45] bg-[#EAF8DF]/40 shadow-sm ring-2 ring-[#6DBE45]/20"
                        : "border-[#ECECEC] bg-white hover:border-slate-300 hover:bg-[#FCFBF7]"
                    }`}
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200/60">
                      <img
                        src={f.image}
                        alt={f.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/dashboard_fruit_bowl.png";
                        }}
                      />
                      <span className="absolute bottom-0.5 right-0.5 text-xs">{f.emoji}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-slate-900 truncate">{f.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 mt-0.5">{f.calories} cal</p>
                    </div>

                    {isSelected && (
                      <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#6DBE45]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ─── CLEAN RATING SECTION ─────────────────────────────────── */}
        <Reveal delay={0.15}>
          <div className="rounded-[24px] border border-[#ECECEC] bg-white p-5 sm:p-6 text-center shadow-[0_8px_25px_rgba(0,0,0,0.02)]">
            <h3 className="text-sm font-black text-slate-900">Rate Today's Fruit Box</h3>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">How was the quality, freshness, and delivery of today's box?</p>

            <div className="mt-4 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => handleRate(n)}
                  className="p-1 transition-transform hover:scale-125 cursor-pointer"
                  aria-label={`Rate ${n} stars`}
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      n <= rating ? "fill-[#FFB84D] text-[#FFB84D]" : "text-slate-300 hover:text-amber-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            {rated && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-xs font-black text-[#1B7A1A] bg-[#EAF8DF] inline-block px-4 py-1.5 rounded-full border border-[#6DBE45]/20"
              >
                Thank you! You rated today's box {rating} star{rating > 1 ? "s" : ""} ⭐
              </motion.p>
            )}
          </div>
        </Reveal>

      </div>
    </DashboardLayout>
  );
}
