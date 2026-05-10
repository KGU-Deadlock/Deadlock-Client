declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          success: (authObj: { access_token: string }) => void;
          fail?: (err: unknown) => void;
          scope?: string;
        }) => void;
        getAccessToken: () => string | null;
      };
    };
  }
}

export {};
