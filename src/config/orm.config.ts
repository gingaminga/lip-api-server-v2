import RoutineCycleDays from "@my-rdb/entities/routine-cycle-days.entity";
import RoutineCycleEvery from "@my-rdb/entities/routine-cycle-every.entity";
import Routine from "@my-rdb/entities/routine.entity";
import ToDo from "@my-rdb/entities/to-do.entity";
import User from "@my-rdb/entities/user.entity";
import { PROJECT, RELATION_DB } from "@utils/constants";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const entities = [Routine, RoutineCycleDays, RoutineCycleEvery, ToDo, User];

const relationDBOption: DataSourceOptions = {
  database: RELATION_DB.SCHEMA,
  dropSchema: PROJECT.NODE_ENV === "test",
  entities,
  host: RELATION_DB.HOST,
  logging: PROJECT.NODE_ENV === "development",
  namingStrategy: new SnakeNamingStrategy(),
  password: RELATION_DB.PASSWORD,
  port: RELATION_DB.PORT,
  synchronize: PROJECT.NODE_ENV === "development",
  type: RELATION_DB.TYPE,
  username: RELATION_DB.USER_NAME,
};

export default relationDBOption;
