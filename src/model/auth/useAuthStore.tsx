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
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ODAzODQzMzk5IiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc3NDA5NTY5NCwiZXhwIjoxNzc0MDk5Mjk0LCJyb2xlIjoiVVNFUiJ9._26o9m7oRaQiABalHRpnK3QUZvs3ZZ09I665cC75cLU",
  isInitialized: true,
  setAccessToken: (accessToken) => set({ accessToken }),
  setIsInitialized: (isInitialized) => set({ isInitialized }),
  logout: () =>
    set({
      accessToken: undefined,
      isInitialized: false,
    }),
}));
