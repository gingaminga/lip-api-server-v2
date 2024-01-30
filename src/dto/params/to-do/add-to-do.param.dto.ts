import { IAddToDoParam } from "@my-types/params/to-do.param.type";

class AddToDoParamDTO {
  content: string;

  date: string;

  constructor({ content, date }: IAddToDoParam) {
    this.content = content;
    this.date = date;
  }
}

export default AddToDoParamDTO;
