import ModifyContentParamDTO from "@dto/params/to-do/modify-content.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IModifyContentBodyParam, IModifyContentPathParam } from "@my-types/params/to-do.param.type";
import Joi from "joi";

export const modifyContentBodySchema = Joi.object<IModifyContentBodyParam>().keys({
  content: Joi.string().required(),
});

export const modifyContentPathSchema = Joi.object<IModifyContentPathParam>().keys({
  id: Joi.number().required(),
});

export const modifyContentValidator: RequestDTOHandler<ModifyContentParamDTO> = async (req, res, next) => {
  const bodyParams = await modifyContentBodySchema.validateAsync(req.body);
  const pathParams = await modifyContentPathSchema.validateAsync(req.params);

  res.locals.requestDTO = new ModifyContentParamDTO({
    ...bodyParams,
    ...pathParams,
  });

  next();
};
