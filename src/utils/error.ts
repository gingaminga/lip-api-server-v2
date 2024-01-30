import { HTTP_STATUS_CODE } from "@utils/constants";
import ERROR_MESSAGE from "@utils/error-message";

/**
 * @description 에러 객체 custom
 */
export default class CError extends Error {
  public code = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

  /**
   * @param error 에러 메시지 or error 객체
   * @param code http 상태 코드
   */
  constructor(error: unknown, code?: number) {
    super();

    if (typeof error === "string") {
      this.message = error;
    } else if (error instanceof CError) {
      this.message = error.message;
      this.code = error.code;
    } else if (error instanceof Error) {
      this.message = error.message;
    } else {
      this.message = ERROR_MESSAGE.UNKNOWN_ERROR;
    }

    if (code) {
      this.code = code;
    }
  }
}
