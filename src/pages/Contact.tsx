import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MessageCircle, Send, Facebook, Instagram, Linkedin, Twitter, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("Corporate Subscription Query");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="bg-[#FCFBF7] min-h-screen">
      
      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6fcf5] to-[#FCFBF7] py-8 sm:py-12">
        <div className="container-x px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6DBE45]/20 bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A]">
              <Sparkles className="h-3.5 w-3.5 text-[#6DBE45]" /> We'd Love To Hear From You
            </span>

            <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Let's <span className="text-[#1B7A1A]">Talk Fresh</span> 🍏
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 max-w-lg mx-auto">
              Have questions about corporate plans, office trial boxes, or daily deliveries? Our team is here to help.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── CONTACT SECTION (FORM & CHANNELS - MAP & OFFICE REMOVED) ── */}
      <section className="section py-8 sm:py-12">
        <div className="container-x grid gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_400px]">
          
          {/* LEFT: ENHANCED CONTACT FORM */}
          <Reveal>
            <div className="rounded-[28px] border border-[#ECECEC] bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.02)]">
              <h2 className="text-xl font-black text-slate-900">Send Us A Message</h2>
              <p className="mt-0.5 text-xs font-semibold text-slate-400">Fill out the form below and our team will get back to you within 2 hours.</p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Aditya Rao"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#6DBE45] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="aditya@nimbuslabs.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#6DBE45] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#6DBE45] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      placeholder="Nimbus Labs"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#6DBE45] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">Subject / Inquiry Type</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#6DBE45] focus:bg-white"
                  >
                    <option value="Corporate Subscription Query">Corporate Subscription Query</option>
                    <option value="Free Office Trial Box">Request Free Office Trial Box</option>
                    <option value="Custom Team Plan">Custom Team Plan Enquiry</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your team size, office location, or specific questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-[#6DBE45] focus:bg-white"
                  />
                </div>

                {sent ? (
                  <div className="flex items-center gap-2.5 rounded-2xl bg-[#EAF8DF] px-4 py-3 text-xs font-black text-[#1B7A1A] border border-[#6DBE45]/30">
                    <CheckCircle2 className="h-5 w-5 text-[#6DBE45]" />
                    <span>Thank you! Your message has been sent successfully. Our team will contact you shortly.</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6DBE45] py-3 text-xs font-black text-white shadow-[0_6px_20px_rgba(109,190,69,0.35)] transition-all hover:bg-[#5da73a] active:scale-95 cursor-pointer"
                  >
                    <Send className="h-4 w-4" /> Send Message
                  </button>
                )}
              </form>
            </div>
          </Reveal>

          {/* RIGHT: CONTACT CHANNELS & VISUAL IMAGE CARD (NO MAP/ADDRESS) */}
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-4">
              
              {/* Quick Contact Info Tiles */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                
                {/* Phone Call Card */}
                <div className="rounded-[22px] border border-[#ECECEC] bg-white p-4 shadow-xs flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Phone Support</p>
                    <p className="text-xs font-bold text-[#1B7A1A] mt-0.5">+91 72189 35073</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Mon – Sat: 9:00 AM – 7:00 PM</p>
                  </div>
                </div>

                {/* Email Support Card */}
                <div className="rounded-[22px] border border-[#ECECEC] bg-white p-4 shadow-xs flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF8DF] text-[#1B7A1A]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Email Inquiries</p>
                    <p className="text-xs font-bold text-[#1B7A1A] mt-0.5">hello@fruitboost.in</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Fast response within 2 hours</p>
                  </div>
                </div>

                {/* Working Hours Card */}
                <div className="rounded-[22px] border border-[#ECECEC] bg-white p-4 shadow-xs flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Delivery & Office Hours</p>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">Mon – Sat: 8:00 AM – 8:00 PM</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Sunday Closed</p>
                  </div>
                </div>

              </div>

              {/* 1-Tap Action Buttons */}
              <div className="flex gap-3">
                <a
                  href="https://wa.me/917218935073"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6DBE45] py-3 text-xs font-black text-white shadow-xs transition-all hover:bg-[#5da73a] active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>

                <a
                  href="tel:+917218935073"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-xs font-black text-slate-800 shadow-xs transition-all hover:bg-slate-50 active:scale-95"
                >
                  <Phone className="h-4 w-4 text-[#6DBE45]" /> Call Directly
                </a>
              </div>

              {/* Social Channels Card */}
              <div className="rounded-[22px] border border-[#ECECEC] bg-white p-4 shadow-xs flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">Follow FrootBoost:</span>
                <div className="flex gap-2">
                  {[
                    { icon: Instagram, href: "#", color: "bg-amber-100 text-amber-700" },
                    { icon: Linkedin, href: "#", color: "bg-sky-100 text-sky-700" },
                    { icon: Twitter, href: "#", color: "bg-blue-100 text-blue-700" },
                    { icon: Facebook, href: "#", color: "bg-indigo-100 text-indigo-700" },
                  ].map((s, idx) => (
                    <a
                      key={idx}
                      href={s.href}
                      className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all hover:scale-110 ${s.color}`}
                    >
                      <s.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Visual Showcase Card */}
              <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#EAF8DF] to-[#FFF8EA] p-4 border border-[#6DBE45]/20 text-center">
                <img
                  src="/images/plan.png"
                  alt="FruitBoost Box"
                  className="h-32 w-auto mx-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/dashboard_fruit_bowl.png";
                  }}
                />
                <p className="text-xs font-black text-slate-900 mt-2">Delivering Fresh Habits Every Morning</p>
              </div>

            </div>
          </Reveal>

        </div>
      </section>

    </motion.div>
  );
}
