import AddRoutineByDaysParamDTO from "@dto/params/routine/add-routine-by-days.param.dto";
import { routineService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 요일을 기준으로 루틴 추가하는 컨트롤러
 */
export const addRoutineByDaysController: RequestDTOHandler<AddRoutineByDaysParamDTO> = async (_req, res) => {
  const { requestDTO, userInfo } = res.locals;

  const response = await routineService.addRoutineByDays(requestDTO, userInfo);

  res.result(response);
};
