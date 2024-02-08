import User from "@my-rdb/entities/user.entity";

export interface ISocialLoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: User;
}
