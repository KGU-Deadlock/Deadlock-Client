export interface LoginCredentials {
  provider: "kakao";
  accessToken?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  profileImage?: string;
}
