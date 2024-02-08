import SocialLoginResponseDTO from "@dto/responses/auth/social-login.response.dto";
import GetSocialURLDTO from "@dto/responses/get-social-url.dto";
import { rdbClient, redisClient } from "@loaders/database.loader";
import User from "@my-rdb/entities/user.entity";
import { UserRepository } from "@my-rdb/repositories/user.repository";
import { ISocialUserInfo, TSocialType } from "@my-types/social.type";
import { JWT, PROJECT } from "@utils/constants";
import { createJWTToken } from "@utils/jwt";
import { nicknameRegExp } from "@utils/regexp";
import { SocialUtil } from "@utils/social/common";
import { getRandomText } from "@utils/util";
import { injectable } from "inversify";

export interface IAuthService {
  getSocialURL: (type: TSocialType) => GetSocialURLDTO;
  socialLogin: (type: TSocialType, code: string) => void;
}

@injectable()
export class AuthService implements IAuthService {
  private readonly socialUtil = SocialUtil;

  private readonly redisClient = redisClient;

  private readonly userRepository = UserRepository;

  /**
   * @description 최종 닉네임 가져오기
   * @param nickname 닉네임
   */
  private async getFinalNickname(nickname: string) {
    let finalNickname = nickname;
    let isLoop = true;

    while (isLoop) {
      if (nicknameRegExp.test(finalNickname)) {
        isLoop = await this.isDuplicateNickname(finalNickname);
      }

      if (isLoop) {
        finalNickname = getRandomText();
      }
    }

    return finalNickname;
  }

  /**
   * @description url 가져오기
   * @param type 소셜 종류
   */
  getSocialURL(type: TSocialType) {
    const url = this.socialUtil.getURL(type);

    return new GetSocialURLDTO(url);
  }

  /**
   * @description 닉네임이 중복되는지 여부 확인하기
   * @param nickname 닉네임
   */
  private async isDuplicateNickname(nickname: string) {
    const userInfo = await this.userRepository.findOne({
      where: {
        nickname,
      },
    });

    if (!userInfo) {
      return false;
    }

    return true;
  }

  /**
   * @description oauth token 처리하기
   * @param type 소셜 종류
   * @param nickname 닉네임
   * @param userKey 유저 Key
   * @param socialKey 소셜 Key
   * @param socialRefreshToken 소셜 refresh token
   */
  private async generateOAuthToken(
    type: TSocialType,
    nickname: string,
    userKey: number,
    socialKey: string,
    socialRefreshToken?: string,
  ) {
    const payload = {
      nickname,
      type,
    };

    const accessToken = createJWTToken(payload, {
      expiresIn: JWT.EXPRIED.ACCESS_TOKEN,
    });
    const refreshToken = createJWTToken(payload, {
      expiresIn: JWT.EXPRIED.ACCESS_TOKEN,
    });

    await this.redisClient.hset(PROJECT.NAME, String(userKey), refreshToken);

    if (socialRefreshToken) {
      await this.redisClient.hset(type, socialKey, socialRefreshToken);
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * @description 회원 정보 가져오기 or 생성하기
   * @param type 소셜 종류
   * @param socialUserInfo 소셜 유저 정보
   */
  private async getOrCreateUser(type: TSocialType, socialUserInfo: ISocialUserInfo) {
    const userInfo = await rdbClient.transaction(async (manager) => {
      const userRepository = manager.withRepository(this.userRepository);

      let user = await userRepository.findOne({
        where: {
          socialKey: socialUserInfo.key,
          socialType: type,
        },
      });

      if (!user) {
        const finalNickname = await this.getFinalNickname(socialUserInfo.nickname);

        const newUser = new User();
        newUser.email = socialUserInfo.email || null;
        newUser.nickname = finalNickname;
        newUser.socialKey = socialUserInfo.key;
        newUser.socialType = type;
        user = await userRepository.save(newUser);
      }

      return user;
    });

    return userInfo;
  }

  /**
   * @description 소셜 로그인하기
   * @param type 소셜 종류
   * @param code 소셜 인가코드
   */
  async socialLogin(type: TSocialType, code: string) {
    const socialUserInfo = await this.socialUtil.getUserInfo(type, code);

    const userInfo = await this.getOrCreateUser(type, socialUserInfo);
    const tokens = await this.generateOAuthToken(
      type,
      userInfo.nickname,
      userInfo.id,
      userInfo.socialKey,
      socialUserInfo.refreshToken,
    );

    const dto = new SocialLoginResponseDTO({ userInfo, ...tokens });

    return dto;
  }
}
