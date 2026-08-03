import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  CheckCircle2,
  XCircle,
  CalendarOff,
  Filter,
  Clock,
  MapPin,
  Truck,
  Sparkles,
  PackageCheck,
  ShieldCheck,
  Flame,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Reveal } from "@/components/Reveal";

type StatusType = "Delivered" | "Skipped" | "Holiday";

interface DeliveryItem {
  id: string;
  dateStr: string;
  dayName: string;
  status: StatusType;
  deliveredTime: string;
  location: string;
  driver: string;
  boxItems: { emoji: string; name: string }[];
}

const detailedDeliveryHistory: DeliveryItem[] = [
  {
    id: "del-101",
    dateStr: "Aug 03, 2026",
    dayName: "Monday",
    status: "Delivered",
    deliveredTime: "9:00 AM",
    location: "Nimbus Labs, Floor 4 Reception",
    driver: "Rajesh M. (4.9 ★)",
    boxItems: [
      { emoji: "🍎", name: "Granny Smith Apple" },
      { emoji: "🍌", name: "Organic Cavendish Banana" },
      { emoji: "🍊", name: "Nagpur Sweet Orange" },
      { emoji: "🍇", name: "Black Seedless Grapes" },
      { emoji: "🥝", name: "Zespri Gold Kiwi" },
      { emoji: "🌰", name: "5x Soaked Almonds" },
    ],
  },
  {
    id: "del-102",
    dateStr: "Aug 01, 2026",
    dayName: "Saturday",
    status: "Delivered",
    deliveredTime: "9:15 AM",
    location: "Nimbus Labs, Floor 4 Reception",
    driver: "Suresh K. (4.8 ★)",
    boxItems: [
      { emoji: "🥭", name: "Rajnigandha Papaya" },
      { emoji: "🍉", name: "Sweet Watermelon Slice" },
      { emoji: "🍎", name: "Royal Gala Apple" },
      { emoji: "🥝", name: "Zespri Kiwi" },
      { emoji: "🌰", name: "5x Soaked Almonds" },
    ],
  },
  {
    id: "del-103",
    dateStr: "Jul 31, 2026",
    dayName: "Friday",
    status: "Skipped",
    deliveredTime: "—",
    location: "Paused for Work Travel",
    driver: "—",
    boxItems: [{ emoji: "⏸️", name: "Delivery Skipped by Customer Request" }],
  },
  {
    id: "del-104",
    dateStr: "Jul 30, 2026",
    dayName: "Thursday",
    status: "Delivered",
    deliveredTime: "8:55 AM",
    location: "Nimbus Labs, Floor 4 Reception",
    driver: "Rajesh M. (4.9 ★)",
    boxItems: [
      { emoji: "🍎", name: "Fuji Apple" },
      { emoji: "🍇", name: "Green Globe Grapes" },
      { emoji: "🍊", name: "Kinnow Orange" },
      { emoji: "🍌", name: "Robusta Banana" },
      { emoji: "🌰", name: "5x Soaked Almonds" },
    ],
  },
  {
    id: "del-105",
    dateStr: "Jul 29, 2026",
    dayName: "Wednesday",
    status: "Delivered",
    deliveredTime: "9:05 AM",
    location: "Nimbus Labs, Floor 4 Reception",
    driver: "Vikram P. (4.9 ★)",
    boxItems: [
      { emoji: "🥭", name: "Alphonso Papaya Cubes" },
      { emoji: "🥝", name: "Zespri Gold Kiwi" },
      { emoji: "🍎", name: "Red Delicious Apple" },
      { emoji: "🍊", name: "Sweet Orange" },
      { emoji: "🌰", name: "5x Soaked Almonds" },
    ],
  },
  {
    id: "del-106",
    dateStr: "Jul 28, 2026",
    dayName: "Tuesday",
    status: "Delivered",
    deliveredTime: "9:10 AM",
    location: "Nimbus Labs, Floor 4 Reception",
    driver: "Rajesh M. (4.9 ★)",
    boxItems: [
      { emoji: "🍉", name: "Diced Watermelon" },
      { emoji: "🍌", name: "Organic Banana" },
      { emoji: "🍎", name: "Granny Smith Apple" },
      { emoji: "🍇", name: "Black Seedless Grapes" },
      { emoji: "🌰", name: "5x Soaked Almonds" },
    ],
  },
  {
    id: "del-107",
    dateStr: "Jul 25, 2026",
    dayName: "Saturday",
    status: "Holiday",
    deliveredTime: "—",
    location: "National Holiday",
    driver: "—",
    boxItems: [{ emoji: "🎉", name: "Public Holiday — No Office Delivery Scheduled" }],
  },
];

export default function DeliveryHistory() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredDeliveries = detailedDeliveryHistory.filter((item) => {
    const matchesQuery =
      item.dateStr.toLowerCase().includes(query.toLowerCase()) ||
      item.dayName.toLowerCase().includes(query.toLowerCase()) ||
      item.boxItems.some((b) => b.name.toLowerCase().includes(query.toLowerCase()));
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl">

        {/* ─── PAGE HEADER & BREADCRUMB ────────────────────────────── */}
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A] border border-[#6DBE45]/20">
              <PackageCheck className="h-3.5 w-3.5 text-[#6DBE45]" /> Daily Box Log
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Delivery History Timeline 🚚
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              Review delivered time, full fruit box items, desk locations, and delivery status logs.
            </p>
          </div>
        </Reveal>

        {/* ─── SUMMARY KPI CARDS ───────────────────────────────────── */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="rounded-[20px] border border-[#ECECEC] bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400">Total Delivered</span>
                <CheckCircle2 className="h-4 w-4 text-[#6DBE45]" />
              </div>
              <p className="mt-2 text-2xl font-black text-slate-900">29 Boxes</p>
              <span className="text-[10px] font-semibold text-[#1B7A1A]">100% Organic Quality</span>
            </div>

            <div className="rounded-[20px] border border-[#ECECEC] bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400">Average Delivery Time</span>
                <Clock className="h-4 w-4 text-[#6DBE45]" />
              </div>
              <p className="mt-2 text-2xl font-black text-[#1B7A1A]">9:02 AM</p>
              <span className="text-[10px] font-semibold text-slate-500">Before Workday Starts</span>
            </div>

            <div className="rounded-[20px] border border-[#ECECEC] bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400">Skipped Days</span>
                <XCircle className="h-4 w-4 text-red-500" />
              </div>
              <p className="mt-2 text-2xl font-black text-red-500">1 Day</p>
              <span className="text-[10px] font-semibold text-slate-400">Balance preserved</span>
            </div>

            <div className="rounded-[20px] border border-[#ECECEC] bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400">Active Streak</span>
                <Flame className="h-4 w-4 text-amber-500" />
              </div>
              <p className="mt-2 text-2xl font-black text-amber-600">14 Days</p>
              <span className="text-[10px] font-semibold text-slate-500">Consecutive Health</span>
            </div>
          </div>
        </Reveal>

        {/* ─── SEARCH & FILTER BAR ─────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="rounded-[22px] border border-[#ECECEC] bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by date or fruit item (e.g. Apple, Kiwi)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#6DBE45] focus:bg-white"
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <Filter className="h-4 w-4 text-slate-400 shrink-0 mr-1" />
              {["All", "Delivered", "Skipped", "Holiday"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-black transition-all cursor-pointer ${
                    statusFilter === st
                      ? "bg-[#6DBE45] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

          </div>
        </Reveal>

        {/* ─── DELIVERIES TIMELINE LIST (NEW ENHANCED UI) ──────────── */}
        <Reveal delay={0.15}>
          <div className="space-y-4">
            {filteredDeliveries.map((item, idx) => {
              let statusBadgeClass = "bg-[#EAF8DF] text-[#1B7A1A] border-[#6DBE45]/30";
              let statusIcon = <CheckCircle2 className="h-4 w-4 text-[#6DBE45]" />;

              if (item.status === "Skipped") {
                statusBadgeClass = "bg-red-50 text-red-700 border-red-200";
                statusIcon = <XCircle className="h-4 w-4 text-red-500" />;
              } else if (item.status === "Holiday") {
                statusBadgeClass = "bg-amber-50 text-amber-800 border-amber-200";
                statusIcon = <CalendarOff className="h-4 w-4 text-amber-600" />;
              }

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-[24px] border border-[#ECECEC] bg-white p-5 sm:p-6 shadow-[0_8px_25px_rgba(0,0,0,0.02)] transition-all hover:border-[#6DBE45]/40 hover:shadow-md"
                >
                  {/* Top Bar: Date, Time & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF8DF] text-[#1B7A1A] font-black text-sm border border-[#6DBE45]/20">
                        {item.dateStr.split(" ")[1]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-slate-900 text-sm sm:text-base">{item.dateStr}</h3>
                          <span className="text-xs font-bold text-slate-400">• {item.dayName}</span>
                        </div>
                        
                        {/* Delivered Time Tag */}
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <Clock className="h-3.5 w-3.5 text-[#6DBE45]" />
                          <span>Delivered Time: <strong className="text-slate-900">{item.deliveredTime}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider border ${statusBadgeClass}`}>
                        {statusIcon} {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Middle Section: Box Items List */}
                  <div className="mt-4">
                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2.5">
                      Included Fruit Box Items ({item.boxItems.length}):
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.boxItems.map((b, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-center gap-2 rounded-xl bg-[#FCFBF7] px-3 py-1.5 border border-slate-200/80 text-xs font-extrabold text-slate-800 shadow-2xs hover:bg-white"
                        >
                          <span className="text-base leading-none">{b.emoji}</span>
                          <span>{b.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer Info: Location & Driver */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-semibold text-slate-500 gap-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#6DBE45]" />
                      <span>Delivery Location: <strong className="text-slate-800">{item.location}</strong></span>
                    </div>

                    {item.driver !== "—" && (
                      <div className="flex items-center gap-1.5">
                        <Truck className="h-3.5 w-3.5 text-[#6DBE45]" />
                        <span>Driver Partner: <strong className="text-slate-800">{item.driver}</strong></span>
                      </div>
                    )}
                  </div>

                </motion.div>
              );
            })}

            {filteredDeliveries.length === 0 && (
              <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-12 text-center text-slate-400">
                <PackageCheck className="h-10 w-10 mx-auto text-slate-300 mb-2" />
                <p className="font-black text-slate-700">No delivery logs match your filter criteria.</p>
                <p className="text-xs mt-1">Try clearing your search query or switching filters.</p>
              </div>
            )}
          </div>
        </Reveal>

      </div>
    </DashboardLayout>
  );
}
