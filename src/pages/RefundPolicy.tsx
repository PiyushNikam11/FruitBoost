import { motion } from "framer-motion";
import { RefreshCw, CheckCircle2, ShieldCheck, Mail, Phone, ArrowLeft, HeartHandshake, AlertCircle, XCircle, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";

export default function RefundPolicy() {
  const lastUpdated = "August 2026";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="bg-[#FCFBF7] min-h-screen">
      
      {/* ─── HEADER ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6fcf5] to-[#FCFBF7] py-8 sm:py-12 border-b border-[#ECECEC]">
        <div className="container-x px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6DBE45]/20 bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A]">
              <RefreshCw className="h-3.5 w-3.5 text-[#6DBE45]" /> Refund Policy
            </span>

            <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              FrootBoost – Refund Policy
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 max-w-lg mx-auto">
              At FrootBoost, we are committed to delivering fresh, high-quality fruit boxes and soaked almonds to our customers.
            </p>
            <p className="mt-2 text-[11px] font-bold text-[#1B7A1A] bg-[#EAF8DF] inline-block px-3 py-0.5 rounded-full border border-[#6DBE45]/20">
              Last Updated: {lastUpdated}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── POLICY CONTENT ─────────────────────────────────────── */}
      <section className="section py-8 sm:py-12">
        <div className="container-x max-w-4xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-[28px] border border-[#ECECEC] bg-white p-6 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] space-y-8 text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
              
              {/* Preamble / Summary */}
              <div className="bg-[#FCFBF7] p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                <p>
                  This Refund Policy explains when refunds may be issued and how they are processed for FrootBoost subscriptions and orders.
                </p>
              </div>

              {/* 1. General Policy */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <ShieldCheck className="h-4 w-4 text-[#6DBE45]" /> 1. General Policy
                </h2>
                <p className="mt-3">
                  FrootBoost operates on a <strong>subscription-based fresh food delivery model</strong>. Because fruits are freshly sourced, packed, and prepared specifically for each delivery schedule, refunds are limited once a subscription has started.
                </p>
              </div>

              {/* 2. Eligible Refund Cases */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-[#6DBE45]" /> 2. Eligible Refund Cases
                </h2>
                <p className="mt-3 font-bold text-slate-900">A refund may be approved in the following situations:</p>
                <ul className="mt-2 space-y-1.5 list-disc pl-5 font-semibold text-slate-700">
                  <li><strong>Duplicate payment</strong> made for the same order or subscription.</li>
                  <li><strong>Payment deducted but order not confirmed</strong>.</li>
                  <li><strong>Service unavailable</strong> in your delivery area after payment.</li>
                  <li><strong>Subscription could not be activated</strong> due to a technical error on our side.</li>
                  <li><strong>Incorrect amount charged</strong> because of a billing issue.</li>
                </ul>
              </div>

              {/* 3. Non-Refundable Cases */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <XCircle className="h-4 w-4 text-rose-500" /> 3. Non-Refundable Cases
                </h2>
                <p className="mt-3 font-bold text-slate-900">Refunds will generally NOT be provided for:</p>
                <ul className="mt-2 space-y-1.5 list-disc pl-5 font-semibold text-slate-700">
                  <li>Change of mind after subscription activation.</li>
                  <li>Partial usage of a subscription plan.</li>
                  <li>Missed deliveries caused by incorrect address details.</li>
                  <li>Customer unavailability at the delivery location.</li>
                  <li>Delays caused by weather, traffic, strikes, or other circumstances beyond our control.</li>
                  <li>Seasonal variation in fruit types, size, or appearance.</li>
                  <li>Paused or skipped deliveries requested after the daily cutoff time.</li>
                </ul>
              </div>

              {/* 4. Cancellation Before Activation */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <HeartHandshake className="h-4 w-4 text-[#6DBE45]" /> 4. Cancellation Before Activation
                </h2>
                <p className="mt-3">
                  If you request cancellation <strong>before the first scheduled delivery and before the subscription is activated</strong>, you may be eligible for a <strong>full refund</strong>, subject to verification.
                </p>
              </div>

              {/* 5. Quality Concerns */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <AlertCircle className="h-4 w-4 text-[#6DBE45]" /> 5. Quality Concerns
                </h2>
                <p className="mt-3">
                  If you receive a fruit box that is significantly damaged, spoiled, or missing items, please contact us within <strong>24 hours of delivery</strong> with clear photos.
                </p>
                <p className="mt-2 font-bold text-slate-900">After verification, we may provide one of the following remedies:</p>
                <ul className="mt-1 space-y-1 list-disc pl-5 font-semibold text-slate-700">
                  <li>Replacement of the affected delivery</li>
                  <li>Credit toward a future delivery</li>
                  <li>Partial refund for the affected items</li>
                </ul>
                <p className="mt-2 text-slate-500 italic">
                  FrootBoost reserves the right to determine the appropriate resolution based on the evidence provided.
                </p>
              </div>

              {/* 6. Refund Request Process */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <RefreshCw className="h-4 w-4 text-[#6DBE45]" /> 6. Refund Request Process
                </h2>
                <p className="mt-3 font-bold text-slate-900">To request a refund, contact our support team with:</p>
                <ul className="mt-1 space-y-1 list-disc pl-5 font-semibold text-slate-700">
                  <li>Registered mobile number or email address</li>
                  <li>Subscription or order ID</li>
                  <li>Date of payment</li>
                  <li>Reason for the refund request</li>
                  <li>Supporting screenshots or photos, if applicable</li>
                </ul>
              </div>

              {/* 7. Refund Processing Time */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <CreditCard className="h-4 w-4 text-[#6DBE45]" /> 7. Refund Processing Time
                </h2>
                <p className="mt-3">
                  Once approved, refunds are processed within <strong>5–10 business days</strong>. The time taken for the amount to appear in your account depends on your bank or payment provider.
                </p>
                <p className="mt-2 font-bold text-slate-900">
                  Refunds are issued to the original payment method used for the transaction.
                </p>
              </div>

              {/* 8. Subscription Credits */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <ShieldCheck className="h-4 w-4 text-[#6DBE45]" /> 8. Subscription Credits
                </h2>
                <p className="mt-3">
                  In some cases, instead of a monetary refund, FrootBoost may offer <strong>subscription credits or additional delivery days</strong>. Acceptance of such credits is optional and will be communicated before processing.
                </p>
              </div>

              {/* 9. Contact Us */}
              <div className="rounded-2xl border border-[#6DBE45]/30 bg-[#EAF8DF]/40 p-5">
                <h2 className="text-base font-black text-slate-900">9. Contact Us</h2>
                <p className="mt-1 text-xs text-slate-600">For any refund-related queries, please contact:</p>
                
                <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#6DBE45]" />
                    <span>Email: support@fruitboost.in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#6DBE45]" />
                    <span>Phone: +91 7350141627</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-3 text-[11px] font-bold text-slate-400 border-t border-slate-100">
                By purchasing a subscription or placing an order with FrootBoost, you acknowledge that you have read and agreed to this Refund Policy.
              </div>

            </div>
          </Reveal>
        </div>
      </section>

    </motion.div>
  );
}
