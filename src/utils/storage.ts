// LocalStorage helper utilities for FruitBoost app

export const KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  ACCESS_TOKEN_EXPIRY: "accessTokenExpiry",
  REFRESH_TOKEN_EXPIRY: "refreshTokenExpiry",
  USER_DATA: "userData",
  USER_ID: "userId",
  USER_CODE: "userCode",
  EMAIL: "email",
  MOBILE: "mobile",
  ACCESS_ROLE_ID: "accessRoleId",
  REGISTRATION_STEP: "registrationStep",
  COMPANY_ID: "companyId",
  LOCATION_ID: "locationId",
  PLAN_ID: "planId",
  SUBSCRIPTION_STATUS: "subscriptionStatus",
} as const;

export interface StoredUserData {
  userId?: number;
  userCode?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  phoneNumber?: string;
  accessRoleId?: number;
  registrationStep?: number;
  [key: string]: any;
}

export const storage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string | number | boolean): void => {
    try {
      localStorage.setItem(key, String(value));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Failed to remove from localStorage:", e);
    }
  },
  getAccessToken: (): string | null => {
    return storage.getItem(KEYS.ACCESS_TOKEN);
  },
  getRefreshToken: (): string | null => {
    return storage.getItem(KEYS.REFRESH_TOKEN);
  },
  getAccessTokenExpiry: (): string | null => {
    return storage.getItem(KEYS.ACCESS_TOKEN_EXPIRY);
  },
  getRefreshTokenExpiry: (): string | null => {
    return storage.getItem(KEYS.REFRESH_TOKEN_EXPIRY);
  },
  getUserData: (): StoredUserData | null => {
    const raw = storage.getItem(KEYS.USER_DATA);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  getUserId: (): number | null => {
    const id = storage.getItem(KEYS.USER_ID);
    if (id) return Number(id);
    const user = storage.getUserData();
    return user?.userId ? Number(user.userId) : null;
  },
  getCompanyId: (): number | null => {
    const id = storage.getItem(KEYS.COMPANY_ID);
    return id ? Number(id) : null;
  },
  getLocationId: (): number | null => {
    const id = storage.getItem(KEYS.LOCATION_ID);
    return id ? Number(id) : null;
  },
  getPlanId: (): number | null => {
    const id = storage.getItem(KEYS.PLAN_ID);
    return id ? Number(id) : null;
  },
  setAuthData: (authResponse: {
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
    user?: StoredUserData;
    data?: any;
    [key: string]: any;
  }): void => {
    const data = authResponse.data || authResponse;
    const token = data.accessToken || authResponse.accessToken;
    const refresh = data.refreshToken || authResponse.refreshToken;
    const accessExpiry = data.accessTokenExpiry || authResponse.accessTokenExpiry;
    const refreshExpiry = data.refreshTokenExpiry || authResponse.refreshTokenExpiry;

    if (token) storage.setItem(KEYS.ACCESS_TOKEN, token);
    if (refresh) storage.setItem(KEYS.REFRESH_TOKEN, refresh);
    if (accessExpiry) storage.setItem(KEYS.ACCESS_TOKEN_EXPIRY, accessExpiry);
    if (refreshExpiry) storage.setItem(KEYS.REFRESH_TOKEN_EXPIRY, refreshExpiry);

    const userId = data.userId ?? authResponse.userId;
    const userCode = data.userCode ?? authResponse.userCode;
    const fullName = data.fullName ?? authResponse.fullName;
    const email = data.email ?? authResponse.email;
    const mobile = data.mobile ?? authResponse.mobile ?? data.phoneNumber ?? authResponse.phoneNumber;
    const accessRoleId = data.accessRoleId ?? authResponse.accessRoleId;
    const registrationStep = data.registrationStep ?? authResponse.registrationStep ?? (authResponse.data && authResponse.data.registrationStep);

    if (userId) storage.setItem(KEYS.USER_ID, userId);
    if (userCode) storage.setItem(KEYS.USER_CODE, userCode);
    if (email) storage.setItem(KEYS.EMAIL, email);
    if (mobile) storage.setItem(KEYS.MOBILE, mobile);
    if (accessRoleId !== undefined) storage.setItem(KEYS.ACCESS_ROLE_ID, accessRoleId);
    if (registrationStep !== undefined) storage.setItem(KEYS.REGISTRATION_STEP, registrationStep);

    const userObj: StoredUserData = {
      ...(storage.getUserData() || {}),
      ...(data.user || {}),
      ...(userId ? { userId: Number(userId) } : {}),
      ...(userCode ? { userCode } : {}),
      ...(fullName ? { fullName } : {}),
      ...(email ? { email } : {}),
      ...(mobile ? { mobile } : {}),
      ...(accessRoleId !== undefined ? { accessRoleId: Number(accessRoleId) } : {}),
      ...(registrationStep !== undefined ? { registrationStep: Number(registrationStep) } : {}),
    };

    storage.setItem(KEYS.USER_DATA, JSON.stringify(userObj));
  },
  clearAuthData: (): void => {
    storage.removeItem(KEYS.ACCESS_TOKEN);
    storage.removeItem(KEYS.REFRESH_TOKEN);
    storage.removeItem(KEYS.ACCESS_TOKEN_EXPIRY);
    storage.removeItem(KEYS.REFRESH_TOKEN_EXPIRY);
    storage.removeItem(KEYS.USER_DATA);
    storage.removeItem(KEYS.USER_ID);
    storage.removeItem(KEYS.USER_CODE);
    storage.removeItem(KEYS.EMAIL);
    storage.removeItem(KEYS.MOBILE);
    storage.removeItem(KEYS.ACCESS_ROLE_ID);
    storage.removeItem(KEYS.REGISTRATION_STEP);
    storage.removeItem(KEYS.SUBSCRIPTION_STATUS);
  },
  clearAll: (): void => {
    Object.values(KEYS).forEach((key) => storage.removeItem(key));
  },
};

