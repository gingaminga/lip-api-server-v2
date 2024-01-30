import infoRoutes from "@routes/info.route";
import toDoRoutes from "@routes/to-do.route";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.use("/info", infoRoutes);
router.use("/to-do", toDoRoutes);

export default router;
