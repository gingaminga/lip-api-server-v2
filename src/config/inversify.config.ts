import { InfoService } from "@services/info.service";
import { ToDoService } from "@services/to-do.service";
import INVERSIFY_TYPES from "@utils/invesify-type";
import { Container } from "inversify";

const container = new Container();

container.bind<InfoService>(INVERSIFY_TYPES.InfoService).to(InfoService).inSingletonScope();
container.bind<ToDoService>(INVERSIFY_TYPES.ToDoService).to(ToDoService).inSingletonScope();

export default container;
