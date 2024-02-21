import { socialUtil } from "@loaders/util.loader";
import { UserRepository } from "@my-rdb/repositories/user.repository";
import RedisClient from "@my-redis/client";
import { AuthService } from "@services/auth.service";

jest.mock("@my-rdb/repositories/user.repository");
const mockedUserRepository = jest.mocked(UserRepository);

jest.mock("@my-redis/client");
const mockedRedisClient = jest.mocked(new RedisClient());

describe(`[Auth service] socialLogin method test :)`, () => {
  const type = "kakao";
  const code = "1234567890";
  const mockedUserInfo = {
    accessToken: "1324567890",
    email: "test@test.com",
    key: "1",
    nickname: "test",
    refreshToken: "0987654321",
  };
  const authService = new AuthService(mockedUserRepository, mockedRedisClient);

  beforeEach(() => {
    jest.spyOn(socialUtil, "getUserInfo").mockResolvedValue(mockedUserInfo);
  });

  it(`should be error by get social user info.`, () => {
    // given
    const error = new Error("Get social user info error..");
    jest.spyOn(socialUtil, "getUserInfo").mockRejectedValue(error);

    // when & then
    expect(async () => {
      await authService.socialLogin(type, code);
    }).rejects.toThrow(error);
  });

  it(`should be error by get or create user.`, () => {
    // given
    const error = new Error("Get or create user error..");
    jest.spyOn<AuthService, any>(authService, "getOrCreateUser").mockRejectedValue(error);

    // when & then
    expect(async () => {
      await authService.socialLogin(type, code);
    }).rejects.toThrow(error);
  });

  it(`should be error by generate oauth token.`, () => {
    // given
    const user = {
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      email: mockedUserInfo.email,
      id: 1,
      nickname: mockedUserInfo.nickname,
      socialKey: `${type}-123412341234`,
      socialType: type,
    };
    const error = new Error("Generate oAuth token error..");
    jest.spyOn<AuthService, any>(authService, "getOrCreateUser").mockResolvedValue(user);
    jest.spyOn<AuthService, any>(authService, "generateOAuthToken").mockRejectedValue(error);

    // when & then
    expect(async () => {
      await authService.socialLogin(type, code);
    }).rejects.toThrow(error);
  });

  it(`should be error by generate oauth token.`, async () => {
    // given
    const user = {
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      email: mockedUserInfo.email,
      id: 1,
      nickname: mockedUserInfo.nickname,
      socialKey: `${type}-123412341234`,
      socialType: type,
    };
    const tokens = {
      accessToken: "1234567890",
      refreshToken: "0987654321",
    };
    jest.spyOn<AuthService, any>(authService, "getOrCreateUser").mockResolvedValue(user);
    jest.spyOn<AuthService, any>(authService, "generateOAuthToken").mockResolvedValue(tokens);

    // when
    const result = await authService.socialLogin(type, code);

    // then
    expect(result.accessToken).toBe(tokens.accessToken);
    expect(result.refreshToken).toBe(tokens.refreshToken);
    expect(result.userInfo).toEqual(user);
  });
});
