import { IAddRoutineByEveryParam } from "@my-types/params/routine.param.type";

class AddRoutineByEveryParamDTO {
  color: string;

  description?: string;

  endDate?: string;

  every: number;

  startDate: string;

  title: string;

  constructor({ color, description, endDate, every, startDate, title }: IAddRoutineByEveryParam) {
    this.color = color;
    this.description = description;
    this.endDate = endDate;
    this.every = every;
    this.startDate = startDate;
    this.title = title;
  }
}

export default AddRoutineByEveryParamDTO;
