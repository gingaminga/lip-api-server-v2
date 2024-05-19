import RemoveRoutineParamDTO from "@dto/params/routine/remove-routine.param.dto";
import { routineService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 루틴 삭제하는 컨트롤러
 */
export const removeRoutineController: RequestDTOHandler<RemoveRoutineParamDTO> = async (_req, res) => {
  const { requestDTO, userInfo } = res.locals;

  const response = await routineService.remove(requestDTO, userInfo);

  res.result(response);
};
