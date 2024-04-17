import app from "@app";
import User from "@my-rdb/entities/user.entity";
import { startRDB, stopRDB } from "@my-rdb/index";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { UserRepository } from "@my-rdb/repositories/user.repository";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import { createJWTToken } from "@utils/jwt";
import request from "supertest";

const path = "/api/to-do";

describe(`POST ${path} API test :)`, () => {
  const content = "Test content";
  const date = "2024-01-01";
  const params = {
    content,
    date,
  };

  let user: User;
  let token = "";

  beforeEach(() => {
    params.content = content;
    params.date = date;
  });

  beforeAll(async () => {
    await startRDB();

    const mockedUser: User = new User();
    mockedUser.id = 1;
    mockedUser.email = "test@test.com";
    mockedUser.nickname = "test";
    mockedUser.createdAt = new Date();
    mockedUser.socialKey = "test-1234";
    mockedUser.socialType = "kakao";

    user = await UserRepository.save(mockedUser, {
      transaction: false,
    });

    // access token 생성
    const payload = {
      nickname: user.nickname,
    };
    token = createJWTToken(payload, {
      expiresIn: "1m",
    });
  });

  afterAll(async () => {
    await UserRepository.remove(user);

    await stopRDB();
  });

  describe(`${HTTP_STATUS_CODE.INVALID_VALUE} test :)`, () => {
    it(`should error when require parameter is not exist.`, async () => {
      // when
      const { body, status } = await request(app)
        .post(path)
        .set({
          Authorization: `Bearer ${token}`,
        });

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });

    it(`should error when date parameter is not date format`, async () => {
      // given
      params.date = "20240101";

      // when
      const { body, status } = await request(app)
        .post(path)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .send(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });

    it(`should error when date parameter is invalid date.`, async () => {
      // given
      params.date = "1234-56-78";

      // when
      const { body, status } = await request(app)
        .post(path)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .send(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.CREATED} test :)`, () => {
    it(`should respond with new to do info.`, async () => {
      // when
      const { body, status } = await request(app)
        .post(path)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .send(params);
      const todo = await ToDoRepository.findOne({
        where: {
          id: body.data.toDoInfo.id,
        },
      });

      // then
      expect(status).toBe(HTTP_STATUS_CODE.CREATED);
      expect(todo).not.toBeNull();
      expect(body.data.toDoInfo).toEqual(
        expect.objectContaining({
          ...todo,
          createdAt: body.data.toDoInfo.createdAt.toString(),
          updatedAt: body.data.toDoInfo.updatedAt.toString(),
        }),
      );
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });
  });
});
