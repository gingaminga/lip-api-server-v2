import { IModifyContentParam } from "@my-types/params/to-do.param.type";

class ModifyContentParamDTO {
  content: string;

  id: number;

  constructor({ content, id }: IModifyContentParam) {
    this.content = content;
    this.id = id;
  }
}

export default ModifyContentParamDTO;
