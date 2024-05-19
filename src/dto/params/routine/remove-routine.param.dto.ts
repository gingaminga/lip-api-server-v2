import { IRemoveRoutineParam } from "@my-types/params/routine.param.type";

class RemoveRoutineParamDTO {
  id: number;

  constructor({ id }: IRemoveRoutineParam) {
    this.id = id;
  }
}

export default RemoveRoutineParamDTO;
