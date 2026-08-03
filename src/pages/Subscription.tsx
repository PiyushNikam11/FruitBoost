import { useState } from "react";
import { motion } from "framer-motion";
import {
  Repeat,
  PackageCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Apple,
  Utensils,
  Building2,
  PauseCircle,
  RefreshCw,
  Zap,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Reveal } from "@/components/Reveal";

// Features included in the Monthly Package
const monthlyFeatures = [
  { text: "400 gm Hygienic Fruitbox Tiffin", highlight: true },
  { text: "6+ Fresh seasonal fruits", highlight: false },
  { text: "Daily organic soaked almonds", highlight: false },
  { text: "Washed, sliced & ready to eat", highlight: false },
  { text: "Direct desk / reception delivery", highlight: false },
  { text: "Pause or skip anytime via Calendar", highlight: false },
  { text: "Delivery: Mon – Fri (22 Business Days)", highlight: false },
  { text: "Instant GST Tax Invoice", highlight: false },
];

export default function Subscription() {
  // State to represent active or expired subscription
  const [isActivated, setIsActivated] = useState(true);

  return (
    <DashboardLayout>
      
      {/* ─── PAGE HEADER & STATE TOGGLE FOR TESTING ─────────────────── */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A] border border-[#6DBE45]/20">
              <Sparkles className="h-3.5 w-3.5 text-[#6DBE45]" /> Monthly Subscription
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
              Subscription Management
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Review your monthly package details, features, and renewal options.
            </p>
          </div>

          {/* Quick Demo Toggle */}
          <div className="flex items-center gap-2 rounded-2xl bg-white p-1.5 border border-slate-200 shadow-2xs self-start sm:self-auto">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 pl-2">Status:</span>
            <button
              onClick={() => setIsActivated(true)}
              className={`rounded-xl px-3 py-1.5 text-xs font-black transition-all cursor-pointer ${
                isActivated
                  ? "bg-[#6DBE45] text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setIsActivated(false)}
              className={`rounded-xl px-3 py-1.5 text-xs font-black transition-all cursor-pointer ${
                !isActivated
                  ? "bg-rose-500 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Expired
            </button>
          </div>
        </div>
      </Reveal>

      {/* ─── CONDITION 1: USER IS ALREADY ACTIVATED ─────────────────── */}
      {isActivated ? (
        <div className="space-y-6">
          
          {/* Active Status Card */}
          <Reveal delay={0.05}>
            <div className="relative overflow-hidden rounded-[28px] border border-[#6DBE45]/30 bg-gradient-to-br from-white via-[#F6FCF5] to-[#EAF8DF]/40 p-6 sm:p-8 shadow-[0_10px_35px_rgba(109,190,69,0.12)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#6DBE45]/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6DBE45] text-white font-black shadow-xs">
                    <PackageCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF8DF] px-3 py-0.5 text-[10px] font-black text-[#1B7A1A] border border-[#6DBE45]/30">
                      <span className="h-2 w-2 rounded-full bg-[#6DBE45] animate-pulse" />
                      Active Subscription
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                      Monthly Package (400g Fruitbox Tiffin)
                    </h2>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-2xl font-black text-[#1B7A1A]">₹2,299</span>
                  <span className="text-xs font-bold text-slate-500"> / month</span>
                  <p className="text-[11px] font-semibold text-slate-400">22 Business Days Delivery</p>
                </div>
              </div>

              {/* Subscription Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 mb-2">
                  <span>Subscription Progress</span>
                  <span className="text-[#1B7A1A]">18 / 22 Days Completed (4 Days Left)</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-200/80 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#6DBE45] to-[#1B7A1A]" style={{ width: "81%" }} />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl bg-white p-3.5 border border-slate-200/80 shadow-2xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Start Date</p>
                  <p className="text-xs font-black text-slate-900 mt-0.5">01 Aug 2026</p>
                </div>
                <div className="rounded-2xl bg-white p-3.5 border border-slate-200/80 shadow-2xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Expiry Date</p>
                  <p className="text-xs font-black text-slate-900 mt-0.5">31 Aug 2026</p>
                </div>
                <div className="rounded-2xl bg-white p-3.5 border border-slate-200/80 shadow-2xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Days Left</p>
                  <p className="text-xs font-black text-[#1B7A1A] mt-0.5">4 Days</p>
                </div>
                <div className="rounded-2xl bg-white p-3.5 border border-slate-200/80 shadow-2xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Deliveries Left</p>
                  <p className="text-xs font-black text-slate-900 mt-0.5">4 Fruit Boxes</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RENEW NOW CARD */}
          <Reveal delay={0.1}>
            <div className="rounded-[28px] border border-[#6DBE45]/40 bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF8DF] text-[#1B7A1A] font-black border border-[#6DBE45]/30">
                  <Repeat className="h-7 w-7 text-[#6DBE45]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Renew Now</h3>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">
                    Extend your plan before it expires. Keep your uninterrupted daily morning fruit deliveries.
                  </p>
                </div>
              </div>

              <Link
                to="/checkout?plan=monthly"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#6DBE45] px-8 text-xs font-black text-white shadow-[0_6px_20px_rgba(109,190,69,0.35)] transition-all hover:bg-[#5da73a] active:scale-95 shrink-0"
              >
                <span>Renew Now — Extend Plan</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* All Monthly Package Features List */}
          <Reveal delay={0.15}>
            <div className="rounded-[28px] border border-[#ECECEC] bg-white p-6 sm:p-8 shadow-xs">
              <h3 className="text-base font-black text-slate-900 mb-4">Included In Your Monthly Package</h3>
              
              <div className="grid gap-3 sm:grid-cols-2">
                {monthlyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 rounded-2xl p-3 text-xs font-semibold ${
                      feat.highlight
                        ? "bg-[#EAF8DF] border border-[#6DBE45]/40 text-[#1B7A1A] font-black"
                        : "bg-[#FCFBF7] border border-slate-200/80 text-slate-700"
                    }`}
                  >
                    <CheckCircle2 className={`h-4 w-4 shrink-0 ${feat.highlight ? "text-[#1B7A1A]" : "text-[#6DBE45]"}`} />
                    <span>{feat.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      ) : (
        /* ─── CONDITION 2: USER IS EXPIRED (SHOW PLAN DIRECTLY) ─────── */
        <div className="space-y-6">
          
          <Reveal delay={0.05}>
            <div className="rounded-[28px] border border-rose-200 bg-rose-50/60 p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
                <div>
                  <p className="text-xs font-black text-rose-900">Your Subscription Has Expired</p>
                  <p className="text-[11px] font-semibold text-rose-700">Reactivate your Monthly Package to continue receiving fresh 400g fruitbox tiffins every morning.</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* DIRECT MONTHLY PLAN CARD */}
          <Reveal delay={0.1}>
            <div className="rounded-[28px] border-2 border-[#6DBE45] bg-gradient-to-b from-white via-[#F6FCF5] to-white p-6 sm:p-8 shadow-[0_16px_50px_rgba(109,190,69,0.22)] relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#6DBE45] via-[#FFB84D] to-[#6DBE45]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#6DBE45]/20">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#6DBE45] px-3 py-1 text-xs font-black text-white shadow-xs">
                    <Sparkles className="h-3 w-3 text-[#FFB84D]" /> Monthly Package (22 Days)
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
                    Monthly Subscription Plan
                  </h2>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    Hygienic 400g Fruitbox Tiffin + Daily Soaked Almonds
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-3xl sm:text-4xl font-black text-[#1B7A1A]">₹2,299</span>
                  <span className="text-xs font-bold text-slate-500"> / month</span>
                  <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#EAF8DF] px-2.5 py-0.5 text-[10px] font-black text-[#1B7A1A]">
                    <Zap className="h-3 w-3 text-[#6DBE45]" /> Only ₹104 / box
                  </div>
                </div>
              </div>

              {/* All Monthly Features */}
              <div className="mt-6 space-y-3">
                <p className="text-xs font-black uppercase tracking-wider text-[#1B7A1A]">All Features Included:</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {monthlyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 rounded-2xl p-3 text-xs font-semibold ${
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

              {/* Reactivate Button */}
              <div className="mt-8">
                <Link
                  to="/checkout?plan=monthly"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#6DBE45] text-xs font-black text-white shadow-[0_6px_20px_rgba(109,190,69,0.35)] transition-all hover:bg-[#5da73a] active:scale-95 cursor-pointer"
                >
                  <span>Subscribe Now — Reactivate Plan (₹2,299)</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

        </div>
      )}

    </DashboardLayout>
  );
}
