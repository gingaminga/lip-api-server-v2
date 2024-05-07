import ToDo from "@my-rdb/entities/to-do.entity";

class GetToDoResponseDTO {
  toDos: ToDo[];

  constructor(toDos: ToDo[]) {
    this.toDos = toDos;
  }
}

export default GetToDoResponseDTO;
