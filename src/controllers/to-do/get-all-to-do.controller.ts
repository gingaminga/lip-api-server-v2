import { toDoService } from "@loaders/service.loader";
import { RequestHandler } from "express";

/**
 * @description 전체 할 일 가져오는 컨트롤러
 */
export const getAllToDoController: RequestHandler = async (_req, res) => {
  const response = await toDoService.getAll();

  res.result(response);
};
