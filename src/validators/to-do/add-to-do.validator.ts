import AddToDoParamDTO from "@dto/params/to-do/add-to-do.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { IAddToDoParam } from "@my-types/params/to-do.param.type";
import dayjs from "dayjs";
import Joi from "joi";

export const addToDoSchema = Joi.object<IAddToDoParam>().keys({
  content: Joi.string().required(),
  date: Joi.date()
    .iso()
    .custom((origin: string) => dayjs(origin).format("YYYY-MM-DD"))
    .required(),
});

export const addToDoValidator: RequestDTOHandler<AddToDoParamDTO> = async (req, res, next) => {
  const params = await addToDoSchema.validateAsync(req.body);

  res.locals.requestDTO = new AddToDoParamDTO(params);

  next();
};
