import { motion } from "framer-motion";
import { Download, Repeat, FileText, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Reveal } from "@/components/Reveal";
import { invoices } from "@/data/mock";

const summary = [
  { label: "Total spent", value: "₹6,897", icon: FileText, color: "bg-green-100 text-brand-green" },
  { label: "Paid invoices", value: "3", icon: CheckCircle2, color: "bg-yellow-100 text-brand-yellow" },
  { label: "Next renewal", value: "28 Aug", icon: Clock, color: "bg-red-100 text-brand-red" },
];

export default function Invoices() {
  return (
    <DashboardLayout>
      <Reveal>
        <div className="mb-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3.5 py-1.5 text-xs font-bold text-brand-green">Billing</div>
          <h1 className="h2 mt-3">Your Invoices</h1>
          <p className="body mt-2">Download, review, and renew your packages.</p>
        </div>
      </Reveal>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        {summary.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="card-hover p-6 border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className={`grid h-12 w-12 place-items-center rounded-2xl ${s.color}`}><s.icon className="h-5 w-5" /></div>
              <p className="mt-4 text-[13px] font-bold uppercase tracking-wide text-slate-400">{s.label}</p>
              <p className="mt-1 font-bold text-2xl tracking-tight text-slate-900" style={{ fontFamily: "Sora, Inter, sans-serif" }}>{s.value}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Table */}
      <Reveal delay={0.15}>
        <div className="card mt-6 overflow-hidden border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] uppercase tracking-widest text-slate-400 bg-slate-50/50">
                  <th className="px-6 py-4 font-bold">Invoice</th>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold">Amount</th>
                  <th className="hidden px-6 py-4 font-bold sm:table-cell">Transaction</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 text-right font-bold">PDF</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-slate-50 transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-[13px] font-bold text-slate-900">{inv.number}</td>
                    <td className="px-6 py-4 text-[13px] font-medium text-slate-600">{inv.date}</td>
                    <td className="px-6 py-4 text-[13px] font-bold text-slate-900">₹{inv.amount}</td>
                    <td className="hidden px-6 py-4 font-mono text-[13px] text-slate-500 sm:table-cell">{inv.transactionId}</td>
                    <td className="px-6 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide border ${inv.status === "Paid" ? "bg-green-50 border-green-100 text-brand-green" : "bg-red-50 border-red-100 text-brand-red"}`}><CheckCircle2 className="h-3.5 w-3.5" /> {inv.status}</span></td>
                    <td className="px-6 py-4 text-right"><button className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 py-2 text-[13px] font-bold text-slate-600 transition-all hover:border-brand-green hover:text-brand-green hover:shadow-sm"><Download className="h-4 w-4" /> PDF</button></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Renew CTA */}
      <Reveal delay={0.25}>
        <div className="relative mt-5 flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl bg-brand-gradient-warm p-6 text-white shadow-floatR sm:flex-row sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-yellow/20 blur-3xl" />
          <div className="relative"><h3 className="text-lg font-bold">Need more boxes?</h3><p className="mt-1 text-sm text-white/70">Renew or upgrade your package in one click.</p></div>
          <Link to="/checkout" className="btn-white relative"><Repeat className="h-4 w-4" /> Renew package</Link>
        </div>
      </Reveal>
    </DashboardLayout>
  );
}
