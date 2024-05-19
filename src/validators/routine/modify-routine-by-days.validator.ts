import ModifyRoutineByDaysParamDTO from "@dto/params/routine/modify-routine-by-days.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IModifyRoutineByDaysParam } from "@my-types/params/routine.param.type";
import dayjs from "dayjs";
import Joi from "joi";

export const modifyRoutineByDaysBodySchema = Joi.object<IModifyRoutineByDaysParam>().keys({
  color: Joi.string().length(6),
  days: Joi.string().max(7),
  description: Joi.string().max(100),
  endDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD")),
  startDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD")),
  title: Joi.string().max(30),
});

export const modifyRoutineByDaysPathSchema = Joi.object<IModifyRoutineByDaysParam>().keys({
  id: Joi.number().required(),
});

export const modifyRoutineByDaysValidator: RequestDTOHandler<ModifyRoutineByDaysParamDTO> = async (req, res, next) => {
  const bodyParams = await modifyRoutineByDaysBodySchema.validateAsync(req.body);
  const pathParams = await modifyRoutineByDaysPathSchema.validateAsync(req.params);

  res.locals.requestDTO = new ModifyRoutineByDaysParamDTO({ ...bodyParams, ...pathParams });

  next();
};
