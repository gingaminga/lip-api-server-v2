import container from "@config/inversify.config";
import { ToDoService } from "@services/to-do.service";
import INVERSIFY_TYPES from "@utils/invesify-type";

export const toDoService = container.get<ToDoService>(INVERSIFY_TYPES.ToDoService);
