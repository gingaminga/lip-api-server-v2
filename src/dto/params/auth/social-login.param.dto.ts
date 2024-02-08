import { ISocialLoginParam } from "@my-types/params/auth.param.type";
import { TSocialType } from "@my-types/social.type";

class SocialLoginParamDTO {
  type: TSocialType;

  code: string;

  constructor({ code, type }: ISocialLoginParam) {
    this.code = code;
    this.type = type;
  }
}

export default SocialLoginParamDTO;
