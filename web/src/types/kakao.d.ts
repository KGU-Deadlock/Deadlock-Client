declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: {
          redirectUri: string;
          state?: string;
          scope?: string;
          throughTalk?: boolean;
        }) => void;
        getAccessToken: () => string | null;
        setAccessToken: (token: string) => void;
      };
    };
  }
}

export {};
