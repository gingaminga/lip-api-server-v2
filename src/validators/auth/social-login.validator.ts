import SocialLoginParamDTO from "@dto/params/auth/social-login.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { SOCIAL } from "@utils/constants";
import Joi from "joi";

export const socialLoginSchema = Joi.object<SocialLoginParamDTO>().keys({
  type: Joi.string().valid(SOCIAL.KAKAO.NAME, SOCIAL.NAVER.NAME, SOCIAL.GOOGLE.NAME).required(),
  code: Joi.string().required(),
});

export const socialLoginValidator: RequestDTOHandler<SocialLoginParamDTO> = async (req, res, next) => {
  const params = await socialLoginSchema.validateAsync(req.body);

  res.locals.requestDTO = new SocialLoginParamDTO(params);

  next();
};
