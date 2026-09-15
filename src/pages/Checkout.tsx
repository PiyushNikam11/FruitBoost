import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Download,
  LayoutDashboard,
  Share2,
  Tag,
  Receipt,
  Sparkles,
  ArrowRight,
  CreditCard,
  Building2,
  Wallet,
  Smartphone,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { apiService, ApiSubscriptionPlan } from "@/services/api";
import { storage, KEYS } from "@/utils/storage";

const paymentMethods = [
  { id: "upi", label: "UPI", note: "GPay, PhonePe, Paytm", icon: Smartphone, color: "bg-[#E8F5E9] text-[#2E7D32]" },
  { id: "card", label: "Cards", note: "Credit / Debit", icon: CreditCard, color: "bg-blue-50 text-blue-600" },
  { id: "netbanking", label: "Net Banking", note: "All major banks", icon: Building2, color: "bg-purple-50 text-purple-600" },
  { id: "wallet", label: "Wallet", note: "Paytm, Amazon Pay", icon: Wallet, color: "bg-amber-50 text-amber-600" },
];

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const { showSuccess, showError } = useToast();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [method, setMethod] = useState("upi");
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [paid, setPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlanObj, setSelectedPlanObj] = useState<ApiSubscriptionPlan | null>(null);

  const userId = storage.getUserId();
  const planId = storage.getPlanId() || 1;

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const res = await apiService.getSubscriptionPlans();
        const plans = Array.isArray(res) ? res : (res.data || []);
        const found = plans.find((p) => p.planId === planId) || plans[0];
        if (found) {
          setSelectedPlanObj(found);
        }
      } catch {
        // Fallback to default pricing
      }
    };
    fetchPlanDetails();
  }, [planId]);

  const basePrice = selectedPlanObj?.finalAmount ?? selectedPlanObj?.price ?? 2299;
  const subtotal = Math.round(basePrice);
  const gst = Math.round(subtotal * 0.05);
  const discount = applied ? 200 : 0;
  const total = subtotal + gst - discount;

  const handlePay = async () => {
    if (!userId) {
      showError("User ID not found. Please complete registration first.");
      navigate("/register");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Call backend API: POST /Payments/create-order
      const res = await apiService.createPaymentOrder(userId, planId);
      
      if (res.success === false) {
        showError(res.message || "Failed to create payment order.");
        setIsProcessing(false);
        return;
      }

      const orderData = res.data || res;

      // Extract Razorpay key & order ID from API response
      const key = orderData?.key || orderData?.razorpayKeyId || orderData?.keyId || orderData?.razorpayKey;
      const orderId = orderData?.orderId || orderData?.razorpayOrderId || orderData?.id;
      const amount = orderData?.amount ?? (total * 100);
      const currency = orderData?.currency || "INR";

      if (!key) {
        showError("Razorpay Key ID missing from server response.");
        setIsProcessing(false);
        return;
      }

      if (!orderId) {
        showError("Razorpay Order ID missing from server response.");
        setIsProcessing(false);
        return;
      }

      // 2. Load official Razorpay checkout.js script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        showError("Failed to load Razorpay SDK. Please check your internet connection.");
        setIsProcessing(false);
        return;
      }

      // 3. Standard Razorpay options object
      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: "FruitBoost",
        description: "Monthly Fruit Subscription",
        order_id: orderId,
        handler: async function (response: any) {
          // On payment success, call POST /Payments/verify
          try {
            const verifyRes = await apiService.verifyPayment({
              userId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if ((verifyRes as any).success === false) {
              showError((verifyRes as any).message || "Payment verification failed.");
              setIsProcessing(false);
              return;
            }

            const authData = (verifyRes as any).data || verifyRes;
            const accessToken = authData?.accessToken || (verifyRes as any)?.accessToken;

            if (!accessToken) {
              showError("Payment verified, but authentication token was missing in server response.");
              setIsProcessing(false);
              return;
            }

            // Save tokens & authenticate user
            setAuth(authData);
            storage.setItem(KEYS.SUBSCRIPTION_STATUS, "active");
            showSuccess("Payment verified successfully! Welcome to FruitBoost.");
            
            // Redirect immediately to /dashboard
            navigate("/dashboard", { replace: true });
          } catch (verifyErr: any) {
            showError(verifyErr.message || "Payment verification failed. Please contact support.");
            setIsProcessing(false);
          }
        },
        prefill: {
          name: orderData?.customerName || storage.getItem(KEYS.USER_CODE) || "",
          email: orderData?.email || storage.getItem(KEYS.EMAIL) || "",
          contact: orderData?.contact || storage.getItem(KEYS.MOBILE) || "",
        },
        theme: {
          color: "#53A318",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            showError("Payment cancelled by user.");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        showError(response.error?.description || "Payment failed. Please try again.");
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err: any) {
      showError(err.message || "Failed to create payment order. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-hidden flex flex-col justify-between">
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-gradient-to-b from-[#5FAE2E]/12 via-[#2E7D32]/5 to-transparent blur-3xl opacity-70" />
      <div className="pointer-events-none absolute inset-0 pattern-dot opacity-30" />

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 w-full my-auto z-10">
        
        {/* Top Header & Back Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/register"
            className="group flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-xs backdrop-blur-md transition-all hover:bg-slate-50 hover:text-[#5FAE2E] hover:border-[#5FAE2E]/40"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Registration</span>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="FrootBoost Logo" className="h-12 sm:h-15 w-auto object-contain" />
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {!paid ? (
            /* ─── SCREEN 1: CHECKOUT FORM ───────────────────────────── */
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 lg:grid-cols-5 items-start"
            >
              {/* LEFT COLUMN: ORDER SUMMARY */}
              <div className="lg:col-span-2">
                <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 sm:p-7 shadow-[0_15px_45px_rgba(0,0,0,0.05)]">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[#5FAE2E] border border-emerald-100/80 shadow-xs">
                      <Receipt className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                        Order Summary
                      </h2>
                      <p className="text-xs font-medium text-slate-500">
                        Review your subscription
                      </p>
                    </div>
                  </div>

                  {/* Summary Rows */}
                  <div className="mt-5 space-y-3 text-sm">
                    <SummaryRow label="Plan" value={selectedPlanObj?.planName || "Monthly Plan"} />
                    <SummaryRow label="Delivery days" value="Mon – Sat" highlight />
                    <SummaryRow label="Subtotal" value={`₹${subtotal}`} />
                    <SummaryRow label="GST (5%)" value={`₹${gst}`} />
                    {discount > 0 && (
                      <SummaryRow label="Discount Coupon" value={`−₹${discount}`} accent />
                    )}
                  </div>

                  {/* Coupon Code Input */}
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Coupon Code
                    </label>
                    <div className="mt-2 flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                          placeholder="FRUIT20"
                          className="w-full rounded-xl border border-slate-200/90 bg-slate-50/60 py-2.5 pl-10 pr-3 text-xs font-extrabold outline-none uppercase tracking-wider transition-all focus:border-[#5FAE2E] focus:bg-white focus:ring-4 focus:ring-[#5FAE2E]/10"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setApplied(true)}
                        className="rounded-xl bg-[#5FAE2E]/15 border border-[#5FAE2E]/30 px-4 text-xs font-extrabold text-[#5FAE2E] transition-all hover:bg-[#5FAE2E] hover:text-white"
                      >
                        Apply
                      </button>
                    </div>
                    {applied && (
                      <p className="mt-2 flex items-center gap-1 text-xs font-extrabold text-[#5FAE2E]">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Coupon FRUIT20 applied — saved ₹200!
                      </p>
                    )}
                  </div>

                  {/* Total */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4">
                    <span className="font-extrabold text-slate-900 text-base">Total Due</span>
                    <span className="font-black text-3xl text-[#5FAE2E] tracking-tight">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: PAYMENT METHOD */}
              <div className="lg:col-span-3">
                <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.05)]">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      Payment Method
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
                      Select how you would like to complete your payment.
                    </p>
                  </div>

                  {/* Payment Method Cards */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {paymentMethods.map((m) => {
                      const Icon = m.icon;
                      const isSelected = method === m.id;

                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setMethod(m.id)}
                          className={`flex items-center gap-3.5 rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                            isSelected
                              ? "border-[#5FAE2E] bg-emerald-50/60 shadow-xs"
                              : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/60"
                          }`}
                        >
                          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold shadow-xs ${m.color}`}>
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-extrabold text-slate-900">{m.label}</p>
                            <p className="text-xs font-medium text-slate-500 truncate">{m.note}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#5FAE2E]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Security Note Banner */}
                  <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 text-xs font-semibold text-slate-600">
                    <Lock className="h-4 w-4 text-[#5FAE2E] shrink-0" />
                    <span>Your payment information is encrypted and 100% secure.</span>
                  </div>

                  {/* Pay CTA Button */}
                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="group mt-6 flex h-[56px] w-full items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#5FAE2E] via-[#4CAF50] to-[#2E7D32] text-base font-black text-white shadow-[0_8px_25px_rgba(95,174,46,0.3)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(95,174,46,0.5)] hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="h-5 w-5 animate-spin" /> Processing Payment...
                      </span>
                    ) : (
                      <>
                        <span>Pay ₹{total} Now</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </>
                    )}
                  </button>

                  {/* SSL Trust Badges */}
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-5 pt-3 border-t border-slate-100 text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-[#5FAE2E]" /> 256-bit SSL
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-[#5FAE2E]" /> PCI Compliant
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Receipt className="h-4 w-4 text-[#5FAE2E]" /> Money-Back Guarantee
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ─── SCREEN 2: PAYMENT SUCCESS SCREEN ─────────────────── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto max-w-lg"
            >
              {/* Confetti Particles */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute h-2.5 w-2.5 rounded-sm"
                  style={{
                    left: "50%",
                    top: "30%",
                    background: ["#5FAE2E", "#2E7D32", "#FF9F1C", "#D83A2E"][i % 4],
                  }}
                  initial={{ opacity: 1, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    x: (Math.random() - 0.5) * 450,
                    y: (Math.random() - 0.5) * 450 + 120,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 1.6, delay: 0.1 + Math.random() * 0.3 }}
                />
              ))}

              {/* Main Success Card */}
              <div className="rounded-[28px] border border-emerald-100 bg-white p-8 sm:p-11 text-center shadow-[0_25px_60px_rgba(46,125,50,0.12)] relative overflow-hidden">
                {/* Background Ambient Circle */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#5FAE2E]/10 blur-3xl" />

                {/* Animated Green Check Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, delay: 0.15 }}
                  className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-100/80 shadow-md border border-emerald-200"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 320, delay: 0.35 }}
                  >
                    <CheckCircle2 className="h-14 w-14 text-[#5FAE2E]" strokeWidth={2.5} />
                  </motion.div>
                </motion.div>

                {/* Payment Successful Tag */}
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#5FAE2E] shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 text-[#5FAE2E]" />
                  Payment Successful
                </div>

                {/* Headline */}
                <h2 className="mt-4 text-3xl font-black text-slate-900 tracking-tight">
                  You're all set!
                </h2>

                <p className="mt-2 text-sm sm:text-base font-medium text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Your monthly plan is active. Your first fruit box arrives tomorrow morning.
                </p>

                {/* Details Summary Card */}
                <div className="mt-7 rounded-2xl border border-slate-200/80 bg-[#F8FBF4] p-5 text-left text-sm space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Amount paid</span>
                    <span className="font-black text-slate-900 text-lg">₹{total}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-200/60 pt-2">
                    <span className="text-slate-500 font-medium">Transaction ID</span>
                    <span className="font-mono text-xs font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      TXN{Math.floor(10000000 + Math.random() * 90000000)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white py-3.5 text-xs font-extrabold text-slate-700 transition-all hover:border-[#5FAE2E] hover:text-[#5FAE2E]">
                    <Download className="h-4 w-4" /> Invoice
                  </button>
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#5FAE2E] py-3.5 text-xs font-extrabold text-white shadow-sm transition-all hover:bg-[#529927]"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <a
                    href="https://wa.me/?text=I%20just%20subscribed%20to%20FruitBoost!"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-500/30 bg-emerald-50/50 py-3.5 text-xs font-extrabold text-[#5FAE2E] transition-all hover:bg-emerald-100/60"
                  >
                    <Share2 className="h-4 w-4" /> Share
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Back to Website Home Link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-extrabold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-slate-50 hover:text-[#5FAE2E] hover:border-[#5FAE2E]/40"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Website Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  accent,
  highlight,
}: {
  label: string;
  value: string;
  accent?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between font-medium">
      <span className="text-slate-500">{label}</span>
      <span
        className={`font-bold ${
          accent
            ? "text-red-500"
            : highlight
            ? "text-[#5FAE2E] bg-emerald-50 px-2 py-0.5 rounded-md text-xs font-extrabold"
            : "text-slate-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
