import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Mail, Phone, Globe, MapPin, ArrowLeft, Cookie, UserCheck, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";

export default function PrivacyPolicy() {
  const lastUpdated = "August 3, 2026";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="bg-[#FCFBF7] min-h-screen">
      
      {/* ─── HEADER ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6fcf5] to-[#FCFBF7] py-8 sm:py-12 border-b border-[#ECECEC]">
        <div className="container-x px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6DBE45]/20 bg-[#EAF8DF] px-3.5 py-1 text-xs font-black text-[#1B7A1A]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#6DBE45]" /> Legal Information
            </span>

            <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 max-w-lg mx-auto">
              Welcome to FruitBoost ("we," "our," or "us"). Your privacy is important to us.
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
              
              {/* Preamble */}
              <div className="bg-[#FCFBF7] p-5 rounded-2xl border border-slate-200/80">
                <p>
                  This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website, register for an account, subscribe to our services, or place an order.
                </p>
                <p className="mt-2 text-slate-900 font-bold">
                  By using the FruitBoost website or services, you agree to the practices described in this Privacy Policy.
                </p>
              </div>

              {/* 1. Information We Collect */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Eye className="h-4 w-4 text-[#6DBE45]" /> 1. Information We Collect
                </h2>
                <p className="mt-3">We collect only the information necessary to provide our services efficiently.</p>
                
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4">
                    <p className="font-black text-slate-900 text-xs sm:text-sm mb-2">Personal Information</p>
                    <p className="text-slate-500 mb-2">When you register or place an order, we may collect:</p>
                    <ul className="space-y-1 list-disc pl-4 text-xs font-semibold text-slate-700">
                      <li>Full Name</li>
                      <li>Mobile Number</li>
                      <li>Email Address</li>
                      <li>Password (encrypted)</li>
                      <li>Company Name</li>
                      <li>Office Location</li>
                      <li>Subscription Plan</li>
                      <li>Delivery Preferences</li>
                      <li>Payment Details (processed securely through payment partner)</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4">
                    <p className="font-black text-slate-900 text-xs sm:text-sm mb-2">Automatically Collected Information</p>
                    <p className="text-slate-500 mb-2">When you visit our website, we may automatically collect:</p>
                    <ul className="space-y-1 list-disc pl-4 text-xs font-semibold text-slate-700">
                      <li>IP Address</li>
                      <li>Browser Type</li>
                      <li>Device Information</li>
                      <li>Operating System</li>
                      <li>Website Usage Data</li>
                      <li>Cookies and Analytics Data</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. How We Use Your Information */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <FileText className="h-4 w-4 text-[#6DBE45]" /> 2. How We Use Your Information
                </h2>
                <p className="mt-3">Your information is used to:</p>
                <ul className="mt-2 space-y-1.5 list-disc pl-5 font-semibold text-slate-700">
                  <li>Create and manage your FruitBoost account</li>
                  <li>Process subscription orders</li>
                  <li>Verify your identity through OTP</li>
                  <li>Deliver fruit boxes to your selected office location</li>
                  <li>Process secure payments</li>
                  <li>Generate invoices</li>
                  <li>Send delivery updates and reminders</li>
                  <li>Provide customer support</li>
                  <li>Improve our products and services</li>
                  <li>Prevent fraud and unauthorized access</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              {/* 3. Payment Information */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Lock className="h-4 w-4 text-[#6DBE45]" /> 3. Payment Information
                </h2>
                <p className="mt-3">
                  <strong>FruitBoost does not store your debit card, credit card, or banking information.</strong>
                </p>
                <p className="mt-2">
                  All online payments are processed securely through our trusted payment gateway partners using industry-standard encryption.
                </p>
              </div>

              {/* 4. Delivery Information */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <MapPin className="h-4 w-4 text-[#6DBE45]" /> 4. Delivery Information
                </h2>
                <p className="mt-3">To ensure accurate deliveries, we collect your:</p>
                <ul className="mt-2 space-y-1 list-disc pl-5 font-semibold text-slate-700">
                  <li>Company Name</li>
                  <li>Office Location</li>
                  <li>Contact Number</li>
                </ul>
                <p className="mt-2">This information is used only for delivering your FruitBoost subscription.</p>
              </div>

              {/* 5. Account Security */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <ShieldCheck className="h-4 w-4 text-[#6DBE45]" /> 5. Account Security
                </h2>
                <p className="mt-3">We take appropriate technical and organizational measures to protect your information. These include:</p>
                <ul className="mt-2 space-y-1 list-disc pl-5 font-semibold text-slate-700">
                  <li>Encrypted passwords</li>
                  <li>Secure servers</li>
                  <li>OTP verification</li>
                  <li>Restricted administrative access</li>
                  <li>Regular security monitoring</li>
                </ul>
                <p className="mt-2 text-slate-500 italic">
                  Although we take every reasonable precaution, no online platform can guarantee 100% security.
                </p>
              </div>

              {/* 6. Cookies */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Cookie className="h-4 w-4 text-[#6DBE45]" /> 6. Cookies
                </h2>
                <p className="mt-3">Our website uses cookies to:</p>
                <ul className="mt-2 space-y-1 list-disc pl-5 font-semibold text-slate-700">
                  <li>Keep you logged in</li>
                  <li>Remember your preferences</li>
                  <li>Improve website performance</li>
                  <li>Analyze visitor behavior</li>
                  <li>Enhance your browsing experience</li>
                </ul>
                <p className="mt-2">
                  You may disable cookies through your browser settings; however, some features may not function properly.
                </p>
              </div>

              {/* 7. Sharing of Information */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <UserCheck className="h-4 w-4 text-[#6DBE45]" /> 7. Sharing of Information
                </h2>
                <p className="mt-3">
                  FruitBoost values your privacy. <strong>We do not sell, rent, or trade your personal information to third parties.</strong>
                </p>
                <p className="mt-2">Your information may be shared only with:</p>
                <ul className="mt-2 space-y-1 list-disc pl-5 font-semibold text-slate-700">
                  <li>Payment gateway providers</li>
                  <li>Delivery personnel (only information necessary for delivery)</li>
                  <li>Technology service providers who support our website and services</li>
                  <li>Government authorities if required by applicable law</li>
                </ul>
              </div>

              {/* 8. Marketing Communications */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Mail className="h-4 w-4 text-[#6DBE45]" /> 8. Marketing Communications
                </h2>
                <p className="mt-3">We may occasionally send order confirmations, subscription reminders, delivery notifications, new product announcements, and promotional offers. You can unsubscribe from promotional communications at any time.</p>
              </div>

              {/* 9. Data Retention */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <FileText className="h-4 w-4 text-[#6DBE45]" /> 9. Data Retention
                </h2>
                <p className="mt-3">We retain your information only for as long as necessary to provide our services, maintain your account, meet legal and accounting requirements, and resolve disputes. After this period, your information is securely deleted or anonymized.</p>
              </div>

              {/* 10. Your Rights */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <CheckCircle2 className="h-4 w-4 text-[#6DBE45]" /> 10. Your Rights
                </h2>
                <p className="mt-3">You have the right to access your personal information, update your profile, correct inaccurate information, request deletion of your account, and withdraw marketing consent.</p>
              </div>

              {/* 11. Third-Party Services */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Globe className="h-4 w-4 text-[#6DBE45]" /> 11. Third-Party Services
                </h2>
                <p className="mt-3">Our website may integrate trusted third-party services such as Payment Gateway, Analytics Services, WhatsApp Sharing, and Email Services. These providers have their own privacy policies.</p>
              </div>

              {/* 12. Children's Privacy */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <AlertTriangle className="h-4 w-4 text-[#6DBE45]" /> 12. Children's Privacy
                </h2>
                <p className="mt-3">FruitBoost services are intended for individuals aged 18 years or older. We do not knowingly collect personal information from children.</p>
              </div>

              {/* 13. Changes to This Privacy Policy */}
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <RefreshCwIcon className="h-4 w-4 text-[#6DBE45]" /> 13. Changes to This Privacy Policy
                </h2>
                <p className="mt-3">We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.</p>
              </div>

              {/* 14. Contact Us */}
              <div className="rounded-2xl border border-[#6DBE45]/30 bg-[#EAF8DF]/40 p-5">
                <h2 className="text-base font-black text-slate-900">14. Contact Us</h2>
                <p className="mt-1 text-xs text-slate-600">If you have any questions regarding this Privacy Policy, please contact us:</p>
                
                <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#6DBE45]" />
                    <span>Email: hello@fruitboost.in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#6DBE45]" />
                    <span>Phone: +91 7350141627</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#6DBE45]" />
                    <span>Website: web.fruitboost.tinytalent.in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#6DBE45]" />
                    <span>Service Areas: Pune, Maharashtra</span>
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

function RefreshCwIcon({ className }: { className?: string }) {
  return <FileText className={className} />;
}
