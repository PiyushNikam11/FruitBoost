import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Calendar,
  Clock,
  Truck,
  TrendingUp,
  Repeat,
  XCircle,
  MessageSquare,
  Share2,
  MapPin,
  Crown,
  Sparkles,
  ShieldCheck,
  Pause,
  HelpCircle,
  Flame,
  Award,
  Heart,
  Zap,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Star,
  Activity,
  ThumbsUp,
  Download,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Reveal } from "@/components/Reveal";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// KPI Cards Data
const kpiStats = [
  {
    label: "Total Boxes",
    value: "47",
    sub: "+4 this month",
    icon: Package,
    trend: "↑ 12%",
    gradient: "from-[#EAF8DF] to-emerald-100/60",
    iconBg: "bg-[#6DBE45] text-white",
  },
  {
    label: "Received Boxes",
    value: "29",
    sub: "61.7% completed",
    icon: CheckCircle2,
    trend: "↑ 8%",
    gradient: "from-[#EAF8DF] to-emerald-50",
    iconBg: "bg-[#1B7A1A] text-white",
  },
  {
    label: "Pending Boxes",
    value: "18",
    sub: "18 days left",
    icon: Clock,
    trend: "Active",
    gradient: "from-[#FFF8EA] to-amber-100/60",
    iconBg: "bg-[#FFB84D] text-slate-900",
  },
  {
    label: "Current Plan",
    value: "Monthly",
    sub: "₹2,299 / mo",
    icon: Crown,
    trend: "Premium",
    gradient: "from-[#FFF5F5] to-red-100/40",
    iconBg: "bg-rose-500 text-white",
  },
];

// Quick Action Items
const quickActions = [
  { label: "Renew Plan", icon: Repeat, color: "from-[#6DBE45] to-[#1B7A1A] text-white", action: "renew" },
  { label: "Cancel Tomorrow", icon: XCircle, color: "from-rose-400 to-rose-500 text-white", action: "cancel" },
  { label: "Give Feedback", icon: MessageSquare, color: "from-emerald-400 to-teal-500 text-white", action: "feedback" },
  { label: "Share & Earn", icon: Share2, color: "from-sky-400 to-blue-500 text-white", action: "share" },
  { label: "Need Help?", icon: HelpCircle, color: "from-purple-400 to-indigo-500 text-white", action: "help" },
];

// Today's Fruits
const todaysFruitItems = [
  { name: "Granny Smith Apple", emoji: "🍎", calories: "95 cal", badge: "Crisp & Fiber rich" },
  { name: "Organic Cavendish Banana", emoji: "🍌", calories: "105 cal", badge: "Potassium boost" },
  { name: "Nagpur Sweet Orange", emoji: "🍊", calories: "62 cal", badge: "Vitamin C dense" },
  { name: "Black Seedless Grapes", emoji: "🍇", calories: "62 cal", badge: "Antioxidants" },
  { name: "Zespri Gold Kiwi", emoji: "🥝", calories: "42 cal", badge: "Immunity++" },
  { name: "5x Soaked Almonds", emoji: "🌰", calories: "35 cal", badge: "Brain power" },
];

// Delivery Timeline mock items
const timelineDeliveries = [
  { id: "del-1", date: "Today, Aug 03", time: "9:00 AM", status: "In Transit", items: "Apple, Banana, Orange, Grapes, Kiwi, Almonds", type: "active" },
  { id: "del-2", date: "Fri, Aug 01", time: "9:05 AM", status: "Delivered", items: "Papaya, Watermelon, Kiwi, Almonds", type: "completed" },
  { id: "del-3", date: "Thu, Jul 31", time: "—", status: "Skipped", items: "Delivery skipped on request", type: "skipped" },
  { id: "del-4", date: "Wed, Jul 30", time: "8:55 AM", status: "Delivered", items: "Apple, Grapes, Orange, Almonds", type: "completed" },
  { id: "del-5", date: "Tue, Jul 29", time: "9:12 AM", status: "Delivered", items: "Banana, Kiwi, Papaya, Almonds", type: "completed" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const isJustSubscribed =
      sessionStorage.getItem("JUST_SUBSCRIBED") === "true" ||
      (location.state as any)?.showCelebration;

    if (isJustSubscribed) {
      setShowCelebration(true);
      sessionStorage.removeItem("JUST_SUBSCRIBED");
    }
  }, [location]);

  const firstName = user?.fullName ? user.fullName.split(" ")[0] : (user?.userCode || "");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">

        {/* ─── CELEBRATION CONFETTI BLAST MODAL ───────────────────────── */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md overflow-hidden"
            >
              {/* Confetti Explosion Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => {
                  const colors = [
                    "#6DBE45",
                    "#FFB84D",
                    "#FF5A5F",
                    "#1B7A1A",
                    "#3B82F6",
                    "#EC4899",
                    "#8B5CF6",
                    "#F59E0B",
                  ];
                  const bg = colors[i % colors.length];
                  const left = 50 + (Math.random() - 0.5) * 85;
                  return (
                    <motion.div
                      key={i}
                      className="absolute h-3.5 w-3.5 rounded-xs shadow-md"
                      style={{
                        left: `${left}%`,
                        top: "30%",
                        backgroundColor: bg,
                      }}
                      initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
                      animate={{
                        scale: [0, 1.4, 0.8],
                        x: (Math.random() - 0.5) * 750,
                        y: Math.random() * 550 - 180,
                        rotate: Math.random() * 720 - 360,
                        opacity: [1, 1, 0],
                      }}
                      transition={{
                        duration: 2.2 + Math.random() * 0.9,
                        ease: [0.25, 1, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: Math.random() * 1.5,
                      }}
                    />
                  );
                })}
              </div>

              {/* Main Celebration Card */}
              <motion.div
                initial={{ scale: 0.8, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative z-10 w-full max-w-lg overflow-hidden rounded-[32px] border-2 border-[#6DBE45]/40 bg-white p-8 text-center shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
              >
                {/* Background Ambient Glows */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#6DBE45]/25 blur-3xl" />
                <div className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-[#FFB84D]/25 blur-3xl" />

                {/* Animated Green Sparkle Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 350, delay: 0.15 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#6DBE45] via-[#5FAE2E] to-[#1B7A1A] text-white shadow-[0_10px_30px_rgba(109,190,69,0.4)] ring-8 ring-[#EAF8DF]"
                >
                  <Sparkles className="h-10 w-10 animate-pulse" />
                </motion.div>

                {/* Status Tag */}
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#EAF8DF] px-4 py-1.5 text-xs font-black text-[#1B7A1A] border border-[#6DBE45]/30">
                  <CheckCircle2 className="h-4 w-4 text-[#6DBE45]" />
                  Payment Verified & Subscription Active! 🎉
                </div>

                {/* Headline */}
                <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Welcome to FruitBoost! 🍎
                </h2>

                <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed max-w-md mx-auto">
                  Your FruitBoost subscription is now active! Get ready to enjoy fresh, seasonal fruits delivered regularly as per your subscription plan.
                </p>

                {/* Summary Highlights */}
                <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-2xl bg-[#FCFBF7] p-3.5 border border-slate-200/80 text-left">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">PLAN</p>
                    <p className="text-xs font-black text-slate-900 mt-0.5 truncate">Monthly Plan</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">STATUS</p>
                    <p className="text-xs font-black text-[#1B7A1A] mt-0.5 flex items-center gap-0.5">
                      <CheckCircle2 className="h-3 w-3" /> Paid ✓
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setShowCelebration(false)}
                  className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6DBE45] via-[#5FAE2E] to-[#1B7A1A] text-sm font-black text-white shadow-[0_8px_25px_rgba(109,190,69,0.4)] transition-all hover:brightness-105 active:scale-95 cursor-pointer"
                >
                  <span>Explore My Dashboard 🚀</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── TOAST NOTIFICATION ────────────────────────────────────── */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 px-5 py-3.5 text-xs font-black text-white shadow-2xl border border-slate-700"
            >
              <CheckCircle2 className="h-5 w-5 text-[#6DBE45]" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── 1. NEW KPI SUMMARY STRIP ──────────────────────────────── */}
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiStats.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={kpi.label}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`relative overflow-hidden rounded-[22px] border border-[#ECECEC] bg-white p-5 shadow-[0_8px_25px_rgba(0,0,0,0.02)] transition-all group`}
                >
                  {/* Card Background Subtle Gradient Glow */}
                  <div className={`absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-gradient-to-br ${kpi.gradient} opacity-50 blur-2xl transition-all group-hover:scale-150`} />

                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${kpi.iconBg} shadow-xs transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF8DF] px-2.5 py-0.5 text-[10px] font-black text-[#1B7A1A] border border-[#6DBE45]/20">
                      <TrendingUp className="h-3 w-3" /> {kpi.trend}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      {kpi.label}
                    </p>
                    <p className="mt-0.5 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {kpi.value}
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      {kpi.sub}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        {/* ─── 2. HERO WELCOME CARD ──────────────────────────────────── */}
        <Reveal delay={0.05}>
          <div className="relative overflow-hidden rounded-[24px] border border-[#6DBE45]/30 bg-gradient-to-br from-[#FCFBF7] via-[#F4FBF0] to-[#FFF8EA] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] group">
            
            {/* Background Glow Blobs */}
            <div className="absolute top-0 right-1/3 h-64 w-64 rounded-full bg-[#6DBE45]/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#FFB84D]/15 blur-3xl" />

            <div className="relative z-10 grid md:grid-cols-[1fr_320px] items-center gap-6">
              
              {/* Left Column Content */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#1B7A1A] border border-[#6DBE45]/30 shadow-2xs">
                    <Sparkles className="h-3.5 w-3.5 text-[#6DBE45]" /> Subscription Active
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FFB84D]/20 px-3 py-1 text-xs font-extrabold text-slate-800 border border-[#FFB84D]/40">
                    Monthly Premium Plan
                  </span>
                </div>

                <h1 className="mt-4 text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {firstName ? `Welcome back, ${firstName}!` : "Welcome back!"} <span className="inline-block origin-bottom-right animate-[bounce_2s_infinite]">👋</span>
                </h1>

                <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed max-w-xl">
                  Your daily fresh fruit box is prepared with organic handpicked fruits and arrived at your desk. Enjoy your daily wellness routine!
                </p>

                {/* Sub-info Pill & Countdown */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/90 backdrop-blur-md px-4 py-2.5 text-xs font-black text-slate-800 border border-[#ECECEC] shadow-2xs">
                    <Clock className="h-4 w-4 text-[#6DBE45]" />
                    <span>Next box arriving tomorrow at <strong>9:00 AM</strong></span>
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl bg-[#EAF8DF] px-4 py-2.5 text-xs font-black text-[#1B7A1A] border border-[#6DBE45]/30 shadow-2xs">
                    <Calendar className="h-4 w-4 text-[#6DBE45]" />
                    <span>18 Days Remaining of 22</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => triggerToast("Subscription renewed for another 30 days!")}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#6DBE45] px-6 py-3 text-xs font-black text-white shadow-[0_8px_25px_rgba(109,190,69,0.35)] transition-all hover:bg-[#5da73a] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    <Repeat className="h-4 w-4" /> Quick Renew
                  </button>

                  <button
                    onClick={() => triggerToast("Subscription paused for tomorrow's delivery.")}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white/80 backdrop-blur-md px-5 py-3 text-xs font-black text-slate-700 shadow-2xs transition-all hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    <Pause className="h-4 w-4 text-slate-500" /> Pause Tomorrow
                  </button>

                  <Link
                    to="/dashboard/calendar"
                    className="inline-flex items-center gap-1.5 text-xs font-black text-[#1B7A1A] hover:underline px-2 py-1"
                  >
                    View Calendar <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column Image: Floating Premium Plan Image */}
              <div className="relative flex justify-center items-center">
                <div className="relative z-10 p-2">
                  <img
                    src="/images/plan.png"
                    alt="FrootBoost Premium Plan"
                    className="h-44 sm:h-56 w-auto object-contain drop-shadow-xl animate-float transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/dashboard_fruits_banner.png";
                    }}
                  />
                </div>

                {/* Micro floating fruit badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-black text-slate-800 shadow-lg border border-white/60"
                >
                  <span className="text-base">🍎</span> 100% Organic
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-black text-[#1B7A1A] shadow-lg border border-white/60"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#6DBE45]" /> Superfresh
                </motion.div>
              </div>

            </div>

            {/* ─── SUBSCRIPTION PROGRESS BAR ─────────────────────────── */}
            <div className="mt-8 pt-6 border-t border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Subscription Progress</span>
                  <span className="text-xs font-extrabold text-[#1B7A1A] bg-[#EAF8DF] px-2.5 py-0.5 rounded-full border border-[#6DBE45]/20">
                    18 / 22 Days Completed
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-extrabold text-slate-500">
                  <span>Completion: <strong className="text-slate-900">81.8%</strong></span>
                  <span>Estimated Renewal: <strong className="text-[#1B7A1A]">Aug 23, 2026</strong></span>
                </div>
              </div>

              {/* Animated Progress Bar Container */}
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-200/80 p-0.5 border border-slate-200">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "81.8%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#6DBE45] via-[#5FAE2E] to-[#1B7A1A] shadow-[0_0_12px_rgba(109,190,69,0.5)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 shimmer" />
                </motion.div>
              </div>
            </div>

          </div>
        </Reveal>

        {/* ─── 3. TODAY'S DELIVERY CARD (REDESIGNED) ────────────────── */}
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[24px] border border-[#ECECEC] bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.02)]">
            
            {/* Top Bar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1B7A1A]">Daily Desk Delivery</span>
                <h2 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                  Today's Fruit Box Content
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF8DF] px-4 py-1.5 text-xs font-black text-[#1B7A1A] border border-[#6DBE45]/30">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6DBE45] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6DBE45]" />
                  </span>
                  Truck Status: In Transit
                </span>
              </div>
            </div>

            <div className="mt-6 grid lg:grid-cols-[1fr_260px] gap-6 items-center">
              
              {/* Left Column: Fruit Items Grid */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Included seasonal items & nuts in today's box:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {todaysFruitItems.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="group flex flex-col justify-between rounded-[20px] border border-slate-200/80 bg-[#FCFBF7] p-3.5 shadow-xs transition-all hover:bg-white hover:border-[#6DBE45]/40 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{item.emoji}</span>
                        <span className="text-[10px] font-black text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                          {item.calories}
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs font-black text-slate-900 leading-tight">{item.name}</p>
                        <p className="text-[10px] font-semibold text-[#1B7A1A] mt-0.5">{item.badge}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Details Bar */}
                <div className="mt-5 grid sm:grid-cols-4 gap-3">
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
                    <p className="text-[10px] font-black uppercase text-slate-400">Delivery Time</p>
                    <p className="text-xs font-black text-slate-900 mt-0.5">9:00 AM - 9:30 AM</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
                    <p className="text-[10px] font-black uppercase text-slate-400">Location Desk</p>
                    <p className="text-xs font-black text-slate-900 mt-0.5 truncate">Nimbus Labs, Fl 4</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
                    <p className="text-[10px] font-black uppercase text-slate-400">Driver Partner</p>
                    <p className="text-xs font-black text-[#1B7A1A] mt-0.5">Rajesh M. (4.9 ★)</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
                    <p className="text-[10px] font-black uppercase text-slate-400">Expected Arrival</p>
                    <p className="text-xs font-black text-amber-600 mt-0.5">22 Mins Away</p>
                  </div>
                </div>

              </div>

              {/* Right Column: Fruit Box Image (using image1 / Image1.jpeg) */}
              <div className="flex flex-col items-center justify-center rounded-[22px] bg-gradient-to-br from-[#EAF8DF]/60 via-[#FCFBF7] to-[#FFF8EA] p-4 border border-[#6DBE45]/20">
                <div className="relative p-2">
                  <img
                    src="/images/Image1.jpeg"
                    alt="Fresh Fruit Box Illustration"
                    className="h-44 sm:h-52 w-auto object-contain rounded-2xl shadow-md transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/dashboard_fruit_box.png";
                    }}
                  />
                </div>
                <button
                  onClick={() => triggerToast("Live GPS tracking opened. Driver is on Floor 2 elevator.")}
                  className="mt-3 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-black text-white transition-all hover:bg-slate-800 active:scale-95 shadow-xs flex items-center justify-center gap-2"
                >
                  <Truck className="h-4 w-4 text-[#6DBE45]" /> Track Delivery Live
                </button>
              </div>

            </div>

          </div>
        </Reveal>

        {/* ─── 4. QUICK ACTIONS GRID ─────────────────────────────────── */}
        <Reveal delay={0.15}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Quick Subscription Actions
              </h2>
              <span className="text-xs font-bold text-slate-400">1-Tap Controls</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {quickActions.map((act) => {
                const Icon = act.icon;
                return (
                  <button
                    key={act.label}
                    onClick={() => triggerToast(`Action '${act.label}' processed!`)}
                    className="group flex flex-col items-center justify-center text-center rounded-[22px] border border-[#ECECEC] bg-white p-4 shadow-[0_8px_25px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#6DBE45]/40 cursor-pointer"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${act.color} shadow-xs transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="mt-3 text-xs font-black text-slate-900 group-hover:text-[#1B7A1A]">
                      {act.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ─── 5. HEALTH INSIGHTS (NEW SECTION) ──────────────────────── */}
        <Reveal delay={0.2}>
          <div className="rounded-[24px] border border-[#ECECEC] bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.02)]">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#1B7A1A]">
                  <Activity className="h-3.5 w-3.5 text-[#6DBE45]" /> Personalized Nutrition Metrics
                </span>
                <h2 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                  Health & Vitality Insights 🍏
                </h2>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-black text-[#1B7A1A] bg-[#EAF8DF] px-3 py-1 rounded-full border border-[#6DBE45]/20">
                <Star className="h-3.5 w-3.5 fill-[#6DBE45] text-[#6DBE45]" /> Top 5% Healthy Subscriber
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className="rounded-[20px] bg-[#FCFBF7] p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🍎</span>
                  <span className="text-[10px] font-black text-[#1B7A1A] bg-[#EAF8DF] px-2 py-0.5 rounded-full">Delivered</span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-black text-slate-900">203</p>
                  <p className="text-xs font-bold text-slate-500">Fruits Consumed</p>
                </div>
              </div>

              <div className="rounded-[20px] bg-[#FCFBF7] p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🌰</span>
                  <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Brain Power</span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-black text-slate-900">145</p>
                  <p className="text-xs font-bold text-slate-500">Soaked Almonds</p>
                </div>
              </div>

              <div className="rounded-[20px] bg-[#FCFBF7] p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🍊</span>
                  <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Immunity</span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-black text-slate-900">1,250mg</p>
                  <p className="text-xs font-bold text-slate-500">Vitamin C Gained</p>
                </div>
              </div>

              <div className="rounded-[20px] bg-[#FCFBF7] p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🔥</span>
                  <span className="text-[10px] font-black text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">Streak</span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-black text-slate-900">14 Days</p>
                  <p className="text-xs font-bold text-slate-500">Healthy Habits Streak</p>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-1 rounded-[20px] bg-gradient-to-br from-[#6DBE45] to-[#1B7A1A] p-4 text-white shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-white/80">Wellness Score</span>
                  <Award className="h-5 w-5 text-amber-300" />
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-black text-white">96 / 100</p>
                  <p className="text-xs font-semibold text-white/80">Optimal Vitality Level</p>
                </div>
              </div>

            </div>

          </div>
        </Reveal>

        {/* ─── 6. ACHIEVEMENT BANNER (USING image3) ────────────────── */}
        <Reveal delay={0.25}>
          <div className="relative overflow-hidden rounded-[24px] border border-[#FFB84D]/40 bg-gradient-to-r from-[#FFF8EA] via-[#FCFBF7] to-[#EAF8DF] p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-6 group">
            
            <div className="flex items-start gap-4 max-w-xl">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-900 shadow-md ring-4 ring-amber-100">
                <Crown className="h-7 w-7" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-0.5 text-[10px] font-black text-amber-800 uppercase tracking-wider mb-1">
                  🏆 Annual Wellness Milestone
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  You've enjoyed 47 Fresh Fruit Boxes this year!
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                  That's over <strong>329 seasonal fruits</strong> and <strong>235 soaked almonds</strong> consumed. Thank you for making health a daily priority with FrootBoost.
                </p>
              </div>
            </div>

            {/* Right Side Image (using image3.png) */}
            <div className="shrink-0 relative">
              <div className="relative h-28 sm:h-36 w-36 sm:w-44 overflow-hidden rounded-2xl border-2 border-white shadow-xl transition-transform duration-500 group-hover:scale-105">
                <img
                  src="/images/image3.png"
                  alt="Healthy Fruit Bowl Milestone"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/dashboard_fruit_bowl.png";
                  }}
                />
              </div>
              <span className="absolute -bottom-2 -left-2 rounded-xl bg-white px-3 py-1 text-[10px] font-black text-[#1B7A1A] shadow-md border border-slate-100">
                ⭐ Certified Healthy
              </span>
            </div>

          </div>
        </Reveal>

      </div>
    </DashboardLayout>
  );
}
