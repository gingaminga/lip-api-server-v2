import { HTTP_STATUS_CODE, JWT } from "@utils/constants";
import CError from "@utils/error";
import ERROR_MESSAGE from "@utils/error-message";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const checkJWTPayload = (data: string | JwtPayload): data is JwtPayload => typeof data !== "string";

/**
 * @description 토큰 생성하기
 * @param payload
 * @param options jwt 옵션
 */
export const createJWTToken = <T extends object>(payload: T, options: SignOptions) => {
  const token = jwt.sign(payload, JWT.KEY, options);

  return token;
};

/**
 * @description 토큰 해석하기
 * @param token 토큰
 */
export const verifyJWTToken = <T>(token: string) => {
  const decodedData = jwt.verify(token, JWT.KEY);

  if (!checkJWTPayload(decodedData)) {
    throw new CError(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  return decodedData as JwtPayload & T;
};
