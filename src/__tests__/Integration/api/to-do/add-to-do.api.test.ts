import app from "@app";
import ToDo from "@my-rdb/entities/to-do.entity";
import { startRDB, stopRDB } from "@my-rdb/index";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import request from "supertest";

const path = "/api/to-do";

describe(`POST ${path} API test :)`, () => {
  const content = "Test content";
  const date = "2024-01-01";
  const params = {
    content,
    date,
  };

  beforeEach(() => {
    params.content = content;
    params.date = date;
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

    it(`should error when date parameter is not date format`, async () => {
      // given
      params.date = "20240101";

      // when
      const { body, status } = await request(app).post(path).send(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });

    it(`should error when date parameter is invalid date.`, async () => {
      // given
      params.date = "1234-56-78";

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
      // when
      const { body, status } = await request(app).post(path).send(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.CREATED} test :)`, () => {
    beforeAll(async () => {
      await startRDB();
    });

    afterAll(async () => {
      await stopRDB();
    });

    it(`should respond with new to do info.`, async () => {
      // when
      const { body, status } = await request(app).post(path).send(params);
      const todo = await ToDoRepository.findOne({
        where: {
          id: body.data.id,
        },
      });

      // then
      expect(status).toBe(HTTP_STATUS_CODE.CREATED);
      expect(todo).not.toBeNull();
      expect(body.data).toEqual(
        expect.objectContaining({
          ...todo,
          createdAt: body.data.createdAt.toString(),
          updatedAt: body.data.updatedAt.toString(),
        }),
      );
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });
  });
});
