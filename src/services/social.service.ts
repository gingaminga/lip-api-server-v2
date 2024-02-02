import GetSocialURLDTO from "@dto/responses/get-social-url.dto";
import { TSocialType } from "@my-types/social.type";
import { SOCIAL } from "@utils/constants";
import SocialGoogle from "@utils/social/google";
import SocialKakao from "@utils/social/kakao";
import SocialNaver from "@utils/social/naver";
import { injectable } from "inversify";

export interface ISocialService {
  getURL: (type: TSocialType) => GetSocialURLDTO;
}

@injectable()
export class SocialService implements ISocialService {
  private readonly socialGoogle = SocialGoogle;

  private readonly socialKakao = SocialKakao;

  private readonly socialNaver = SocialNaver;

  /**
   * @description url 가져오기
   * @param type 소셜 종류
   */
  getURL(type: TSocialType) {
    let url = "";
    if (type === SOCIAL.KAKAO.NAME) {
      url = this.socialKakao.getCallbackURL();
    } else if (type === SOCIAL.NAVER.NAME) {
      url = this.socialNaver.getCallbackURL();
    } else if (type === SOCIAL.GOOGLE.NAME) {
      url = this.socialGoogle.getCallbackURL();
    }

    return new GetSocialURLDTO(url);
  }
}
