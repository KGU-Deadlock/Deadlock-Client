import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken?: string;
  isInitialized: boolean;
  isLoggedOut: boolean;
  userName?: string;
  setAccessToken: (token: string | undefined) => void;
  setIsInitialized: (value: boolean) => void;
  setLoggedOut: (value: boolean) => void;
  setUserName: (name: string | undefined) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: undefined,
      isInitialized: false,
      isLoggedOut: false,
      userName: undefined,
      setAccessToken: (accessToken) =>
        set((state) => ({
          accessToken,
          isLoggedOut: accessToken ? false : state.isLoggedOut,
        })),
      setIsInitialized: (isInitialized) => set({ isInitialized }),
      setLoggedOut: (isLoggedOut) => set({ isLoggedOut }),
      setUserName: (userName) => set({ userName }),
      logout: () =>
        set({
          accessToken: undefined,
          isInitialized: false,
          isLoggedOut: true,
          userName: undefined,
        }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        isInitialized: state.isInitialized,
        isLoggedOut: state.isLoggedOut,
        userName: state.userName,
      }),
    },
  ),
);
