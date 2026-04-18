import { Router } from "express";
import { VendorController } from "./vendor.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth("VENDOR", "ADMIN"), VendorController.createVendor);
router.get("/", auth("ADMIN"), VendorController.getAllVendors);

export const VendorRoutes = router;