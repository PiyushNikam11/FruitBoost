import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Apple,
  History,
  Repeat,
  CreditCard,
  LogOut,
  Bell,
  Search,
  Settings as SettingsIcon,
  Calendar as CalendarIcon,
  Sparkles,
  Menu as MenuIcon,
  X,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Globe,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid, isNew: false },
  { label: "Today's Box", to: "/dashboard/menu", icon: Apple, isNew: false },
  { label: "Delivery History", to: "/dashboard/history", icon: History, isNew: false },
  { label: "Subscription", to: "/dashboard/subscription", icon: Repeat, isNew: false },
  { label: "Calendar", to: "/dashboard/calendar", icon: CalendarIcon, isNew: true },
  { label: "Invoices", to: "/dashboard/invoices", icon: CreditCard, isNew: false },
  { label: "Settings", to: "/dashboard/settings", icon: SettingsIcon, isNew: false },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-slate-900 font-sans antialiased selection:bg-[#6DBE45]/20 selection:text-[#1B7A1A]">
      <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-6 py-4 sm:py-6">
        <div className="grid gap-6 lg:grid-cols-[270px_1fr] items-start">
          
          {/* ─── LEFT SIDEBAR (FIXED / STICKY) ────────────────────────── */}
          <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-48px)] flex flex-col z-30">
            <div className="relative flex flex-col justify-between overflow-y-auto rounded-[24px] border border-[#ECECEC] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.03)] h-full hide-scrollbar">
              
              <div>
                {/* Brand Header */}
                <div className="flex items-center justify-between px-1">
                  <Link to="/" className="flex items-center gap-3 group">
                    <img
                      src="/images/logo.png"
                      alt="FrootBoost Logo"
                      className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  {/* Mobile Menu Toggle Button */}

                  {/* Mobile Menu Toggle Button */}
                  <button
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-600 transition-all hover:bg-slate-50 lg:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation"
                  >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                  </button>
                </div>

                {/* Divider */}
                <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent" />

                {/* Navigation Menu */}
                <nav className={`flex flex-col gap-1.5 ${mobileMenuOpen ? "block" : "hidden lg:flex"}`}>
                  <div className="mb-1.5 px-3 text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Main Menu
                  </div>
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group relative flex items-center justify-between rounded-[16px] px-3.5 py-3 text-xs font-black transition-all duration-200 ${
                          isActive
                            ? "bg-[#6DBE45] text-white shadow-[0_8px_20px_rgba(109,190,69,0.3)]"
                            : "text-slate-600 hover:bg-[#EAF8DF]/60 hover:text-[#1B7A1A]"
                        }`}
                      >
                        {/* Active Left Indicator Bar */}
                        {isActive && (
                          <div
                            className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-white shadow-xs"
                          />
                        )}

                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-[#6DBE45]/15 group-hover:text-[#6DBE45]"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="tracking-tight">{item.label}</span>
                        </div>

                        {/* New Badge */}
                        {item.isNew && (
                          <span
                            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black tracking-wider uppercase ${
                              isActive
                                ? "bg-white/25 text-white"
                                : "bg-[#FFB84D] text-slate-900 shadow-2xs"
                            }`}
                          >
                            <Sparkles className="h-2.5 w-2.5" /> NEW
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Sidebar: Circular Fruit Image & User Status */}
              <div className={`mt-8 pt-4 border-t border-slate-100 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
                
                {/* Circular Healthy Fruit Bowl Card using image3 */}
                <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#EAF8DF] via-[#FCFBF7] to-[#FFF8EA] p-3 border border-[#6DBE45]/20 shadow-2xs group mb-4">
                  <div className="flex items-center gap-3">
                    {/* Circular Cropped Image3 */}
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#6DBE45]/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <img
                        src="/images/image3.png"
                        alt="Fresh Fruit Bowl"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/dashboard_fruit_bowl.png";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-[10px] font-black text-[#1B7A1A] uppercase tracking-wider">
                        <CheckCircle2 className="h-3 w-3 text-[#6DBE45]" /> Daily Fresh
                      </div>
                      <p className="text-xs font-extrabold text-slate-900 truncate">100% Organic Box</p>
                      <p className="text-[10px] font-semibold text-slate-500 truncate">Sourced local farms</p>
                    </div>
                  </div>
                </div>

                {/* Back to Website Link */}
                <Link
                  to="/"
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-slate-700 transition-all duration-200 hover:bg-[#EAF8DF] hover:text-[#1B7A1A] mb-1"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="h-4 w-4 text-[#6DBE45]" />
                    <span>Back to Website</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                </Link>

                {/* Logout Button */}
                <Link
                  to="/login"
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                >
                  <div className="flex items-center gap-2.5">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                </Link>
              </div>

            </div>
          </aside>

          {/* ─── MAIN CONTENT CONTAINER ───────────────────────────────── */}
          <div className="flex flex-col gap-6 min-w-0">

            {/* ─── HEADER (REDESIGNED PREMUM HEADER) ─────────────────── */}
            <header className="sticky top-4 z-20 rounded-[24px] border border-[#ECECEC] bg-white/90 backdrop-blur-md p-4 sm:px-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                
                {/* Left Header: Greeting & Profile Info */}
                <div className="flex items-center gap-3.5">
                  {/* Profile Avatar */}
                  <div className="relative shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6DBE45] to-[#1B7A1A] text-white font-black text-lg shadow-[0_6px_16px_rgba(109,190,69,0.35)] ring-2 ring-white">
                      AR
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#6DBE45] ring-2 ring-white">
                      <ShieldCheck className="h-2.5 w-2.5 text-white" />
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-400">Good Morning 👋</span>
                      {/* Subscription Badge */}
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF8DF] px-2.5 py-0.5 text-[10px] font-black text-[#1B7A1A] border border-[#6DBE45]/20">
                        <Sparkles className="h-2.5 w-2.5 text-[#6DBE45]" /> Premium Member
                      </span>
                    </div>
                    <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      Aditya Rao
                    </h1>
                  </div>
                </div>

                {/* Right Header: Quick Search, Bell, Settings & Quick Actions */}
                <div className="flex items-center gap-2.5 sm:gap-3 justify-between sm:justify-end">
                  
                  {/* Back to Website Header Button */}
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 sm:px-3.5 py-2 text-xs font-black text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95 shrink-0"
                    title="Return to FrootBoost Website Home"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 text-[#6DBE45]" />
                    <span className="hidden sm:inline">Back to Website</span>
                    <span className="sm:hidden">Website</span>
                  </Link>
                  
                  {/* Quick Search Input */}
                  <div className="relative flex-1 sm:w-64 max-w-xs">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Quick Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-[#FCFBF7] pl-9 pr-8 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-[#6DBE45] focus:bg-white focus:ring-2 focus:ring-[#6DBE45]/20"
                    />
                    <kbd className="hidden sm:inline-flex absolute right-2.5 top-1/2 -translate-y-1/2 items-center rounded-md border border-slate-200 bg-white px-1.5 text-[10px] font-bold text-slate-400 shadow-2xs">
                      ⌘K
                    </kbd>
                  </div>

                  {/* Notification Bell */}
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
                      aria-label="View notifications"
                    >
                      <Bell className="h-4 w-4" />
                      <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6DBE45] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6DBE45]" />
                      </span>
                    </button>

                    {/* Notifications Dropdown */}
                    <AnimatePresence>
                      {showNotifications && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-80 rounded-[20px] border border-slate-200 bg-white p-4 shadow-xl z-50"
                        >
                          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <span className="text-xs font-black text-slate-900">Notifications</span>
                            <span className="text-[10px] font-bold text-[#1B7A1A] bg-[#EAF8DF] px-2 py-0.5 rounded-full">2 New</span>
                          </div>
                          <div className="mt-3 space-y-2.5 text-xs">
                            <div className="rounded-xl bg-[#EAF8DF]/40 p-2.5 border border-[#6DBE45]/20">
                              <p className="font-bold text-slate-900">Today's Box Out For Delivery 🚚</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">Your fresh fruit box with 5 fruits & almonds is on its way!</p>
                            </div>
                            <div className="rounded-xl bg-amber-50/60 p-2.5 border border-amber-100">
                              <p className="font-bold text-slate-900">Monthly Plan Auto-Renew</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">Renewal scheduled for August 23, 2026.</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Settings Icon Link */}
                  <Link
                    to="/dashboard/settings"
                    className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
                    aria-label="Settings"
                  >
                    <SettingsIcon className="h-4 w-4" />
                  </Link>

                </div>

              </div>
            </header>

            {/* Page Content Body */}
            <main>{children}</main>

          </div>

        </div>
      </div>
    </div>
  );
}

