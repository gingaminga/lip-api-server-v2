import { PROJECT, SOCIAL } from "@utils/constants";
import SocialNaver from "@utils/social/naver";
import { NAVER_URL } from "@utils/social/url";

describe(`[Naver util] getCallbackURL method test :)`, () => {
  it(`should be return callback url.`, async () => {
    // given
    const { AUTH, REDIRECT_URL } = NAVER_URL;
    const { HOST, PATH } = AUTH;
    const STATE = encodeURI(PROJECT.NAME);
    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${SOCIAL.NAVER.KEY.DEFAULT}&redirect_uri=${REDIRECT_URL}&response_type=code&state=${STATE}`;

    // when
    const callbackURL = SocialNaver.getCallbackURL();

    // then
    expect(callbackURL).toEqual(url);
  });
});
