import type {
  ApiResponseVoid,
  GetMyProfileResponse,
  UserSignUpCommand,
} from "./api.model";

export type MyProfileData = NonNullable<GetMyProfileResponse["data"]>;
export type VoidData = NonNullable<ApiResponseVoid["data"]>;
export type QuizLevel = NonNullable<UserSignUpCommand["quizLevel"]>;
