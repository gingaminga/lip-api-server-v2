import app from "@app";
import ToDo from "@my-rdb/entities/to-do.entity";
import User from "@my-rdb/entities/user.entity";
import { startRDB, stopRDB } from "@my-rdb/index";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { UserRepository } from "@my-rdb/repositories/user.repository";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import { createJWTToken } from "@utils/jwt";
import request from "supertest";

const path = "/api/to-do";

describe(`GET ${path} API test :)`, () => {
  const params = {
    endDate: "",
    startDate: "",
  };

  let user: User;
  let token = "";

  beforeEach(() => {
    params.endDate = "";
    params.startDate = "";
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
    it(`should error when startDate parameter is not date format.`, async () => {
      // when
      params.endDate = "2024-01-01";
      params.startDate = "20240101";
      const { body, status } = await request(app)
        .get(path)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });

    it(`should error when endDate parameter is not date format.`, async () => {
      // given
      params.endDate = "20240101";
      params.startDate = "2024-01-01";

      // when
      const { body, status } = await request(app)
        .get(path)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.OK} test :)`, () => {
    beforeAll(async () => {
      const content = "Test content";

      const dates = [
        "2024-01-01",
        "2024-01-01",
        "2024-01-01",
        "2024-01-03",
        "2024-01-07",
        "2024-01-10",
        "2024-01-10",
        "2024-01-25",
        "2024-01-31",
        "2024-02-01",
      ];

      const toDoItems = dates.map((date) => {
        const toDo = new ToDo();
        toDo.content = content;
        toDo.date = date;
        toDo.user = user;

        return toDo;
      });

      await ToDoRepository.insert(toDoItems);
    });

    it(`should respond with todo array by one day.`, async () => {
      // given
      params.startDate = "2024-01-01";
      params.endDate = "2024-01-01";

      // when
      const { body, status } = await request(app)
        .get(path)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data.toDos).toHaveLength(3);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });

    it(`should respond with todo array by month.`, async () => {
      // given
      params.startDate = "2024-01-01";
      params.endDate = "2024-01-31";

      // when
      const { body, status } = await request(app)
        .get(path)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data.toDos).toHaveLength(9);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });

    it(`should respond with empty todo array.`, async () => {
      // given
      params.startDate = "2024-03-10";
      params.endDate = "2024-03-01";

      // when
      const { body, status } = await request(app)
        .get(path)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .query(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data.toDos).toHaveLength(0);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });
  });
});
