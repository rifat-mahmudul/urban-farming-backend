import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => route.path, router.route);

export default router;
