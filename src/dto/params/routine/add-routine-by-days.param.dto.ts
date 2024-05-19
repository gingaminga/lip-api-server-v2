import AddCommonRoutineParamDTO from "@dto/params/routine/add-routine-common.param.dto";
import { IAddRoutineByDaysParam } from "@my-types/params/routine.param.type";

class AddRoutineByDaysParamDTO extends AddCommonRoutineParamDTO {
  days: string;

  constructor({ days, ...dto }: IAddRoutineByDaysParam) {
    super(dto);

    this.days = days;
  }
}

export default AddRoutineByDaysParamDTO;
