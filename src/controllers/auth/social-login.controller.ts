import SocialLoginParamDTO from "@dto/params/auth/social-login.param.dto";
import { authService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description 소셜 로그인 컨트롤러
 */
export const socialLoginController: RequestDTOHandler<SocialLoginParamDTO> = async (_req, res) => {
  const { code, type } = res.locals.requestDTO;

  const response = await authService.socialLogin(type, code);

  res.result(response);
};
