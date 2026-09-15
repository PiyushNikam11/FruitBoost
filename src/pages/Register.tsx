import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  MapPin,
  CalendarDays,
  Check,
  Search,
  CheckCircle2,
  Sparkles,
  Calendar,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { plans as mockPlans } from "@/data/mock";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import {
  apiService,
  ApiCompany,
  ApiCompanyLocation,
  ApiSubscriptionPlan,
} from "@/services/api";
import { storage, KEYS } from "@/utils/storage";
import { getStepFromRegistrationStep } from "@/utils/registration";

const steps = [
  { id: 0, label: "Account" },
  { id: 1, label: "Verify OTP" },
  { id: 2, label: "Company" },
  { id: 3, label: "Location" },
  { id: 4, label: "Plan" },
  { id: 5, label: "Start Date" },
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

export default function Register() {
  const { showSuccess, showError } = useToast();
  const { user, setAuth } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [step, setStep] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const hasAutoSentOtpRef = useRef(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState(""); // Default empty
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // OTP State
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Selection & API State
  const [companySearch, setCompanySearch] = useState("");
  const [companyList, setCompanyList] = useState<ApiCompany[]>([]);
  const [selectedCompanyObj, setSelectedCompanyObj] = useState<ApiCompany | null>(null);
  const [isFetchingCompanies, setIsFetchingCompanies] = useState(false);

  const [locationList, setLocationList] = useState<ApiCompanyLocation[]>([]);
  const [selectedLocationObj, setSelectedLocationObj] = useState<ApiCompanyLocation | null>(null);
  const [isFetchingLocations, setIsFetchingLocations] = useState(false);

  const [apiPlans, setApiPlans] = useState<ApiSubscriptionPlan[]>([]);
  const [selectedPlanObj, setSelectedPlanObj] = useState<ApiSubscriptionPlan | null>(null);
  const [selectedMockPlanId, setSelectedMockPlanId] = useState("monthly");
  const [isFetchingPlans, setIsFetchingPlans] = useState(false);

  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch latest user profile on mount to get authoritative registrationStep from backend
  useEffect(() => {
    const token = storage.getAccessToken();
    if (token) {
      apiService
        .getCurrentUser()
        .then((res) => {
          const meData = (res as any).data || res;
          if (meData && (meData.registrationStep || meData.userId)) {
            setAuth(meData);
          }
        })
        .catch(() => {
          // Fallback to locally stored user state
        });
    }
  }, []);

  // Sync step state with URL search param ?step=N and user.registrationStep
  useEffect(() => {
    if (user && user.accessRoleId !== undefined && Number(user.accessRoleId) !== 4) {
      showError("You do not have permission to access this application.");
      navigate("/login", { replace: true });
      return;
    }

    const regStep = user?.registrationStep !== undefined
      ? Number(user.registrationStep)
      : (storage.getUserData()?.registrationStep ? Number(storage.getUserData()?.registrationStep) : 0);

    if (regStep >= 6) {
      navigate("/dashboard", { replace: true });
      return;
    }

    // Determine highest allowed step number based on backend registrationStep
    const allowedStepNumber = getStepFromRegistrationStep(regStep);
    const stepParamRaw = searchParams.get("step");
    let targetStepNumber = allowedStepNumber;

    if (stepParamRaw) {
      const parsed = parseInt(stepParamRaw, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
        // User can visit any step <= allowedStepNumber, but cannot jump ahead
        targetStepNumber = Math.min(parsed, allowedStepNumber);
      }
    }

    const targetStepIndex = targetStepNumber - 1;

    if (stepParamRaw !== String(targetStepNumber)) {
      setSearchParams({ step: String(targetStepNumber) }, { replace: true });
    }

    setStep(targetStepIndex);
  }, [searchParams, user, navigate, setSearchParams]);

  // Auto-send OTP when landing on Step 2 (Verify OTP UI) if user.registrationStep === 1
  useEffect(() => {
    if (step === 1) {
      const regStep = user?.registrationStep !== undefined
        ? Number(user.registrationStep)
        : (storage.getUserData()?.registrationStep ? Number(storage.getUserData()?.registrationStep) : 0);
      const targetUserId = user?.userId || storage.getUserId();

      if (regStep === 1 && targetUserId && !hasAutoSentOtpRef.current) {
        hasAutoSentOtpRef.current = true;
        apiService
          .sendOtp({ userId: targetUserId })
          .then((res) => {
            const nextStep = (res as any)?.data?.registrationStep ?? 2;
            setAuth({
              ...(user || {}),
              registrationStep: nextStep,
            });
            showSuccess(res.message || "OTP sent successfully to your email.");
          })
          .catch((err) => {
            showError(err.message || "Failed to send OTP. Please click Resend OTP.");
          });
      }
    }
  }, [step, user]);

  const handleBack = () => {
    if (step > 0) {
      const prevIndex = step - 1;
      setStep(prevIndex);
      setSearchParams({ step: String(prevIndex + 1) });
    }
  };

  const next = () => {
    setStep((s) => {
      const nextIndex = Math.min(s + 1, steps.length - 1);
      setSearchParams({ step: String(nextIndex + 1) });
      return nextIndex;
    });
  };

  const back = handleBack;

  // Password Requirement Checks
  const reqLength = pw.length >= 8;
  const reqUpper = /[A-Z]/.test(pw);
  const reqNumber = /[0-9]/.test(pw);
  const reqSpecial = /[^A-Za-z0-9]/.test(pw);
  const pwValidCount = [reqLength, reqUpper, reqNumber, reqSpecial].filter(Boolean).length;

  // Auto-advance OTP
  const onOtpChange = (i: number, val: string) => {
    const v = val.slice(-1);
    const nextOtp = [...otp];
    nextOtp[i] = v;
    setOtp(nextOtp);
    if (v && i < 3) otpRefs.current[i + 1]?.focus();
  };

  const onOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handlePasteOtp = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData("text").trim().slice(0, 4);
    if (/^\d+$/.test(data)) {
      const nextOtp = data.split("");
      while (nextOtp.length < 4) nextOtp.push("");
      setOtp(nextOtp);
      otpRefs.current[Math.min(data.length, 3)]?.focus();
    }
  };

  const otpFilled = otp.every((d) => d !== "");

  // Validation function
  const validateAccountForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!gender) {
      newErrors.gender = "Gender selection is mandatory";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (phone.trim().length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!pw) {
      newErrors.pw = "Password is required";
    } else if (pwValidCount < 3) {
      newErrors.pw = "Password does not meet strength requirements";
    }

    if (!pwConfirm) {
      newErrors.pwConfirm = "Please confirm your password";
    } else if (pw !== pwConfirm) {
      newErrors.pwConfirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateAccountForm();
  };

  // Prefill form fields if user is already authenticated
  useEffect(() => {
    if (user) {
      if (user.fullName && !fullName) setFullName(user.fullName);
      if (user.email && !email) setEmail(user.email);
      if (user.mobile && !phone) setPhone(user.mobile);
      if (user.dob && !dob) setDob(user.dob);
      if (user.gender && !gender) setGender(user.gender);
    }
  }, [user]);

  // STEP 1: Account Submit
  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      dob: true,
      gender: true,
      email: true,
      phone: true,
      pw: true,
      pwConfirm: true,
    });

    if (!validateAccountForm()) return;

    setIsLoading(true);
    try {
      let resData: any = null;
      let registerMsg = "";

      try {
        const res = await apiService.register({
          fullName: fullName.trim(),
          dob,
          gender: gender.toLowerCase(),
          email: email.trim(),
          phoneNumber: phone.trim(),
          password: pw,
        });
        resData = (res as any).data || res;
        registerMsg = res.message || "Account saved successfully.";
      } catch (regErr: any) {
        // If user is already registered or logged in with a userId, use that existing userId
        const existingUserId = user?.userId || storage.getUserId();
        if (existingUserId) {
          resData = { userId: existingUserId };
        } else {
          throw regErr;
        }
      }

      const targetUserId = resData?.userId || user?.userId || storage.getUserId();

      if (!targetUserId) {
        throw new Error("User ID could not be determined. Please try again.");
      }

      if (targetUserId) storage.setItem(KEYS.USER_ID, targetUserId);
      if (resData?.userCode) storage.setItem(KEYS.USER_CODE, resData.userCode);
      if (resData?.email || email) storage.setItem(KEYS.EMAIL, resData?.email || email.trim());
      if (resData?.mobile || resData?.phoneNumber || phone) {
        storage.setItem(KEYS.MOBILE, resData?.mobile || resData?.phoneNumber || phone.trim());
      }

      // Step 1 registration API succeeded -> Call POST /Users/send-otp dynamically with userId
      const otpRes = await apiService.sendOtp({ userId: targetUserId });

      if ((otpRes as any).success === false) {
        showError((otpRes as any).message || "Failed to send OTP. Please try again.");
        setIsLoading(false);
        return;
      }

      const newStep = (otpRes as any)?.data?.registrationStep ?? 2;

      setAuth({
        ...(user || {}),
        ...(resData || {}),
        userId: targetUserId,
        fullName: fullName.trim() || user?.fullName,
        email: email.trim() || user?.email,
        mobile: phone.trim() || user?.mobile,
        registrationStep: newStep,
      });

      hasAutoSentOtpRef.current = true;
      showSuccess(otpRes.message || registerMsg || "OTP sent successfully to your email.");
      setStep(1); // UI index 1 = Verify OTP
      setSearchParams({ step: "2" });
    } catch (err: any) {
      showError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async () => {
    const userId = storage.getUserId();
    if (!userId) {
      showError("Session expired. Please register again.");
      setStep(0);
      return;
    }

    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      showError("Please enter all 4 digits of the OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiService.verifyOtp({
        userId,
        otp: otpCode,
      });

      const resData = (res as any).data || res;
      const newStep = resData?.registrationStep || (res as any)?.registrationStep || 3;

      setAuth({
        ...(user || {}),
        registrationStep: newStep,
      });

      showSuccess(res.message || "Email verified successfully.");
      setStep(2); // UI index 2 = Select Company
      setSearchParams({ step: "3" });
    } catch (err: any) {
      showError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 3: Resend OTP
  const handleResendOtp = async () => {
    const userId = storage.getUserId();
    if (!userId) {
      showError("Session expired. Please register again.");
      setStep(0);
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiService.sendOtp({ userId });
      showSuccess(res.message || "OTP sent successfully to your email.");
    } catch (err: any) {
      showError(err.message || "Failed to resend OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 4: Fetch Companies on Step 2
  useEffect(() => {
    if (step === 2) {
      const fetchCompanies = async () => {
        setIsFetchingCompanies(true);
        try {
          const res = await apiService.getCompanies();
          const list = Array.isArray(res) ? res : (res.data || []);
          setCompanyList(list);
        } catch (err: any) {
          showError(err.message || "Failed to load companies.");
        } finally {
          setIsFetchingCompanies(false);
        }
      };
      fetchCompanies();
    }
  }, [step]);

  // STEP 4: Save Company
  const handleSaveCompany = async () => {
    if (!selectedCompanyObj) {
      showError("Please select a company.");
      return;
    }

    const userId = storage.getUserId();
    if (!userId) {
      showError("Session expired. Please register again.");
      setStep(0);
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiService.updateCompany(userId, selectedCompanyObj.companyId);
      storage.setItem(KEYS.COMPANY_ID, selectedCompanyObj.companyId);

      const resData = (res as any).data || res;
      const newStep = resData?.registrationStep || (res as any)?.registrationStep || 4;

      setAuth({
        ...(user || {}),
        registrationStep: newStep,
      });

      showSuccess(res.message || "Company saved successfully.");
      setStep(3); // UI index 3 = Select Location
      setSearchParams({ step: "4" });
    } catch (err: any) {
      showError(err.message || "Failed to update company.");
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 5: Fetch Company Locations on Step 3
  useEffect(() => {
    if (step === 3) {
      const companyId = selectedCompanyObj?.companyId || storage.getCompanyId();
      if (!companyId) {
        showError("Company ID missing. Please select a company first.");
        setStep(2);
        return;
      }

      const fetchLocations = async () => {
        setIsFetchingLocations(true);
        try {
          const res = await apiService.getCompanyLocations(companyId);
          const list = Array.isArray(res) ? res : (res.data || []);
          setLocationList(list);
        } catch (err: any) {
          showError(err.message || "Failed to load company locations.");
        } finally {
          setIsFetchingLocations(false);
        }
      };
      fetchLocations();
    }
  }, [step, selectedCompanyObj]);

  // STEP 5: Save Location
  const handleSaveLocation = async () => {
    if (!selectedLocationObj) {
      showError("Please select an office location.");
      return;
    }

    const userId = storage.getUserId();
    if (!userId) {
      showError("Session expired. Please register again.");
      setStep(0);
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiService.updateLocation(userId, selectedLocationObj.locationId);
      storage.setItem(KEYS.LOCATION_ID, selectedLocationObj.locationId);

      const resData = (res as any).data || res;
      const newStep = resData?.registrationStep || (res as any)?.registrationStep || 5;

      setAuth({
        ...(user || {}),
        registrationStep: newStep,
      });

      showSuccess(res.message || "Company location selected successfully.");
      setStep(4); // UI index 4 = Payment
      setSearchParams({ step: "5" });
    } catch (err: any) {
      showError(err.message || "Failed to update location.");
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 6: Fetch Subscription Plans on Step 4
  useEffect(() => {
    if (step === 4) {
      const fetchPlans = async () => {
        setIsFetchingPlans(true);
        try {
          const res = await apiService.getSubscriptionPlans();
          const list = Array.isArray(res) ? res : (res.data || []);
          setApiPlans(list);
          if (list.length > 0) {
            setSelectedPlanObj(list[0]);
            storage.setItem(KEYS.PLAN_ID, list[0].planId);
          }
        } catch (err: any) {
          showError(err.message || "Failed to load subscription plans.");
        } finally {
          setIsFetchingPlans(false);
        }
      };
      fetchPlans();
    }
  }, [step]);

  // Auto-redirect if user reaches step 5
  useEffect(() => {
    if (step === 5) {
      sessionStorage.setItem("JUST_SUBSCRIBED", "true");
      navigate("/dashboard", { replace: true, state: { showCelebration: true } });
    }
  }, [step, navigate]);

  const handleSavePlan = () => {
    if (selectedPlanObj) {
      storage.setItem(KEYS.PLAN_ID, selectedPlanObj.planId);
    }
    handleRazorpayCheckout();
  };

  const handleRazorpayCheckout = async () => {
    const userId = storage.getUserId();
    if (!userId) {
      showError("User ID not found. Please complete registration step 1 first.");
      setStep(0);
      return;
    }

    const planId = selectedPlanObj?.planId || storage.getPlanId() || 1;
    if (selectedPlanObj) {
      storage.setItem(KEYS.PLAN_ID, selectedPlanObj.planId);
    }
    setIsLoading(true);

    try {
      // 1. Call backend API: POST /Payments/create-order
      const res = await apiService.createPaymentOrder(userId, planId);

      if ((res as any).success === false) {
        showError((res as any).message || "Failed to create payment order.");
        setIsLoading(false);
        return;
      }

      const orderData = (res as any).data || res;

      // Extract Razorpay key & order ID from API response
      const key = orderData?.key || orderData?.razorpayKeyId || orderData?.keyId || orderData?.razorpayKey;
      const orderId = orderData?.orderId || orderData?.razorpayOrderId || orderData?.id;
      const price = selectedPlanObj?.finalAmount ?? selectedPlanObj?.price ?? 1;
      const amount = orderData?.amount ?? Math.round(price * 100);
      const currency = orderData?.currency || "INR";

      if (!key) {
        showError("Razorpay Key ID missing from server response.");
        setIsLoading(false);
        return;
      }

      if (!orderId) {
        showError("Razorpay Order ID missing from server response.");
        setIsLoading(false);
        return;
      }

      // 2. Load official Razorpay checkout.js script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        showError("Failed to load Razorpay SDK. Please check your internet connection.");
        setIsLoading(false);
        return;
      }

      // 3. Standard Razorpay options object
      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: "FruitBoost",
        description: selectedPlanObj?.planName || "Monthly Fruit Subscription",
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await apiService.verifyPayment({
              userId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if ((verifyRes as any).success === false) {
              showError((verifyRes as any).message || "Payment verification failed.");
              setIsLoading(false);
              return;
            }

            const authData = (verifyRes as any).data || verifyRes;

            setAuth({
              ...(user || {}),
              ...(authData || {}),
              registrationStep: 6,
            });
            storage.setItem(KEYS.SUBSCRIPTION_STATUS, "active");
            setIsPaid(true);
            showSuccess("Payment verified successfully! Welcome to FruitBoost.");
            
            // Redirect directly to dashboard with celebration blast state
            sessionStorage.setItem("JUST_SUBSCRIBED", "true");
            navigate("/dashboard", { replace: true, state: { showCelebration: true } });
          } catch (verifyErr: any) {
            showError(verifyErr.message || "Payment verification failed. Please contact support.");
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: fullName || storage.getItem(KEYS.USER_CODE) || "",
          email: email || storage.getItem(KEYS.EMAIL) || "",
          contact: phone || storage.getItem(KEYS.MOBILE) || "",
        },
        theme: {
          color: "#53A318",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            showError("Payment cancelled by user.");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        showError(response.error?.description || "Payment failed. Please try again.");
        setIsLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      showError(err.message || "Failed to create payment order. Please try again.");
      setIsLoading(false);
    }
  };

  const currentPlan = selectedPlanObj || mockPlans.find((p) => p.id === selectedMockPlanId);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-6 lg:p-10 overflow-x-hidden">
      {/* ─── FULL PAGE BACKGROUND IMAGE ───────────────────────────────── */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0" 
        style={{ backgroundImage: "url('/images/background.png?v=5')" }} 
      />

      {/* ─── CENTRAL GLASSMORPHISM REGISTRATION CARD ────────────────── */}
      <div className="relative z-10 w-full max-w-[580px] my-auto">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block transition-transform hover:scale-105">
            <div className="rounded-[18px] border border-white/60 bg-white/95 px-5 py-2.5 shadow-xl backdrop-blur-md inline-flex items-center justify-center">
              <img src="/images/logo.png" alt="FrootBoost Logo" className="h-13 sm:h-16 w-auto object-contain" />
            </div>
          </Link>
        </div>

        {/* Glass Card Container */}
        <div className="rounded-[24px] border border-white/60 bg-white/95 backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-slate-900">
          
          {/* Visible Back button for Steps > 0 */}
          {step > 0 && (
            <div className="mb-4">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-1.5 text-xs font-extrabold text-slate-700 shadow-2xs transition-all hover:bg-slate-100 hover:text-[#5FAE2E]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            </div>
          )}

          {/* Multi-Step Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              {/* Connecting Line */}
              <div className="absolute left-3 right-3 top-4 h-0.5 bg-slate-200/80 -z-0" />
              <div
                className="absolute left-3 top-4 h-0.5 bg-[#5FAE2E] transition-all duration-300 -z-0"
                style={{ width: `${(step / (steps.length - 1)) * 92}%` }}
              />

              {steps.map((s, i) => {
                const isCompleted = i < step;
                const isCurrent = i === step;

                return (
                  <div key={s.id} className="relative z-10 flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold transition-all duration-300 ${
                        isCompleted
                          ? "bg-[#5FAE2E] text-white shadow-xs"
                          : isCurrent
                          ? "bg-[#5FAE2E] text-white ring-4 ring-[#5FAE2E]/25 scale-110 shadow-md"
                          : "bg-white text-slate-400 border-2 border-slate-200"
                      }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                    </motion.div>
                    <span
                      className={`mt-1.5 text-[10px] font-bold transition-colors ${
                        isCurrent ? "text-[#5FAE2E]" : isCompleted ? "text-slate-700" : "text-slate-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* STEP 0: ACCOUNT MANDATORY FIELDS */}
              {step === 0 && (
                <form onSubmit={handleAccountSubmit} noValidate className="space-y-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Create Your Account
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
                      Join FruitBoost for daily fresh seasonal fruits & soaked almonds.
                    </p>
                  </div>

                  {/* 1. Full Name */}
                  <div className="group">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#5FAE2E]" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() => handleBlur("fullName")}
                        placeholder="Aditya Rao"
                        className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm font-semibold outline-none transition-all focus:bg-white ${
                          touched.fullName && errors.fullName
                            ? "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                            : "border-slate-200/90 bg-slate-50/60 focus:border-[#5FAE2E] focus:ring-4 focus:ring-[#5FAE2E]/15"
                        }`}
                      />
                    </div>
                    {touched.fullName && errors.fullName && (
                      <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-red-500">
                        <AlertCircle className="h-3 w-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* DOB & Gender Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 2. Date of Birth (DOB) */}
                    <div className="group">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                        Date of Birth (DOB) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-1.5">
                        <Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#5FAE2E]" />
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          onBlur={() => handleBlur("dob")}
                          className={`w-full rounded-xl border py-3 pl-10 pr-3 text-sm font-semibold outline-none transition-all focus:bg-white ${
                            touched.dob && errors.dob
                              ? "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                              : "border-slate-200/90 bg-slate-50/60 focus:border-[#5FAE2E] focus:ring-4 focus:ring-[#5FAE2E]/15"
                          }`}
                        />
                      </div>
                      {touched.dob && errors.dob && (
                        <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-red-500">
                          <AlertCircle className="h-3 w-3" /> {errors.dob}
                        </p>
                      )}
                    </div>

                    {/* 3. Gender */}
                    <div>
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 mt-1.5">
                        {["Male", "Female"].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => {
                              setGender(g);
                              setTouched((prev) => ({ ...prev, gender: true }));
                              setErrors((prev) => ({ ...prev, gender: "" }));
                            }}
                            className={`py-3 text-xs font-extrabold rounded-xl border transition-all ${
                              gender === g
                                ? "bg-[#5FAE2E] text-white border-[#5FAE2E] shadow-xs"
                                : "bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                      {touched.gender && errors.gender && (
                        <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-red-500">
                          <AlertCircle className="h-3 w-3" /> {errors.gender}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 4. Email */}
                  <div className="group">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Email <span className="text-red-500">*</span>
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
                      Please enter a valid email address for OTP verification.
                    </p>
                    {touched.email && errors.email && (
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-red-500">
                        <AlertCircle className="h-3 w-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* 5. Mobile Number */}
                  <div className="group">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1.5 flex items-center rounded-xl border border-slate-200/90 bg-slate-50/60 overflow-hidden focus-within:border-[#5FAE2E] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#5FAE2E]/15">
                      <div className="flex items-center gap-1 bg-slate-100/80 px-3.5 py-3 border-r border-slate-200 text-xs font-extrabold text-slate-700 select-none shrink-0">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => {
                          const numeric = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setPhone(numeric);
                        }}
                        onBlur={() => handleBlur("phone")}
                        placeholder="7218935073"
                        className="w-full bg-transparent py-3 px-3.5 text-sm font-semibold outline-none"
                      />
                    </div>
                    <p className="mt-1 text-[11px] font-medium text-slate-500">
                      Please enter a valid mobile number for future updates and communication.
                    </p>
                    {touched.phone && errors.phone && (
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-red-500">
                        <AlertCircle className="h-3 w-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Passwords Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 6. Password */}
                    <div className="group">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-1.5">
                        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#5FAE2E]" />
                        <input
                          type={showPw ? "text" : "password"}
                          value={pw}
                          onChange={(e) => setPw(e.target.value)}
                          onBlur={() => handleBlur("pw")}
                          placeholder="••••••••"
                          className={`w-full rounded-xl border py-3 pl-10 pr-9 text-sm font-semibold outline-none transition-all focus:bg-white ${
                            touched.pw && errors.pw
                              ? "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                              : "border-slate-200/90 bg-slate-50/60 focus:border-[#5FAE2E] focus:ring-4 focus:ring-[#5FAE2E]/15"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw(!showPw)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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

                    {/* 7. Confirm Password */}
                    <div className="group">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-1.5">
                        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#5FAE2E]" />
                        <input
                          type={showPwConfirm ? "text" : "password"}
                          value={pwConfirm}
                          onChange={(e) => setPwConfirm(e.target.value)}
                          onBlur={() => handleBlur("pwConfirm")}
                          placeholder="••••••••"
                          className={`w-full rounded-xl border py-3 pl-10 pr-9 text-sm font-semibold outline-none transition-all focus:bg-white ${
                            touched.pwConfirm && errors.pwConfirm
                              ? "border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                              : "border-slate-200/90 bg-slate-50/60 focus:border-[#5FAE2E] focus:ring-4 focus:ring-[#5FAE2E]/15"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPwConfirm(!showPwConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPwConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {touched.pwConfirm && errors.pwConfirm && (
                        <p className="mt-1 flex items-center gap-1 text-[11px] font-bold text-red-500">
                          <AlertCircle className="h-3 w-3" /> {errors.pwConfirm}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password Requirements Bar */}
                  {pw.length > 0 && (
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/80 text-xs space-y-1">
                      <p className="font-extrabold text-slate-700">Password Checklist:</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        <ReqItem label="8+ characters" met={reqLength} />
                        <ReqItem label="One uppercase" met={reqUpper} />
                        <ReqItem label="One number" met={reqNumber} />
                        <ReqItem label="One special char" met={reqSpecial} />
                      </div>
                    </div>
                  )}

                  {/* Primary CTA */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#5FAE2E] text-base font-extrabold text-white shadow-[0_8px_25px_rgba(95,174,46,0.3)] transition-all duration-300 hover:bg-[#529927] hover:shadow-[0_12px_35px_rgba(95,174,46,0.4)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <RefreshCw className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <span>Send OTP</span>
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Micro Copy */}
                  <p className="text-center text-xs text-slate-500 font-medium">
                    No lock-in. Cancel or pause in one tap.
                  </p>
                </form>
              )}

              {/* STEP 1: VERIFY OTP */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Verify Your Email
                    </h2>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-medium">
                      Enter the 4-digit OTP code sent to <span className="font-bold text-[#5FAE2E]">{email || storage.getItem(KEYS.EMAIL) || "your email address"}</span>.
                    </p>
                  </div>

                  {/* 4-Digit OTP Box */}
                  <div className="flex justify-center gap-3 py-3" onPaste={handlePasteOtp}>
                    {otp.map((d, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => onOtpChange(i, e.target.value)}
                        onKeyDown={(e) => onOtpKeyDown(i, e)}
                        className={`h-14 w-14 rounded-xl border-2 text-center text-xl font-extrabold text-slate-900 outline-none transition-all ${
                          d ? "border-[#5FAE2E] bg-white shadow-xs" : "border-slate-200 bg-slate-50/50"
                        } focus:border-[#5FAE2E] focus:bg-white focus:ring-4 focus:ring-[#5FAE2E]/15`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500">
                    <ShieldCheck className="h-4 w-4 text-[#5FAE2E]" />
                    Secured with 256-bit encryption
                  </div>

                  <p className="text-center text-xs text-slate-500 font-medium">
                    Didn't receive code?{" "}
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="font-bold text-[#5FAE2E] hover:underline disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </p>

                  <button
                    onClick={handleVerifyOtp}
                    disabled={!otpFilled || isLoading}
                    className={`group flex h-[54px] w-full items-center justify-center gap-2 rounded-[14px] text-base font-extrabold transition-all duration-300 ${
                      otpFilled && !isLoading
                        ? "bg-[#5FAE2E] text-white shadow-[0_8px_25px_rgba(95,174,46,0.3)] hover:bg-[#529927]"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-70"
                    }`}
                  >
                    {isLoading ? (
                      <RefreshCw className="h-5 w-5 animate-spin text-white" />
                    ) : (
                      <>
                        <span>Verify & Continue</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* STEP 2: COMPANY */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Choose Your Company
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
                      Select your verified employer from our office network.
                    </p>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={companySearch}
                      onChange={(e) => setCompanySearch(e.target.value)}
                      placeholder="Search company..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm font-semibold outline-none focus:border-[#5FAE2E] focus:bg-white focus:ring-4 focus:ring-[#5FAE2E]/10"
                    />
                  </div>

                  {isFetchingCompanies ? (
                    <div className="flex items-center justify-center py-10">
                      <RefreshCw className="h-7 w-7 animate-spin text-[#5FAE2E]" />
                    </div>
                  ) : (
                    <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                      {companyList
                        .filter((c) => c.companyName.toLowerCase().includes(companySearch.toLowerCase()))
                        .map((c) => {
                          const isSelected = selectedCompanyObj?.companyId === c.companyId;
                          return (
                            <button
                              key={c.companyId}
                              type="button"
                              onClick={() => setSelectedCompanyObj(c)}
                              className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm font-semibold transition-all ${
                                isSelected
                                  ? "border-[#5FAE2E] bg-emerald-50/60 text-[#5FAE2E] shadow-xs"
                                  : "border-slate-100 hover:border-emerald-200 hover:bg-slate-50"
                              }`}
                            >
                              <Building2 className="h-4 w-4 shrink-0" />
                              <span>{c.companyName}</span>
                              {isSelected && <CheckCircle2 className="ml-auto h-4 w-4 text-[#5FAE2E]" />}
                            </button>
                          );
                        })}
                    </div>
                  )}

                  <button
                    onClick={handleSaveCompany}
                    disabled={!selectedCompanyObj || isLoading}
                    className={`group flex h-[54px] w-full items-center justify-center gap-2 rounded-[14px] text-base font-extrabold transition-all duration-300 ${
                      selectedCompanyObj && !isLoading
                        ? "bg-[#5FAE2E] text-white shadow-[0_8px_25px_rgba(95,174,46,0.3)] hover:bg-[#529927]"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-70"
                    }`}
                  >
                    {isLoading ? (
                      <RefreshCw className="h-5 w-5 animate-spin text-white" />
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* STEP 3: LOCATION */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Office Location
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
                      Select your exact floor and reception desk.
                    </p>
                  </div>

                  {isFetchingLocations ? (
                    <div className="flex items-center justify-center py-10">
                      <RefreshCw className="h-7 w-7 animate-spin text-[#5FAE2E]" />
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {locationList.map((l) => {
                        const isSelected = selectedLocationObj?.locationId === l.locationId;
                        return (
                          <button
                            key={l.locationId}
                            type="button"
                            onClick={() => setSelectedLocationObj(l)}
                            className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm font-semibold transition-all ${
                              isSelected
                                ? "border-[#5FAE2E] bg-emerald-50/60 text-[#5FAE2E] shadow-xs"
                                : "border-slate-100 hover:border-emerald-200 hover:bg-slate-50"
                            }`}
                          >
                            <MapPin className="h-4 w-4 shrink-0" />
                            <div>
                              <div>{l.locationName}</div>
                              {l.address && <div className="text-xs text-slate-500 font-normal">{l.address}</div>}
                            </div>
                            {isSelected && <CheckCircle2 className="ml-auto h-4 w-4 text-[#5FAE2E]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <button
                    onClick={handleSaveLocation}
                    disabled={!selectedLocationObj || isLoading}
                    className={`group flex h-[54px] w-full items-center justify-center gap-2 rounded-[14px] text-base font-extrabold transition-all duration-300 ${
                      selectedLocationObj && !isLoading
                        ? "bg-[#5FAE2E] text-white shadow-[0_8px_25px_rgba(95,174,46,0.3)] hover:bg-[#529927]"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-70"
                    }`}
                  >
                    {isLoading ? (
                      <RefreshCw className="h-5 w-5 animate-spin text-white" />
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* STEP 4: PLAN */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Select Your Plan
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
                      Choose your subscription schedule. Pause or change anytime.
                    </p>
                  </div>

                  {isFetchingPlans ? (
                    <div className="flex items-center justify-center py-10">
                      <RefreshCw className="h-7 w-7 animate-spin text-[#5FAE2E]" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {apiPlans.length > 0
                        ? apiPlans.map((p) => {
                            const isSelected = selectedPlanObj?.planId === p.planId;
                            return (
                              <button
                                key={p.planId}
                                type="button"
                                onClick={() => {
                                  setSelectedPlanObj(p);
                                  storage.setItem(KEYS.PLAN_ID, p.planId);
                                }}
                                className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                                  isSelected
                                    ? "border-[#5FAE2E] bg-emerald-50/60 shadow-sm"
                                    : "border-slate-200 bg-white hover:border-emerald-200"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-base font-extrabold text-slate-900">{p.planName}</span>
                                    {p.isPopular && (
                                      <span className="ml-2 text-xs font-bold text-[#5FAE2E] bg-emerald-100/70 px-2 py-0.5 rounded-full">
                                        Popular
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xl font-black text-[#5FAE2E]">
                                      ₹{p.finalAmount ?? p.price}
                                    </span>
                                    <span className="text-xs text-slate-400 font-medium ml-1">
                                      {p.tiffinCount ? `/ ${p.tiffinCount} Tiffins` : "/ month"}
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11.5px] font-semibold text-slate-700">
                                  <div className="flex items-center gap-1">🚚 Delivery: Monday – Friday</div>
                                  <div className="flex items-center gap-1">🌰 Daily soaked almonds</div>
                                  <div className="flex items-center gap-1">🍎 6+ fresh seasonal fruits</div>
                                  <div className="flex items-center gap-1">🍴 Washed & ready to eat</div>
                                  <div className="flex items-center gap-1">🏢 Direct desk delivery</div>
                                  <div className="flex items-center gap-1">🔄 Renew anytime</div>
                                  <div className="flex items-center gap-1 sm:col-span-2">⏸️ Pause or skip anytime</div>
                                </div>
                              </button>
                            );
                          })
                        : mockPlans.filter((p) => p.id !== "custom").map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setSelectedMockPlanId(p.id)}
                              className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                                selectedMockPlanId === p.id
                                  ? "border-[#5FAE2E] bg-emerald-50/60 shadow-sm"
                                  : "border-slate-200 bg-white hover:border-emerald-200"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-base font-extrabold text-slate-900">{p.name} Plan</span>
                                  <span className="ml-2 text-xs font-bold text-[#5FAE2E] bg-emerald-100/70 px-2 py-0.5 rounded-full">
                                    {p.tagline}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-xl font-black text-[#5FAE2E]">₹{p.price}</span>
                                  <span className="text-xs text-slate-400 font-medium ml-1">{p.period}</span>
                                </div>
                              </div>

                              <div className="mt-3 pt-3 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11.5px] font-semibold text-slate-700">
                                <div className="flex items-center gap-1">🚚 Delivery: Monday – Friday</div>
                                <div className="flex items-center gap-1">🌰 Daily soaked almonds</div>
                                <div className="flex items-center gap-1">🍎 6+ fresh seasonal fruits</div>
                                <div className="flex items-center gap-1">🍴 Washed & ready to eat</div>
                                <div className="flex items-center gap-1">🏢 Direct desk delivery</div>
                                <div className="flex items-center gap-1">🔄 Renew anytime</div>
                                <div className="flex items-center gap-1 sm:col-span-2">⏸️ Pause or skip anytime</div>
                              </div>
                            </button>
                          ))}
                    </div>
                  )}

                  <button
                    onClick={handleSavePlan}
                    disabled={isLoading}
                    className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#5FAE2E] text-base font-extrabold text-white shadow-[0_8px_25px_rgba(95,174,46,0.3)] transition-all duration-300 hover:bg-[#529927] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <RefreshCw className="h-5 w-5 animate-spin text-white" />
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* STEP 5: START DATE + SUMMARY */}
              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Choose Start Date
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
                      When should your first fruit box arrive?
                    </p>
                  </div>

                  <div className="relative">
                    <CalendarDays className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm font-semibold outline-none focus:border-[#5FAE2E] focus:bg-white focus:ring-4 focus:ring-[#5FAE2E]/10"
                    />
                  </div>

                  {/* Summary Card */}
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-[#5FAE2E]">
                        Order Summary
                      </p>
                      {isPaid && (
                        <span className="flex items-center gap-1 text-[11px] font-extrabold text-[#5FAE2E] bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3" /> Paid ✓
                        </span>
                      )}
                    </div>
                    <SummaryItem icon={User} label="Name" value={fullName || storage.getItem(KEYS.EMAIL) || "—"} />
                    <SummaryItem icon={Building2} label="Company" value={selectedCompanyObj?.companyName || "—"} />
                    <SummaryItem icon={MapPin} label="Location" value={selectedLocationObj?.locationName || "—"} />
                    <SummaryItem
                      icon={Sparkles}
                      label="Plan"
                      value={selectedPlanObj?.planName || (currentPlan && "name" in currentPlan ? (currentPlan as any).name : "—")}
                    />
                    <SummaryItem icon={CalendarDays} label="Start Date" value={date || "—"} />

                    <div className="flex items-center justify-between border-t border-emerald-200/60 pt-2.5 mt-2">
                      <span className="font-extrabold text-slate-900">Total</span>
                      <span className="font-black text-xl text-[#5FAE2E]">
                        ₹{selectedPlanObj?.finalAmount ?? selectedPlanObj?.price ?? (currentPlan && "price" in currentPlan ? currentPlan.price : 0)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (isPaid) {
                        navigate("/dashboard", { replace: true });
                      } else {
                        handleRazorpayCheckout();
                      }
                    }}
                    disabled={isLoading}
                    className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#5FAE2E] text-base font-extrabold text-white shadow-[0_8px_25px_rgba(95,174,46,0.3)] transition-all duration-300 hover:bg-[#529927] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <RefreshCw className="h-5 w-5 animate-spin text-white" />
                    ) : isPaid ? (
                      <>
                        <span>Go to Dashboard</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </>
                    ) : (
                      <>
                        <span>Pay & Complete Registration</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Back Button */}
              {step > 0 && (
                <button
                  type="button"
                  onClick={back}
                  className="mt-4 flex items-center gap-1.5 text-xs font-bold text-slate-600 transition-colors hover:text-[#5FAE2E]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Already Have An Account */}
          <div className="mt-6 pt-4 border-t border-slate-200/70 text-center text-xs font-medium text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-extrabold text-[#5FAE2E] hover:underline">
              Sign in
            </Link>
          </div>

        </div>
      </div>

      {/* ─── FOOTER NAVIGATION ───────────────── */}
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

function ReqItem({ label, met }: { label: string; met: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
          met ? "bg-[#5FAE2E] text-white" : "bg-slate-200 text-slate-400"
        }`}
      >
        {met ? "✓" : "○"}
      </div>
      <span className={met ? "font-bold text-slate-800" : "text-slate-400"}>{label}</span>
    </div>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-xs font-medium">
      <span className="flex items-center gap-1.5 text-slate-500">
        <Icon className="h-3.5 w-3.5 text-[#5FAE2E]" />
        {label}
      </span>
      <span className="font-bold text-slate-800 truncate max-w-[200px]">{value}</span>
    </div>
  );
}
