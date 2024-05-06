import { ICheckToDoParam } from "@my-types/params/to-do.param.type";

class CheckToDoParamDTO {
  id: number;

  isChecked: boolean;

  constructor({ id, isChecked }: ICheckToDoParam) {
    this.id = id;
    this.isChecked = isChecked;
  }
}

export default CheckToDoParamDTO;
