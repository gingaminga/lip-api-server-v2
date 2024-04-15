import logger from "@config/logger.config";
import relationDBOption from "@config/orm.config";
import { RELATION_DB } from "@utils/constants";
import colors from "ansi-colors";
import { DataSource } from "typeorm";
import { createDatabase } from "typeorm-extension";

class RelationDBClient extends DataSource {
  /**
   * @description 시작하기
   */
  async start() {
    await createDatabase({
      ifNotExist: true,
      options: relationDBOption,
    });
    await this.initialize();

    logger.info(`${RELATION_DB.TYPE} connect ${colors.green("success")} :)`);
  }

  /**
   * @description 종료하기
   */
  async stop() {
    await this.destroy();
  }
}

export default RelationDBClient;
