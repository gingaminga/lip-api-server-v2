import RemoveToDoParamDTO from "@dto/params/to-do/remove-to-do.param.dto";
import { toDoService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 할 일 삭제하는 컨트롤러
 */
export const removeToDoController: RequestDTOHandler<RemoveToDoParamDTO> = async (_req, res) => {
  const { id } = res.locals.requestDTO;

  const response = await toDoService.remove(id);

  res.result(response);
};
