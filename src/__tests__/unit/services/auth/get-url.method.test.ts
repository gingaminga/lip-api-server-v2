import { socialGoogle, socialKakao, socialNaver } from "@loaders/util.loader";
import { UserRepository } from "@my-rdb/repositories/user.repository";
import RedisClient from "@my-redis/client";
import { AuthService } from "@services/auth.service";

describe(`[Auth service] getURL method test :)`, () => {
  const redis = new RedisClient();
  const authService = new AuthService(UserRepository, redis);

  it(`should be return kakao url.`, () => {
    // given
    const type = "kakao";
    const kakaoURL = socialKakao.getCallbackURL();

    // when
    const response = authService.getSocialURL(type);

    // then
    expect(response.url).toBe(kakaoURL);
  });

  it(`should be return naver url.`, () => {
    // given
    const type = "naver";
    const naverURL = socialNaver.getCallbackURL();

    // when
    const response = authService.getSocialURL(type);

    // then
    expect(response.url).toEqual(naverURL);
  });

  it(`should be return google url.`, () => {
    // given
    const type = "google";
    const googleURL = socialGoogle.getCallbackURL();

    // when
    const response = authService.getSocialURL(type);

    // then
    expect(response.url).toEqual(googleURL);
  });
});
