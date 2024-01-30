import app from "@app";
import { startRDB, stopRDB } from "@my-rdb/index";
import { HTTP_STATUS_CODE, RESPONSE_STATUS } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";
import request from "supertest";

const path = "/api/to-do/all";

describe(`POST ${path} API test :)`, () => {
  describe(`${HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR} test :)`, () => {
    it(`should respond error.`, async () => {
      // when
      const { body, status } = await request(app).get(path);

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

    it(`should respond with an array.`, async () => {
      // when
      const { body, status } = await request(app).get(path);

      // then
      expect(status).toBe(HTTP_STATUS_CODE.OK);
      expect(body.data).toEqual([]);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });
  });
});
