import { IAddCommonRoutineParam } from "@my-types/params/routine.param.type";

class AddCommonRoutineParamDTO {
  color: string;

  description?: string;

  endDate?: string;

  startDate: string;

  title: string;

  constructor({ color, description, endDate, startDate, title }: IAddCommonRoutineParam) {
    this.color = color;
    this.description = description;
    this.endDate = endDate;
    this.startDate = startDate;
    this.title = title;
  }
}

export default AddCommonRoutineParamDTO;
