import { ISocial } from "@my-types/social.type";
import { SOCIAL } from "@utils/constants";
import { KAKAO_URL } from "@utils/social/url";

class Kakao implements ISocial {
  private readonly KEY = SOCIAL.KAKAO.KEY.DEFAULT;

  private readonly SECRET_KEY = SOCIAL.KAKAO.KEY.SECRET;

  /**
   * @description callback url 가져오기
   */
  getCallbackURL() {
    const { AUTH, REDIRECT_URL } = KAKAO_URL;
    const { HOST, PATH } = AUTH;
    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${this.KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

    return url;
  }
}

const SocialKakao = new Kakao();

export default SocialKakao;
