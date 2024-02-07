import container from "@config/inversify.config";
import { AuthService } from "@services/auth.service";
import { ToDoService } from "@services/to-do.service";
import INVERSIFY_TYPES from "@utils/invesify-type";

export const authService = container.get<AuthService>(INVERSIFY_TYPES.AuthService);
export const toDoService = container.get<ToDoService>(INVERSIFY_TYPES.ToDoService);
