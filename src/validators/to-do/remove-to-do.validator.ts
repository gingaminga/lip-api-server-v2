import RemoveToDoParamDTO from "@dto/params/to-do/remove-to-do.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IRemoveToDoParam } from "@my-types/params/to-do.param.type";
import Joi from "joi";

export const removeToDoSchema = Joi.object<IRemoveToDoParam>().keys({
  id: Joi.number().required(),
});

export const removeToDoValidator: RequestDTOHandler<RemoveToDoParamDTO> = async (req, res, next) => {
  const params = await removeToDoSchema.validateAsync(req.params);

  res.locals.requestDTO = new RemoveToDoParamDTO(params);

  next();
};
