import { ISocial } from "@my-types/social.type";
import { IRequestGetToken, IResponseGetToken, IResponseGetUserInfo } from "@my-types/social/kakao.type";
import { SOCIAL } from "@utils/constants";
import { KAKAO_URL } from "@utils/social/url";
import { AxiosBase } from "axios-classification";

class Kakao implements ISocial {
  private readonly KEY = SOCIAL.KAKAO.KEY.DEFAULT;

  private readonly SECRET_KEY = SOCIAL.KAKAO.KEY.SECRET;

  private readonly apiInstance: AxiosBase;

  private readonly authInstance: AxiosBase;

  constructor() {
    this.apiInstance = new AxiosBase({
      baseURL: KAKAO_URL.API.HOST,
    });

    this.authInstance = new AxiosBase({
      baseURL: KAKAO_URL.AUTH.HOST,
    });
  }

  /**
   * @description callback url 가져오기
   */
  getCallbackURL() {
    const { AUTH, REDIRECT_URL } = KAKAO_URL;
    const { HOST, PATH } = AUTH;
    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${this.KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

    return url;
  }

  /**
   * @description 토큰 발급받기
   * @param code 소셜 인가코드
   */
  async getToken(code: string) {
    const endpoint = KAKAO_URL.AUTH.PATH.TOKEN;
    const redirectURI = KAKAO_URL.REDIRECT_URL;
    const params = {
      client_id: this.KEY,
      client_secret: this.SECRET_KEY,
      code,
      grant_type: "authorization_code", // 고정 값
      redirect_uri: redirectURI,
    };

    console.log(params);

    const { data } = await this.authInstance.post<IRequestGetToken, IResponseGetToken>(endpoint, params, {
      "Content-Type": "application/x-www-form-urlencoded",
    });

    const tokenData = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };

    return tokenData;
  }

  /**
   * @description 유저 정보 가져오기
   */
  async getUserInfo() {
    const { data } = await this.apiInstance.post<null, IResponseGetUserInfo>(KAKAO_URL.API.PATH.USER_DATA);
    const { id, kakao_account: kakaoAccount } = data;
    const { profile, email } = kakaoAccount || {};
    const { nickname = "" } = profile || {};

    const userInfo = {
      email,
      key: String(id),
      nickname,
    };

    return userInfo;
  }

  /**
   * @description access token을 헤더에 설정하기
   * @param token access token
   */
  setAccessToken(token: string) {
    this.apiInstance.setBearerToken(token);
  }
}

const SocialKakao = new Kakao();

export default SocialKakao;
