import { Router } from "express";
import { CommunityController } from "./community.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth("CUSTOMER", "VENDOR"), CommunityController.createPost);
router.get("/", CommunityController.getAllPosts);

export const CommunityRoutes = router;
