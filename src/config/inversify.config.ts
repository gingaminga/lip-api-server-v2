import { SocialService } from "@services/social.service";
import { ToDoService } from "@services/to-do.service";
import INVERSIFY_TYPES from "@utils/invesify-type";
import { Container } from "inversify";

const container = new Container();

container.bind<SocialService>(INVERSIFY_TYPES.SocialService).to(SocialService).inSingletonScope();
container.bind<ToDoService>(INVERSIFY_TYPES.ToDoService).to(ToDoService).inSingletonScope();

export default container;
