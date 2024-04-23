import { addToDoController } from "@controllers/to-do/add-to-do.controller";
import { getAllToDoController } from "@controllers/to-do/get-all-to-do.controller";
import { modifyContentController } from "@controllers/to-do/modify-content.controller";
import { removeToDoController } from "@controllers/to-do/remove-to-do.controller";
import checkAccessTokenMiddleware from "@middlewares/check-access-token.middleware";
import { addToDoValidator } from "@validators/to-do/add-to-do.validator";
import { modifyContentValidator } from "@validators/to-do/modify-content.validator";
import { removeToDoValidator } from "@validators/to-do/remove-to-do.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.get("/all", getAllToDoController);
router.post("/", checkAccessTokenMiddleware, addToDoValidator, addToDoController);
router.patch("/content/:id", checkAccessTokenMiddleware, modifyContentValidator, modifyContentController);
router.delete("/:id", checkAccessTokenMiddleware, removeToDoValidator, removeToDoController);

export default router;
