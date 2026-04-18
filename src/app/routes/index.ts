import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { VendorRoutes } from "../modules/vendor/vendor.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/vendors",
    route: VendorRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
