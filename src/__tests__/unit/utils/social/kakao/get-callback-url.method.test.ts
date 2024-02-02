import { SOCIAL } from "@utils/constants";
import SocialKakao from "@utils/social/kakao";
import { KAKAO_URL } from "@utils/social/url";

describe(`[Kakao util] getCallbackURL method test :)`, () => {
  it(`should be return callback url.`, async () => {
    // given
    const { AUTH, REDIRECT_URL } = KAKAO_URL;
    const { HOST, PATH } = AUTH;
    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${SOCIAL.KAKAO.KEY.DEFAULT}&redirect_uri=${REDIRECT_URL}&response_type=code`;

    // when
    const callbackURL = SocialKakao.getCallbackURL();

    // then
    expect(callbackURL).toEqual(url);
  });
});
