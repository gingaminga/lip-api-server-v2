import { rdbUtil } from "@loaders/util.loader";
import RoutineCycleEvery from "@my-rdb/entities/routine-cycle-every.entity";

export const RoutineCycleEveryRepository = rdbUtil.getRepository(RoutineCycleEvery);
