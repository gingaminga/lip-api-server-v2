import logger from "@config/logger.config";
import { redisClient } from "@loaders/database.loader";
import { REDIS } from "@utils/constants";

/**
 * @description 레디스 실행
 */
export const startRedis = async () => {
  try {
    const options = {
      host: REDIS.HOST,
      port: REDIS.PORT,
      password: REDIS.PASSWORD,
    };
    await redisClient.start(options);
  } catch (error) {
    logger.error(error);
    process.kill(process.pid);
  }
};

/**
 * @description 레디스 종료
 */
export const stopRedis = async () => {
  try {
    await redisClient.stop();
  } catch (error) {
    logger.error(error);
    process.kill(process.pid);
  }
};
