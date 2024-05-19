import { addRoutineByDaysController } from "@controllers/routine/add-routine-by-days.controller";
import { addRoutineByEveryController } from "@controllers/routine/add-routine-by-every.controller";
import { modifyRoutineByDaysController } from "@controllers/routine/modify-routine-by-days.controller";
import { modifyRoutineByEveryController } from "@controllers/routine/modify-routine-by-every.controller";
import checkAccessTokenMiddleware from "@middlewares/check-access-token.middleware";
import { addRoutineByDaysValidator } from "@validators/routine/add-routine-by-days.validator";
import { addRoutineByEveryValidator } from "@validators/routine/add-routine-by-every.validator";
import { modifyRoutineByDaysValidator } from "@validators/routine/modify-routine-by-days.validator";
import { modifyRoutineByEveryValidator } from "@validators/routine/modify-routine-by-every.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.post("/days", checkAccessTokenMiddleware, addRoutineByDaysValidator, addRoutineByDaysController);
router.post("/every", checkAccessTokenMiddleware, addRoutineByEveryValidator, addRoutineByEveryController);
router.put("/days/:id", checkAccessTokenMiddleware, modifyRoutineByDaysValidator, modifyRoutineByDaysController);
router.put("/every/:id", checkAccessTokenMiddleware, modifyRoutineByEveryValidator, modifyRoutineByEveryController);

export default router;
