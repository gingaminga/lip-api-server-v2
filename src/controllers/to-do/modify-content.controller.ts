import ModifyContentParamDTO from "@dto/params/to-do/modify-content.param.dto";
import { toDoService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 할 일 내용 변경하는 컨트롤러
 */
export const modifyContentController: RequestDTOHandler<ModifyContentParamDTO> = async (_req, res) => {
  const { content, id } = res.locals.requestDTO;

  const response = await toDoService.modifyContent(id, content);

  res.result(response);
};
