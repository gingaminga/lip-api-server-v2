import "@config/preset.config";

import app from "@app";
import logger from "@config/logger.config";
import { startRDB } from "@my-rdb/index";
import { startRedis } from "@my-redis/index";
import { PROJECT } from "@utils/constants";
import getServer from "@utils/server";

const { PORT } = PROJECT;

const server = getServer(app);

server.listen(PORT, async () => {
  logger.info(`Start service on ${PORT} port!`);

  await startRedis();
  await startRDB();
});
