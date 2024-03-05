import { JwtPayload } from "jsonwebtoken";
import { TSocialType } from "./social.type";

export interface IOAuthJwtPayload extends JwtPayload {
  nickname: string;
  type: TSocialType;
}
