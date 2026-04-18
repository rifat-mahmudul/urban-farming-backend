import { Router } from "express";
import { RentalController } from "./rental.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth("VENDOR"), RentalController.createSpace);
router.get("/", RentalController.getAllSpaces);
router.post("/book", auth("CUSTOMER"), RentalController.bookSpace);

export const RentalRoutes = router;
