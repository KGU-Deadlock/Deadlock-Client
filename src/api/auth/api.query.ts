import { mutationOptions, queryOptions } from "@tanstack/react-query";

import { getKakaoLogin } from "./getKakaoLogin";
import { postReissueToken } from "./postReissueToken";

const authQueryKey = ["auth"] as const;

export const authKeys = {
  all: authQueryKey,
  kakaoLogin: () => [...authQueryKey, "kakao-login"] as const,
  reissue: () => [...authQueryKey, "reissue"] as const,
};

export const authQueries = {
  keys: authKeys,

  kakaoLoginQuery: () =>
    queryOptions({
      queryKey: authKeys.kakaoLogin(),
      queryFn: async () => {
        const res = await getKakaoLogin();
        if (!res.ok) throw new Error("카카오 로그인 시작에 실패했습니다.");
        return res.data;
      },
      enabled: false,
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
