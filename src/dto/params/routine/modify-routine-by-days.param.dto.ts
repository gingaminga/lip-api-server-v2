import AddRoutineByDaysParamDTO from "@dto/params/routine/add-routine-by-days.param.dto";
import { IModifyRoutineByDaysParam } from "@my-types/params/routine.param.type";

class ModifyRoutineByDaysParamDTO extends AddRoutineByDaysParamDTO {
  id: number;

  constructor({ id, ...dto }: IModifyRoutineByDaysParam) {
    super(dto);

    this.id = id;
  }
}

export default ModifyRoutineByDaysParamDTO;
