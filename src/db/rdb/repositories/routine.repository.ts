import { rdbUtil } from "@loaders/util.loader";
import Routine from "@my-rdb/entities/routine.entity";

export const RoutineRepository = rdbUtil.getRepository(Routine);
