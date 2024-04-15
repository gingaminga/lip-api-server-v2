import { authService } from "@loaders/service.loader";
import { ResponseDTO } from "@my-types/express.type";
import { IOAuthJwtPayload } from "@my-types/jwt.type";
import { ERROR_CODE, HTTP_STATUS_CODE } from "@utils/constants";
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
    throw new CError(ERROR_MESSAGE.BAD_REQUEST, HTTP_STATUS_CODE.BAD_REQUEST);
  }

  try {
    const { nickname } = verifyJWTToken<IOAuthJwtPayload>(token);

    const userInfo = await authService.getUserInfoByNickname(nickname);
    res.locals.userInfo = userInfo;

    next();
  } catch (error) {
    const customError = new CError(error);

    if (error instanceof CError) {
      throw error;
    } else if (error instanceof Error) {
      if (error.message.startsWith("jwt")) {
        const data = {
          code: ERROR_CODE.AUTH.UNKNOWN_TOKEN,
        };

        if (error.message.startsWith("jwt malformed")) {
          data.code = ERROR_CODE.AUTH.UNKNOWN_TOKEN;
        } else if (error.message.startsWith("jwt expired")) {
          data.code = ERROR_CODE.AUTH.EXPIRED_TOKEN;
        }

        throw new CError(error, HTTP_STATUS_CODE.UNAUTHORIZED, data);
      }

      if (error.message.startsWith("invalid signature")) {
        const data = {
          code: ERROR_CODE.AUTH.INVALID_TOKEN,
        };

        throw new CError(error, HTTP_STATUS_CODE.UNAUTHORIZED, data);
      }
    }

    throw customError;
  }
};
