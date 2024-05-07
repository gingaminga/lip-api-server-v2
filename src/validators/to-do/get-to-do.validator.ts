import GetToDoParamDTO from "@dto/params/to-do/get-to-do.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IGetToDoParam } from "@my-types/params/to-do.param.type";
import dayjs from "dayjs";
import Joi from "joi";

export const getToDoSchema = Joi.object<IGetToDoParam>().keys({
  endDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD"))
    .required(),
  startDate: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD"))
    .required(),
});

export const getToDoValidator: RequestDTOHandler<GetToDoParamDTO> = async (req, res, next) => {
  const params = await getToDoSchema.validateAsync(req.query);

  res.locals.requestDTO = new GetToDoParamDTO(params);

  next();
};
