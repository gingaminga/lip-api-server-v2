import AddToDoParamDTO from "@dto/params/to-do/add-to-do.param.dto";
import { toDoService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 할 일 추가하는 컨트롤러
 */
export const addToDoController: RequestDTOHandler<AddToDoParamDTO> = async (_req, res) => {
  const { requestDTO, userInfo } = res.locals;
  const { content, date } = requestDTO;

  const response = await toDoService.add(content, date, userInfo);

  res.result(response);
};
