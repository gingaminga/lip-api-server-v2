import { authService } from "@loaders/service.loader";
import { RequestDTOHandler } from "@my-types/express.type";
import { IOAuthJwtPayload } from "@my-types/jwt.type";
import { HTTP_STATUS_CODE } from "@utils/constants";
import CError from "@utils/error";
import ERROR_MESSAGE from "@utils/error-message";
import { verifyJWTToken } from "@utils/jwt";

/**
 * @description access token 체크하기
 */
const checkAccessToken: RequestDTOHandler = async (req, res, next) => {
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

export default checkAccessToken;
