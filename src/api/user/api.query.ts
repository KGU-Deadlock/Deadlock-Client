import { mutationOptions, queryOptions } from "@tanstack/react-query";

import { deleteUserWithdraw } from "./deleteUserWithdraw";
import { getUserProfile } from "./getUserProfile";
import { patchUserProfile } from "./patchUserProfile";
import { postUserJoin } from "./postUserJoin";
import type { UpdateMyInfoCommand, UserSignUpCommand } from "./api.model";

const userQueryKey = ["user"] as const;

export const userKeys = {
  all: userQueryKey,
  profile: () => [...userQueryKey, "profile"] as const,
};

export const userQueries = {
  keys: userKeys,

  getUserProfileQuery: () =>
    queryOptions({
      queryKey: userKeys.profile(),
      queryFn: async () => {
        const res = await getUserProfile();
        if (!res.ok) throw new Error("프로필 조회에 실패했습니다.");
        return res.data;
      },
    }),

  postUserJoinMutation: () =>
    mutationOptions({
      mutationFn: async (body: UserSignUpCommand) => {
        const res = await postUserJoin(body);
        if (!res.ok) throw new Error("회원가입에 실패했습니다.");
        return res.data;
      },
    }),

  patchUserProfileMutation: () =>
    mutationOptions({
      mutationFn: async (body: UpdateMyInfoCommand) => {
        const res = await patchUserProfile(body);
        if (!res.ok) throw new Error("프로필 수정에 실패했습니다.");
        return res.data;
      },
    }),

  deleteUserWithdrawMutation: () =>
    mutationOptions({
      mutationFn: async () => {
        const res = await deleteUserWithdraw();
        if (!res.ok) throw new Error("회원 탈퇴에 실패했습니다.");
        return res.data;
      },
    }),
};
