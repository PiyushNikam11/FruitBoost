import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Leaf,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Why FruitBoost", to: "/why-fruitboost" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Plans", to: "/plans" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

const accountLinks = [
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Subscription", to: "/dashboard/subscription" },
  { label: "Payments", to: "/dashboard/invoices" },
  { label: "Profile", to: "/dashboard/profile" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#13361E] to-[#0F2C19] text-white pt-16 pb-8">
      {/* ─── MAIN FOOTER CONTENT ────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* COLUMN 1: BRANDING & SOCIAL */}
          <div className="flex flex-col items-start lg:pr-8 lg:border-r border-white/15">
            {/* White rounded card for logo */}
            <Link to="/" className="mb-6 inline-block">
              <div className="rounded-[18px] bg-white p-[20px] shadow-xl transition-transform duration-300 hover:scale-105 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="FrootBoost Logo"
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Description */}
            <p className="max-w-[320px] text-[15px] sm:text-[16px] leading-[1.9] text-[#C8E6C9] font-medium">
              Fresh seasonal fruits, soaked almonds, and daily office delivery—thoughtfully packed to help working professionals stay healthy, energized, and productive every day.
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: MessageCircle, href: "https://wa.me/917218935073", label: "WhatsApp" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.08] hover:bg-[#A8E063] hover:text-[#13361E] shadow-md"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="flex flex-col lg:px-6 lg:border-r border-white/15">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-[#A8E063]" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#A8E063]">
                QUICK LINKS
              </h3>
            </div>

            <ul className="flex flex-col space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.label} className="border-b border-white/10 pb-2.5">
                  <Link
                    to={link.to}
                    className="group flex items-center justify-between text-[15px] font-medium text-white/80 transition-all duration-300 hover:text-[#A8E063]"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#A8E063]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: MY ACCOUNT */}
          <div className="flex flex-col lg:px-6 lg:border-r border-white/15">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="h-5 w-5 text-[#A8E063]" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#A8E063]">
                MY ACCOUNT
              </h3>
            </div>

            <ul className="flex flex-col space-y-3.5">
              {accountLinks.map((link) => (
                <li key={link.label} className="border-b border-white/10 pb-2.5">
                  <Link
                    to={link.to}
                    className="group flex items-center justify-between text-[15px] font-medium text-white/80 transition-all duration-300 hover:text-[#A8E063]"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#A8E063]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: SUPPORT */}
          <div className="flex flex-col space-y-5 lg:pl-6">
            <div className="flex items-center gap-2 mb-1">
              <Phone className="h-5 w-5 text-[#A8E063]" />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#A8E063]">
                SUPPORT
              </h3>
            </div>

            {/* Phone Card */}
            <a
              href="tel:+917218935073"
              className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#A8E063]/20 text-[#A8E063] transition-transform group-hover:scale-110">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-white">+91 7218935073</p>
                <p className="text-[13px] font-medium text-white/60">Mon – Sat, 9 AM – 7 PM</p>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:hello@fruitboost.in"
              className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#A8E063]/20 text-[#A8E063] transition-transform group-hover:scale-110">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-white">hello@fruitboost.in</p>
                <p className="text-[13px] font-medium text-white/60">We'll reply within 24 hours</p>
              </div>
            </a>

            {/* Priority Health Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-md mt-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A8E063] text-[#13361E]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white">Your Health. Our Priority.</h4>
                  <p className="text-[13px] leading-relaxed text-white/70 mt-0.5">
                    100% fresh, hygienic, and hand-selected seasonal fruits packed daily.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-2 -right-2 text-3xl opacity-20">🍃</div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM BAR ──────────────────────────────────────────────── */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/15 pt-8 pb-4 md:flex-row text-[14px] font-medium text-white/70">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#A8E063]">
              <Leaf className="h-4 w-4" />
            </span>
            <p>© 2026 FruitBoost. All Rights Reserved.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="transition-colors hover:text-[#A8E063]">Privacy Policy</Link>
            <span className="text-white/20 hidden sm:inline">|</span>
            <Link to="/terms" className="transition-colors hover:text-[#A8E063]">Terms & Conditions</Link>
            <span className="text-white/20 hidden sm:inline">|</span>
            <Link to="/refunds" className="transition-colors hover:text-[#A8E063]">Refund Policy</Link>
            <span className="text-white/20 hidden sm:inline">|</span>
            <Link to="/cookies" className="transition-colors hover:text-[#A8E063]">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
