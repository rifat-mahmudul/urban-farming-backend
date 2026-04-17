import express from "express";

const router = express.Router();

const moduleRoutes = [
  {
    path: "",
    route: "",
  },
];

moduleRoutes.forEach((route) => route.path, router.route);

export default router;
