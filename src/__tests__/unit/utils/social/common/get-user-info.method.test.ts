import { socialGoogle, socialKakao, socialNaver } from "@loaders/util.loader";
import Social from "@utils/social/common";

jest.mock("@utils/social/google");
jest.mock("@utils/social/kakao");
jest.mock("@utils/social/naver");
const mockedSocialGoogle = jest.mocked(socialGoogle);
const mockedSocialKakao = jest.mocked(socialKakao);
const mockedSocialNaver = jest.mocked(socialNaver);

describe(`[Common util] getUserInfo method test :)`, () => {
  let socialUtil: Social;
  const code = "1234567890";
  const tokens = {
    accessToken: "1234567890",
    refreshToken: "0987654321",
  };
  const mockedUserInfo = {
    email: "test@kakao.com",
    key: "a1234",
    nickname: "test",
  };

  beforeEach(() => {
    socialUtil = new Social(mockedSocialGoogle, mockedSocialKakao, mockedSocialNaver);
    jest.spyOn(socialUtil as any, "setToken").mockResolvedValue(tokens);
  });

  it(`should error when setToken private method error.`, async () => {
    // given
    const error = new Error("setToken method error!");
    const type = "kakao";
    jest.spyOn(socialUtil as any, "setToken").mockRejectedValue(error);

    // when & then
    expect(async () => {
      await socialUtil.getUserInfo(type, code);
    }).rejects.toThrow(error);
  });

  describe("Google type :)", () => {
    const type = "google";

    it(`should error when google getUserInfo method error.`, async () => {
      // given
      const error = new Error("google getUserInfo method error!");
      mockedSocialGoogle.getUserInfo.mockRejectedValue(error);

      // when & then
      expect(async () => {
        await socialUtil.getUserInfo(type, code);
      }).rejects.toThrow(error);
    });

    it(`should google user info.`, async () => {
      // given
      mockedSocialGoogle.getUserInfo.mockResolvedValue(mockedUserInfo);

      // when
      const userInfo = await socialUtil.getUserInfo(type, code);

      // then
      expect(userInfo.accessToken).toBe(tokens.accessToken);
      expect(userInfo.refreshToken).toBe(tokens.refreshToken);
      expect(userInfo.email).toBe(mockedUserInfo.email);
      expect(userInfo.key).toBe(mockedUserInfo.key);
      expect(userInfo.nickname).toBe(mockedUserInfo.nickname);
    });
  });

  describe("Kakao type :)", () => {
    const type = "kakao";

    it(`should error when kakao getUserInfo method error.`, async () => {
      // given
      const error = new Error("kakao getUserInfo method error!");
      mockedSocialKakao.getUserInfo.mockRejectedValue(error);

      // when & then
      expect(async () => {
        await socialUtil.getUserInfo(type, code);
      }).rejects.toThrow(error);
    });

    it(`should kakao user info.`, async () => {
      // given
      mockedSocialKakao.getUserInfo.mockResolvedValue(mockedUserInfo);

      // when
      const userInfo = await socialUtil.getUserInfo(type, code);

      // then
      expect(userInfo.accessToken).toBe(tokens.accessToken);
      expect(userInfo.refreshToken).toBe(tokens.refreshToken);
      expect(userInfo.email).toBe(mockedUserInfo.email);
      expect(userInfo.key).toBe(mockedUserInfo.key);
      expect(userInfo.nickname).toBe(mockedUserInfo.nickname);
    });
  });

  describe("Naver type :)", () => {
    const type = "naver";

    it(`should error when naver getUserInfo method error.`, async () => {
      // given
      const error = new Error("naver getUserInfo method error!");
      mockedSocialNaver.getUserInfo.mockRejectedValue(error);

      // when & then
      expect(async () => {
        await socialUtil.getUserInfo(type, code);
      }).rejects.toThrow(error);
    });

    it(`should naver user info.`, async () => {
      // given
      mockedSocialNaver.getUserInfo.mockResolvedValue(mockedUserInfo);

      // when
      const userInfo = await socialUtil.getUserInfo(type, code);

      // then
      expect(userInfo.accessToken).toBe(tokens.accessToken);
      expect(userInfo.refreshToken).toBe(tokens.refreshToken);
      expect(userInfo.email).toBe(mockedUserInfo.email);
      expect(userInfo.key).toBe(mockedUserInfo.key);
      expect(userInfo.nickname).toBe(mockedUserInfo.nickname);
    });
  });
});
