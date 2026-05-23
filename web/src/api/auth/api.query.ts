import { mutationOptions } from "@tanstack/react-query";

import { getKakaoLogin } from "./getKakaoLogin";
import { postReissueToken } from "./postReissueToken";

const authQueryKey = ["auth"] as const;

export const authKeys = {
  all: authQueryKey,
  reissue: () => [...authQueryKey, "reissue"] as const,
};

export const authQueries = {
  keys: authKeys,

  kakaoLoginMutation: () =>
    mutationOptions({
      mutationFn: async (code: string) => {
        const res = await getKakaoLogin(code);
        if (!res.ok) throw new Error("카카오 로그인에 실패했습니다.");
        return res.data;
      },
    }),

  reissueMutation: () =>
    mutationOptions({
      mutationFn: async () => {
        const res = await postReissueToken();
        if (!res.ok) throw new Error("토큰 재발급에 실패했습니다.");
        return res.data;
      },
    }),
};
