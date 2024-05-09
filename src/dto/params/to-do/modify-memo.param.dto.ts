import { IModifyMemoParam } from "@my-types/params/to-do.param.type";

class ModifyMemoParamDTO {
  memo: string;

  id: number;

  constructor({ memo, id }: IModifyMemoParam) {
    this.memo = memo;
    this.id = id;
  }
}

export default ModifyMemoParamDTO;
