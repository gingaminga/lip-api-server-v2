import { getRoutineToDoController } from "@controllers/routine/to-do/get-routine-to-do.controller";
import checkAccessTokenMiddleware from "@middlewares/check-access-token.middleware";
import { getRoutineToDoValidator } from "@validators/routine/to-do/get-routine-to-do.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.get("/", checkAccessTokenMiddleware, getRoutineToDoValidator, getRoutineToDoController);

export default router;
