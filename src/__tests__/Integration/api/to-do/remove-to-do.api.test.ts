import app from "@app";
import User from "@my-rdb/entities/user.entity";
import { startRDB, stopRDB } from "@my-rdb/index";
import { UserRepository } from "@my-rdb/repositories/user.repository";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import { createJWTToken } from "@utils/jwt";
import request from "supertest";

const path = "/api/to-do";

describe(`DELETE ${path}/:id API test :)`, () => {
  const id = 1;

  let user: User;
  let token = "";

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

  describe(`${HTTP_STATUS_CODE.NOT_FOUND} test :)`, () => {
    it(`should error when require parameter is not exist.`, async () => {
      // when
      const { body, status } = await request(app).delete(path);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.NOT_FOUND);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.NOT_FOUND });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.INVALID_VALUE} test :)`, () => {
    it(`should error when require parameter is not number type.`, async () => {
      // given
      const fakePath = `${path}/test`;

      // when
      const { body, status } = await request(app)
        .delete(fakePath)
        .set({
          Authorization: `Bearer ${token}`,
        });

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.OK} test :)`, () => {
    it(`should reponse -1 in id because not exist to do.`, async () => {
      // when
      const fakePath = `${path}/${10000}`;
      const { body, status } = await request(app)
        .delete(fakePath)
        .set({
          Authorization: `Bearer ${token}`,
        });

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data.id).toBe(-1);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });

    it(`should reponse id.`, async () => {
      // given
      const addToDoPath = "/api/to-do";
      const addToDoParams = {
        content: "Test add content",
        date: "2024-01-01",
      };
      const { body: addToDoBody } = await request(app)
        .post(addToDoPath)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .send(addToDoParams);
      const fullPath = `${path}/${addToDoBody.data.toDoInfo.id}`;

      // when
      const { body, status } = await request(app)
        .delete(fullPath)
        .set({
          Authorization: `Bearer ${token}`,
        });

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data.id).toBe(addToDoBody.data.toDoInfo.id);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });
  });
});
