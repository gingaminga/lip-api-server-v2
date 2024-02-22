import app from "@app";
import User from "@my-rdb/entities/user.entity";
import { startRDB, stopRDB } from "@my-rdb/index";
import { startRedis, stopRedis } from "@my-redis/index";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import { GOOGLE_URL, KAKAO_URL, NAVER_URL } from "@utils/social/url";
import nock from "nock";
import request from "supertest";

const path = "/api/auth/social-login";

describe(`POST ${path} API test :)`, () => {
  const code = "1234567890";
  const params = {
    code,
    type: "",
  };

  beforeEach(() => {
    params.code = code;
    params.type = "";
  });

  describe(`${HTTP_STATUS_CODE.INVALID_VALUE} test :)`, () => {
    it(`should error when require parameter is not exist.`, async () => {
      // when
      const { body, status } = await request(app).post(path);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });

    it(`should error when code parameter is not exist`, async () => {
      // given
      params.type = "kakao";
      params.code = "";

      // when
      const { body, status } = await request(app).post(path).send(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });

    it(`should error when type parameter is not social type`, async () => {
      // given
      params.type = "blabla";

      // when
      const { body, status } = await request(app).post(path).send(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR} test :)`, () => {
    it(`should respond error.`, async () => {
      // given
      params.type = "kakao";

      // when
      const { body, status } = await request(app).post(path).send(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.OK} test :)`, () => {
    const mockUser: User = new User();
    mockUser.id = 1;
    mockUser.socialKey = "123412341234";

    beforeAll(async () => {
      await startRDB();
      await startRedis();
    });

    afterAll(async () => {
      await stopRDB();
      await stopRedis();
    });

    it(`should respond user info and token info by google.`, async () => {
      // given
      const type = "google";
      const email = "test@google.com";
      mockUser.socialType = type;
      mockUser.email = email;
      params.type = type;

      nock(GOOGLE_URL.AUTH.HOST1).post(GOOGLE_URL.AUTH.PATH.TOKEN).reply(200, {
        access_token: "1234567890",
        refresh_token: "0987654321",
      });
      nock(GOOGLE_URL.API.HOST).get(GOOGLE_URL.API.PATH.USER_DATA).reply(200, {
        email,
        id: "123412341234",
        name: "google-user",
      });

      // when
      const { body, status } = await request(app).post(path).send(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.CREATED);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
      expect(body.data.userInfo.email).toBe(mockUser.email);
      expect(body.data.userInfo.socialKey).toBe(mockUser.socialKey);
      expect(body.data.userInfo.socialType).toBe(mockUser.socialType);
      expect(body.data.accessToken).toBeDefined();
      expect(body.data.refreshToken).toBeDefined();
    });

    it(`should respond user info and token info by kakao.`, async () => {
      // given
      const type = "kakao";
      const email = "test@kakao.com";
      mockUser.socialType = type;
      mockUser.email = email;
      params.type = type;

      nock(KAKAO_URL.AUTH.HOST).post(KAKAO_URL.AUTH.PATH.TOKEN).reply(200, {
        access_token: "1234567890",
        refresh_token: "0987654321",
      });
      nock(KAKAO_URL.API.HOST)
        .post(KAKAO_URL.API.PATH.USER_DATA)
        .reply(200, {
          id: 123412341234,
          kakao_account: {
            profile: {
              nickname: "kakao-user",
            },
            email,
          },
        });

      // when
      const { body, status } = await request(app).post(path).send(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.CREATED);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
      expect(body.data.userInfo.email).toBe(mockUser.email);
      expect(body.data.userInfo.socialKey).toBe(mockUser.socialKey);
      expect(body.data.userInfo.socialType).toBe(mockUser.socialType);
      expect(body.data.accessToken).toBeDefined();
      expect(body.data.refreshToken).toBeDefined();
    });

    it(`should respond user info and token info by naver.`, async () => {
      // given
      const type = "naver";
      const email = "test@naver.com";
      mockUser.socialType = type;
      mockUser.email = email;
      params.type = type;

      nock(NAVER_URL.AUTH.HOST).post(NAVER_URL.AUTH.PATH.TOKEN).reply(200, {
        access_token: "1234567890",
        refresh_token: "0987654321",
      });
      nock(NAVER_URL.API.HOST)
        .post(NAVER_URL.API.PATH.USER_DATA)
        .reply(200, {
          response: {
            email,
            id: "123412341234",
            nickname: "naver-user",
          },
        });

      // when
      const { body, status } = await request(app).post(path).send(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.CREATED);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
      expect(body.data.userInfo.email).toBe(mockUser.email);
      expect(body.data.userInfo.socialKey).toBe(mockUser.socialKey);
      expect(body.data.userInfo.socialType).toBe(mockUser.socialType);
      expect(body.data.accessToken).toBeDefined();
      expect(body.data.refreshToken).toBeDefined();
    });
  });
});
