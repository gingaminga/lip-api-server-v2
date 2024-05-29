import GetRoutineToDoParamDTO from "@dto/params/routine/to-do/get-routine-to-do.param.dto";
import { routineToDoService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 루틴 할 일 가져오는 컨트롤러
 */
export const getRoutineToDoController: RequestDTOHandler<GetRoutineToDoParamDTO> = async (_req, res) => {
  const { requestDTO, userInfo } = res.locals;

  const response = await routineToDoService.get(requestDTO, userInfo);

  res.result(response);
};
