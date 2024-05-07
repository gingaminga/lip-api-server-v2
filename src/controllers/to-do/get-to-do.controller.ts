import GetToDoParamDTO from "@dto/params/to-do/get-to-do.param.dto";
import { toDoService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 할 일 가져오는 컨트롤러
 */
export const getToDoController: RequestDTOHandler<GetToDoParamDTO> = async (_req, res) => {
  const { requestDTO, userInfo } = res.locals;
  const { endDate, startDate } = requestDTO;
  const response = await toDoService.get(startDate, endDate, userInfo);

  res.result(response);
};
