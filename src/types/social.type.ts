export type TSocialType = "kakao" | "naver" | "google";

export interface ISocial {
  getCallbackURL(): string;
}
