import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { CertificationController } from "./certifications.controller";

const router = Router();

router.post("/", auth("VENDOR"), CertificationController.createCertification);
router.get("/", auth("ADMIN"), CertificationController.getAllCertifications);

export const CertificationRoutes = router;