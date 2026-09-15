import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto flex items-center gap-3 rounded-2xl p-4 shadow-xl border backdrop-blur-md transition-all ${
              toast.type === "success"
                ? "bg-white/95 border-emerald-200 text-slate-800 shadow-emerald-500/10"
                : toast.type === "error"
                ? "bg-white/95 border-red-200 text-slate-800 shadow-red-500/10"
                : "bg-white/95 border-slate-200 text-slate-800"
            }`}
          >
            <div className="shrink-0">
              {toast.type === "success" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-[#5FAE2E]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
              {toast.type === "error" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
              )}
              {toast.type === "info" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="flex-1 text-xs sm:text-sm font-semibold leading-snug">
              {toast.message}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
