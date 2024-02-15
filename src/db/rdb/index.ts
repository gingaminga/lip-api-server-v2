import logger from "@config/logger.config";
import { rdbUtil } from "@loaders/util.loader";

/**
 * @description RDB 실행
 */
export const startRDB = async () => {
  try {
    await rdbUtil.start();
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
    await rdbUtil.stop();
  } catch (error) {
    logger.error(error);
    process.kill(process.pid);
  }
};
