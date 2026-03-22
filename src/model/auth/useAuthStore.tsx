import { create } from "zustand";

interface AuthState {
  accessToken?: string;
  isInitialized: boolean;
  setAccessToken: (token: string | undefined) => void;
  setIsInitialized: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ODAzODQzMzk5IiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc3NDE0NjA3MSwiZXhwIjoxNzc0MTQ5NjcxLCJyb2xlIjoiVVNFUiJ9.4t8lt7ngEOxQVQWE51clF5oS2RV9IJyLvTu1BMdeRSM",
  isInitialized: true,
  setAccessToken: (accessToken) => set({ accessToken }),
  setIsInitialized: (isInitialized) => set({ isInitialized }),
  logout: () =>
    set({
      accessToken: undefined,
      isInitialized: false,
    }),
}));
