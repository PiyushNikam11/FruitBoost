import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Bell,
  CheckCircle2,
  Save,
  Building,
  Phone,
  Mail,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Reveal } from "@/components/Reveal";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("Aditya Rao");
  const [email, setEmail] = useState("aditya.rao@nimbuslabs.io");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [company, setCompany] = useState("Nimbus Labs");
  const [officeLocation, setOfficeLocation] = useState("Tower A, Floor 4, Reception Desk");
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [extraAlmonds, setExtraAlmonds] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-4xl">
        
        {/* Page Header */}
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A] border border-[#6DBE45]/20">
              <Sliders className="h-3.5 w-3.5 text-[#6DBE45]" /> Preference Center
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Account & Subscription Settings
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              Manage your personal info, office delivery address, dietary preferences, and notifications.
            </p>
          </div>
        </Reveal>

        {/* Save Toast Notification */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-2xl bg-[#EAF8DF] p-4 border border-[#6DBE45]/30 text-[#1B7A1A] font-black text-xs shadow-xs"
          >
            <CheckCircle2 className="h-5 w-5 text-[#6DBE45]" />
            <span>Settings saved successfully! Your upcoming deliveries will reflect these updates.</span>
          </motion.div>
        )}

        {/* Form Settings Cards */}
        <form onSubmit={handleSave} className="space-y-6">

          {/* Profile Card */}
          <Reveal delay={0.05}>
            <div className="rounded-[24px] border border-[#ECECEC] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.02)]">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
                <User className="h-4 w-4 text-[#6DBE45]" /> Member Profile
              </h2>

              <div className="mt-5 grid sm:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <label className="text-slate-500 block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] pl-9 pr-3 py-2.5 outline-none focus:border-[#6DBE45] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] pl-9 pr-3 py-2.5 outline-none focus:border-[#6DBE45] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Phone Number (OTP verified)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] pl-9 pr-3 py-2.5 outline-none focus:border-[#6DBE45] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Subscription Status</label>
                  <div className="flex items-center gap-2 rounded-xl bg-[#EAF8DF] px-3 py-2.5 text-[#1B7A1A] font-black">
                    <ShieldCheck className="h-4 w-4 text-[#6DBE45]" />
                    <span>Monthly Premium (Active)</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Office Delivery Address */}
          <Reveal delay={0.1}>
            <div className="rounded-[24px] border border-[#ECECEC] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.02)]">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
                <MapPin className="h-4 w-4 text-[#6DBE45]" /> Office Delivery Location
              </h2>

              <div className="mt-5 grid sm:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <label className="text-slate-500 block mb-1">Company Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] pl-9 pr-3 py-2.5 outline-none focus:border-[#6DBE45] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Floor & Reception Desk</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={officeLocation}
                      onChange={(e) => setOfficeLocation(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#FCFBF7] pl-9 pr-3 py-2.5 outline-none focus:border-[#6DBE45] focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Preferences & Notifications */}
          <Reveal delay={0.15}>
            <div className="rounded-[24px] border border-[#ECECEC] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.02)]">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
                <Bell className="h-4 w-4 text-[#6DBE45]" /> Preferences & Alerts
              </h2>

              <div className="mt-5 space-y-3 text-xs font-bold">
                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#ECECEC] cursor-pointer hover:bg-slate-50">
                  <div>
                    <p className="text-slate-900">WhatsApp Daily Delivery Tracker</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Receive real-time ETA & driver status on WhatsApp every morning at 8:30 AM.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyWhatsapp}
                    onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                    className="h-4 w-4 accent-[#6DBE45]"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#ECECEC] cursor-pointer hover:bg-slate-50">
                  <div>
                    <p className="text-slate-900">Email Invoices & Renewal Summaries</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Get instant tax invoice PDFs sent to your work email on payment completion.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.checked)}
                    className="h-4 w-4 accent-[#6DBE45]"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#ECECEC] cursor-pointer hover:bg-slate-50">
                  <div>
                    <p className="text-slate-900">Include Daily Soaked Almonds</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Includes 5 brain-boosting soaked almonds in every daily fruit box.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={extraAlmonds}
                    onChange={(e) => setExtraAlmonds(e.target.checked)}
                    className="h-4 w-4 accent-[#6DBE45]"
                  />
                </label>
              </div>
            </div>
          </Reveal>

          {/* Submit Action */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#6DBE45] px-6 py-3 text-xs font-black text-white shadow-[0_6px_20px_rgba(109,190,69,0.35)] transition-all hover:bg-[#5da73a] active:scale-95 cursor-pointer"
            >
              <Save className="h-4 w-4" /> Save All Preferences
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
