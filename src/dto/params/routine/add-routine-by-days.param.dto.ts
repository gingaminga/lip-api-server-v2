import { IAddRoutineByDaysParam } from "@my-types/params/routine.param.type";

class AddRoutineByDaysParamDTO {
  color: string;

  days: string;

  description?: string;

  endDate?: string;

  startDate: string;

  title: string;

  constructor({ color, days, description, endDate, startDate, title }: IAddRoutineByDaysParam) {
    this.color = color;
    this.days = days;
    this.description = description;
    this.endDate = endDate;
    this.startDate = startDate;
    this.title = title;
  }
}

export default AddRoutineByDaysParamDTO;
