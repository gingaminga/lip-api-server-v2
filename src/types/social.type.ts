export type TSocialType = "kakao" | "naver" | "google";

export interface ISocialToken {
  accessToken: string;
  refreshToken?: string;
}

export interface ISocialUserCommonInfo {
  email?: string;
  key: string;
  nickname: string;
}

export interface ISocialUserInfo extends ISocialUserCommonInfo, ISocialToken {}

export interface ISocial {
  getCallbackURL(): string;
  getToken(code: string): Promise<ISocialToken>;
  getUserInfo(): Promise<ISocialUserCommonInfo>;
  setAccessToken(token: string): void;
}
