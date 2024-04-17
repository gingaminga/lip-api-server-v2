import { authService } from "@loaders/service.loader";
import checkAccessTokenMiddleware from "@middlewares/check-access-token.middleware";
import User from "@my-rdb/entities/user.entity";
import { ResponseDTO } from "@my-types/express.type";
import { HTTP_STATUS_CODE } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import { createJWTToken } from "@utils/jwt";
import { Request } from "express";

describe(`Check access token middleware test :)`, () => {
  const req = {
    headers: {
      authorization: "",
    },
  } as Request;
  const res = {
    locals: {
      userInfo: {},
    },
  } as unknown as ResponseDTO;
  const next = jest.fn();

  beforeEach(() => {
    req.headers.authorization = "";
  });

  it(`should be ${HTTP_STATUS_CODE.BAD_REQUEST} error when no bearer header.`, () => {
    // given
    const error = new Error(ERROR_MESSAGE.BAD_REQUEST);

    // when & then
    expect(async () => {
      await checkAccessTokenMiddleware(req, res, next);
    }).rejects.toThrow(error);
  });

  it(`should be ${HTTP_STATUS_CODE.UNAUTHORIZED} error when invalid token.`, () => {
    // given
    req.headers.authorization = "Bearer 1234";
    const error = new Error("jwt malformed");

    // when & then
    expect(async () => {
      await checkAccessTokenMiddleware(req, res, next);
    }).rejects.toThrow(error);
  });

  it(`should be ${HTTP_STATUS_CODE.UNAUTHORIZED} error when token is expired.`, () => {
    // given
    const payload = {
      nickname: "test",
    };
    const token = createJWTToken(payload, {
      expiresIn: "1",
    });

    req.headers.authorization = `Bearer ${token}`;
    const error = new Error("jwt expired");

    // when & then
    expect(async () => {
      await checkAccessTokenMiddleware(req, res, next);
    }).rejects.toThrow(error);
  });

  it(`should be ${HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR} error when authService getUserInfoByNickname is error.`, () => {
    // given
    const payload = {
      nickname: "test",
    };
    const token = createJWTToken(payload, {
      expiresIn: "1m",
    });
    req.headers.authorization = `Bearer ${token}`;

    const error = new Error(ERROR_MESSAGE.NOT_EXIST_USER);
    jest.spyOn(authService, "getUserInfoByNickname").mockRejectedValue(error);

    // when & then
    expect(async () => {
      await checkAccessTokenMiddleware(req, res, next);
    }).rejects.toThrow(error);
  });

  it(`should be success`, async () => {
    // given
    const payload = {
      nickname: "test",
    };
    const token = createJWTToken(payload, {
      expiresIn: "1m",
    });
    req.headers.authorization = `Bearer ${token}`;

    const mockedUser = new User();
    mockedUser.id = 1;
    mockedUser.email = "test@test.com";
    mockedUser.nickname = "test";
    mockedUser.createdAt = new Date();
    mockedUser.socialKey = "kakao-123412341234";
    mockedUser.socialType = "kakao";

    jest.spyOn(authService, "getUserInfoByNickname").mockResolvedValue(mockedUser);

    // when
    await checkAccessTokenMiddleware(req, res, next);

    // then
    expect(res.locals.userInfo).toBe(mockedUser);
    expect(next).toHaveBeenCalled();
  });
});
