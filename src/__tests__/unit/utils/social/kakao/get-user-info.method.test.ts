import Kakao from "@utils/social/kakao";
import { AxiosBase, TAxiosResponse } from "axios-classification";

jest.mock("axios-classification");
const apiInstance = new AxiosBase({
  baseURL: "https://1.2.3.4:5000",
});
const authInstance = new AxiosBase({
  baseURL: "https://9.8.7.6:5000",
});
const mockedApiInstance = jest.mocked(apiInstance);
const mockedAuthInstance = jest.mocked(authInstance);

describe(`[Kakao util] getUserInfo method test :)`, () => {
  let kakao: Kakao;

  beforeEach(() => {
    kakao = new Kakao(mockedApiInstance, mockedAuthInstance);
  });

  it(`should error when Kakao user info API error.`, async () => {
    // given
    const error = new Error("Kakao API error!");
    mockedApiInstance.post.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await kakao.getUserInfo();
    }).rejects.toThrow(error);
  });

  it(`should be user info.`, async () => {
    // given
    const mockResponse = {
      data: {
        id: 1234567890,
        kakao_account: {
          profile: {
            nickname: "test",
          },
          email: "test@kakao.com",
        },
      },
    } as TAxiosResponse;
    mockedApiInstance.post.mockResolvedValue(mockResponse);

    // when
    const userInfo = await kakao.getUserInfo();

    // then
    expect(userInfo.email).toBe(mockResponse.data.kakao_account.email);
    expect(userInfo.key).toBe(String(mockResponse.data.id));
    expect(userInfo.nickname).toBe(mockResponse.data.kakao_account.profile.nickname);
  });
});
