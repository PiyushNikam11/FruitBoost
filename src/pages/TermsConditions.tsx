import { motion } from "framer-motion";
import { FileText, CheckCircle2, Clock, Truck, ShieldCheck, Mail, Phone, ArrowLeft, AlertCircle, RefreshCw, Lock, Scale, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";

export default function TermsConditions() {
  const lastUpdated = "August 2026";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="bg-[#FCFBF7] min-h-screen">
      
      {/* ─── HEADER ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6fcf5] to-[#FCFBF7] py-8 sm:py-12 border-b border-[#ECECEC]">
        <div className="container-x px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6DBE45]/20 bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A]">
              <FileText className="h-3.5 w-3.5 text-[#6DBE45]" /> Legal Agreement
            </span>

            <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Terms & Conditions
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 max-w-lg mx-auto">
              Welcome to FrootBoost. Please read these Terms & Conditions carefully.
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
            <div className="rounded-[28px] border border-[#ECECEC] bg-white p-6 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] space-y-7 text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
              
              {/* Preamble */}
              <div className="bg-[#FCFBF7] p-4 sm:p-5 rounded-2xl border border-slate-200/80">
                <p>
                  Welcome to FrootBoost. By registering, subscribing, or using our website and services, you agree to the following Terms & Conditions. Please read them carefully.
                </p>
              </div>

              {/* 1. Acceptance of Terms */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-[#6DBE45]" /> 1. Acceptance of Terms
                </h2>
                <p className="mt-2">
                  By creating an account or purchasing a subscription, you agree to comply with these Terms & Conditions and our Privacy Policy. If you do not agree with these terms, please do not use our services.
                </p>
              </div>

              {/* 2. Our Service */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Truck className="h-4 w-4 text-[#6DBE45]" /> 2. Our Service
                </h2>
                <p className="mt-2">
                  FrootBoost provides fresh, seasonal fruit boxes along with soaked almonds delivered to offices and workplaces on scheduled business days.
                </p>
                <p className="mt-2 font-bold text-slate-900">Our service includes:</p>
                <ul className="mt-1 space-y-1 list-disc pl-5 font-semibold text-slate-700">
                  <li>Fresh seasonal fruits</li>
                  <li>Daily soaked almonds</li>
                  <li>Office delivery</li>
                  <li>Subscription-based plans</li>
                  <li>Pause & resume options</li>
                  <li>Delivery tracking</li>
                </ul>
              </div>

              {/* 3. Eligibility */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <ShieldCheck className="h-4 w-4 text-[#6DBE45]" /> 3. Eligibility
                </h2>
                <p className="mt-2 font-bold text-slate-900">To use our services, you must:</p>
                <ul className="mt-1 space-y-1 list-disc pl-5 font-semibold text-slate-700">
                  <li>Be at least 18 years old or have permission from a legal guardian.</li>
                  <li>Provide accurate registration information.</li>
                  <li>Maintain an active delivery address within our service area.</li>
                </ul>
              </div>

              {/* 4. Subscription Plans */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <FileText className="h-4 w-4 text-[#6DBE45]" /> 4. Subscription Plans
                </h2>
                <p className="mt-2">Subscription plans begin after successful payment. Each plan includes:</p>
                <ul className="mt-1 space-y-1 list-disc pl-5 font-semibold text-slate-700">
                  <li>Monday to Friday deliveries</li>
                  <li>No deliveries on weekends unless otherwise specified</li>
                  <li>Seasonal fruit selection</li>
                  <li>Freshly packed fruit boxes</li>
                </ul>
                <p className="mt-2 text-slate-500 italic">Fruits may vary based on seasonal availability.</p>
              </div>

              {/* 5. Delivery Policy */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Truck className="h-4 w-4 text-[#6DBE45]" /> 5. Delivery Policy
                </h2>
                <p className="mt-2">
                  We strive to deliver all fruit boxes within the scheduled delivery window. Delivery timings may vary due to weather conditions, traffic, public holidays, or operational issues. FrootBoost is not responsible for delays caused by circumstances beyond our control.
                </p>
              </div>

              {/* 6. Weekend & Holiday Deliveries */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Clock className="h-4 w-4 text-[#6DBE45]" /> 6. Weekend & Holiday Deliveries
                </h2>
                <p className="mt-2">Regular deliveries are available only on business days. No deliveries are made on Saturdays, Sundays, National Holidays, or Company-declared holidays. Missed holiday deliveries are not automatically compensated unless stated in your subscription.</p>
              </div>

              {/* 7. Pause, Skip & Cancel Deliveries */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <RefreshCw className="h-4 w-4 text-[#6DBE45]" /> 7. Pause, Skip & Cancel Deliveries
                </h2>
                <p className="mt-2">Subscribers may pause upcoming deliveries, skip specific delivery dates, and resume deliveries anytime. Requests should be made before the daily cutoff time shown in your dashboard. Same-day cancellations may not be possible.</p>
              </div>

              {/* 8. Subscription Renewal */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <RefreshCw className="h-4 w-4 text-[#6DBE45]" /> 8. Subscription Renewal
                </h2>
                <p className="mt-2">Subscriptions may renew according to the selected plan. Users may renew manually, upgrade plans, downgrade plans, or cancel future renewals. Renewal pricing will be displayed before payment.</p>
              </div>

              {/* 9. Payments */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Lock className="h-4 w-4 text-[#6DBE45]" /> 9. Payments
                </h2>
                <p className="mt-2">Payments are processed securely through our payment partners. Accepted payment methods include UPI, Credit Cards, Debit Cards, Net Banking, and Wallets. Orders are confirmed only after successful payment.</p>
              </div>

              {/* 10. Refund Policy */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <FileText className="h-4 w-4 text-[#6DBE45]" /> 10. Refund Policy
                </h2>
                <p className="mt-2">Refunds are generally not available after a subscription has started. Refunds may be considered only in cases such as duplicate payment, failed order with successful payment, or service not available in your location. Approved refunds will be processed within 5–10 business days.</p>
              </div>

              {/* 11. Fruit Quality */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <ShieldCheck className="h-4 w-4 text-[#6DBE45]" /> 11. Fruit Quality
                </h2>
                <p className="mt-2">We are committed to delivering fresh, hygienically packed fruits. However, fruit size, color, and variety may vary. Seasonal availability affects the contents of each box. Images shown on the website are for illustration purposes only.</p>
              </div>

              {/* 12. Delivery Address */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Truck className="h-4 w-4 text-[#6DBE45]" /> 12. Delivery Address
                </h2>
                <p className="mt-2">Customers are responsible for providing accurate delivery information. Incorrect or incomplete addresses may result in failed deliveries. Repeated delivery failures caused by incorrect information may not be eligible for replacement.</p>
              </div>

              {/* 13. User Responsibilities */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-[#6DBE45]" /> 13. User Responsibilities
                </h2>
                <p className="mt-2 font-bold text-slate-900">You agree to:</p>
                <ul className="mt-1 space-y-1 list-disc pl-5 font-semibold text-slate-700">
                  <li>Provide accurate information.</li>
                  <li>Keep your account secure.</li>
                  <li>Not misuse the website.</li>
                  <li>Not interfere with our services.</li>
                  <li>Not attempt unauthorized access.</li>
                </ul>
              </div>

              {/* 14. Account Suspension */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <XCircle className="h-4 w-4 text-rose-500" /> 14. Account Suspension
                </h2>
                <p className="mt-2">FrootBoost reserves the right to suspend or terminate accounts involved in fraudulent activities, abuse of promotions, misuse of subscriptions, or violation of these Terms.</p>
              </div>

              {/* 15. Intellectual Property */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Lock className="h-4 w-4 text-[#6DBE45]" /> 15. Intellectual Property
                </h2>
                <p className="mt-2">All content on the FrootBoost website, including logo, brand name, graphics, images, icons, UI designs, and software is the property of FrootBoost and may not be copied or reproduced without permission.</p>
              </div>

              {/* 16. Limitation of Liability */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <AlertCircle className="h-4 w-4 text-[#6DBE45]" /> 16. Limitation of Liability
                </h2>
                <p className="mt-2">FrootBoost shall not be liable for delivery delays beyond our control, temporary website downtime, seasonal changes in fruit availability, or indirect losses. Our total liability shall not exceed the amount paid for the affected subscription.</p>
              </div>

              {/* 17. Privacy */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <ShieldCheck className="h-4 w-4 text-[#6DBE45]" /> 17. Privacy
                </h2>
                <p className="mt-2">Your personal information is handled according to our Privacy Policy. We do not sell your personal information to third parties.</p>
              </div>

              {/* 18. Changes to Terms */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <RefreshCw className="h-4 w-4 text-[#6DBE45]" /> 18. Changes to Terms
                </h2>
                <p className="mt-2">We may update these Terms & Conditions from time to time. The latest version will always be available on our website. Continued use of our services constitutes acceptance of the updated Terms.</p>
              </div>

              {/* 19. Governing Law */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Scale className="h-4 w-4 text-[#6DBE45]" /> 19. Governing Law
                </h2>
                <p className="mt-2">These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in the city where FrootBoost operates.</p>
              </div>

              {/* 20. Contact Us */}
              <div className="rounded-2xl border border-[#6DBE45]/30 bg-[#EAF8DF]/40 p-5">
                <h2 className="text-base font-black text-slate-900">20. Contact Us</h2>
                <p className="mt-1 text-xs text-slate-600">If you have any questions regarding these Terms & Conditions, please contact us:</p>
                
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

            </div>
          </Reveal>
        </div>
      </section>

    </motion.div>
  );
}
