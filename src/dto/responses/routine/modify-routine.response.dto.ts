import Routine from "@my-rdb/entities/routine.entity";

class ModifyRoutineResponseDTO {
  routineInfo: Omit<Routine, "user">;

  constructor(routineInfo: Routine) {
    const { user, ...otherToDoInfo } = routineInfo;
    this.routineInfo = otherToDoInfo;
  }
}

export default ModifyRoutineResponseDTO;
