import type { components } from "@/api/config/api-models";

export type ReissueResponse =
  components["schemas"]["ApiResponseReissueResponse"];
export type ReissueResult = components["schemas"]["ReissueResponse"];

export type KakaoLoginResponse = { accessToken: string; isUser: boolean };
