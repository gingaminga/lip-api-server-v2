import container from "@config/inversify.config";
import { InfoService } from "@services/info.service";
import { ToDoService } from "@services/to-do.service";
import INVERSIFY_TYPES from "@utils/invesify-type";

export const infoService = container.get<InfoService>(INVERSIFY_TYPES.InfoService);
export const toDoService = container.get<ToDoService>(INVERSIFY_TYPES.ToDoService);
