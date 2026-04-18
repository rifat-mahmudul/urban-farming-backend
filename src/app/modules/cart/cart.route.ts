import { Router } from "express";
import { CartController } from "./cart.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth("CUSTOMER"), CartController.addToCart);
router.get("/", auth("CUSTOMER"), CartController.getMyCart);
router.delete("/:productId", auth("CUSTOMER"), CartController.removeFromCart);

export const CartRoutes = router;