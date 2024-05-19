import { rdbUtil } from "@loaders/util.loader";
import RoutineCycleDays from "@my-rdb/entities/routine-cycle-days.entity";

export const RoutineCycleDaysRepository = rdbUtil.getRepository(RoutineCycleDays);
