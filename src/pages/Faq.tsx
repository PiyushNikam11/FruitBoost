import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight, Search, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { faqs } from "@/data/mock";

const categories = ["All", "Delivery", "Subscription", "Fruits & Health", "Payment"];

export default function Faq() {
  const [open, setOpen] = useState<string | null>(faqs[0].id);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = faqs.filter((f) => {
    const matchesQuery =
      f.question.toLowerCase().includes(query.toLowerCase()) ||
      f.answer.toLowerCase().includes(query.toLowerCase());
    return matchesQuery;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="bg-[#FCFBF7] min-h-screen">
      
      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6fcf5] to-[#FCFBF7] py-8 sm:py-12">
        <div className="container-x px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6DBE45]/20 bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A]">
              <HelpCircle className="h-3.5 w-3.5 text-[#6DBE45]" /> Frequently Asked Questions
            </span>

            <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Got Questions? <span className="text-[#1B7A1A]">We Have Answers</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 max-w-lg mx-auto">
              Everything you need to know about our daily office fruit deliveries, subscription plans, and hygiene standards.
            </p>
          </Reveal>

          {/* Search Bar */}
          <Reveal delay={0.05}>
            <div className="relative mx-auto mt-6 max-w-lg">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions (e.g. delivery, pause, cancel)..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-xs font-semibold text-slate-900 shadow-xs outline-none focus:border-[#6DBE45] focus:ring-2 focus:ring-[#6DBE45]/20"
              />
            </div>
          </Reveal>

          {/* Category Filter Pills */}
          <Reveal delay={0.1}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-black transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#6DBE45] text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* ─── ACCORDION LIST SECTION ───────────────────────────────── */}
      <section className="section py-8 sm:py-12">
        <div className="container-x px-4 sm:px-6">
          
          <div className="mx-auto max-w-3xl space-y-3">
            {filtered.map((f, i) => {
              const isOpen = open === f.id;
              return (
                <Reveal key={f.id} delay={i * 0.03}>
                  <div
                    className={`rounded-[22px] border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-[#6DBE45] bg-white shadow-md ring-2 ring-[#6DBE45]/15"
                        : "border-[#ECECEC] bg-white hover:border-slate-300"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : f.id)}
                      className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer"
                    >
                      <span className="flex items-center gap-3 text-xs sm:text-sm font-black text-slate-900">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#EAF8DF] text-xs font-black text-[#1B7A1A]">
                          {i + 1}
                        </span>
                        {f.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#6DBE45] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 pl-14 pt-1 border-t border-slate-100 text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                            {f.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </Reveal>
              );
            })}

            {filtered.length === 0 && (
              <div className="rounded-[22px] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-400 text-xs font-semibold">
                No matching questions found for "{query}". Try a different keyword or contact our support team.
              </div>
            )}
          </div>

          {/* ─── BOTTOM SUPPORT HELP CARD ──────────────────────────── */}
          <Reveal delay={0.15}>
            <div className="mx-auto mt-10 max-w-3xl rounded-[28px] border border-[#6DBE45]/30 bg-gradient-to-r from-[#EAF8DF] via-white to-[#FFF8EA] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#6DBE45] text-white shadow-xs font-black">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Still Have Questions?</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">Our support team is available on WhatsApp & Email to assist you.</p>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#6DBE45] px-6 py-3 text-xs font-black text-white shadow-[0_6px_20px_rgba(109,190,69,0.35)] transition-all hover:bg-[#5da73a] active:scale-95 shrink-0"
              >
                Contact Support <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

        </div>
      </section>

    </motion.div>
  );
}
