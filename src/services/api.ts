import { storage } from "@/utils/storage";

const BASE_URL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "/api/v1"
    : "https://fruitboostapi.tinytalent.in/api/v1";

export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

let isRefreshing = false;
let refreshSubscribers: Array<(token: string | null) => void> = [];
let onAuthFailedCallback: (() => void) | null = null;

export function setOnAuthFailed(cb: () => void) {
  onAuthFailedCallback = cb;
}

function subscribeTokenRefresh(cb: (token: string | null) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string | null) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

async function handleResponse<T>(response: Response): Promise<T> {
  let data: any = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    let errorMessage = "Something went wrong. Please try again.";

    if (response.status === 400) {
      errorMessage = data?.message || data?.title || "Invalid request.";
    } else if (response.status === 401) {
      errorMessage = "Unauthorized access. Please sign in again.";
    } else if (response.status === 404) {
      errorMessage = "Resource not found.";
    } else if (response.status === 502 || response.status === 503 || response.status === 504) {
      errorMessage = "The backend API server is currently unavailable (502 Bad Gateway). Please try again in a few moments.";
    } else if (response.status === 500) {
      errorMessage = data?.message || "Server error occurred. Please try again.";
    } else if (data && data.message) {
      errorMessage = data.message;
    }

    throw new ApiError(errorMessage, response.status, data);
  }

  return data as T;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  const token = storage.getAccessToken();
  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      const isAuthEndpoint =
        endpoint.includes("/Auth/refresh") ||
        endpoint.includes("/Auth/login") ||
        endpoint.includes("/Users/login") ||
        endpoint.includes("/Users/register");

      if (isAuthEndpoint) {
        return await handleResponse<T>(response);
      }

      const refreshToken = storage.getRefreshToken();
      if (!refreshToken) {
        storage.clearAuthData();
        if (onAuthFailedCallback) onAuthFailedCallback();
        return await handleResponse<T>(response);
      }

      if (isRefreshing) {
        return new Promise<T>((resolve, reject) => {
          subscribeTokenRefresh(async (newToken) => {
            if (!newToken) {
              reject(new ApiError("Session expired. Please sign in again.", 401));
              return;
            }
            try {
              const retryHeaders = {
                ...headers,
                Authorization: `Bearer ${newToken}`,
              };
              const retryRes = await fetch(url, {
                ...options,
                headers: retryHeaders,
              });
              resolve(await handleResponse<T>(retryRes));
            } catch (err) {
              reject(err);
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshRes = await fetch(`${BASE_URL}/Auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refreshToken,
            accessToken: token || "",
          }),
        });

        let refreshData: any = null;
        if (refreshRes.ok) {
          try {
            refreshData = await refreshRes.json();
          } catch {}
        }

        const newAuth = refreshData?.data || refreshData;
        const newAccessToken = newAuth?.accessToken || newAuth?.data?.accessToken;

        if (!refreshRes.ok || !newAccessToken) {
          isRefreshing = false;
          onRefreshed(null);
          storage.clearAuthData();
          if (onAuthFailedCallback) onAuthFailedCallback();
          throw new ApiError("Session expired. Please sign in again.", 401);
        }

        storage.setAuthData(newAuth);
        isRefreshing = false;
        onRefreshed(newAccessToken);

        const retryHeaders = {
          ...headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        const retryRes = await fetch(url, {
          ...options,
          headers: retryHeaders,
        });
        return await handleResponse<T>(retryRes);
      } catch (error) {
        isRefreshing = false;
        onRefreshed(null);
        storage.clearAuthData();
        if (onAuthFailedCallback) onAuthFailedCallback();
        throw error instanceof ApiError
          ? error
          : new ApiError("Session expired. Please sign in again.", 401);
      }
    }

    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Network error. Please check your connection.",
      0
    );
  }
}

// ----------------------------------------------------
// API Types & Interfaces
// ----------------------------------------------------

export interface RegisterUserRequest {
  fullName: string;
  dob: string;
  gender: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterUserResponseData {
  userId: number;
  userCode: string;
  fullName: string;
  email: string;
  mobile?: string;
  phoneNumber?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface AuthResponseData {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiry?: string;
  refreshTokenExpiry?: string;
  userId?: number;
  userCode?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  accessRoleId?: number;
  registrationStep?: number;
  [key: string]: any;
}

export interface VerifyOtpRequest {
  userId: number;
  otp: string;
}

export interface SendOtpRequest {
  userId: number;
}

export interface ApiCompany {
  companyId: number;
  companyName: string;
}

export interface UpdateCompanyRequest {
  companyId: number;
}

export interface ApiCompanyLocation {
  locationId: number;
  companyId: number;
  locationName: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  googleMapLink?: string;
  contactPerson?: string;
  mobile?: string;
}

export interface UpdateLocationRequest {
  locationId: number;
}

export interface ApiSubscriptionPlan {
  planId: number;
  planName: string;
  tiffinCount?: number;
  price: number;
  discount?: number;
  finalAmount?: number;
  description?: string;
  isPopular?: boolean;
}

export interface CreatePaymentOrderRequest {
  userId: number;
  planId: number;
}

export interface VerifyPaymentRequest {
  userId: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface LoginRequest {
  emailOrMobile: string;
  password: string;
}

// ----------------------------------------------------
// API Methods
// ----------------------------------------------------

export const apiService = {
  // Auth Methods
  login: async (payload: LoginRequest): Promise<ApiResponse<AuthResponseData>> => {
    return apiFetch<ApiResponse<AuthResponseData>>("/Users/login", {
      method: "POST",
      body: JSON.stringify({
        emailOrMobile: payload.emailOrMobile,
        password: payload.password,
      }),
    });
  },

  getCurrentUser: async (): Promise<ApiResponse<AuthResponseData> | AuthResponseData> => {
    return apiFetch<ApiResponse<AuthResponseData> | AuthResponseData>("/Auth/me", {
      method: "GET",
    });
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthResponseData> | AuthResponseData> => {
    return apiFetch<ApiResponse<AuthResponseData> | AuthResponseData>("/Auth/refresh", {
      method: "POST",
      body: JSON.stringify({
        refreshToken,
        accessToken: storage.getAccessToken() || "",
      }),
    });
  },

  logoutBackend: async (): Promise<void> => {
    try {
      await apiFetch("/Auth/logout", {
        method: "POST",
      });
    } catch {
      // Ignore logout backend errors gracefully
    }
  },

  // Step 1: Register User
  register: async (payload: RegisterUserRequest): Promise<ApiResponse<RegisterUserResponseData>> => {
    return apiFetch<ApiResponse<RegisterUserResponseData>>("/Users/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Step 2: Verify OTP
  verifyOtp: async (payload: VerifyOtpRequest): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>("/Users/verify-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Step 3: Send / Resend OTP
  sendOtp: async (payload: SendOtpRequest): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>("/Users/send-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Step 4: Load Companies
  getCompanies: async (): Promise<ApiResponse<ApiCompany[]> | ApiCompany[]> => {
    return apiFetch<ApiResponse<ApiCompany[]> | ApiCompany[]>("/Companies", {
      method: "GET",
    });
  },

  // Step 4: Save Company
  updateCompany: async (userId: number, companyId: number): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>(`/Users/${userId}/company`, {
      method: "PUT",
      body: JSON.stringify({ companyId }),
    });
  },

  // Step 5: Load Company Locations
  getCompanyLocations: async (companyId: number): Promise<ApiResponse<ApiCompanyLocation[]> | ApiCompanyLocation[]> => {
    return apiFetch<ApiResponse<ApiCompanyLocation[]> | ApiCompanyLocation[]>(`/CompanyLocations/company/${companyId}`, {
      method: "GET",
    });
  },

  // Step 5: Save Location
  updateLocation: async (userId: number, locationId: number): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>(`/Users/${userId}/location`, {
      method: "PUT",
      body: JSON.stringify({ locationId }),
    });
  },

  // Step 6: Load Subscription Plans
  getSubscriptionPlans: async (): Promise<ApiResponse<ApiSubscriptionPlan[]> | ApiSubscriptionPlan[]> => {
    return apiFetch<ApiResponse<ApiSubscriptionPlan[]> | ApiSubscriptionPlan[]>("/SubscriptionPlans", {
      method: "GET",
    });
  },

  // Step 7: Create Payment Order
  createPaymentOrder: async (userId: number, planId: number): Promise<ApiResponse> => {
    return apiFetch<ApiResponse>("/Payments/create-order", {
      method: "POST",
      body: JSON.stringify({ userId, planId }),
    });
  },

  // Step 8: Verify Payment
  verifyPayment: async (payload: VerifyPaymentRequest): Promise<ApiResponse<AuthResponseData> | AuthResponseData> => {
    return apiFetch<ApiResponse<AuthResponseData> | AuthResponseData>("/Payments/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};

