import ModifyRoutineByEveryParamDTO from "@dto/params/routine/modify-routine-by-every.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IModifyRoutineByEveryParam } from "@my-types/params/routine.param.type";
import dayjs from "dayjs";
import Joi from "joi";

export const modifyRoutineByEveryBodySchema = Joi.object<IModifyRoutineByEveryParam>().keys({
  color: Joi.string().length(6),
  description: Joi.string().max(100),
  endDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD")),
  every: Joi.number().min(1),
  startDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD")),
  title: Joi.string().max(30),
});

export const modifyRoutineByEveryPathSchema = Joi.object<IModifyRoutineByEveryParam>().keys({
  id: Joi.number().required(),
});

export const modifyRoutineByEveryValidator: RequestDTOHandler<ModifyRoutineByEveryParamDTO> = async (
  req,
  res,
  next,
) => {
  const bodyParams = await modifyRoutineByEveryBodySchema.validateAsync(req.body);
  const pathParams = await modifyRoutineByEveryPathSchema.validateAsync(req.params);

  res.locals.requestDTO = new ModifyRoutineByEveryParamDTO({ ...bodyParams, ...pathParams });

  next();
};
