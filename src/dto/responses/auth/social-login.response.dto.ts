import User from "@my-rdb/entities/user.entity";
import { ISocialLoginResponse } from "@my-types/responses/auth.response.type";

class SocialLoginResponseDTO {
  accessToken: string;

  refreshToken: string;

  userInfo: Omit<User, "socialKey">;

  constructor({ accessToken, refreshToken, userInfo }: ISocialLoginResponse) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    const { socialKey, ...otherUserInfo } = userInfo;
    this.userInfo = otherUserInfo;
  }
}

export default SocialLoginResponseDTO;
