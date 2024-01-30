import { HTTP_STATUS_CODE } from "@utils/constants";
import CError from "@utils/error";
import ERROR_MESSAGE from "@utils/error-message";
import { NextFunction, Request, Response } from "express";
import { isError } from "joi";

/**
 * @description error handler 미들웨어
 */
export default (error: unknown, _req: Request, res: Response, _: NextFunction) => {
  if (isError(error)) {
    // validation 에러 처리
    const errorMessage = `${ERROR_MESSAGE.INVALID_VALUE} ${error.message}`;
    res.error(HTTP_STATUS_CODE.INVALID_VALUE, errorMessage);

    return;
  }

  const { message } = new CError(error);

  const errorMessage = `${ERROR_MESSAGE.INTERNAL_SERVER_ERROR} ${message}`;
  res.error(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, errorMessage);
};
