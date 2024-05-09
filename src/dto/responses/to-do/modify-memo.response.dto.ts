import ToDo from "@my-rdb/entities/to-do.entity";

class ModifyMemoResponseDTO {
  toDoInfo: Omit<ToDo, "user">;

  constructor(toDoInfo: ToDo) {
    const { user, ...otherToDoInfo } = toDoInfo;
    this.toDoInfo = otherToDoInfo;
  }
}

export default ModifyMemoResponseDTO;
