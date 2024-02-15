import { ToDoRepository } from "@my-rdb/repositories/to-do.repository";
import { UserRepository } from "@my-rdb/repositories/user.repository";
import RedisClient from "@my-redis/client";
import { AuthService } from "@services/auth.service";
import { ToDoService } from "@services/to-do.service";
import INVERSIFY_TYPES from "@utils/invesify-type";
import { Container } from "inversify";

const container = new Container();

// service
container.bind<AuthService>(INVERSIFY_TYPES.AuthService).to(AuthService).inSingletonScope();
container.bind<ToDoService>(INVERSIFY_TYPES.ToDoService).to(ToDoService).inSingletonScope();

// repository
container.bind<typeof ToDoRepository>(INVERSIFY_TYPES.ToDoRepository).toConstantValue(ToDoRepository);
container.bind<typeof UserRepository>(INVERSIFY_TYPES.UserRepository).toConstantValue(UserRepository);

// db
container.bind<RedisClient>(INVERSIFY_TYPES.RedisClient).toConstantValue(new RedisClient());

export default container;
