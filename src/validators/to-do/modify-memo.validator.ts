import ModifyMemoParamDTO from "@dto/params/to-do/modify-memo.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IModifyMemoBodyParam, IModifyMemoPathParam } from "@my-types/params/to-do.param.type";
import Joi from "joi";

export const modifyMemoBodySchema = Joi.object<IModifyMemoBodyParam>().keys({
  memo: Joi.string().required(),
});

export const modifyMemoPathSchema = Joi.object<IModifyMemoPathParam>().keys({
  id: Joi.number().required(),
});

export const modifyMemoValidator: RequestDTOHandler<ModifyMemoParamDTO> = async (req, res, next) => {
  const bodyParams = await modifyMemoBodySchema.validateAsync(req.body);
  const pathParams = await modifyMemoPathSchema.validateAsync(req.params);

  res.locals.requestDTO = new ModifyMemoParamDTO({
    ...bodyParams,
    ...pathParams,
  });

  next();
};
