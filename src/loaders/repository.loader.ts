import container from "@config/inversify.config";
import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { UserRepository } from "@my-rdb/repositories/user.repository";
import INVERSIFY_TYPES from "@utils/invesify-type";

export const toDoRepository = container.get<typeof ToDoRepository>(INVERSIFY_TYPES.ToDoRepository);
export const userRepository = container.get<typeof UserRepository>(INVERSIFY_TYPES.UserRepository);
