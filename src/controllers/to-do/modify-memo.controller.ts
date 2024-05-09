import ModifyMemoParamDTO from "@dto/params/to-do/modify-memo.param.dto";
import { toDoService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 할 일 내용 변경하는 컨트롤러
 */
export const modifyMemoController: RequestDTOHandler<ModifyMemoParamDTO> = async (_req, res) => {
  const { requestDTO, userInfo } = res.locals;
  const { id, memo } = requestDTO;

  const response = await toDoService.modifyMemo(id, memo, userInfo);

  res.result(response);
};
