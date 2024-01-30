import app from "@app";
import { startRDB, stopRDB } from "@my-rdb/index";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import request from "supertest";

const path = "/api/to-do";

describe(`POST ${path}/:id API test :)`, () => {
  const id = 1;
  const fullPath = `${path}/${id}`;

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
      const { body, status } = await request(app).delete(fakePath);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual({ message: ERROR_MESSAGE.INVALID_VALUE });
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`${HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR} test :)`, () => {
    it(`should respond error.`, async () => {
      // when
      const { body, status } = await request(app).delete(fullPath);

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

    it(`should reponse -1 in id because not exist to do.`, async () => {
      // when
      const fakePath = `${path}/${10000}`;
      const { body, status } = await request(app).delete(fakePath);

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
      await request(app).post(addToDoPath).send(addToDoParams);

      // when
      const { body, status } = await request(app).delete(fullPath);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data.id).toBe(id);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });
  });
});
