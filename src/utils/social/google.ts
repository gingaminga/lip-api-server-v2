import { ISocial } from "@my-types/social.type";
import { IRequestGetToken, IResponseGetToken, IResponseGetUserInfo } from "@my-types/social/google.type";
import { SOCIAL } from "@utils/constants";
import { GOOGLE_URL } from "@utils/social/url";
import { AxiosBase } from "axios-classification";

class Google implements ISocial {
  private readonly KEY = SOCIAL.GOOGLE.KEY.DEFAULT;

  private readonly SECRET_KEY = SOCIAL.GOOGLE.KEY.SECRET;

  private readonly apiInstance: AxiosBase;

  private readonly authInstance: AxiosBase;

  constructor() {
    this.apiInstance = new AxiosBase({
      baseURL: GOOGLE_URL.API.HOST,
    });

    this.authInstance = new AxiosBase({
      baseURL: GOOGLE_URL.AUTH.HOST1,
    });
  }

  /**
   * @description callback url 가져오기
   */
  getCallbackURL() {
    const { AUTH, REDIRECT_URL } = GOOGLE_URL;
    const { HOST, PATH } = AUTH;
    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${this.KEY}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=openid%20profile%20email&access_type=offline&include_granted_scopes=true`;

    return url;
  }

  /**
   * @description 토큰 발급하기
   * @param code 소셜 인가코드
   */
  async getToken(code: string) {
    const endpoint = GOOGLE_URL.AUTH.PATH.TOKEN;
    const redirectURI = GOOGLE_URL.REDIRECT_URL;
    const params = {
      client_id: this.KEY,
      client_secret: this.SECRET_KEY,
      code,
      grant_type: "authorization_code", // 고정 값
      redirect_uri: redirectURI,
    };

    const { data } = await this.authInstance.post<IRequestGetToken, IResponseGetToken>(endpoint, params, {
      "Content-Type": "application/x-www-form-urlencoded",
    });

    const tokenData = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token, // google의 경우 refresh_token이 optional..
    };

    return tokenData;
  }

  /**
   * @description 유저 정보 가져오기
   */
  async getUserInfo() {
    const { data } = await this.apiInstance.get<null, IResponseGetUserInfo>(GOOGLE_URL.API.PATH.USER_DATA);
    const { email, id, name } = data;

    const userInfo = {
      email,
      key: id,
      nickname: name,
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

const SocialGoogle = new Google();

export default SocialGoogle;
