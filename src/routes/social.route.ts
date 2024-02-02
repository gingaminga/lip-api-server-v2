import { getSocialURLController } from "@controllers/social/get-social-url.controller";
import { getSocialURLValidator } from "@validators/social/get-social-url.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.get("/url", getSocialURLValidator, getSocialURLController);

export default router;
