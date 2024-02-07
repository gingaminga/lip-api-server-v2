import GetSocialURLDTO from "@dto/responses/get-social-url.dto";
import { TSocialType } from "@my-types/social.type";
import { SocialUtil } from "@utils/social/common";
import { injectable } from "inversify";

export interface IAuthService {
  getSocialURL: (type: TSocialType) => GetSocialURLDTO;
}

@injectable()
export class AuthService implements IAuthService {
  private readonly socialUtil = SocialUtil;

  /**
   * @description url 가져오기
   * @param type 소셜 종류
   */
  getSocialURL(type: TSocialType) {
    const url = this.socialUtil.getURL(type);

    return new GetSocialURLDTO(url);
  }
}
