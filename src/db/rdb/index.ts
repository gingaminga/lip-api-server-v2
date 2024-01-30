import logger from "@config/logger.config";
import { rdbClient } from "@loaders/database.loader";

/**
 * @description RDB 실행
 */
export const startRDB = async () => {
  try {
    await rdbClient.start();
  } catch (error) {
    logger.error(error);
    process.kill(process.pid);
  }
};

/**
 * @description RDB 종료
 */
export const stopRDB = async () => {
  try {
    await rdbClient.stop();
  } catch (error) {
    logger.error(error);
    process.kill(process.pid);
  }
};
