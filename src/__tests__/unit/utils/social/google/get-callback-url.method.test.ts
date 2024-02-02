import { SOCIAL } from "@utils/constants";
import SocialGoogle from "@utils/social/google";
import { GOOGLE_URL } from "@utils/social/url";

describe(`[Google util] getCallbackURL method test :)`, () => {
  it(`should be return callback url.`, async () => {
    // given
    const { AUTH, REDIRECT_URL } = GOOGLE_URL;
    const { HOST, PATH } = AUTH;

    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${SOCIAL.GOOGLE.KEY.DEFAULT}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=openid%20profile%20email&access_type=offline&include_granted_scopes=true`;

    // when
    const callbackURL = SocialGoogle.getCallbackURL();

    // then
    expect(callbackURL).toEqual(url);
  });
});
