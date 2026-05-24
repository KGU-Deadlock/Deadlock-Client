import { mutationOptions, queryOptions } from "@tanstack/react-query";

import { getDevToken } from "./getDevToken";
import { postKakaoLogin } from "./postKakaoLogin";
import { postReissueToken } from "./postReissueToken";

const authQueryKey = ["auth"] as const;

export const authKeys = {
  all: authQueryKey,
  devToken: () => [...authQueryKey, "devToken"] as const,
  reissue: () => [...authQueryKey, "reissue"] as const,
};

export const authQueries = {
  keys: authKeys,

  getDevTokenQuery: () =>
    queryOptions({
      queryKey: authKeys.devToken(),
      queryFn: async () => {
        const res = await getDevToken();
        if (!res.ok) throw new Error("개발용 토큰 조회에 실패했습니다.");
        return res.data;
      },
      enabled: false,
    }),

  kakaoLoginMutation: () =>
    mutationOptions({
      mutationFn: async (code: string) => {
        const res = await postKakaoLogin(code);
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
