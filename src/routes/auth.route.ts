import { getSocialURLController } from "@controllers/auth/get-social-url.controller";
import { socialLoginController } from "@controllers/auth/social-login.controller";
import { getSocialURLValidator } from "@validators/auth/get-social-url.validator";
import { socialLoginValidator } from "@validators/auth/social-login.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.get("/social-url", getSocialURLValidator, getSocialURLController);
router.post("/social-login", socialLoginValidator, socialLoginController);

export default router;
