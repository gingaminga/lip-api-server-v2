import { ISocial } from "@my-types/social.type";
import { PROJECT, SOCIAL } from "@utils/constants";
import { NAVER_URL } from "@utils/social/url";

class Naver implements ISocial {
  private readonly KEY = SOCIAL.NAVER.KEY.DEFAULT;

  private readonly SECRET_KEY = SOCIAL.NAVER.KEY.SECRET;

  private readonly STATE = encodeURI(PROJECT.NAME);

  /**
   * @description callback url 가져오기
   */
  getCallbackURL() {
    const { AUTH, REDIRECT_URL } = NAVER_URL;
    const { HOST, PATH } = AUTH;
    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${this.KEY}&redirect_uri=${REDIRECT_URL}&response_type=code&state=${this.STATE}`;

    return url;
  }
}

const SocialNaver = new Naver();

export default SocialNaver;
