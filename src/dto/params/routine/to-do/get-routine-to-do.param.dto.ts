import { IGetRoutineToDoParam } from "@my-types/params/routine-to-do.param.type";

class GetRoutineToDoParamDTO {
  endDate: string;

  startDate: string;

  constructor({ endDate, startDate }: IGetRoutineToDoParam) {
    this.endDate = endDate;
    this.startDate = startDate;
  }
}

export default GetRoutineToDoParamDTO;
