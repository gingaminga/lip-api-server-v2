import logger from "@config/logger.config";
import { ISocial } from "@my-types/social.type";
import { IRequestGetToken, IResponseGetToken, IResponseGetUserInfo } from "@my-types/social/google.type";
import { HTTP_STATUS_CODE, SOCIAL } from "@utils/constants";
import CError from "@utils/error";
import { GOOGLE_URL } from "@utils/social/url";
import { AxiosBase } from "axios-classification";

class Google implements ISocial {
  private readonly KEY = SOCIAL.GOOGLE.KEY.DEFAULT;

  private readonly SECRET_KEY = SOCIAL.GOOGLE.KEY.SECRET;

  private readonly apiInstance: AxiosBase;

  private readonly authInstance: AxiosBase;

  constructor(apiInstance: AxiosBase, authInstance: AxiosBase) {
    this.apiInstance = apiInstance;
    this.authInstance = authInstance;

    this.setAPIInstanceInterseptor();
    this.setAuthInstanceInterseptor();
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

  /**
   * @description api instance의 요청 인터셉트 설정하기
   */
  private setAPIInstanceInterseptor() {
    this.apiInstance.setRequestInterceptor(
      (request) => {
        const { baseURL, data, method = "", url } = request;

        logger.info(`[${method.toUpperCase()}] Request ${baseURL}${url} ${data ? JSON.stringify(data) : ""}`);

        return request;
      },
      (error) => {
        throw error;
      },
    );

    this.apiInstance.setResponseInterceptor(
      (response) => {
        const { data, config } = response;
        const { baseURL, method = "", url } = config;

        logger.info(`[${method.toUpperCase()}] Response ${baseURL}${url} ${data ? JSON.stringify(data) : ""}`);

        return response;
      },
      async (error) => {
        if (!this.apiInstance.isAxiosError(error)) {
          throw error;
        }

        const { response } = error;
        const { config, data, status, statusText } = response || {};
        const { baseURL, method = "", url } = config || {};

        logger.error(
          `[${method.toUpperCase()}] Response ${baseURL}${url} ${statusText}(${status}) ${
            data ? JSON.stringify(data) : ""
          }`,
        );

        const customError = new CError("Google api error", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);

        throw customError;
      },
    );
  }

  /**
   * @description auth instance의 요청 인터셉트 설정하기
   */
  private setAuthInstanceInterseptor() {
    this.authInstance.setRequestInterceptor(
      (request) => {
        const { baseURL, data, method = "", url } = request;

        logger.info(`[${method.toUpperCase()}] Request ${baseURL}${url} ${data ? JSON.stringify(data) : ""}`);

        return request;
      },
      (error) => {
        throw error;
      },
    );

    this.authInstance.setResponseInterceptor(
      (response) => {
        const { data, config } = response;
        const { baseURL, method = "", url } = config;

        logger.info(`[${method.toUpperCase()}] Response ${baseURL}${url} ${data ? JSON.stringify(data) : ""}`);

        return response;
      },
      async (error) => {
        if (!this.authInstance.isAxiosError(error)) {
          throw error;
        }

        const { response } = error;
        const { config, data, status, statusText } = response || {};
        const { baseURL, method = "", url } = config || {};

        logger.error(
          `[${method.toUpperCase()}] Response ${baseURL}${url} ${statusText}(${status}) ${
            data ? JSON.stringify(data) : ""
          }`,
        );

        const customError = new CError("Google auth error", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);

        throw customError;
      },
    );
  }
}

export default Google;
