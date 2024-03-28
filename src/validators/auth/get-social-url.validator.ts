import GetSocialURLParamDTO from "@dto/params/social/get-social-url.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IGetSocialURLParam } from "@my-types/params/social.param.type";
import { SOCIAL } from "@utils/constants";
import Joi from "joi";

export const getSocialURLSchema = Joi.object<IGetSocialURLParam>().keys({
  type: Joi.string().valid(SOCIAL.KAKAO.NAME, SOCIAL.NAVER.NAME, SOCIAL.GOOGLE.NAME).required(),
});

export const getSocialURLValidator: RequestDTOHandler<GetSocialURLParamDTO> = async (req, res, next) => {
  const params = await getSocialURLSchema.validateAsync(req.query);

  res.locals.requestDTO = new GetSocialURLParamDTO(params);

  next();
};
