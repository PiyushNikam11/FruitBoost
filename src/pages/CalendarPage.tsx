import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Info,
  CalendarCheck,
  AlertCircle,
  RotateCcw,
  Pause,
  Sparkles,
  Package,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Reveal } from "@/components/Reveal";

type DayStatus = "completed" | "active" | "skipped" | "future" | "holiday" | "weekend";

interface DayData {
  day: number;
  dateStr: string;
  status: DayStatus;
  fruits?: string[];
  time?: string;
  holidayTitle?: string;
}

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState("August 2026");
  const [hoveredDate, setHoveredDate] = useState<DayData | null>(null);
  const [selectedDate, setSelectedDate] = useState<DayData | null>(null);

  // Mock days data for August 2026 (31 days)
  const augustDays: DayData[] = [
    { day: 1, dateStr: "Aug 01, 2026 (Sat)", status: "weekend" },
    { day: 2, dateStr: "Aug 02, 2026 (Sun)", status: "weekend" },
    { day: 3, dateStr: "Aug 03, 2026 (Mon)", status: "completed", fruits: ["🍎 Apple", "🍌 Banana", "🌰 Almonds"], time: "9:00 AM" },
    { day: 4, dateStr: "Aug 04, 2026 (Tue)", status: "completed", fruits: ["🍊 Orange", "🍇 Grapes", "🌰 Almonds"], time: "9:15 AM" },
    { day: 5, dateStr: "Aug 05, 2026 (Wed)", status: "completed", fruits: ["🥭 Papaya", "🥝 Kiwi", "🌰 Almonds"], time: "8:55 AM" },
    { day: 6, dateStr: "Aug 06, 2026 (Thu)", status: "skipped", fruits: ["Delivery Skipped by User"], time: "—" },
    { day: 7, dateStr: "Aug 07, 2026 (Fri)", status: "completed", fruits: ["🍎 Apple", "🍉 Watermelon", "🌰 Almonds"], time: "9:05 AM" },
    { day: 8, dateStr: "Aug 08, 2026 (Sat)", status: "weekend" },
    { day: 9, dateStr: "Aug 09, 2026 (Sun)", status: "weekend" },
    { day: 10, dateStr: "Aug 10, 2026 (Mon)", status: "active", fruits: ["🍎 Apple", "🍌 Banana", "🍊 Orange", "🍇 Grapes", "🥝 Kiwi"], time: "9:00 AM (In Transit)" },
    { day: 11, dateStr: "Aug 11, 2026 (Tue)", status: "future", fruits: ["🥭 Papaya", "🥝 Kiwi", "🌰 Almonds"], time: "9:00 AM" },
    { day: 12, dateStr: "Aug 12, 2026 (Wed)", status: "future", fruits: ["🍎 Apple", "🍇 Grapes", "🌰 Almonds"], time: "9:00 AM" },
    { day: 13, dateStr: "Aug 13, 2026 (Thu)", status: "future", fruits: ["🍊 Orange", "🍌 Banana", "🌰 Almonds"], time: "9:00 AM" },
    { day: 14, dateStr: "Aug 14, 2026 (Fri)", status: "future", fruits: ["🍉 Watermelon", "🥝 Kiwi", "🌰 Almonds"], time: "9:00 AM" },
    { day: 15, dateStr: "Aug 15, 2026 (Sat)", status: "holiday", holidayTitle: "Independence Day National Holiday" },
    { day: 16, dateStr: "Aug 16, 2026 (Sun)", status: "weekend" },
    { day: 17, dateStr: "Aug 17, 2026 (Mon)", status: "future", fruits: ["🍎 Apple", "🍌 Banana", "🌰 Almonds"], time: "9:00 AM" },
    { day: 18, dateStr: "Aug 18, 2026 (Tue)", status: "future", fruits: ["🍊 Orange", "🍇 Grapes", "🌰 Almonds"], time: "9:00 AM" },
    { day: 19, dateStr: "Aug 19, 2026 (Wed)", status: "future", fruits: ["🥭 Papaya", "🥝 Kiwi", "🌰 Almonds"], time: "9:00 AM" },
    { day: 20, dateStr: "Aug 20, 2026 (Thu)", status: "future", fruits: ["🍎 Apple", "🍉 Watermelon", "🌰 Almonds"], time: "9:00 AM" },
    { day: 21, dateStr: "Aug 21, 2026 (Fri)", status: "future", fruits: ["🍊 Orange", "🍌 Banana", "🌰 Almonds"], time: "9:00 AM" },
    { day: 22, dateStr: "Aug 22, 2026 (Sat)", status: "future", fruits: ["Special Saturday Box"], time: "9:30 AM" },
    { day: 23, dateStr: "Aug 23, 2026 (Sun)", status: "weekend" },
    { day: 24, dateStr: "Aug 24, 2026 (Mon)", status: "future", fruits: ["🍎 Apple", "🥝 Kiwi", "🌰 Almonds"], time: "9:00 AM" },
    { day: 25, dateStr: "Aug 25, 2026 (Tue)", status: "future", fruits: ["🍊 Orange", "🍇 Grapes", "🌰 Almonds"], time: "9:00 AM" },
    { day: 26, dateStr: "Aug 26, 2026 (Wed)", status: "future", fruits: ["🥭 Papaya", "🍌 Banana", "🌰 Almonds"], time: "9:00 AM" },
    { day: 27, dateStr: "Aug 27, 2026 (Thu)", status: "future", fruits: ["🍉 Watermelon", "🍎 Apple", "🌰 Almonds"], time: "9:00 AM" },
    { day: 28, dateStr: "Aug 28, 2026 (Fri)", status: "holiday", holidayTitle: "Raksha Bandhan Holiday" },
    { day: 29, dateStr: "Aug 29, 2026 (Sat)", status: "weekend" },
    { day: 30, dateStr: "Aug 30, 2026 (Sun)", status: "weekend" },
    { day: 31, dateStr: "Aug 31, 2026 (Mon)", status: "future", fruits: ["🍎 Apple", "🍊 Orange", "🌰 Almonds"], time: "9:00 AM" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">

        {/* ─── PAGE HEADER & BREADCRUMB ────────────────────────────── */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A] border border-[#6DBE45]/20">
                <CalendarIcon className="h-3.5 w-3.5 text-[#6DBE45]" /> Delivery Schedule & Calendar
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Subscription Calendar ⭐
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                Track your active delivery days, completed boxes, skipped dates, and upcoming schedules.
              </p>
            </div>

            {/* Month Selector Controls */}
            <div className="flex items-center gap-2 bg-white rounded-2xl p-1.5 border border-[#ECECEC] shadow-2xs">
              <button
                onClick={() => setSelectedMonth("July 2026")}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 text-xs font-black text-slate-900 min-w-[110px] text-center">
                {selectedMonth}
              </span>
              <button
                onClick={() => setSelectedMonth("September 2026")}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* ─── TOP CALENDAR SUMMARY STRIP ──────────────────────────── */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            
            <div className="rounded-[20px] border border-[#ECECEC] bg-white p-4 shadow-xs transition-all hover:border-[#6DBE45]/40 hover:-translate-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Plan Start Date</p>
              <p className="mt-1 text-sm font-black text-slate-900">Aug 01, 2026</p>
              <span className="text-[10px] font-semibold text-[#1B7A1A]">Active Cycle</span>
            </div>

            <div className="rounded-[20px] border border-[#ECECEC] bg-white p-4 shadow-xs transition-all hover:border-[#6DBE45]/40 hover:-translate-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Plan End Date</p>
              <p className="mt-1 text-sm font-black text-slate-900">Aug 22, 2026</p>
              <span className="text-[10px] font-semibold text-amber-600">Auto Renews</span>
            </div>

            <div className="rounded-[20px] border border-[#ECECEC] bg-white p-4 shadow-xs transition-all hover:border-[#6DBE45]/40 hover:-translate-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Remaining Deliveries</p>
              <p className="mt-1 text-lg font-black text-[#1B7A1A]">18 Boxes</p>
              <span className="text-[10px] font-semibold text-slate-500">Scheduled ahead</span>
            </div>

            <div className="rounded-[20px] border border-[#ECECEC] bg-white p-4 shadow-xs transition-all hover:border-[#6DBE45]/40 hover:-translate-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Completed</p>
              <p className="mt-1 text-lg font-black text-amber-600">4 Boxes</p>
              <span className="text-[10px] font-semibold text-[#1B7A1A]">100% Rate</span>
            </div>

            <div className="rounded-[20px] border border-[#ECECEC] bg-white p-4 shadow-xs transition-all hover:border-[#6DBE45]/40 hover:-translate-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Skipped Days</p>
              <p className="mt-1 text-lg font-black text-red-500">1 Day</p>
              <span className="text-[10px] font-semibold text-slate-400">Credited to plan</span>
            </div>

            <div className="rounded-[20px] border border-[#ECECEC] bg-white p-4 shadow-xs transition-all hover:border-[#6DBE45]/40 hover:-translate-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Renewal Date</p>
              <p className="mt-1 text-sm font-black text-slate-900">Aug 23, 2026</p>
              <span className="text-[10px] font-semibold text-[#1B7A1A]">₹2,299 / Mo</span>
            </div>

          </div>
        </Reveal>

        {/* ─── MAIN CONTENT GRID: CALENDAR + CURRENT PLAN CARD ─────── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* LEFT: CALENDAR SECTION */}
          <Reveal delay={0.1}>
            <div className="rounded-[24px] border border-[#ECECEC] bg-white p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.02)]">
              
              {/* Calendar Legend Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4 text-[#6DBE45]" /> Monthly Delivery Grid
                </h2>
                
                {/* Legend Badges */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#6DBE45] ring-2 ring-[#6DBE45]/20" />
                    <span className="text-slate-700">Active Today</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-amber-400 ring-2 ring-amber-400/20" />
                    <span className="text-slate-700">Completed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400 ring-2 ring-red-400/20" />
                    <span className="text-slate-700">Skipped</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-slate-300 ring-2 ring-slate-200" />
                    <span className="text-slate-700">Holiday / Weekend</span>
                  </div>
                </div>
              </div>

              {/* Calendar Days Header (Sun - Sat) */}
              <div className="mt-4 grid grid-cols-7 text-center text-xs font-black uppercase tracking-wider text-slate-400">
                <span className="py-2 text-red-500">Sun</span>
                <span className="py-2">Mon</span>
                <span className="py-2">Tue</span>
                <span className="py-2">Wed</span>
                <span className="py-2">Thu</span>
                <span className="py-2">Fri</span>
                <span className="py-2 text-amber-600">Sat</span>
              </div>

              {/* Monthly Date Grid (31 Days) */}
              <div className="mt-2 grid grid-cols-7 gap-2">
                {augustDays.map((d) => {
                  let bgClasses = "bg-white border-slate-200 text-slate-700 hover:border-[#6DBE45]";
                  let iconBadge = null;

                  if (d.status === "active") {
                    bgClasses = "bg-gradient-to-br from-[#6DBE45] to-[#1B7A1A] text-white border-transparent shadow-[0_6px_20px_rgba(109,190,69,0.4)] ring-4 ring-[#EAF8DF]";
                    iconBadge = <Clock className="h-3.5 w-3.5 text-white animate-pulse" />;
                  } else if (d.status === "completed") {
                    bgClasses = "bg-[#FFFBEB] border-amber-200/90 text-slate-900 shadow-2xs hover:bg-amber-100/60";
                    iconBadge = <CheckCircle2 className="h-3.5 w-3.5 text-amber-600" />;
                  } else if (d.status === "skipped") {
                    bgClasses = "bg-[#FEF2F2] border-red-200/90 text-red-700 shadow-2xs hover:bg-red-100/60";
                    iconBadge = <XCircle className="h-3.5 w-3.5 text-red-500" />;
                  } else if (d.status === "holiday") {
                    bgClasses = "bg-slate-100/80 border-slate-200/80 text-slate-400 cursor-not-allowed";
                    iconBadge = <AlertCircle className="h-3.5 w-3.5 text-amber-500" />;
                  } else if (d.status === "weekend") {
                    if (d.dateStr.includes("Sat")) {
                      bgClasses = "bg-[#FFFDF5] border-amber-200/50 text-slate-400";
                    } else {
                      bgClasses = "bg-[#FFF8F8] border-red-200/50 text-slate-400";
                    }
                  } else if (d.status === "future") {
                    bgClasses = "bg-white border-slate-200/80 text-slate-800 hover:border-[#6DBE45] hover:bg-[#EAF8DF]/30";
                    iconBadge = <Package className="h-3 w-3 text-slate-300" />;
                  }

                  return (
                    <div
                      key={d.day}
                      onMouseEnter={() => setHoveredDate(d)}
                      onMouseLeave={() => setHoveredDate(null)}
                      onClick={() => setSelectedDate(d)}
                      className={`relative flex flex-col justify-between rounded-[18px] border p-2.5 min-h-[85px] sm:min-h-[95px] transition-all duration-200 cursor-pointer ${bgClasses}`}
                    >
                      {/* Top Day Header */}
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-black ${d.status === "active" ? "text-white" : "text-slate-900"}`}>
                          {d.day}
                        </span>
                        {iconBadge}
                      </div>

                      {/* Day Label / Status Pill */}
                      <div className="mt-1">
                        {d.status === "active" && (
                          <span className="inline-block rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] font-black uppercase text-white">
                            Today
                          </span>
                        )}
                        {d.status === "completed" && (
                          <span className="inline-block text-[9px] font-black text-amber-700 uppercase">
                            Delivered
                          </span>
                        )}
                        {d.status === "skipped" && (
                          <span className="inline-block text-[9px] font-black text-red-600 uppercase">
                            Skipped
                          </span>
                        )}
                        {d.status === "holiday" && (
                          <span className="inline-block truncate text-[9px] font-black text-amber-600">
                            Holiday 🎉
                          </span>
                        )}
                        {d.status === "weekend" && (
                          <span className="inline-block text-[9px] font-bold text-slate-400">
                            Weekend
                          </span>
                        )}
                        {d.status === "future" && (
                          <span className="inline-block text-[9px] font-bold text-slate-400">
                            Scheduled
                          </span>
                        )}
                      </div>

                      {/* Tooltip on Hover */}
                      <AnimatePresence>
                        {hoveredDate?.day === d.day && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-2xl border border-slate-200 bg-slate-900 p-3 text-white shadow-xl z-40 pointer-events-none"
                          >
                            <p className="text-[11px] font-black text-[#6DBE45]">{d.dateStr}</p>
                            {d.holidayTitle ? (
                              <p className="text-xs font-semibold mt-1 text-amber-300">{d.holidayTitle}</p>
                            ) : (
                              <>
                                <p className="text-xs font-bold mt-1 capitalize text-slate-200">
                                  Status: <span className="text-white">{d.status}</span>
                                </p>
                                {d.time && <p className="text-[10px] text-slate-400">Time: {d.time}</p>}
                                {d.fruits && (
                                  <div className="mt-1.5 pt-1.5 border-t border-slate-800 text-[10px] text-slate-300">
                                    {d.fruits.join(", ")}
                                  </div>
                                )}
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Help Notice */}
              <div className="mt-5 rounded-2xl bg-[#FCFBF7] p-3.5 border border-[#ECECEC] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600 font-semibold">
                  <Info className="h-4 w-4 text-[#6DBE45] shrink-0" />
                  <span>Need to skip tomorrow's delivery? Cancel before 8 PM tonight.</span>
                </div>
                <button
                  onClick={() => alert("Tomorrow's delivery paused successfully!")}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-black text-slate-800 hover:bg-slate-50 transition-colors shrink-0"
                >
                  Pause Tomorrow
                </button>
              </div>

            </div>
          </Reveal>

          {/* RIGHT: CURRENT PLAN CARD & QUICK ACTIONS */}
          <div className="flex flex-col gap-5">
            
            {/* CURRENT PLAN CARD */}
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-[24px] border border-[#ECECEC] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.03)] group">
                
                {/* Top Badge & Header */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF8DF] px-3 py-1 text-[10px] font-black text-[#1B7A1A] border border-[#6DBE45]/30">
                    <Sparkles className="h-3 w-3 text-[#6DBE45]" /> ACTIVE SUBSCRIPTION
                  </span>
                  <span className="text-xs font-black text-slate-400">ID: #FB-9920</span>
                </div>

                {/* Plan Title & Price */}
                <div className="mt-4">
                  <h3 className="text-xl font-black text-slate-900">Monthly Premium</h3>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#1B7A1A]">₹2,299</span>
                    <span className="text-xs font-bold text-slate-400">/ month</span>
                  </div>
                </div>

                {/* Plan Image Illustration */}
                <div className="relative my-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAF8DF] to-[#FFF8EA] p-3 border border-[#6DBE45]/20">
                  <img
                    src="/images/plan.png"
                    alt="Subscription Plan"
                    className="h-28 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/dashboard_fruits_banner.png";
                    }}
                  />
                </div>

                {/* Details List */}
                <div className="space-y-2 text-xs font-bold text-slate-600 border-t border-b border-slate-100 py-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Remaining Days:</span>
                    <span className="text-[#1B7A1A] font-black">18 / 22 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Renewal Date:</span>
                    <span className="text-slate-900 font-black">Aug 23, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Delivery Desk:</span>
                    <span className="text-slate-900 font-black">Nimbus Labs, Fl 4</span>
                  </div>
                </div>

                {/* Feature Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">✓ Pause Anytime</span>
                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">✓ Daily Almonds</span>
                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">✓ Free Replacements</span>
                </div>

                {/* Buttons */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => alert("Renewal options opened")}
                    className="w-full rounded-xl bg-[#6DBE45] py-2.5 text-xs font-black text-white shadow-[0_6px_16px_rgba(109,190,69,0.3)] transition-all hover:bg-[#5da73a] active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Renew Now
                  </button>
                  <button
                    onClick={() => alert("Subscription paused for upcoming vacation")}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-black text-slate-700 transition-all hover:bg-slate-50 active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Pause className="h-3.5 w-3.5" /> Pause Plan
                  </button>
                </div>

              </div>
            </Reveal>

          </div>

        </div>

        {/* ─── DATE DETAILS MODAL (IF DATE CLICKED) ──────────────── */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedDate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[24px] border border-[#ECECEC] p-6 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF8DF] text-[#1B7A1A] font-black text-sm">
                      {selectedDate.day}
                    </span>
                    <div>
                      <h3 className="font-black text-slate-900 text-base">{selectedDate.dateStr}</h3>
                      <p className="text-xs font-semibold text-slate-400 capitalize">Status: {selectedDate.status}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>

                <div className="py-4 space-y-3">
                  {selectedDate.holidayTitle ? (
                    <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 text-amber-900">
                      <p className="font-black text-sm">{selectedDate.holidayTitle}</p>
                      <p className="text-xs mt-1">No fruit box is delivered on national holidays. This day is preserved in your plan balance.</p>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-2xl bg-[#FCFBF7] p-3.5 border border-[#ECECEC]">
                        <p className="text-[10px] font-black uppercase text-slate-400">Scheduled Time</p>
                        <p className="text-sm font-black text-slate-900 mt-0.5">{selectedDate.time || "9:00 AM"}</p>
                      </div>

                      {selectedDate.fruits && (
                        <div className="rounded-2xl bg-[#FCFBF7] p-3.5 border border-[#ECECEC]">
                          <p className="text-[10px] font-black uppercase text-slate-400">Fruit Box Menu</p>
                          <p className="text-xs font-bold text-slate-800 mt-1">{selectedDate.fruits.join(" • ")}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-800"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
