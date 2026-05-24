import type { components } from "@/api/config/api-models";

/** POST /v1/auth/reissue */
export type ReissueResponse = components["schemas"]["AuthTokenResponse"];

export type KakaoLoginResponse = components["schemas"]["AuthTokenResponse"];

/** GET /v1/dev/admin-token */
export type DevTokenResponse =
  components["schemas"]["ApiResponseAdminTokenResponse"];
export type DevTokenResult = components["schemas"]["AdminTokenResponse"];
