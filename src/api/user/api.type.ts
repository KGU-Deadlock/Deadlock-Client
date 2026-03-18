import type { ApiResponseVoid, GetMyProfileResponse } from "./api.model";

export type MyProfileData = NonNullable<GetMyProfileResponse["data"]>;
export type VoidData = NonNullable<ApiResponseVoid["data"]>;
