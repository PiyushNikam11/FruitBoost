import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { RefreshCw } from "lucide-react";
import { getRegisterUrlForRegistrationStep } from "@/utils/registration";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFBF7] text-slate-800">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl border border-slate-100 mb-4 animate-pulse">
          <RefreshCw className="h-7 w-7 text-[#5FAE2E] animate-spin" />
        </div>
        <p className="text-xs font-black tracking-wider uppercase text-slate-500">
          Verifying FruitBoost Authentication...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Enforce Role Condition: accessRoleId must be 4
  if (user.accessRoleId !== undefined && Number(user.accessRoleId) !== 4) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Block dashboard access if registration is not completely finished (registrationStep < 6)
  const registrationStep = user.registrationStep !== undefined ? Number(user.registrationStep) : 0;
  if (registrationStep < 6) {
    const targetUrl = getRegisterUrlForRegistrationStep(registrationStep);
    return <Navigate to={targetUrl} replace />;
  }

  return <>{children}</>;
}
