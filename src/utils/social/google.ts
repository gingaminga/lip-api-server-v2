import { ISocial } from "@my-types/social.type";
import { SOCIAL } from "@utils/constants";
import { GOOGLE_URL } from "@utils/social/url";

class Google implements ISocial {
  private readonly KEY = SOCIAL.GOOGLE.KEY.DEFAULT;

  private readonly SECRET_KEY = SOCIAL.GOOGLE.KEY.SECRET;

  /**
   * @description callback url 가져오기
   */
  getCallbackURL() {
    const { AUTH, REDIRECT_URL } = GOOGLE_URL;
    const { HOST, PATH } = AUTH;
    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${this.KEY}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=openid%20profile%20email&access_type=offline&include_granted_scopes=true`;

    return url;
  }
}

const SocialGoogle = new Google();

export default SocialGoogle;
