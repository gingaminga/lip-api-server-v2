import CheckToDoParamDTO from "@dto/params/to-do/check-to-do.param.dto";
import { toDoService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 할 일 완료 여부 변경하는 컨트롤러
 */
export const checkToDoController: RequestDTOHandler<CheckToDoParamDTO> = async (_req, res) => {
  const { requestDTO, userInfo } = res.locals;
  const { id, isChecked } = requestDTO;

  const response = await toDoService.yn(id, isChecked, userInfo);

  res.result(response);
};
