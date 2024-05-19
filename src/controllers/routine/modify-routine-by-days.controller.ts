import ModifyRoutineByDaysParamDTO from "@dto/params/routine/modify-routine-by-days.param.dto";
import { routineService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 요일을 기준으로 루틴 수정하는 컨트롤러
 */
export const modifyRoutineByDaysController: RequestDTOHandler<ModifyRoutineByDaysParamDTO> = async (_req, res) => {
  const { requestDTO, userInfo } = res.locals;

  const response = await routineService.modifyRoutineByDays(requestDTO, userInfo);

  res.result(response);
};
