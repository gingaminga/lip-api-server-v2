import { rdbUtil } from "@loaders/util.loader";
import RoutineToDo from "@my-rdb/entities/routine-to-do.entity";

export const RoutineToDoRepository = rdbUtil.getRepository(RoutineToDo);
