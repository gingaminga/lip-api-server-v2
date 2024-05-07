import { ICheckToDoParam, IGetToDoParam } from "@my-types/params/to-do.param.type";

class GetToDoParamDTO {
  endDate: string;

  startDate: string;

  constructor({ endDate, startDate }: IGetToDoParam) {
    this.endDate = endDate;
    this.startDate = startDate;
  }
}

export default GetToDoParamDTO;
