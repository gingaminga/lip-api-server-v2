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

describe(`[Naver util] getToken method test :)`, () => {
  const code = "1234567890";
  let naver: Naver;

  beforeAll(() => {
    naver = new Naver(mockedApiInstance, mockedAuthInstance);
  });

  it(`should error when Naver token API error.`, async () => {
    // given
    const error = new Error("Naver API error!");
    mockedAuthInstance.post.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await naver.getToken(code);
    }).rejects.toThrow(error);
  });

  it(`should be oauth token.`, async () => {
    // given
    const mockResponse = {
      data: {
        access_token: "1234567890",
        refresh_token: "0987654321",
      },
    } as TAxiosResponse;
    mockedAuthInstance.post.mockResolvedValue(mockResponse);

    // when
    const tokens = await naver.getToken(code);

    // then
    expect(tokens.accessToken).toBe(mockResponse.data.access_token);
    expect(tokens.refreshToken).toBe(mockResponse.data.refresh_token);
  });
});
