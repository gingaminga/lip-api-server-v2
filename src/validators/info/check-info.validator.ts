import CheckInfoParamDTO from "@dto/params/info/check-info.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { ICheckInfoParam } from "@my-types/params/info.param.type";
import Joi from "joi";

export const checkInfoSchema = Joi.object<ICheckInfoParam>().keys({
  name: Joi.boolean(),
  memory: Joi.boolean(),
  uptime: Joi.boolean(),
});

export const checkInfoValidator: RequestDTOHandler<CheckInfoParamDTO> = async (req, res, next) => {
  const params = await checkInfoSchema.validateAsync(req.query);

  res.locals.requestDTO = new CheckInfoParamDTO(params);

  next();
};
