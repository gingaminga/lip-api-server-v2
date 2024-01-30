import { IRemoveToDoParam } from "@my-types/params/to-do.param.type";

class RemoveToDoParamDTO {
  id: number;

  constructor({ id }: IRemoveToDoParam) {
    this.id = id;
  }
}

export default RemoveToDoParamDTO;
