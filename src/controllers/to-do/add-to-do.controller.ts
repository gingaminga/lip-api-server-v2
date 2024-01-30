import AddToDoParamDTO from "@dto/params/to-do/add-to-do.param.dto";
import { toDoService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 할 일 추가하는 컨트롤러
 */
export const addToDoController: RequestDTOHandler<AddToDoParamDTO> = async (_req, res) => {
  const { content, date } = res.locals.requestDTO;

  const response = await toDoService.add(content, date);

  res.result(response);
};
