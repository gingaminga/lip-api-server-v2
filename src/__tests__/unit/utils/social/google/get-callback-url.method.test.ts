import { SOCIAL } from "@utils/constants";
import Google from "@utils/social/google";
import { GOOGLE_URL } from "@utils/social/url";
import { AxiosBase } from "axios-classification";

const apiInstance = new AxiosBase({
  baseURL: "https://1.2.3.4:5000",
});
const authInstance = new AxiosBase({
  baseURL: "https://9.8.7.6:5000",
});

describe(`[Google util] getCallbackURL method test :)`, () => {
  let google: Google;

  beforeAll(() => {
    google = new Google(apiInstance, authInstance);
  });

  it(`should be return callback url.`, async () => {
    // given
    const { AUTH, REDIRECT_URL } = GOOGLE_URL;
    const { HOST, PATH } = AUTH;

    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${SOCIAL.GOOGLE.KEY.DEFAULT}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=openid%20profile%20email&access_type=offline&include_granted_scopes=true`;

    // when
    const callbackURL = google.getCallbackURL();

    // then
    expect(callbackURL).toEqual(url);
  });
});
