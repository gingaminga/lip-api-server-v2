import AddRoutineByEveryParamDTO from "@dto/params/routine/add-routine-by-every.param.dto";
import { routineService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 일 수를 기준으로 루틴 추가하는 컨트롤러
 */
export const addRoutineByEveryController: RequestDTOHandler<AddRoutineByEveryParamDTO> = async (_req, res) => {
  const { requestDTO, userInfo } = res.locals;

  const response = await routineService.addRoutineByEvery(requestDTO, userInfo);

  res.result(response);
};
