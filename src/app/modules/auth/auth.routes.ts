import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { authLimiter } from "../../middlewares/rateLimiter";

const router = Router();

router.post("/register", authLimiter, AuthControllers.register);
router.post("/login", authLimiter, AuthControllers.login);

export const AuthRoutes = router;
