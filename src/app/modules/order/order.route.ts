import { Router } from "express";
import { OrderController } from "./order.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth("CUSTOMER"), OrderController.createOrder);
router.get("/", auth("CUSTOMER"), OrderController.getMyOrders);

export const OrderRoutes = router;
