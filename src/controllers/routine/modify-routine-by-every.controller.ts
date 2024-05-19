import ModifyRoutineByEveryParamDTO from "@dto/params/routine/modify-routine-by-every.param.dto";
import { routineService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 일 수를 기준으로 루틴 수정하는 컨트롤러
 */
export const modifyRoutineByEveryController: RequestDTOHandler<ModifyRoutineByEveryParamDTO> = async (_req, res) => {
  const { requestDTO, userInfo } = res.locals;

  const response = await routineService.modifyRoutineByEvery(requestDTO, userInfo);

  res.result(response);
};
