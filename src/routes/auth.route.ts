import { socialLoginController } from "@controllers/auth/social-login.controller";
import { socialLoginValidator } from "@validators/auth/social-login.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.post("/social-login", socialLoginValidator, socialLoginController);

export default router;
