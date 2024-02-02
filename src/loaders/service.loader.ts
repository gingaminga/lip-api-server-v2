import container from "@config/inversify.config";
import { SocialService } from "@services/social.service";
import { ToDoService } from "@services/to-do.service";
import INVERSIFY_TYPES from "@utils/invesify-type";

export const socialService = container.get<SocialService>(INVERSIFY_TYPES.SocialService);
export const toDoService = container.get<ToDoService>(INVERSIFY_TYPES.ToDoService);
