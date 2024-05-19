import AddCommonRoutineParamDTO from "@dto/params/routine/add-routine-common.param.dto";
import { IAddRoutineByEveryParam } from "@my-types/params/routine.param.type";

class AddRoutineByEveryParamDTO extends AddCommonRoutineParamDTO {
  every: number;

  constructor({ every, ...dto }: IAddRoutineByEveryParam) {
    super(dto);

    this.every = every;
  }
}

export default AddRoutineByEveryParamDTO;
