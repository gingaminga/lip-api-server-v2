import GetRoutineToDoParamDTO from "@dto/params/routine/to-do/get-routine-to-do.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IGetRoutineToDoParam } from "@my-types/params/routine-to-do.param.type";
import dayjs from "dayjs";
import Joi from "joi";

export const getRoutineToDoSchema = Joi.object<IGetRoutineToDoParam>().keys({
  endDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD"))
    .required(),
  startDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD"))
    .required(),
});

export const getRoutineToDoValidator: RequestDTOHandler<GetRoutineToDoParamDTO> = async (req, res, next) => {
  const params = await getRoutineToDoSchema.validateAsync(req.query);

  res.locals.requestDTO = new GetRoutineToDoParamDTO(params);

  next();
};
