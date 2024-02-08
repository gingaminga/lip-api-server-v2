import { ISocial } from "@my-types/social.type";
import { IRequestGetToken, IResponseGetToken, IResponseGetUserInfo } from "@my-types/social/naver.type";
import { PROJECT, SOCIAL } from "@utils/constants";
import { NAVER_URL } from "@utils/social/url";
import { AxiosBase } from "axios-classification";

class Naver implements ISocial {
  private readonly KEY = SOCIAL.NAVER.KEY.DEFAULT;

  private readonly SECRET_KEY = SOCIAL.NAVER.KEY.SECRET;

  private readonly STATE = encodeURI(PROJECT.NAME);

  private readonly apiInstance: AxiosBase;

  private readonly authInstance: AxiosBase;

  constructor() {
    this.apiInstance = new AxiosBase({
      baseURL: NAVER_URL.API.HOST,
    });

    this.authInstance = new AxiosBase({
      baseURL: NAVER_URL.AUTH.HOST,
    });
  }

  /**
   * @description callback url 가져오기
   */
  getCallbackURL() {
    const { AUTH, REDIRECT_URL } = NAVER_URL;
    const { HOST, PATH } = AUTH;
    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${this.KEY}&redirect_uri=${REDIRECT_URL}&response_type=code&state=${this.STATE}`;

    return url;
  }

  /**
   * @description 토큰 발급하기
   * @param code 소셜 인가코드
   */
  async getToken(code: string) {
    const endpoint = NAVER_URL.AUTH.PATH.TOKEN;
    const params = {
      client_id: this.KEY,
      client_secret: this.SECRET_KEY,
      code,
      grant_type: "authorization_code", // 고정 값
      state: this.STATE,
    };

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
    const { data } = await this.apiInstance.post<null, IResponseGetUserInfo>(NAVER_URL.API.PATH.USER_DATA);
    const { response } = data;
    const { email, id, nickname } = response;

    const userInfo = {
      email,
      key: id,
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

const SocialNaver = new Naver();

export default SocialNaver;
