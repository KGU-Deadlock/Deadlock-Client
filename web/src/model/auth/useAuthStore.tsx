import { create } from "zustand";

interface AuthState {
  accessToken?: string;
  isInitialized: boolean;
  isLoggedOut: boolean;
  setAccessToken: (token: string | undefined) => void;
  setIsInitialized: (value: boolean) => void;
  setLoggedOut: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: undefined,
  isInitialized: false,
  isLoggedOut: false,
  setAccessToken: (accessToken) =>
    set((state) => ({
      accessToken,
      isLoggedOut: accessToken ? false : state.isLoggedOut,
    })),
  setIsInitialized: (isInitialized) => set({ isInitialized }),
  setLoggedOut: (isLoggedOut) => set({ isLoggedOut }),
  logout: () =>
    set({
      accessToken: undefined,
      isInitialized: false,
      isLoggedOut: true,
    }),
}));
