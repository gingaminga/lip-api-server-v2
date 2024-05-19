import AddRoutineByEveryParamDTO from "@dto/params/routine/add-routine-by-every.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IAddRoutineByEveryParam } from "@my-types/params/routine.param.type";
import dayjs from "dayjs";
import Joi from "joi";

export const addRoutineByEverySchema = Joi.object<IAddRoutineByEveryParam>().keys({
  color: Joi.string().length(6).required(),
  description: Joi.string().max(100),
  endDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD")),
  every: Joi.number().min(1).required(),
  startDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD"))
    .required(),
  title: Joi.string().max(30).required(),
});

export const addRoutineByEveryValidator: RequestDTOHandler<AddRoutineByEveryParamDTO> = async (req, res, next) => {
  const params = await addRoutineByEverySchema.validateAsync(req.body);

  res.locals.requestDTO = new AddRoutineByEveryParamDTO(params);

  next();
};
