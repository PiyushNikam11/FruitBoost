import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  Apple,
  Truck,
  Sparkles,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Validation & Loading State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!pw) {
      newErrors.pw = "Password is required";
    } else if (pw.length < 6) {
      newErrors.pw = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, pw: true });

    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 400);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-6 lg:p-10 overflow-x-hidden">
      {/* ─── FULL PAGE BACKGROUND IMAGE ───────────────────────────────── */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0" 
        style={{ backgroundImage: "url('/images/background.png?v=5')" }} 
      />

      {/* ─── CENTRAL GLASSMORPHISM LOGIN CARD ──────────────────────────── */}
      <div className="relative z-10 w-full max-w-[500px] my-auto">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block transition-transform hover:scale-105">
            <div className="rounded-[18px] border border-white/60 bg-white/95 px-5 py-2.5 shadow-xl backdrop-blur-md inline-flex items-center justify-center">
              <img src="/images/logo.png" alt="FrootBoost Logo" className="h-11 sm:h-13 w-auto object-contain" />
            </div>
          </Link>
        </div>

        {/* Glass Card Container */}
        <div className="rounded-[24px] border border-white/60 bg-white/95 backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-slate-900">
          
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Sign In to Your Account
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
                Access your FruitBoost subscription, track deliveries & manage your plan.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} noValidate className="space-y-4 pt-2">
              {/* 1. Email Field */}
              <div className="group">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#5FAE2E]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="you@company.com"
                    className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm font-semibold outline-none transition-all focus:bg-white ${
                      touched.email && errors.email
                        ? "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-slate-200/90 bg-slate-50/60 focus:border-[#5FAE2E] focus:ring-4 focus:ring-[#5FAE2E]/15"
                    }`}
                  />
                </div>
                <p className="mt-1 text-[11px] font-medium text-slate-500">
                  Please enter your registered email address.
                </p>
                {touched.email && errors.email && (
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-red-500">
                    <AlertCircle className="h-3 w-3" /> {errors.email}
                  </p>
                )}
              </div>

              {/* 2. Password Field */}
              <div className="group">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <a href="#" className="text-xs font-extrabold text-[#5FAE2E] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#5FAE2E]" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    onBlur={() => handleBlur("pw")}
                    placeholder="••••••••"
                    className={`w-full rounded-xl border py-3 pl-10 pr-10 text-sm font-semibold outline-none transition-all focus:bg-white ${
                      touched.pw && errors.pw
                        ? "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-slate-200/90 bg-slate-50/60 focus:border-[#5FAE2E] focus:ring-4 focus:ring-[#5FAE2E]/15"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {touched.pw && errors.pw && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-red-500">
                    <AlertCircle className="h-3 w-3" /> {errors.pw}
                  </p>
                )}
              </div>

              {/* 3. Keep me signed in Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 accent-[#5FAE2E] text-[#5FAE2E] focus:ring-[#5FAE2E]"
                />
                <label htmlFor="remember" className="text-xs font-semibold text-slate-600 cursor-pointer select-none">
                  Keep me signed in on this device
                </label>
              </div>

              {/* 4. Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#5FAE2E] text-base font-extrabold text-white shadow-[0_8px_25px_rgba(95,174,46,0.3)] transition-all duration-300 hover:bg-[#529927] active:scale-[0.99] disabled:opacity-75"
              >
                {isLoading ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs font-medium text-slate-500">
                No lock-in. Cancel or pause in one tap.
              </p>

              {/* Divider */}
              <div className="relative my-4 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200/80" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Or</span>
                <div className="h-px flex-1 bg-slate-200/80" />
              </div>

              {/* Single Sign On button */}
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex h-[48px] w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200/90 bg-slate-50/80 text-xs font-extrabold text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-300"
              >
                <span className="text-sm">🔑</span>
                <span>Continue with Single Sign-On (SSO)</span>
              </button>

              {/* 5. Create Account Navigation */}
              <div className="mt-6 pt-4 border-t border-slate-200/70 text-center text-xs font-medium text-slate-600">
                New to FruitBoost?{" "}
                <Link to="/register" className="font-extrabold text-[#5FAE2E] hover:underline">
                  Create an account
                </Link>
              </div>
            </form>
          </motion.div>

        </div>
      </div>

      {/* ─── FOOTER NAVIGATION (Back to Website Home) ───────────────── */}
      <footer className="relative z-10 w-full mt-auto pt-6 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-5 py-2.5 text-xs font-extrabold text-slate-800 shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#5FAE2E] hover:scale-105 active:scale-100"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Website Home</span>
        </Link>
      </footer>

    </div>
  );
}
