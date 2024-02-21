import { SOCIAL } from "@utils/constants";
import Kakao from "@utils/social/kakao";
import { KAKAO_URL } from "@utils/social/url";
import { AxiosBase } from "axios-classification";

const apiInstance = new AxiosBase({
  baseURL: "https://1.2.3.4:5000",
});
const authInstance = new AxiosBase({
  baseURL: "https://9.8.7.6:5000",
});

describe(`[Kakao util] getCallbackURL method test :)`, () => {
  let kakao: Kakao;

  beforeAll(() => {
    kakao = new Kakao(apiInstance, authInstance);
  });

  it(`should be return callback url.`, async () => {
    // given
    const { AUTH, REDIRECT_URL } = KAKAO_URL;
    const { HOST, PATH } = AUTH;
    const url = `${HOST}${PATH.AUTHORIZE}?client_id=${SOCIAL.KAKAO.KEY.DEFAULT}&redirect_uri=${REDIRECT_URL}&response_type=code`;

    // when
    const callbackURL = kakao.getCallbackURL();

    // then
    expect(callbackURL).toEqual(url);
  });
});
