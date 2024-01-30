import RedisClient from "@my-redis/client";
import ERROR_MESSAGE from "@utils/error-message";

const testKey = "test-key";
const testField = "test-field";
const testValue = "test-value";

describe(`DB Redis test :)`, () => {
  describe(`Redis is not connected :)`, () => {
    const redisClient = new RedisClient();
    const error = new Error(ERROR_MESSAGE.NOT_CONNECT_REDIS);

    it(`should throw error when redis is not connect.`, () => {
      // when & then
      expect(async () => {
        await redisClient.del(testKey);
        await redisClient.get(testKey);
        await redisClient.hdel(testKey, testField);
        await redisClient.hget(testKey, testField);
        await redisClient.hset(testKey, testField, testValue);
        await redisClient.set(testKey, testValue);
      }).rejects.toThrow(error);
    });
  });

  describe(`Redis is connected :)`, () => {
    const redisClient = new RedisClient();

    beforeEach(() => {
      jest.spyOn(redisClient as any, "checkConnect").mockReturnValue(undefined);
    });

    describe(`del method test :)`, () => {
      it(`should be success.`, async () => {
        // given
        const getInstanceSpy = jest.spyOn(redisClient as any, "getInstance").mockReturnValue({
          del: jest.fn().mockResolvedValue(1),
        });

        await redisClient.del(testKey);

        // when & then
        expect(getInstanceSpy).toHaveBeenCalled();
        expect(getInstanceSpy.mock.results[0].value.del).toHaveBeenCalledWith(testKey);
      });
    });

    describe(`get method test :)`, () => {
      it("should be return null when has no value.", async () => {
        // given
        const getInstanceSpy = jest.spyOn(redisClient as any, "getInstance").mockReturnValue({
          get: jest.fn().mockResolvedValue(null),
        });

        // when
        const value = await redisClient.get(testKey);

        // then
        expect(value).toBeNull();
        expect(getInstanceSpy).toHaveBeenCalled();
        expect(getInstanceSpy.mock.results[0].value.get).toHaveBeenCalledWith(testKey);
      });

      it(`should be return ${testValue} value.`, async () => {
        // given
        const getInstanceSpy = jest.spyOn(redisClient as any, "getInstance").mockReturnValue({
          get: jest.fn().mockResolvedValue(testValue),
        });

        // when
        const value = await redisClient.get(testKey);

        // then
        expect(value).toEqual(testValue);
        expect(getInstanceSpy).toHaveBeenCalled();
        expect(getInstanceSpy.mock.results[0].value.get).toHaveBeenCalledWith(testKey);
      });
    });

    describe(`hdel method test :)`, () => {
      it(`should be success.`, async () => {
        // given
        const getInstanceSpy = jest.spyOn(redisClient as any, "getInstance").mockReturnValue({
          hDel: jest.fn().mockResolvedValue(1),
        });

        // when
        await redisClient.hdel(testKey, testField);

        // then
        expect(getInstanceSpy).toHaveBeenCalled();
        expect(getInstanceSpy.mock.results[0].value.hDel).toHaveBeenCalledWith(testKey, testField);
      });
    });

    describe(`hget method test :)`, () => {
      it("should be return null when has no value.", async () => {
        // given
        const getInstanceSpy = jest.spyOn(redisClient as any, "getInstance").mockReturnValue({
          hGet: jest.fn().mockResolvedValue(null),
        });

        // when
        const value = await redisClient.hget(testKey, testField);

        // then
        expect(value).toBeNull();
        expect(getInstanceSpy).toHaveBeenCalled();
        expect(getInstanceSpy.mock.results[0].value.hGet).toHaveBeenCalledWith(testKey, testField);
      });

      it(`should be return ${testValue} value.`, async () => {
        // given
        const getInstanceSpy = jest.spyOn(redisClient as any, "getInstance").mockReturnValue({
          hGet: jest.fn().mockResolvedValue(testValue),
        });

        // when
        const value = await redisClient.hget(testKey, testField);

        // then
        expect(value).toEqual(testValue);
        expect(getInstanceSpy).toHaveBeenCalled();
        expect(getInstanceSpy.mock.results[0].value.hGet).toHaveBeenCalledWith(testKey, testField);
      });
    });

    describe(`hset method test :)`, () => {
      it(`should be success.`, async () => {
        // given
        const getInstanceSpy = jest.spyOn(redisClient as any, "getInstance").mockReturnValue({
          hSet: jest.fn().mockResolvedValue(1),
        });

        // when
        await redisClient.hset(testKey, testField, testValue);

        // then
        expect(getInstanceSpy).toHaveBeenCalled();
        expect(getInstanceSpy.mock.results[0].value.hSet).toHaveBeenCalledWith(testKey, testField, testValue);
      });
    });

    describe(`set method test :)`, () => {
      it(`should be success.`, async () => {
        // given
        const getInstanceSpy = jest.spyOn(redisClient as any, "getInstance").mockReturnValue({
          set: jest.fn().mockResolvedValue(1),
        });

        // when
        await redisClient.set(testKey, testValue);

        // then
        expect(getInstanceSpy).toHaveBeenCalled();
        expect(getInstanceSpy.mock.results[0].value.set).toHaveBeenCalledWith(testKey, testValue);
      });
    });
  });
});
