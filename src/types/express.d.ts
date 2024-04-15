import { IErrorData } from "./error.type";

declare global {
  namespace Express {
    interface Response {
      result(data: any): void;
      error(code: number, errorMessage: string, data?: IErrorData): void;
    }
  }
}
