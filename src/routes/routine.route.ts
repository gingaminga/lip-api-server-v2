import { addRoutineByDaysController } from "@controllers/routine/add-routine-by-days.controller";
import { addRoutineByEveryController } from "@controllers/routine/add-routine-by-every.controller";
import { modifyRoutineByDaysController } from "@controllers/routine/modify-routine-by-days.controller";
import { modifyRoutineByEveryController } from "@controllers/routine/modify-routine-by-every.controller";
import { removeRoutineController } from "@controllers/routine/remove-routine.controller";
import checkAccessTokenMiddleware from "@middlewares/check-access-token.middleware";
import routineToDoRoute from "@routes/routine-to-do.route";
import { addRoutineByDaysValidator } from "@validators/routine/add-routine-by-days.validator";
import { addRoutineByEveryValidator } from "@validators/routine/add-routine-by-every.validator";
import { modifyRoutineByDaysValidator } from "@validators/routine/modify-routine-by-days.validator";
import { modifyRoutineByEveryValidator } from "@validators/routine/modify-routine-by-every.validator";
import { removeRoutineValidator } from "@validators/routine/remove-routine.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.use("/to-do", routineToDoRoute);

router.post("/days", checkAccessTokenMiddleware, addRoutineByDaysValidator, addRoutineByDaysController);
router.post("/every", checkAccessTokenMiddleware, addRoutineByEveryValidator, addRoutineByEveryController);
router.put("/days/:id", checkAccessTokenMiddleware, modifyRoutineByDaysValidator, modifyRoutineByDaysController);
router.put("/every/:id", checkAccessTokenMiddleware, modifyRoutineByEveryValidator, modifyRoutineByEveryController);
router.delete("/:id", checkAccessTokenMiddleware, removeRoutineValidator, removeRoutineController);

export default router;
