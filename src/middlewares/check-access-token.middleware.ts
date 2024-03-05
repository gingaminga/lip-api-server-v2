import { authService } from "@loaders/service.loader";
import { ResponseDTO } from "@my-types/express.type";
import { IOAuthJwtPayload } from "@my-types/jwt.type";
import { HTTP_STATUS_CODE } from "@utils/constants";
import CError from "@utils/error";
import ERROR_MESSAGE from "@utils/error-message";
import { verifyJWTToken } from "@utils/jwt";
import { NextFunction, Request } from "express";

/**
 * @description access token 체크하기
 */
export default async (req: Request, res: ResponseDTO, next: NextFunction) => {
  const { authorization = "" } = req.headers;

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    throw new CError(ERROR_MESSAGE.UNAUTHORIZED, HTTP_STATUS_CODE.UNAUTHORIZED);
  }

  const { nickname } = verifyJWTToken<IOAuthJwtPayload>(token);

  const userInfo = await authService.getUserInfoByNickname(nickname);
  res.locals.userInfo = userInfo;

  next();
};
