const KEYS = {
  TOKEN: "auth:token",
  USER_NAME: "auth:name",
  IS_INITIALIZED: "auth:initialized",
  IS_LOGGED_OUT: "auth:loggedOut",
} as const;

export const AUTH_LOGOUT_EVENT = "auth:logout";

export const tokenStorage = {
  getToken: (): string | null => localStorage.getItem(KEYS.TOKEN),

  setToken: (token: string): void => {
    localStorage.setItem(KEYS.TOKEN, token);
  },

  getUserName: (): string | null => localStorage.getItem(KEYS.USER_NAME),

  getIsInitialized: (): boolean =>
    localStorage.getItem(KEYS.IS_INITIALIZED) === "true",

  setIsInitialized: (value: boolean): void => {
    localStorage.setItem(KEYS.IS_INITIALIZED, String(value));
  },

  getIsLoggedOut: (): boolean =>
    localStorage.getItem(KEYS.IS_LOGGED_OUT) === "true",

  setLoginState: (params: {
    accessToken: string;
    isInitialized: boolean;
    userName?: string;
  }): void => {
    localStorage.setItem(KEYS.TOKEN, params.accessToken);
    localStorage.setItem(KEYS.IS_INITIALIZED, String(params.isInitialized));
    localStorage.removeItem(KEYS.IS_LOGGED_OUT);
    if (params.userName != null) {
      localStorage.setItem(KEYS.USER_NAME, params.userName);
    } else {
      localStorage.removeItem(KEYS.USER_NAME);
    }
  },

  logout: (): void => {
    localStorage.removeItem(KEYS.TOKEN);
    localStorage.removeItem(KEYS.USER_NAME);
    localStorage.removeItem(KEYS.IS_INITIALIZED);
    localStorage.setItem(KEYS.IS_LOGGED_OUT, "true");
    window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
  },
};
