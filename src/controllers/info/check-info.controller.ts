import CheckInfoParamDTO from "@dto/params/info/check-info.param.dto";
import { infoService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 서버 정보를 확인하는 컨트롤러
 */
export const checkServerInfoController: RequestDTOHandler<CheckInfoParamDTO> = (_req, res) => {
  const { memory, name, uptime } = res.locals.requestDTO;

  const response = infoService.info(memory, name, uptime);

  res.result(response);
};
