import { PROJECT, SOCIAL } from "@utils/constants";
import Naver from "@utils/social/naver";
import { NAVER_URL } from "@utils/social/url";
import { AxiosBase } from "axios-classification";

const apiInstance = new AxiosBase({
  baseURL: "https://1.2.3.4:5000",
});
const authInstance = new AxiosBase({
  baseURL: "https://9.8.7.6:5000",
});

describe(`[Naver util] getCallbackURL method test :)`, () => {
  let naver: Naver;

  beforeAll(() => {
    naver = new Naver(apiInstance, authInstance);
  });

  it(`should be return callback url.`, async () => {
    // given
    const { AUTH, REDIRECT_URL } = NAVER_URL;
    const { HOST, PATH } = AUTH;
    const STATE = encodeURI(PROJECT.NAME);
    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${SOCIAL.NAVER.KEY.DEFAULT}&redirect_uri=${REDIRECT_URL}&response_type=code&state=${STATE}`;

    // when
    const callbackURL = naver.getCallbackURL();

    // then
    expect(callbackURL).toEqual(url);
  });
});
