import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import WhyFruitBoost from "@/pages/WhyFruitBoost";
import HowItWorks from "@/pages/HowItWorks";
import Plans from "@/pages/Plans";
import Faq from "@/pages/Faq";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Checkout from "@/pages/Checkout";
import Dashboard from "@/pages/Dashboard";
import TodaysMenu from "@/pages/TodaysMenu";
import DeliveryHistory from "@/pages/DeliveryHistory";
import Subscription from "@/pages/Subscription";
import Invoices from "@/pages/Invoices";
import CalendarPage from "@/pages/CalendarPage";
import SettingsPage from "@/pages/SettingsPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";
import RefundPolicy from "@/pages/RefundPolicy";
import CookiesPolicy from "@/pages/CookiesPolicy";
import ScrollToTop from "@/components/ScrollToTop";

export default function App() {
  const location = useLocation();
  const hideChrome =
    ["/login", "/register", "/checkout"].includes(location.pathname) ||
    location.pathname.startsWith("/dashboard");

  return (
    <div className={`flex min-h-screen flex-col ${hideChrome ? "bg-transparent" : "bg-white"}`}>
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-fruitboost" element={<WhyFruitBoost />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/refunds" element={<RefundPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/menu" element={<TodaysMenu />} />
            <Route path="/dashboard/history" element={<DeliveryHistory />} />
            <Route path="/dashboard/subscription" element={<Subscription />} />
            <Route path="/dashboard/calendar" element={<CalendarPage />} />
            <Route path="/dashboard/invoices" element={<Invoices />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
}
