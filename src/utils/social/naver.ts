import logger from "@config/logger.config";
import { ISocial } from "@my-types/social.type";
import { IRequestGetToken, IResponseGetToken, IResponseGetUserInfo } from "@my-types/social/naver.type";
import { HTTP_STATUS_CODE, PROJECT, SOCIAL } from "@utils/constants";
import CError from "@utils/error";
import { NAVER_URL } from "@utils/social/url";
import { AxiosBase } from "axios-classification";

class Naver implements ISocial {
  private readonly KEY = SOCIAL.NAVER.KEY.DEFAULT;

  private readonly SECRET_KEY = SOCIAL.NAVER.KEY.SECRET;

  private readonly STATE = encodeURI(PROJECT.NAME);

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

        const customError = new CError("Naver api error", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);

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

        const customError = new CError("Naver auth error", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);

        throw customError;
      },
    );
  }
}

export default Naver;
