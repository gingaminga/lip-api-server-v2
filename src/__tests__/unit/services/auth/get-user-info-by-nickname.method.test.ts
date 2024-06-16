import User from "@my-rdb/entities/user.entity";
import { UserRepository } from "@my-rdb/repositories/user.repository";
import RedisClient from "@my-redis/client";
import { AuthService } from "@services/auth.service";
import ERROR_MESSAGE from "@utils/error-message";

jest.mock("@my-rdb/repositories/user.repository");
const mockedUserRepository = jest.mocked(UserRepository);

describe(`[Auth service] getUserInfoByNickname method test :)`, () => {
  const nickname = "asdfasdf";
  const redis = new RedisClient();
  const authService = new AuthService(mockedUserRepository, redis);

  it(`should be error by findOne method of userRepository.`, () => {
    // given
    const error = new Error("Find error..");
    mockedUserRepository.findOne.mockRejectedValue(error);

    // when & then
    expect(async () => {
      await authService.getUserInfoByNickname(nickname);
    }).rejects.toThrow(error);
  });

  it(`should be error by user is not exist.`, () => {
    // given
    const error = new Error(ERROR_MESSAGE.NOT_EXIST_USER);
    mockedUserRepository.findOne.mockResolvedValue(null);

    // when & then
    expect(async () => {
      await authService.getUserInfoByNickname(nickname);
    }).rejects.toThrow(error);
  });

  it(`should be return user.`, async () => {
    // given
    const mockedUser: User = {
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      email: "test@test.com",
      id: 1,
      nickname,
      socialKey: `kakao-123412341234`,
      socialType: "kakao",
      toDos: [],
    };
    mockedUserRepository.findOne.mockResolvedValue(mockedUser);

    // when
    const user = await authService.getUserInfoByNickname(nickname);

    // when & then
    expect(user).toBe(mockedUser);
  });
});
