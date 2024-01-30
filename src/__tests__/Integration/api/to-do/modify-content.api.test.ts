import app from "@app";
import { startRDB, stopRDB } from "@my-rdb/index";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import request from "supertest";

const path = "/api/to-do/content";

describe(`POST ${path} API test :)`, () => {
  const content = "Test content";
  const id = 1;
  const fullPath = `${path}/${id}`;
  const params = {
    content,
  };

  beforeEach(() => {
    params.content = content;
  });

  describe(`${HTTP_STATUS_CODE.NOT_FOUND} test :)`, () => {
    it(`should error when require parameter is not exist.`, async () => {
      // when
      const { body, status } = await request(app).patch(path);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.NOT_FOUND);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.NOT_FOUND });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.INVALID_VALUE} test :)`, () => {
    it(`should error when require parameter is not exist.`, async () => {
      // when
      const { body, status } = await request(app).patch(fullPath);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR} test :)`, () => {
    it(`should respond error.`, async () => {
      // when
      const { body, status } = await request(app).patch(fullPath).send(params);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.OK} test :)`, () => {
    beforeAll(async () => {
      await startRDB();
    });

    afterAll(async () => {
      await stopRDB();
    });

    it(`should respond with modify content.`, async () => {
      // given
      const addToDoPath = "/api/to-do";
      const addToDoParams = {
        content: "Test add content",
        date: "2024-01-01",
      };
      await request(app).post(addToDoPath).send(addToDoParams);

      // when
      const { body, status } = await request(app).patch(fullPath).send(params);
      const todo = await ToDoRepository.findOneBy({
        id: body.data.id,
      });

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
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
