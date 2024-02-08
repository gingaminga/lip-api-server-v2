import User from "@my-rdb/entities/user.entity";
import { ISocialLoginResponse } from "@my-types/responses/auth.response.type";

class SocialLoginResponseDTO {
  accessToken: string;

  refreshToken: string;

  userInfo: User;

  constructor({ accessToken, refreshToken, userInfo }: ISocialLoginResponse) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userInfo = userInfo;
  }
}

export default SocialLoginResponseDTO;
