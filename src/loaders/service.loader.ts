import container from "@config/inversify.config";
import { AuthService } from "@services/auth.service";
import { RoutineToDoService } from "@services/routine-to-do.service";
import { RoutineService } from "@services/routine.service";
import { ToDoService } from "@services/to-do.service";
import INVERSIFY_TYPES from "@utils/invesify-type";

export const authService = container.get<AuthService>(INVERSIFY_TYPES.AuthService);
export const routineService = container.get<RoutineService>(INVERSIFY_TYPES.RoutineService);
export const routineToDoService = container.get<RoutineToDoService>(INVERSIFY_TYPES.RoutineToDoService);
export const toDoService = container.get<ToDoService>(INVERSIFY_TYPES.ToDoService);
