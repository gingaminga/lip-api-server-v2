import GetSocialURLParamDTO from "@dto/params/social/get-social-url.param.dto";
import { authService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 소셜 url 가져오는 컨트롤러
 */
export const getSocialURLController: RequestDTOHandler<GetSocialURLParamDTO> = (_req, res) => {
  const { type } = res.locals.requestDTO;

  const response = authService.getSocialURL(type);

  res.result(response);
};
