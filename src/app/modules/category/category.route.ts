import { Router } from "express";
import { CategoryController } from "./category.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth("ADMIN"), CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);

export const CategoryRoutes = router;