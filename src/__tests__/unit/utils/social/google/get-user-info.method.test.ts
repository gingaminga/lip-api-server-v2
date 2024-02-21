import Google from "@utils/social/google";
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

describe(`[Google util] getUserInfo method test :)`, () => {
  let google: Google;

  beforeEach(() => {
    google = new Google(mockedApiInstance, mockedAuthInstance);
  });

  it(`should error when Google user info API error.`, async () => {
    // given
    const error = new Error("Google API error!");
    mockedApiInstance.get.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await google.getUserInfo();
    }).rejects.toThrow(error);
  });

  it(`should be user info.`, async () => {
    // given
    const mockResponse = {
      data: {
        email: "test@gmail.com",
        id: "1234567890",
        name: "test",
      },
    } as TAxiosResponse;
    mockedApiInstance.get.mockResolvedValue(mockResponse);

    // when
    const userInfo = await google.getUserInfo();

    // then
    expect(userInfo.email).toBe(mockResponse.data.email);
    expect(userInfo.key).toBe(mockResponse.data.id);
    expect(userInfo.nickname).toBe(mockResponse.data.name);
  });
});
