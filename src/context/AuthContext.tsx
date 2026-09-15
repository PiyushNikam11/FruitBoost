import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { storage, StoredUserData } from "@/utils/storage";
import { apiService, setOnAuthFailed, AuthResponseData } from "@/services/api";

export interface User extends StoredUserData {
  userId?: number;
  userCode?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  accessRoleId?: number;
  registrationStep?: number;
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (authResponse: AuthResponseData) => void;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => storage.getUserData());
  const [accessToken, setAccessToken] = useState<string | null>(() => storage.getAccessToken());
  const [refreshToken, setRefreshToken] = useState<string | null>(() => storage.getRefreshToken());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!storage.getAccessToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setAuth = useCallback((authResponse: AuthResponseData) => {
    const data = authResponse.data || authResponse;
    const newAccessToken = data.accessToken || authResponse.accessToken || storage.getAccessToken();
    const newRefreshToken = data.refreshToken || authResponse.refreshToken || storage.getRefreshToken();

    storage.setAuthData(authResponse);

    const storedUser = storage.getUserData();
    const updatedUser: User = {
      ...(storedUser || {}),
      userId: data.userId ?? authResponse.userId ?? storedUser?.userId,
      userCode: data.userCode ?? authResponse.userCode ?? storedUser?.userCode,
      fullName: data.fullName ?? authResponse.fullName ?? storedUser?.fullName,
      email: data.email ?? authResponse.email ?? storedUser?.email,
      mobile: data.mobile ?? authResponse.mobile ?? data.phoneNumber ?? authResponse.phoneNumber ?? storedUser?.mobile,
      accessRoleId: data.accessRoleId ?? authResponse.accessRoleId ?? storedUser?.accessRoleId,
      registrationStep: data.registrationStep ?? authResponse.registrationStep ?? storedUser?.registrationStep,
    };

    if (newAccessToken) {
      setAccessToken(newAccessToken);
      setIsAuthenticated(true);
    }
    if (newRefreshToken) {
      setRefreshToken(newRefreshToken);
    }

    setUser(updatedUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiService.logoutBackend();
    } catch {
      // Ignore backend logout errors
    } finally {
      storage.clearAuthData();
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const refreshAuth = useCallback(async (): Promise<boolean> => {
    const storedRefresh = storage.getRefreshToken();
    if (!storedRefresh) {
      await logout();
      return false;
    }

    try {
      const res = await apiService.refreshToken(storedRefresh);
      const data = (res as any).data || res;
      const newToken = data.accessToken;
      if (newToken) {
        setAuth(data);
        return true;
      } else {
        await logout();
        return false;
      }
    } catch {
      await logout();
      return false;
    }
  }, [logout, setAuth]);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    const token = storage.getAccessToken();
    const storedRefresh = storage.getRefreshToken();

    if (!token && !storedRefresh) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    if (token) {
      try {
        const meRes = await apiService.getCurrentUser();
        const meData = (meRes as any).data || meRes;
        if (meData) {
          setAuth(meData);
        }
      } catch (err: any) {
        if (err.status === 401 && storedRefresh) {
          const refreshed = await refreshAuth();
          if (refreshed) {
            try {
              const secondMeRes = await apiService.getCurrentUser();
              const secondMeData = (secondMeRes as any).data || secondMeRes;
              if (secondMeData) setAuth(secondMeData);
            } catch {
              // Keep refreshed state
            }
          }
        } else if (err.status === 401) {
          await logout();
        }
      }
    } else if (storedRefresh) {
      const refreshed = await refreshAuth();
      if (refreshed) {
        try {
          const meRes = await apiService.getCurrentUser();
          const meData = (meRes as any).data || meRes;
          if (meData) setAuth(meData);
        } catch {
          // Keep refreshed state
        }
      }
    }

    setIsLoading(false);
  }, [logout, refreshAuth, setAuth]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    setOnAuthFailed(() => {
      logout();
    });
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        isLoading,
        setAuth,
        logout,
        refreshAuth,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const defaultAuthContext: AuthContextType = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  setAuth: () => {},
  logout: async () => {},
  refreshAuth: async () => false,
  checkAuth: async () => {},
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    return defaultAuthContext;
  }
  return context;
};
