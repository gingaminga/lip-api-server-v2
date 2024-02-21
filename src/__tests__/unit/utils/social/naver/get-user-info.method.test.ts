import Naver from "@utils/social/naver";
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

describe(`[Naver util] getUserInfo method test :)`, () => {
  let naver: Naver;

  beforeAll(() => {
    naver = new Naver(mockedApiInstance, mockedAuthInstance);
  });

  it(`should error when Naver user info API error.`, async () => {
    // given
    const error = new Error("Naver API error!");
    mockedApiInstance.post.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await naver.getUserInfo();
    }).rejects.toThrow(error);
  });

  it(`should be user info.`, async () => {
    // given
    const mockResponse = {
      data: {
        response: {
          email: "test@gmail.com",
          id: "1234567890",
          nickname: "test",
        },
      },
    } as TAxiosResponse;
    mockedApiInstance.post.mockResolvedValue(mockResponse);

    // when
    const userInfo = await naver.getUserInfo();

    // then
    expect(userInfo.email).toBe(mockResponse.data.response.email);
    expect(userInfo.key).toBe(mockResponse.data.response.id);
    expect(userInfo.nickname).toBe(mockResponse.data.response.nickname);
  });
});
