import AddRoutineByDaysParamDTO from "@dto/params/routine/add-routine-by-days.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IAddRoutineByDaysParam } from "@my-types/params/routine.param.type";
import dayjs from "dayjs";
import Joi from "joi";

export const addRoutineByDaysSchema = Joi.object<IAddRoutineByDaysParam>().keys({
  color: Joi.string().length(6).required(),
  days: Joi.string().max(7).required(),
  description: Joi.string().max(100),
  endDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD")),
  startDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD"))
    .required(),
  title: Joi.string().max(30).required(),
});

export const addRoutineByDaysValidator: RequestDTOHandler<AddRoutineByDaysParamDTO> = async (req, res, next) => {
  const params = await addRoutineByDaysSchema.validateAsync(req.body);

  res.locals.requestDTO = new AddRoutineByDaysParamDTO(params);

  next();
};
