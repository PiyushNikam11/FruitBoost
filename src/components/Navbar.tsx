import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Why Us", to: "/why-fruitboost" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Plans", to: "/plans" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-slate-100 bg-white/90 shadow-xs backdrop-blur-lg" : "bg-white"}`}>
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-brand-gradient-full"
      />

      <nav className="container-x flex h-18 sm:h-20 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <img src="/images/logo.png" alt="FrootBoost Logo" className="h-13 sm:h-16 w-auto object-contain max-h-16" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.to} className="group relative">
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? "text-brand-red" : "text-slate-600 hover:text-brand-green"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-brand-green transition-all duration-300 ${
                        isActive ? "w-5" : "w-0 group-hover:w-4"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn-green !py-2 !px-4 !text-[13px] flex items-center gap-1.5">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
              <button
                type="button"
                onClick={() => logout()}
                className="text-xs font-extrabold text-slate-500 hover:text-red-600 px-2 py-1 transition-colors flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-slate-600 transition-colors hover:text-brand-green">Login</Link>
              <Link to="/register" className="btn-green !py-2 !px-4 !text-[13px]">Get Started</Link>
            </>
          )}
        </div>

        <button className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden border-t border-slate-100 bg-white px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) => `block rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? "bg-green-100 text-brand-green" : "text-slate-700"}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn-green flex-1 flex items-center justify-center gap-1.5">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <button type="button" onClick={() => logout()} className="btn-outline flex-1">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline flex-1">Login</Link>
                <Link to="/register" className="btn-green flex-1">Get Started</Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
