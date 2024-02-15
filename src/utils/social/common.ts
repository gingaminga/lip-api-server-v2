import { ISocialUserInfo, TSocialType } from "@my-types/social.type";
import { SOCIAL } from "@utils/constants";
import Google from "@utils/social/google";
import Kakao from "@utils/social/kakao";
import Naver from "@utils/social/naver";

interface ISocial {
  getUserInfo(type: TSocialType, code: string): Promise<ISocialUserInfo>;
  getURL(type: TSocialType): string;
}

class Social implements ISocial {
  private readonly google: Google;

  private readonly kakao: Kakao;

  private readonly naver: Naver;

  constructor(google: Google, kakao: Kakao, naver: Naver) {
    this.google = google;
    this.kakao = kakao;
    this.naver = naver;
  }

  /**
   * @description 유저 정보 가져오기
   * @param type 소셜 종류
   * @param code 소셜 인가코드
   */
  async getUserInfo(type: TSocialType, code: string) {
    let nickname = "";
    let key = "";
    let email: undefined | string;

    const { accessToken, refreshToken } = await this.setToken(type, code);

    if (type === SOCIAL.KAKAO.NAME) {
      const kakaoUserData = await this.kakao.getUserInfo();

      nickname = kakaoUserData.nickname;
      key = String(kakaoUserData.key);
      email = kakaoUserData.email;
    } else if (type === SOCIAL.NAVER.NAME) {
      const naverUserData = await this.naver.getUserInfo();

      nickname = naverUserData.nickname;
      key = naverUserData.key;
      email = naverUserData.email;
    } else if (type === SOCIAL.GOOGLE.NAME) {
      const googleUserData = await this.google.getUserInfo();

      nickname = googleUserData.nickname;
      key = googleUserData.key;
      email = googleUserData.email;
    }

    const userInfo: ISocialUserInfo = {
      accessToken,
      email,
      key,
      nickname,
      refreshToken,
    };

    return userInfo;
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

  /**
   * @description token 설정하기
   * @param type 소셜 종류
   * @param code 소셜 인가코드
   */
  private async setToken(type: TSocialType, code: string) {
    let socialAccessToken = "";
    let socialRefreshToken: undefined | string;

    if (type === SOCIAL.KAKAO.NAME) {
      const { accessToken, refreshToken } = await this.kakao.getToken(code);
      this.kakao.setAccessToken(accessToken);

      socialAccessToken = accessToken;
      socialRefreshToken = refreshToken;
    } else if (type === SOCIAL.NAVER.NAME) {
      const { accessToken, refreshToken } = await this.naver.getToken(code);
      this.naver.setAccessToken(accessToken);

      socialAccessToken = accessToken;
      socialRefreshToken = refreshToken;
    } else if (type === SOCIAL.GOOGLE.NAME) {
      const { accessToken, refreshToken } = await this.google.getToken(code);
      this.google.setAccessToken(accessToken);

      socialAccessToken = accessToken;
      socialRefreshToken = refreshToken;
    }

    const tokenInfo = {
      accessToken: socialAccessToken,
      refreshToken: socialRefreshToken,
    };

    return tokenInfo;
  }
}

export default Social;
