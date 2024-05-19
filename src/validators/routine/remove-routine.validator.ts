import RemoveRoutineParamDTO from "@dto/params/routine/remove-routine.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IRemoveRoutineParam } from "@my-types/params/routine.param.type";
import Joi from "joi";

export const removeRoutineSchema = Joi.object<IRemoveRoutineParam>().keys({
  id: Joi.number().required(),
});

export const removeRoutineValidator: RequestDTOHandler<RemoveRoutineParamDTO> = async (req, res, next) => {
  const params = await removeRoutineSchema.validateAsync(req.params);

  res.locals.requestDTO = new RemoveRoutineParamDTO(params);

  next();
};
