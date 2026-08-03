import { motion } from "framer-motion";
import { Cookie, ShieldCheck, CheckCircle2, Mail, ArrowLeft, Settings, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";

export default function CookiesPolicy() {
  const lastUpdated = "August 03, 2026";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="bg-[#FCFBF7] min-h-screen">
      
      {/* ─── HEADER ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6fcf5] to-[#FCFBF7] py-8 sm:py-12 border-b border-[#ECECEC]">
        <div className="container-x px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6DBE45]/20 bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A]">
              <Cookie className="h-3.5 w-3.5 text-[#6DBE45]" /> Cookie Preferences
            </span>

            <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Cookies Policy
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 max-w-lg mx-auto">
              How FrootBoost uses cookies to secure sessions and personalize your subscription experience.
            </p>
            <p className="mt-2 text-[11px] font-bold text-slate-400">Last Updated: {lastUpdated}</p>
          </Reveal>
        </div>
      </section>

      {/* ─── POLICY CONTENT ─────────────────────────────────────── */}
      <section className="section py-8 sm:py-12">
        <div className="container-x max-w-4xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-[28px] border border-[#ECECEC] bg-white p-6 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] space-y-8 text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
              
              {/* Introduction */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Info className="h-4 w-4 text-[#6DBE45]" /> 1. What Are Cookies?
                </h2>
                <p className="mt-3">
                  Cookies are small text files placed on your browser or device when you visit websites. FrootBoost uses cookies and local storage technology to make our platform work efficiently, keep your account session secure, and remember your office desk preferences.
                </p>
              </div>

              {/* Types of Cookies We Use */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Cookie className="h-4 w-4 text-[#6DBE45]" /> 2. Types of Cookies We Use
                </h2>
                <ul className="mt-3 space-y-3">
                  <li className="rounded-2xl bg-[#FCFBF7] p-4 border border-[#ECECEC]">
                    <p className="font-black text-slate-900">Essential Session Cookies (Strictly Necessary)</p>
                    <p className="text-slate-500 mt-1">Required for maintaining your logged-in state, dashboard authentication, and secure checkout processing.</p>
                  </li>
                  <li className="rounded-2xl bg-[#FCFBF7] p-4 border border-[#ECECEC]">
                    <p className="font-black text-slate-900">Preference & Functionality Cookies</p>
                    <p className="text-slate-500 mt-1">Saves your preferred delivery desk location, notification settings, and dashboard layout preferences.</p>
                  </li>
                  <li className="rounded-2xl bg-[#FCFBF7] p-4 border border-[#ECECEC]">
                    <p className="font-black text-slate-900">Performance & Analytics Cookies</p>
                    <p className="text-slate-500 mt-1">Helps us measure page load speeds, error rates, and popular fruit box selections to optimize performance.</p>
                  </li>
                </ul>
              </div>

              {/* Managing Cookies */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Settings className="h-4 w-4 text-[#6DBE45]" /> 3. Managing Your Cookie Settings
                </h2>
                <p className="mt-3">
                  You can control or disable cookies through your web browser settings at any time. Note that disabling essential cookies may impact your ability to log in to your FrootBoost dashboard or manage active fruit subscriptions.
                </p>
              </div>

              {/* Support Contact */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-black text-slate-900">Have questions regarding cookie preferences?</p>
                  <p className="text-xs text-slate-500">Contact our technical team at hello@fruitboost.in</p>
                </div>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-[#6DBE45] px-5 py-2.5 text-xs font-black text-white shadow-xs hover:bg-[#5da73a] shrink-0">
                  <Mail className="h-4 w-4" /> Contact Support
                </Link>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

    </motion.div>
  );
}
