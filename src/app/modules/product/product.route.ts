import { Router } from "express";
import { ProductController } from "./product.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth("VENDOR"), ProductController.createProduct);
router.get("/", ProductController.getAllProducts);

export const ProductRoutes = router;
