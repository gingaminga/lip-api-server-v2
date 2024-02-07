import { TSocialType } from "@my-types/social.type";
import { SOCIAL } from "@utils/constants";
import SocialGoogle from "@utils/social/google";
import SocialKakao from "@utils/social/kakao";
import SocialNaver from "@utils/social/naver";

class Social {
  private readonly google: typeof SocialGoogle;

  private readonly kakao: typeof SocialKakao;

  private readonly naver: typeof SocialNaver;

  constructor(google: typeof SocialGoogle, kakao: typeof SocialKakao, naver: typeof SocialNaver) {
    this.google = google;
    this.kakao = kakao;
    this.naver = naver;
  }

  /**
   * @description url 가져오기
   * @param type 소셜 종류
   */
  getURL(type: TSocialType) {
    let url = "";
    if (type === SOCIAL.KAKAO.NAME) {
      url = this.kakao.getCallbackURL();
    } else if (type === SOCIAL.NAVER.NAME) {
      url = this.naver.getCallbackURL();
    } else if (type === SOCIAL.GOOGLE.NAME) {
      url = this.google.getCallbackURL();
    }

    return url;
  }
}

export const SocialUtil = new Social(SocialGoogle, SocialKakao, SocialNaver);
