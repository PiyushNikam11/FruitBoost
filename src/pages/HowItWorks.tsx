import { motion } from "framer-motion";
import {
  UserPlus,
  Smartphone,
  Building2,
  MapPin,
  PackageCheck,
  CreditCard,
  ReceiptText,
  Truck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, SectionHeading } from "@/components/Reveal";
import CTASection from "@/components/CTASection";

const journeySteps = [
  {
    id: "01",
    badge: "Step 1",
    title: "Register Account",
    description: "Create your FrootBoost account in under 60 seconds with basic details.",
    icon: UserPlus,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "02",
    badge: "Step 2",
    title: "Verify Mobile OTP",
    description: "Instant SMS OTP verification to keep your account secure.",
    icon: Smartphone,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "03",
    badge: "Step 3",
    title: "Choose Company",
    description: "Select your company from our verified corporate office network.",
    icon: Building2,
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    id: "04",
    badge: "Step 4",
    title: "Select Office Location",
    description: "Specify your office building, floor, or reception desk for exact delivery.",
    icon: MapPin,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "05",
    badge: "Step 5",
    title: "Select Subscription Plan",
    description: "Pick Weekly or Monthly fruit plans tailored for you or your team.",
    icon: PackageCheck,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "06",
    badge: "Step 6",
    title: "Secure Online Payment",
    description: "Pay conveniently via UPI, Credit/Debit Card, or Net Banking.",
    icon: CreditCard,
    gradient: "from-emerald-600 to-green-700",
  },
  {
    id: "07",
    badge: "Step 7",
    title: "Instant GST Invoice",
    description: "Automated GST invoice delivered to your email and dashboard.",
    icon: ReceiptText,
    gradient: "from-green-600 to-lime-600",
  },
  {
    id: "08",
    badge: "Step 8",
    title: "Daily Office Desk Delivery",
    description: "Freshly cut, organic fruit boxes delivered to your desk every morning.",
    icon: Truck,
    gradient: "from-[#1B7A1A] to-emerald-600",
  },
];

export default function HowItWorks() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#FCFBF7] min-h-screen"
    >
      {/* ─── HERO SECTION WITH PRODUCT IMAGE ───────────────────────── */}
      <section className="relative py-8 sm:py-12 bg-gradient-to-b from-white via-[#f6fcf5] to-[#FCFBF7]">
        <div className="container-x relative z-10 px-4 sm:px-6">
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Column */}
            <Reveal>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#6DBE45]/20 bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A]">
                  <Sparkles className="h-3.5 w-3.5 text-[#6DBE45]" /> Simple 8-Step Process
                </span>

                <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  From Sign-Up To Fresh Fruit In <span className="text-[#1B7A1A]">8 Simple Steps</span>
                </h1>

                <p className="mt-3 text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed max-w-xl">
                  No complex setups or long forms. Set your office location, select your plan, and enjoy fresh fruits delivered directly to your desk every morning.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#6DBE45] px-6 py-3 text-xs font-black text-white shadow-[0_6px_20px_rgba(109,190,69,0.35)] transition-all hover:bg-[#5da73a] active:scale-95"
                  >
                    Start In 2 Minutes <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Right Column Image Card */}
            <Reveal delay={0.1}>
              <div className="relative flex justify-center items-center">
                <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#EAF8DF] to-[#FFF8EA] p-4 border border-[#6DBE45]/20 shadow-md">
                  <img
                    src="/images/image3.png"
                    alt="FruitBoost Journey Box"
                    className="h-52 sm:h-64 w-auto object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/dashboard_fruit_bowl.png";
                    }}
                  />
                  <div className="mt-3 flex items-center justify-between text-xs font-black text-slate-900 bg-white/90 p-2.5 rounded-xl border border-white/80">
                    <span className="flex items-center gap-1 text-[#1B7A1A]"><ShieldCheck className="h-4 w-4 text-[#6DBE45]" /> Verified Desk Delivery</span>
                    <span>Mon – Sat</span>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

        </div>
      </section>

      {/* ─── 8-STEP JOURNEY GRID ───────────────────────────────────── */}
      <section className="section relative py-8 sm:py-12 bg-white">
        <div className="container-x relative z-10 px-4 sm:px-6">
          
          <SectionHeading tag="Step by Step" title="Your FrootBoost Journey" subtitle="Building a daily healthy snacking habit in 8 effortless steps." />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Reveal key={step.id} delay={(index % 4) * 0.05}>
                  <div className="group relative rounded-[22px] border border-[#ECECEC] bg-[#FCFBF7] p-5 shadow-xs transition-all hover:border-[#6DBE45]/40 hover:bg-white hover:-translate-y-1">
                    
                    <div className="flex items-center justify-between">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-xs`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-black text-[#1B7A1A] bg-[#EAF8DF] px-2.5 py-0.5 rounded-full border border-[#6DBE45]/20">
                        {step.badge}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-base font-black text-slate-900">{step.title}</h3>
                      <p className="mt-1 text-xs font-semibold text-slate-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom Illustration Card */}
          <Reveal delay={0.2}>
            <div className="mt-10 rounded-[24px] border border-[#6DBE45]/30 bg-gradient-to-r from-[#EAF8DF]/60 via-white to-[#FFF8EA] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="flex items-center gap-4">
                <img
                  src="/images/Image1.jpeg"
                  alt="Daily Fruit Delivery Box"
                  className="h-16 w-16 object-cover rounded-2xl border border-white shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/dashboard_fruit_box.png";
                  }}
                />
                <div>
                  <h3 className="text-base font-black text-slate-900">Ready To Receive Your First Fresh Box?</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Registration takes under 2 minutes. Start your healthy routine today.</p>
                </div>
              </div>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#6DBE45] px-6 py-3 text-xs font-black text-white shadow-[0_6px_20px_rgba(109,190,69,0.3)] transition-all hover:bg-[#5da73a] active:scale-95 shrink-0"
              >
                Start Subscription <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

        </div>
      </section>

      <CTASection />
    </motion.div>
  );
}
