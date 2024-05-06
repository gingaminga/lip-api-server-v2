import CheckToDoParamDTO from "@dto/params/to-do/check-to-do.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { ICheckToDoBodyParam, ICheckToDoPathParam } from "@my-types/params/to-do.param.type";
import Joi from "joi";

export const checkToDoBodySchema = Joi.object<ICheckToDoBodyParam>().keys({
  isChecked: Joi.bool().required(),
});

export const checkToDoPathSchema = Joi.object<ICheckToDoPathParam>().keys({
  id: Joi.number().required(),
});

export const checkToDoValidator: RequestDTOHandler<CheckToDoParamDTO> = async (req, res, next) => {
  const pathParams = await checkToDoPathSchema.validateAsync(req.params);
  const bodyParams = await checkToDoBodySchema.validateAsync(req.body);

  res.locals.requestDTO = new CheckToDoParamDTO({
    ...pathParams,
    ...bodyParams,
  });

  next();
};
