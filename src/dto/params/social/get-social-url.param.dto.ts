import { IGetSocialURLParam } from "@my-types/params/social.param.type";
import { TSocialType } from "@my-types/social.type";

class GetSocialURLParamDTO {
  type: TSocialType;

  constructor({ type }: IGetSocialURLParam) {
    this.type = type;
  }
}

export default GetSocialURLParamDTO;
