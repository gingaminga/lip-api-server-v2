import container from "@config/inversify.config";
import { RoutineCycleDaysRepository } from "@my-rdb/repositories/routine-cycle-days.repository";
import { RoutineCycleEveryRepository } from "@my-rdb/repositories/routine-cycle-every.repository";
import { RoutineRepository } from "@my-rdb/repositories/routine.repository";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { UserRepository } from "@my-rdb/repositories/user.repository";
import INVERSIFY_TYPES from "@utils/invesify-type";

export const toDoRepository = container.get<typeof ToDoRepository>(INVERSIFY_TYPES.ToDoRepository);
export const userRepository = container.get<typeof UserRepository>(INVERSIFY_TYPES.UserRepository);
export const routineCycleDaysRepository = container.get<typeof RoutineCycleDaysRepository>(
  INVERSIFY_TYPES.RoutineCycleDaysRepository,
);
export const routineCycleEveryRepository = container.get<typeof RoutineCycleEveryRepository>(
  INVERSIFY_TYPES.RoutineCycleEveryRepository,
);
export const routineRepository = container.get<typeof RoutineRepository>(INVERSIFY_TYPES.RoutineRepository);
