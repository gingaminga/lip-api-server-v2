import { addToDoController } from "@controllers/to-do/add-to-do.controller";
import { checkToDoController } from "@controllers/to-do/check-to-do.controller";
import { getToDoController } from "@controllers/to-do/get-to-do.controller";
import { modifyContentController } from "@controllers/to-do/modify-content.controller";
import { modifyMemoController } from "@controllers/to-do/modify-memo.controller";
import { removeToDoController } from "@controllers/to-do/remove-to-do.controller";
import checkAccessTokenMiddleware from "@middlewares/check-access-token.middleware";
import { addToDoValidator } from "@validators/to-do/add-to-do.validator";
import { checkToDoValidator } from "@validators/to-do/check-to-do.validator";
import { getToDoValidator } from "@validators/to-do/get-to-do.validator";
import { modifyContentValidator } from "@validators/to-do/modify-content.validator";
import { modifyMemoValidator } from "@validators/to-do/modify-memo.validator";
import { removeToDoValidator } from "@validators/to-do/remove-to-do.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.get("/", checkAccessTokenMiddleware, getToDoValidator, getToDoController);
router.post("/", checkAccessTokenMiddleware, addToDoValidator, addToDoController);
router.patch("/checked/:id", checkAccessTokenMiddleware, checkToDoValidator, checkToDoController);
router.patch("/content/:id", checkAccessTokenMiddleware, modifyContentValidator, modifyContentController);
router.patch("/memo/:id", checkAccessTokenMiddleware, modifyMemoValidator, modifyMemoController);
router.delete("/:id", checkAccessTokenMiddleware, removeToDoValidator, removeToDoController);

export default router;
