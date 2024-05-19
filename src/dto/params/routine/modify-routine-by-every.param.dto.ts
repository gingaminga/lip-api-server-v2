import AddRoutineByEveryParamDTO from "@dto/params/routine/add-routine-by-every.param.dto";
import { IModifyRoutineByEveryParam } from "@my-types/params/routine.param.type";

class ModifyRoutineByEveryParamDTO extends AddRoutineByEveryParamDTO {
  id: number;

  constructor({ id, ...dto }: IModifyRoutineByEveryParam) {
    super(dto);

    this.id = id;
  }
}

export default ModifyRoutineByEveryParamDTO;
