import Social from "@utils/social/common";
import { socialGoogle, socialKakao, socialNaver } from "@loaders/util.loader";

describe(`[Common util] getURL method test :)`, () => {
  let socialUtil: Social;

  beforeEach(() => {
    socialUtil = new Social(socialGoogle, socialKakao, socialNaver);
  });

  it(`should google callback url.`, () => {
    // given
    const type = "google";
    const realURL = socialGoogle.getCallbackURL();

    // when
    const url = socialUtil.getURL(type);

    // then
    expect(url).toBe(realURL);
  });

  it(`should kakao callback url.`, () => {
    // given
    const type = "kakao";
    const realURL = socialKakao.getCallbackURL();

    // when
    const url = socialUtil.getURL(type);

    // then
    expect(url).toBe(realURL);
  });

  it(`should naver callback url.`, () => {
    // given
    const type = "naver";
    const realURL = socialNaver.getCallbackURL();

    // when
    const url = socialUtil.getURL(type);

    // then
    expect(url).toBe(realURL);
  });
});
